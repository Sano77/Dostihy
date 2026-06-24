/* Vysoká Apartments — Pricing Dashboard
 *
 * Klientský dashboard (statické GitHub Pages). Bez backendu beží v simulačnom
 * režime so seedovanou demand-modelovou logikou. Reálne dátové zdroje sa zapnú
 * dosadením adaptérov v sekcii DATA SOURCES nižšie.
 */

"use strict";

// ---------- Konfig / persistence ----------

const STORAGE = "vysoka.apartments.v1";
const DEFAULT_SETTINGS = {
  base: 89,
  min: 55,
  max: 240,
  occupancyTarget: 85,
  units: 3,
  weekendUpliftPct: 18,
  eventMaxMultiplier: 1.6,
  apiKey: "",
  acceptedPrices: {}, // { "YYYY-MM-DD": number }
};

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (!raw) return { ...DEFAULT_SETTINGS };
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(s) {
  localStorage.setItem(STORAGE, JSON.stringify(s));
}

const state = {
  settings: loadSettings(),
  days: [],          // pole DayForecast objektov
  events: [],        // pole eventov
  competitors: [],   // konkurencia
  flights: {},       // { "YYYY-MM-DD": [Flight] }
};

// ---------- Deterministické seedovanie (pseudo-náhoda) ----------

function hashStr(s) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function rng(seed) {
  let s = hashStr(String(seed));
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

// ---------- Dátumové utilita ----------

function fmtDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}
function addDays(d, n) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}
function today() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}
const DOW_SK = ["Ne", "Po", "Ut", "St", "Št", "Pi", "So"];

// ---------- Eventy (kurátorský zoznam + auto-generovaný šum) ----------
// Reálne typové eventy v Bratislave. Konkrétne termíny sú heuristické vzory
// (mesačné/sezónne), AI/používateľ ich môže prepísať. Slovan domáce zápasy,
// EL, koncerty Tipos Aréna, NR SR plénum, ATP Bratislava Open atď.

const RECURRING_EVENT_TEMPLATES = [
  // Slovan Bratislava (futbal) — domáce zápasy v sezóne, typicky So/Ne
  { match: (d) => [0, 6].includes(d.getDay()) && d.getDate() % 14 < 2,
    title: "ŠK Slovan Bratislava — domáci zápas",
    venue: "Tehelné pole",
    type: "sport", capacity: 22000, impact: 0.55 },
  // Slovan hokej — Tipos Aréna
  { match: (d) => [2, 4, 5].includes(d.getDay()) && (d.getMonth() >= 8 || d.getMonth() <= 3) && d.getDate() % 9 < 2,
    title: "HC Slovan — KHL/extraliga",
    venue: "Tipos Aréna (Ondrej Nepela)",
    type: "sport", capacity: 10000, impact: 0.35 },
  // Tipos Aréna koncerty
  { match: (d) => d.getDay() === 5 && d.getDate() % 21 < 2,
    title: "Veľký koncert — Tipos Aréna",
    venue: "Tipos Aréna",
    type: "culture", capacity: 10000, impact: 0.7 },
  // NR SR — schôdze
  { match: (d) => [1, 2, 3].includes(d.getDay()) && d.getDate() < 20 && (d.getMonth() % 2 === 0),
    title: "NR SR — riadna schôdza",
    venue: "Národná Rada SR",
    type: "political", capacity: 800, impact: 0.18 },
  // Konferencie (typicky St/Št)
  { match: (d) => [2, 3].includes(d.getDay()) && d.getDate() > 8 && d.getDate() < 22,
    title: "Konferencia / kongres (Reduta / Incheba)",
    venue: "Bratislava (rôzne)",
    type: "conference", capacity: 1500, impact: 0.30 },
  // Old Market / Devín polmaratón, Bratislava maratón (jar/jeseň)
  { match: (d) => (d.getMonth() === 2 || d.getMonth() === 9) && d.getDay() === 0 && d.getDate() < 12,
    title: "Bratislava Maratón",
    venue: "Centrum mesta",
    type: "sport", capacity: 12000, impact: 0.6 },
  // Vianočné trhy
  { match: (d) => d.getMonth() === 11 && d.getDate() <= 23,
    title: "Vianočné trhy Bratislava",
    venue: "Hlavné námestie / Františkánske",
    type: "culture", capacity: 30000, impact: 0.5 },
  // Letné kultúrne leto
  { match: (d) => d.getMonth() === 6 && [4, 5].includes(d.getDay()),
    title: "Kultúrne leto / koncerty",
    venue: "Hlavné námestie / Hviezdoslavovo",
    type: "culture", capacity: 5000, impact: 0.25 },
];

// Pevné kurátorské eventy (môžeš sem dopĺňať konkrétne dátumy)
const FIXED_EVENTS = [
  // Príklady - dopĺňaj reálne. Dátumy v ISO.
  { date: addDays(today(), 5),   title: "ŠK Slovan — Európska liga",   venue: "Tehelné pole", type: "sport",      capacity: 22000, impact: 0.75 },
  { date: addDays(today(), 12),  title: "Koncert — Tipos Aréna",        venue: "Tipos Aréna",  type: "culture",    capacity: 10000, impact: 0.65 },
  { date: addDays(today(), 18),  title: "Veľký IT kongres",             venue: "Incheba Expo", type: "conference", capacity: 4000,  impact: 0.55 },
  { date: addDays(today(), 24),  title: "NR SR — kľúčové hlasovanie",  venue: "Národná Rada", type: "political",  capacity: 800,   impact: 0.20 },
  { date: addDays(today(), 30),  title: "Bratislava City Marathon",     venue: "Centrum",      type: "sport",      capacity: 12000, impact: 0.70 },
];

function generateEvents(horizonDays) {
  const out = [];
  // pevné
  for (const ev of FIXED_EVENTS) {
    const diff = (ev.date - today()) / (1000 * 60 * 60 * 24);
    if (diff >= 0 && diff <= horizonDays) {
      out.push({ ...ev, date: fmtDate(ev.date), source: "kurátorské" });
    }
  }
  // generované
  for (let i = 0; i < horizonDays; i++) {
    const d = addDays(today(), i);
    for (const tpl of RECURRING_EVENT_TEMPLATES) {
      if (tpl.match(d)) {
        const r = rng(`ev:${fmtDate(d)}:${tpl.title}`)();
        if (r > 0.55) continue; // šum – nie každý vzor zaberie
        out.push({
          date: fmtDate(d),
          title: tpl.title,
          venue: tpl.venue,
          type: tpl.type,
          capacity: tpl.capacity,
          impact: tpl.impact * (0.8 + r * 0.5),
          source: "vzor",
        });
      }
    }
  }
  // dedup podľa dátum+title
  const seen = new Set();
  return out.filter((e) => {
    const k = e.date + "|" + e.title;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  }).sort((a, b) => a.date.localeCompare(b.date));
}

// ---------- BTS prílety simulácia ----------
// V realite: AeroDataBox alebo bts.aero / FlightAware AeroAPI.

const BTS_ROUTES = [
  // [origin code, airline, freq weekday-bitmask (Mo=1..Su=64), avg pax]
  { from: "LTN", city: "Londýn-Luton", airline: "Ryanair", days: 0b1111111, pax: 180 },
  { from: "STN", city: "Londýn-Stansted", airline: "Ryanair", days: 0b1010101, pax: 180 },
  { from: "DUB", city: "Dublin", airline: "Ryanair", days: 0b0101010, pax: 180 },
  { from: "MXP", city: "Miláno-Bergamo", airline: "Ryanair", days: 0b1110011, pax: 180 },
  { from: "CIA", city: "Rím-Ciampino", airline: "Ryanair", days: 0b0011011, pax: 180 },
  { from: "BRU", city: "Brusel-Charleroi", airline: "Ryanair", days: 0b1001001, pax: 180 },
  { from: "AYT", city: "Antalya", airline: "AnadoluJet", days: 0b0010100, pax: 190 },
  { from: "TLV", city: "Tel Aviv", airline: "ArkiaIsrael", days: 0b0100010, pax: 200 },
  { from: "BCN", city: "Barcelona", airline: "Ryanair", days: 0b0101010, pax: 180 },
  { from: "AGP", city: "Málaga", airline: "Ryanair", days: 0b0010010, pax: 180 },
  { from: "KIV", city: "Kišiňov", airline: "FlyOne", days: 0b1010100, pax: 150 },
  { from: "IST", city: "Istanbul", airline: "Pegasus", days: 0b1111100, pax: 180 },
  { from: "SOF", city: "Sofia", airline: "Ryanair", days: 0b0001100, pax: 180 },
];

function dayMaskBit(jsDay) {
  // JS: 0=Ne…6=So. Mask: Mo=bit0…Su=bit6
  const map = [6, 0, 1, 2, 3, 4, 5];
  return 1 << map[jsDay];
}

function flightsForDate(d) {
  const r = rng(`fl:${fmtDate(d)}`);
  const dateStr = fmtDate(d);
  const arr = [];
  let id = 1000;
  for (const route of BTS_ROUTES) {
    if (!(route.days & dayMaskBit(d.getDay()))) continue;
    // 1 (občas 2) prílety
    const n = r() > 0.85 ? 2 : 1;
    for (let i = 0; i < n; i++) {
      const hour = Math.floor(6 + r() * 17);  // 06–22
      const minute = Math.floor(r() * 60);
      const onTime = r() > 0.18;
      const status = onTime ? "OK" : (r() > 0.5 ? "+15 min" : "+30 min");
      const loadFactor = 0.72 + r() * 0.25;
      arr.push({
        time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
        flight: `${route.airline.slice(0, 2).toUpperCase()}${id++}`,
        from: `${route.city} (${route.from})`,
        airline: route.airline,
        paxEst: Math.round(route.pax * loadFactor),
        status,
      });
    }
  }
  arr.sort((a, b) => a.time.localeCompare(b.time));
  state.flights[dateStr] = arr;
  return arr;
}

// ---------- Stanice — denný odhad ----------

function stationsForDate(d) {
  const r = rng(`st:${fmtDate(d)}`);
  const dow = d.getDay();
  const weekday = dow >= 1 && dow <= 5;
  const base = {
    nivy:      weekday ? 9500  : 6200,   // medzimestské + medzinárodné busy
    hlavna:    weekday ? 14000 : 11000,  // ZSSK denne — odhad turistických/nerezidentných príchodov
    petrzalka: weekday ? 5200  : 4100,
  };
  const wiggle = () => 0.85 + r() * 0.35;
  return {
    nivy: {
      pax: Math.round(base.nivy * wiggle()),
      lines: ["RegioJet", "FlixBus", "Slovak Lines", "Eurolines"],
      peakHours: weekday ? "07–09, 15–18" : "10–13, 17–20",
    },
    hlavna: {
      pax: Math.round(base.hlavna * wiggle()),
      lines: ["EC/IC Praha–BA", "RJ/EX Košice", "REX Žilina/Komárno", "EN Berlín"],
      peakHours: "06–09, 15–20",
    },
    petrzalka: {
      pax: Math.round(base.petrzalka * wiggle()),
      lines: ["REX Bratislava–Wien Hbf", "Os linka Devínska N. V.", "S70"],
      peakHours: "06–08, 16–19",
    },
  };
}

// ---------- Konkurencia (Staré Mesto, okolie Vysoká/Obchodná) ----------
// Statické referenčné dáta; reálne by sa scrapovali / brali z PriceLabs/AirDNA.

const COMPETITORS_REF = [
  { name: "Marrol's Boutique Hotel",  distanceKm: 0.45, rating: 9.4, basePrice: 175 },
  { name: "Roset Boutique",            distanceKm: 0.30, rating: 9.5, basePrice: 165 },
  { name: "Tulip House",               distanceKm: 0.35, rating: 9.0, basePrice: 150 },
  { name: "Apartments Old Town Suites",distanceKm: 0.20, rating: 8.9, basePrice: 110 },
  { name: "Downtown Apartments Obchodná", distanceKm: 0.15, rating: 8.6, basePrice: 95 },
  { name: "Hviezdoslavovo Studio",     distanceKm: 0.50, rating: 9.1, basePrice: 120 },
  { name: "Manderla Apartments",       distanceKm: 0.40, rating: 8.8, basePrice: 100 },
  { name: "SkyPark Residence (krátkodobé)", distanceKm: 0.75, rating: 9.3, basePrice: 135 },
];

function competitorsForDate(d) {
  const r = rng(`co:${fmtDate(d)}`);
  const dow = d.getDay();
  const weekendUplift = (dow === 5 || dow === 6) ? 1.18 : (dow === 0 ? 1.06 : 1.0);
  return COMPETITORS_REF.map((c) => {
    const noise = 0.88 + r() * 0.30;
    const price = Math.round(c.basePrice * weekendUplift * noise);
    return { ...c, price };
  });
}

// ---------- Demand model ----------

function buildForecast(horizonDays) {
  const events = state.events;
  const eventsByDate = {};
  for (const ev of events) {
    (eventsByDate[ev.date] ||= []).push(ev);
  }

  const settings = state.settings;
  const days = [];

  for (let i = 0; i < horizonDays; i++) {
    const d = addDays(today(), i);
    const dateStr = fmtDate(d);
    const dow = d.getDay();
    const isWeekend = dow === 5 || dow === 6;
    const isFri = dow === 5;

    // 1) Base demand (0–1)
    const dowBase = [0.55, 0.45, 0.50, 0.62, 0.78, 0.95, 0.85][dow];

    // 2) Sezónnosť — mesiac
    const month = d.getMonth();
    const seasonalIdx = [0.55, 0.55, 0.65, 0.72, 0.85, 0.90, 0.85, 0.85, 0.92, 0.88, 0.78, 0.85][month];

    // 3) Eventy
    const dayEvents = eventsByDate[dateStr] || [];
    let eventImpact = 0;
    for (const ev of dayEvents) eventImpact += ev.impact;
    eventImpact = Math.min(eventImpact, 1.2);

    // 4) Letové príchody (pax na BTS)
    const flights = flightsForDate(d);
    const paxBts = flights.reduce((s, f) => s + f.paxEst, 0);
    const paxBtsNorm = Math.min(paxBts / 2500, 1);

    // 5) Stanice
    const stations = stationsForDate(d);
    const paxStations = stations.nivy.pax + stations.hlavna.pax + stations.petrzalka.pax;
    const paxStNorm = Math.min(paxStations / 35000, 1);

    // Aggregate demand score (0–1.5)
    let demand =
      0.30 * dowBase +
      0.20 * seasonalIdx +
      0.25 * eventImpact +
      0.15 * paxBtsNorm +
      0.10 * paxStNorm;

    if (i < 3) demand *= 1.05; // pickup pri last-minute

    // Mapuj na cenu
    const weekendMult = isWeekend ? (1 + settings.weekendUpliftPct / 100) : 1.0;
    const eventMult = 1 + (eventImpact * (settings.eventMaxMultiplier - 1));
    const demandMult = 0.78 + demand * 1.05;

    let price = settings.base * demandMult * weekendMult * eventMult;
    // Pozícia voči konkurencii — udržuj v mediánovom pásme
    const comps = competitorsForDate(d);
    const compPrices = comps.map((c) => c.price).sort((a, b) => a - b);
    const median = compPrices[Math.floor(compPrices.length / 2)];
    // Soft anchor — ak sme >25% pod alebo nad medianom, korekcia
    if (price < median * 0.78) price = price * 0.6 + median * 0.78 * 0.4;
    if (price > median * 1.20) price = price * 0.7 + median * 1.20 * 0.3;
    price = Math.max(settings.min, Math.min(settings.max, Math.round(price)));

    const occupancyExp = Math.min(0.99, 0.40 + demand * 0.65);

    let level = "low";
    if (demand > 0.95) level = "peak";
    else if (demand > 0.78) level = "high";
    else if (demand > 0.58) level = "mid";

    days.push({
      date: dateStr,
      dow,
      dowName: DOW_SK[dow],
      isWeekend,
      demand: Number(demand.toFixed(3)),
      level,
      recommendedPrice: price,
      expectedOccupancy: Number(occupancyExp.toFixed(2)),
      paxBts,
      paxStations,
      events: dayEvents,
      median,
    });
  }
  return days;
}

// ---------- Render ----------

function fmtEur(n) { return `€${n.toLocaleString("sk-SK")}`; }

function renderKpis() {
  const next7 = state.days.slice(0, 7);
  if (!next7.length) return;
  const occ = (next7.reduce((s, d) => s + d.expectedOccupancy, 0) / next7.length) * 100;
  const adr = next7.reduce((s, d) => s + d.recommendedPrice, 0) / next7.length;
  const next30 = state.days.slice(0, 30);
  const revenue = next30.reduce((s, d) => s + d.recommendedPrice * d.expectedOccupancy * state.settings.units, 0);
  const tomorrow = state.days[1] || state.days[0];

  document.getElementById("kpi-occupancy").textContent = `${occ.toFixed(0)}%`;
  document.getElementById("kpi-occupancy-trend").textContent = occ >= state.settings.occupancyTarget ? "✓ nad cieľom" : "↓ pod cieľom";
  document.getElementById("kpi-occupancy-trend").className = "kpi-trend " + (occ >= state.settings.occupancyTarget ? "up" : "down");

  document.getElementById("kpi-adr").textContent = fmtEur(Math.round(adr));
  document.getElementById("kpi-adr-trend").textContent = `min ${state.settings.min} · max ${state.settings.max}`;

  document.getElementById("kpi-revenue").textContent = fmtEur(Math.round(revenue));
  document.getElementById("kpi-revenue-trend").textContent = `${state.settings.units}× apartmán · 30 dní`;

  document.getElementById("kpi-demand").textContent = `${(tomorrow.demand * 100).toFixed(0)} / ${tomorrow.level.toUpperCase()}`;
  document.getElementById("kpi-demand-trend").textContent = tomorrow.events.length ? `${tomorrow.events.length}× event` : "bez eventov";
}

function renderCalendar() {
  const grid = document.getElementById("calendar-grid");
  grid.innerHTML = "";
  const accepted = state.settings.acceptedPrices || {};

  // Header dní v týždni
  const labels = ["Po", "Ut", "St", "Št", "Pi", "So", "Ne"];
  for (const l of labels) {
    const h = document.createElement("div");
    h.className = "muted";
    h.style.fontSize = "11px";
    h.style.textAlign = "center";
    h.style.padding = "2px";
    h.textContent = l;
    grid.appendChild(h);
  }

  // Padding pre prvý deň
  const first = state.days[0];
  const firstDow = first ? (first.dow === 0 ? 6 : first.dow - 1) : 0;
  for (let i = 0; i < firstDow; i++) {
    const empty = document.createElement("div");
    grid.appendChild(empty);
  }

  for (const d of state.days) {
    const div = document.createElement("div");
    div.className = "day" + (d.isWeekend ? " weekend" : "");
    const isAccepted = accepted[d.date] != null;
    if (isAccepted) div.classList.add("accepted");
    else div.classList.add("pending");

    const dotClass = `dot-${d.level}`;
    const shownPrice = isAccepted ? accepted[d.date] : d.recommendedPrice;
    const eventTags = d.events.map((e) =>
      `<span class="tag ${e.type}" title="${e.title} @ ${e.venue}">${e.title.slice(0, 18)}${e.title.length > 18 ? "…" : ""}</span>`
    ).join("");

    const dateNum = d.date.slice(8);
    const monthNum = d.date.slice(5, 7);
    div.innerHTML = `
      <div class="d-date"><span class="d-dow">${d.dowName} ${dateNum}.${monthNum}.</span><span><span class="dot ${dotClass}"></span></span></div>
      <div class="d-price">${fmtEur(shownPrice)}${isAccepted ? "" : `<small>návrh</small>`}</div>
      <div class="d-demand">obs. ${(d.expectedOccupancy * 100).toFixed(0)}% · BTS ${d.paxBts}</div>
      <div class="d-tags">${eventTags}</div>
      <div class="d-actions">
        <button class="btn-secondary" data-act="accept" data-date="${d.date}">${isAccepted ? "✓ akcept." : "akcept."}</button>
        <button class="btn-secondary" data-act="edit"   data-date="${d.date}">upraviť</button>
      </div>
    `;
    grid.appendChild(div);
  }

  // Listener
  grid.querySelectorAll("button[data-act]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const date = btn.dataset.date;
      const act = btn.dataset.act;
      const day = state.days.find((x) => x.date === date);
      if (!day) return;
      if (act === "accept") {
        state.settings.acceptedPrices[date] = day.recommendedPrice;
      } else if (act === "edit") {
        const cur = state.settings.acceptedPrices[date] ?? day.recommendedPrice;
        const v = prompt(`Cena za ${date} (€):`, cur);
        if (v != null) {
          const n = parseInt(v, 10);
          if (!Number.isNaN(n)) state.settings.acceptedPrices[date] = n;
        }
      }
      saveSettings(state.settings);
      renderKpis();
      renderCalendar();
    });
  });
}

function renderFlights() {
  const input = document.getElementById("flights-date");
  const date = input.value ? new Date(input.value) : today();
  const list = flightsForDate(date);
  const tbody = document.querySelector("#flights-table tbody");
  tbody.innerHTML = "";
  for (const f of list) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${f.time}</td><td>${f.flight}</td><td>${f.from}</td><td>${f.airline}</td><td>${f.paxEst}</td><td>${f.status}</td>`;
    tbody.appendChild(tr);
  }
  const sum = list.reduce((s, f) => s + f.paxEst, 0);
  document.getElementById("flights-pax-sum").textContent = sum.toLocaleString("sk-SK");
}

function renderStations() {
  const input = document.getElementById("stations-date");
  const date = input.value ? new Date(input.value) : today();
  const s = stationsForDate(date);
  for (const key of ["nivy", "hlavna", "petrzalka"]) {
    document.getElementById(`pax-${key}`).textContent = s[key].pax.toLocaleString("sk-SK");
    document.getElementById(`detail-${key}`).innerHTML =
      `<div>linky: ${s[key].lines.join(", ")}</div><div>peak: ${s[key].peakHours}</div>`;
  }
}

function renderEvents() {
  const tbody = document.querySelector("#events-table tbody");
  tbody.innerHTML = "";
  const filters = Array.from(document.querySelectorAll(".filter-ev:checked")).map((x) => x.value);
  for (const ev of state.events) {
    if (!filters.includes(ev.type)) continue;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${ev.date}</td>
      <td>${ev.title} <span class="muted" style="font-size:11px;">(${ev.source})</span></td>
      <td>${ev.venue}</td>
      <td><span class="tag ${ev.type}">${ev.type}</span></td>
      <td>${ev.capacity.toLocaleString("sk-SK")}</td>
      <td>${(ev.impact * 100).toFixed(0)}%</td>
      <td><button class="btn-secondary" data-del="${ev.date}|${ev.title}">×</button></td>
    `;
    tbody.appendChild(tr);
  }
  tbody.querySelectorAll("button[data-del]").forEach((b) => {
    b.addEventListener("click", () => {
      const [d, t] = b.dataset.del.split("|");
      state.events = state.events.filter((e) => !(e.date === d && e.title === t));
      rebuildForecast();
    });
  });
}

function renderCompetitors() {
  const input = document.getElementById("comp-date");
  const date = input.value ? new Date(input.value) : today();
  const dateStr = fmtDate(date);
  const dayForecast = state.days.find((x) => x.date === dateStr) || state.days[0];
  const ourPrice = state.settings.acceptedPrices[dateStr] ?? dayForecast.recommendedPrice;
  const list = competitorsForDate(date);
  const tbody = document.querySelector("#comp-table tbody");
  tbody.innerHTML = "";
  for (const c of list) {
    const diff = c.price - ourPrice;
    const sign = diff > 0 ? "+" : "";
    const color = diff > 0 ? "var(--ok)" : "var(--hot)";
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${c.name}</td><td>${c.distanceKm.toFixed(2)} km</td><td>${c.rating}</td><td>${fmtEur(c.price)}</td><td style="color:${color}">${sign}${diff} €</td>`;
    tbody.appendChild(tr);
  }
  // riadok pre nás
  const ourTr = document.createElement("tr");
  ourTr.style.background = "rgba(90,169,255,0.08)";
  ourTr.innerHTML = `<td><strong>Vysoká Apartments</strong> (my)</td><td>0.00 km</td><td>—</td><td><strong>${fmtEur(ourPrice)}</strong></td><td>—</td>`;
  tbody.appendChild(ourTr);

  const median = [...list].map((x) => x.price).sort((a, b) => a - b)[Math.floor(list.length / 2)];
  const rank = list.filter((c) => c.price < ourPrice).length + 1;
  document.getElementById("comp-median").textContent = fmtEur(median);
  document.getElementById("comp-position").textContent = `${rank}. / ${list.length + 1}`;
}

// ---------- AI volanie (Anthropic priamo z prehliadača) ----------

async function askClaude() {
  const out = document.getElementById("ai-output");
  const apiKey = state.settings.apiKey;
  if (!apiKey) {
    out.textContent = "Zadaj Anthropic API kľúč v sekcii Nastavenia (uloží sa lokálne v prehliadači).";
    return;
  }
  const model = document.getElementById("ai-model").value;
  const userPrompt = document.getElementById("ai-prompt").value;

  // Kompaktný kontext
  const horizon = 14;
  const slice = state.days.slice(0, horizon).map((d) => ({
    date: d.date,
    dow: d.dowName,
    demand: d.demand,
    level: d.level,
    recommended: d.recommendedPrice,
    expectedOcc: d.expectedOccupancy,
    paxBts: d.paxBts,
    medianCompetitor: d.median,
    events: d.events.map((e) => `${e.type}:${e.title}`),
  }));

  const sys =
`Si pricing analytik pre apartmán Vysoká Apartments na Vysoká 20, Bratislava (Staré Mesto, ${state.settings.units} jednotky).
Cieľ: maximalizovať tržby pri obsadenosti ${state.settings.occupancyTarget}%.
Cenové rozpätie: ${state.settings.min}–${state.settings.max} €/noc, základ ${state.settings.base} €.
Buď stručný, konkrétny, v slovenčine. Pri odporúčaniach uvádzaj dátum, navrhovanú cenu a 1-vetný dôvod.`;

  out.textContent = "AI premýšľa…";
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model,
        max_tokens: 1500,
        system: sys,
        messages: [
          {
            role: "user",
            content: `${userPrompt}\n\nKONTEXT (14 dní, JSON):\n${JSON.stringify(slice, null, 2)}`,
          },
        ],
      }),
    });
    if (!res.ok) {
      const t = await res.text();
      out.textContent = `Chyba ${res.status}: ${t}`;
      return;
    }
    const data = await res.json();
    const text = (data.content || []).map((c) => c.text || "").join("\n");
    out.textContent = text || JSON.stringify(data, null, 2);
  } catch (err) {
    out.textContent = `Sieťová chyba: ${err.message}\n\nPoznámka: ak ide o CORS, potrebuješ jednoduchý backend proxy (Cloudflare Worker / Netlify Function) na volanie Anthropic API.`;
  }
}

// ---------- Settings UI ----------

function renderSettings() {
  const s = state.settings;
  document.getElementById("set-base").value = s.base;
  document.getElementById("set-min").value = s.min;
  document.getElementById("set-max").value = s.max;
  document.getElementById("set-occ").value = s.occupancyTarget;
  document.getElementById("set-units").value = s.units;
  document.getElementById("set-weekend").value = s.weekendUpliftPct;
  document.getElementById("set-event").value = s.eventMaxMultiplier;
  document.getElementById("set-apikey").value = s.apiKey;
}

function collectSettings() {
  state.settings.base = +document.getElementById("set-base").value || 89;
  state.settings.min = +document.getElementById("set-min").value || 55;
  state.settings.max = +document.getElementById("set-max").value || 240;
  state.settings.occupancyTarget = +document.getElementById("set-occ").value || 85;
  state.settings.units = +document.getElementById("set-units").value || 3;
  state.settings.weekendUpliftPct = +document.getElementById("set-weekend").value || 18;
  state.settings.eventMaxMultiplier = +document.getElementById("set-event").value || 1.6;
  state.settings.apiKey = document.getElementById("set-apikey").value.trim();
  saveSettings(state.settings);
}

// ---------- Rebuild ----------

function rebuildForecast() {
  const horizon = +document.getElementById("horizon").value || 30;
  state.events = generateEvents(horizon + 7);
  state.days = buildForecast(horizon);
  renderKpis();
  renderCalendar();
  renderFlights();
  renderStations();
  renderEvents();
  renderCompetitors();
}

// ---------- Bootstrap ----------

function init() {
  document.getElementById("build-date").textContent = new Date().toISOString().slice(0, 10);
  const t = fmtDate(today());
  document.getElementById("flights-date").value = t;
  document.getElementById("stations-date").value = t;
  document.getElementById("comp-date").value = t;

  renderSettings();
  rebuildForecast();

  document.getElementById("horizon").addEventListener("change", rebuildForecast);
  document.getElementById("recalc").addEventListener("click", rebuildForecast);
  document.getElementById("flights-date").addEventListener("change", renderFlights);
  document.getElementById("stations-date").addEventListener("change", renderStations);
  document.getElementById("comp-date").addEventListener("change", renderCompetitors);
  document.getElementById("refresh-comp").addEventListener("click", renderCompetitors);
  document.querySelectorAll(".filter-ev").forEach((el) => el.addEventListener("change", renderEvents));
  document.getElementById("ask-ai").addEventListener("click", askClaude);

  document.getElementById("apply-ai").addEventListener("click", () => {
    if (!confirm("Akceptovať odporúčané AI ceny pre všetky dni v horizonte?")) return;
    for (const d of state.days) state.settings.acceptedPrices[d.date] = d.recommendedPrice;
    saveSettings(state.settings);
    renderCalendar();
    renderKpis();
  });

  document.getElementById("add-event").addEventListener("click", () => {
    const date = prompt("Dátum (YYYY-MM-DD):", fmtDate(addDays(today(), 7)));
    if (!date) return;
    const title = prompt("Názov:", "Vlastný event");
    if (!title) return;
    const venue = prompt("Miesto:", "Bratislava");
    const type = prompt("Typ (sport/culture/political/conference):", "culture");
    const capacity = +prompt("Kapacita:", "3000") || 1000;
    const impact = +prompt("Dopad 0–1:", "0.4") || 0.4;
    state.events.push({ date, title, venue, type, capacity, impact, source: "manuál" });
    state.events.sort((a, b) => a.date.localeCompare(b.date));
    state.days = buildForecast(state.days.length);
    renderEvents();
    renderCalendar();
    renderKpis();
  });

  document.getElementById("save-settings").addEventListener("click", () => {
    collectSettings();
    document.getElementById("settings-saved").textContent = "Uložené ✓";
    setTimeout(() => (document.getElementById("settings-saved").textContent = ""), 1800);
    rebuildForecast();
  });

  document.getElementById("reset-settings").addEventListener("click", () => {
    if (!confirm("Reset všetkých nastavení a akceptovaných cien?")) return;
    localStorage.removeItem(STORAGE);
    state.settings = loadSettings();
    renderSettings();
    rebuildForecast();
  });
}

document.addEventListener("DOMContentLoaded", init);
