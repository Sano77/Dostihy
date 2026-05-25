const races = [
  {
    code: "10309",
    time: "14:00",
    name: "Cena Fiorentie",
    type: "rovina V. kat.",
    category: "3-ročné a staršie kone",
    distance: "1200 m",
    purse: "1 700 EUR",
    notes: "",
    horses: [
      ["EMPEROR RIVER (IRE)", 4, "58.5", "IGNAMA", "am. Nikola Miklová"],
      ["FAIR MERCURY (IRE)", 3, "53.5", "MPL Racing", "am. Ivana Hrubšová"],
      ["UNIKUM (GER)", 3, "55.5", "Kovometal", "dž. Petra Zedková"],
      ["RONNIN", 4, "58.0", "Národný žrebčín Topoľčianky", "am. Adam Šebesta"],
      ["O´CONNEL BRIDGE (IRE)", 5, "58.0", "Beliar SK", "dž. Martin Laube"],
      ["RAGAZZA (FR)", 3, "52.0", "MN Racing", "dž. Martina Havelková"],
      ["LUCKYNAV (IRE)", 9, "57.0", "Racing Junior Club", "am. Klára Brišková"],
      ["ROSALINDA", 4, "57.5", "Štvorlístok", "dž. Monir Madihi"],
      ["ELEGANT VENUS (IRE)", 3, "58.0", "MPL Racing", "Václav Janáček"],
      ["KATENS (IRE)", 3, "53.0", "Strnisko", "dž. Peter Hodáň"],
    ],
  },
  {
    code: "10305",
    time: "14:31",
    name: "Cena Dark Marbla",
    type: "rovina III. kat.",
    category: "3-ročné a staršie kone",
    distance: "1200 m",
    purse: "2 900 EUR",
    notes: "Škrty: SI SEULEMENT (FR)",
    horses: [
      ["GHAN (IRE)", 5, "62.0", "EKOLS Skalica s.r.o.", "dž. Jaroslav Línek"],
      ["ADVANTAGE (GER)", 3, "56.0", "Always racing", "dž. Jan Verner"],
      ["KIRA MS (IRE)", 4, "57.5", "Feniks (CZE)", "dž. Petra Zedková"],
      ["SPANISH BLESSINGS (IRE)", 4, "59.5", "Go Go Racing (AUT)", "dž. Petr Foret"],
      ["LADY FREE (IRE)", 7, "57.0", "Herr Stummer Johann (AUT)", "am. Nikola Miklová"],
      ["ODETA (IRE)", 4, "61.0", "MPL Racing", "Václav Janáček"],
      ["LITTLE LORD (GER)", 6, "60.0", "K-K Metal a.s. (CZE)", "dž. Sofie Kvízová"],
    ],
  },
  {
    code: "10304",
    time: "15:05",
    name: "Cena spoločnosti K-K Metal",
    type: "rovina II. kat.",
    category: "4-ročné a staršie kone",
    distance: "1700 m",
    purse: "3 800 EUR",
    notes: "Dohlásené kone: KING MOLLENKOTT (GER), STRACCIATELLA (GER)",
    horses: [
      ["MYTHICAL THOR (IRE)", 6, "59.5", "Koruna Academy", "dž. Martina Havelková"],
      ["LOCH PIKE (IRE)", 5, "62.5", "FeD, spol. s r.o.", "dž. Monir Madihi"],
      ["STRACCIATELLA (GER)", 5, "59.5", "KT OBAL", "dž. Jaroslav Línek"],
      ["MUSTELA (IRE)", 7, "58.0", "VeVe Racing", "dž. Jiří Palík"],
      ["STARDUST ECHO (GB)", 4, "61.5", "Strnisko", "dž. Petr Foret"],
      ["KING MOLLENKOTT (GER)", 6, "62.0", "Eva Adamusová (CZE)", "dž. Jan Verner"],
      ["WEST BAY (GB)", 5, "58.5", "Purito", "dž. Tomáš Lukášek"],
    ],
  },
  {
    code: "10303",
    time: "15:40",
    name: "39. Veľká májová cena JSB Match Diabolo",
    type: "rovina I. kat.",
    category: "4-ročné a staršie kone",
    distance: "2000 m",
    purse: "5 500 EUR",
    notes: "Dohlásené kone: FRANCIS GOLD (IRE), GASPARINI (CZE)",
    horses: [
      ["FREE FOLIE (IRE)", 6, "58.0", "Strnisko", "dž. Jaroslav Línek"],
      ["EBONY INTHEJUNGLE (IRE)", 4, "55.5", "VB Racing (CZE)", "dž. Sofie Kvízová"],
      ["TURFITO (GER)", 4, "57.0", "ALCHEM", "Michaela Jakábová"],
      ["FRANCIS GOLD (IRE)", 5, "55.5", "OZ Roza s.r.o. (CZE)", "dž. Martina Havelková"],
      ["IWANHOE (IRE)", 4, "58.5", "MPL Racing", "Alberto Sanna"],
      ["MADAM SECRETARY (GER)", 4, "57.0", "Bunty Team (CZE)", "Václav Janáček"],
      ["GASPARINI (CZE)", 7, "60.0", "TIPPLER Group s.r.o. (CZE)", "dž. Jiří Palík"],
    ],
  },
  {
    code: "10308",
    time: "16:15",
    name: "Cena Termaca",
    type: "rovina IV. kat.",
    category: "3-ročné kone",
    distance: "2000 m",
    purse: "2 200 EUR",
    notes: "Dohlásené kone: MIA DANCING (FR), WENCESLAS. Škrty: MISS MAGIC (IRE)",
    horses: [
      ["PIADORA (GER)", 3, "54.5", "Stall Normandie", "am. Nikola Miklová"],
      ["SETINO (IRE)", 3, "58.5", "MN Racing", "dž. Monir Madihi"],
      ["MIA DANCING (FR)", 3, "54.5", "Stáj Filip (CZE)", "dž. Petra Zedková"],
      ["NOTHING BETTER (GER)", 3, "58.0", "RC Farm", "dž. Martin Laube"],
      ["ALEXANDRINE (GER)", 3, "56.5", "Pokluda Horses Slovakia", "dž. Jan Verner"],
      ["WENCESLAS", 3, "59.0", "JOB Bergendi", "dž. Martina Havelková"],
    ],
  },
  {
    code: "10102",
    time: "16:57",
    name: "34. Jarná cena kobýl JSB Match Diabolo",
    type: "rovina Listed",
    category: "3-ročné kobyly",
    distance: "1700 m",
    purse: "18 000 EUR",
    notes: "Dohlásené kone: AGNESI (FR), KATLA (POL). Škrty: ELEGANT VENUS (IRE), HANAKO (GB), PROXIMA BLUE (CZE)",
    horses: [
      ["CITATION FLIGHT (GB)", 3, "58.0", "Kovometal", "dž. Monir Madihi"],
      ["RABBIT BREATH TWO (GB)", 3, "58.0", "Rabbit Trhový Štěpánov (CZE)", "dž. Petr Foret"],
      ["PRINCESS HANA (FR)", 3, "58.0", "Etemovič Racing", "Alberto Sanna"],
      ["BLUE LAGOON", 3, "58.0", "Stajňa Caruso", "dž. Petra Zedková"],
      ["AGNESI (FR)", 3, "58.0", "Tomas Janda (CZE)", "Václav Janáček"],
      ["NAMOA BELLA (FR)", 3, "58.0", "Vimar", "dž. Martina Havelková"],
      ["EMILY IN BERLIN (GB)", 3, "58.0", "Lokotrans Slovakia", "dž. Jiří Palík"],
      ["BE MY PERSON (GER)", 3, "58.0", "Veronika Šefl (CZE)", "dž. Tomáš Lukášek"],
      ["ZINZALA (FR)", 3, "58.0", "RC Farm", "dž. Martin Laube"],
      ["WINTER’S WAY (FR)", 3, "58.0", "Dr. Charvát (CZE)", "dž. Jan Verner"],
      ["TRINITY TIME (IRE)", 3, "58.0", "RH Racing - Holčák R. (CZE)", "dž. Sofie Kvízová"],
      ["KATLA (POL)", 3, "58.0", "LOKOTRANS Slovakia CZ (CZE)", "dž. Martin Srnec"],
      ["ULYSS QUEEN (GB)", 3, "58.0", "MNK Racing", "dž. Jaroslav Línek"],
    ],
  },
  {
    code: "10101",
    time: "17:36",
    name: "34. Veľká jarná cena spoločnosti K-K Metal",
    type: "rovina Listed",
    category: "3-ročné kobyly a žrebce",
    distance: "1700 m",
    purse: "18 000 EUR",
    notes: "Škrty: FAIR MERCURY (IRE), JACK (GB), STŘELEC (CZE)",
    horses: [
      ["ZURI", 3, "56.5", "PD Senica", "dž. Martina Havelková"],
      ["HABANERO (IRE)", 3, "58.0", "KT OBAL", "dž. Petr Foret"],
      ["HEROIC MARS (IRE)", 3, "58.0", "MPL Racing", "Václav Janáček"],
      ["SAM DAWN (IRE)", 3, "58.0", "Bamatse", "dž. Martin Laube"],
      ["ALMA DE FUEGO (IRE)", 3, "58.0", "Etemovič Racing", "Alberto Sanna"],
      ["NORTH SOLUTION (GER)", 3, "58.0", "Syndikát 2007 (CZE)", "dž. Sofie Kvízová"],
      ["RABBIT TIME TEST (GB)", 3, "58.0", "Rabbit Trhový Štěpánov (CZE)", "dž. Jan Verner"],
      ["DARK ATTACK (FR)", 3, "58.0", "HONOR Racing", "dž. Jaroslav Línek"],
      ["QUER SOLUTION", 3, "58.0", "Vimar", "dž. Petra Zedková"],
      ["HUGE SATURN (IRE)", 3, "58.0", "MPL Racing", "dž. Monir Madihi"],
    ],
  },
  {
    code: "10307",
    time: "18:14",
    name: "Cena Czasa",
    type: "rovina IV. kat.",
    category: "4-ročné a staršie kone",
    distance: "1800 m",
    purse: "2 200 EUR",
    notes: "Škrty: O´CONNEL BRIDGE (IRE)",
    horses: [
      ["JABLONJ", 7, "55.0", "Stajňa 5D", "am. Klára Brišková"],
      ["ALBION (FR)", 4, "56.0", "Stáj Filip (CZE)", "am. Jaromír nejml. Štohanzl"],
      ["BLUE RIVER", 6, "54.0", "Stajňa Caruso", "am. Nikola Miklová"],
      ["MR PECTO (IRE)", 4, "58.0", "RC Farm", "am. Adam Šebesta"],
      ["AMRA (GER)", 5, "53.0", "Subotić Racing", "am. Vanda Brišková"],
      ["GRAY TOUCH (FR)", 12, "59.0", "Gray Touch Racing Syndicate", "Filip Hellebrand"],
      ["FERARA", 9, "56.5", "Národný žrebčín Topoľčianky", "Veronika Weinbachová"],
      ["LUMINAR (GER)", 5, "59.5", "EPM Petrus", "am. Ivana Hrubšová"],
      ["KIVOTAL (FR)", 6, "55.5", "KELLY (CZE)", "Michaela Jakábová"],
      ["GALADRIELA (GB)", 6, "55.0", "Štangel Racing", "am. Mário Sprušanský"],
    ],
  },
  {
    code: "10306",
    time: "18:40",
    name: "Hendikep Shamal Sally",
    type: "rovina III. kat. handicap",
    category: "4-ročné a staršie kone",
    distance: "2400 m",
    purse: "2 900 EUR",
    notes: "",
    horses: [
      ["GOLDIS (GB)", 6, "60.0", "Strnisko", "am. Adam Šebesta"],
      ["LILAROSE (FR)", 4, "62.5", "Agropodnik Dvorce (CZE)", "am. Natálie Galvasová"],
      ["LA VICTORIA (GER)", 6, "58.0", "BETA PARTNERS s.r.o.", "dž. Monir Madihi"],
      ["ROYAL ROSE (FR)", 5, "57.5", "MIHALIK racing", "dž. Jan Verner"],
      ["HAILEY", 9, "61.5", "MPL Racing", "dž. Jaroslav Línek"],
    ],
  },
];

const upcomingEvents = [
  {
    date: "7.6.2026",
    day: "Nedeľa",
    title: "Rovinové dostihy",
    place: "Bratislava",
    time: "14:00",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Z%C3%A1vodisko%20Bratislava%20Staroh%C3%A1jska%2029",
    note: "Najbližší dostihový deň v Petržalke.",
  },
  {
    date: "14.6.2026",
    day: "Nedeľa",
    title: "Rovinové a prekážkové dostihy",
    place: "Topoľčianky",
    time: "14:00",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=N%C3%A1rodn%C3%BD%20%C5%BEreb%C4%8D%C3%ADn%20Topo%C4%BE%C4%8Dianky",
    note: "Mimobratislavský dostihový deň.",
  },
  {
    date: "28.6.2026",
    day: "Nedeľa",
    title: "Rovinové a klusácke dostihy",
    place: "Bratislava",
    time: "14:00",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Z%C3%A1vodisko%20Bratislava%20Staroh%C3%A1jska%2029",
    note: "Ďalší bratislavský termín pred derby mítingom.",
  },
  {
    date: "19.7.2026",
    day: "Nedeľa",
    title: "34. Slovenské derby",
    place: "Bratislava",
    time: "14:00",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Z%C3%A1vodisko%20Bratislava%20Staroh%C3%A1jska%2029",
    note: "Hlavný vrchol sezóny.",
  },
];

const eventInfo = {
  date: "9. máj 2026",
  location: "Závodisko Bratislava, Starohájska 29, Petržalka",
  mapsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Z%C3%A1vodisko%20Bratislava%20Staroh%C3%A1jska%2029",
};

const careerStats = {
  earners: [
    ["FREE FOLIE (IRE)", "39 515 €", "21 št. · 6 víť."],
    ["GRAY TOUCH (FR)", "39 210 €", "74 št. · 14 víť."],
    ["MUSTELA (IRE)", "25 575 €", "32 št. · 6 víť."],
    ["MADAM SECRETARY (GER)", "22 104 €", "8 št. · 2 víť."],
    ["LITTLE LORD (GER)", "21 323 €", "25 št. · 5 víť."],
    ["BLUE RIVER", "15 170 €", "11 št. · 2 víť."],
    ["IWANHOE (IRE)", "14 685 €", "9 št. · 1 víť."],
    ["AMRA (GER)", "13 700 €", "12 št. · 3 víť."],
    ["LOCH PIKE (IRE)", "13 013 €", "22 št. · 5 víť."],
    ["LUCKYNAV (IRE)", "11 630 €", "43 št. · 4 víť."],
    ["ZURI", "11 170 €", "4 št. · 3 víť."],
    ["LA VICTORIA (GER)", "9 580 €", "29 št. · 0 víť."],
  ],
  starts: [
    ["GRAY TOUCH (FR)", "74 št.", "39 210 €"],
    ["LUCKYNAV (IRE)", "43 št.", "11 630 €"],
    ["MUSTELA (IRE)", "32 št.", "25 575 €"],
    ["LA VICTORIA (GER)", "29 št.", "9 580 €"],
    ["GALADRIELA (GB)", "26 št.", "7 407 €"],
    ["LITTLE LORD (GER)", "25 št.", "21 323 €"],
    ["FERARA", "24 št.", "6 220 €"],
    ["LOCH PIKE (IRE)", "22 št.", "13 013 €"],
    ["FREE FOLIE (IRE)", "21 št.", "39 515 €"],
    ["LADY FREE (IRE)", "21 št.", "5 331 €"],
    ["LUMINAR (GER)", "20 št.", "5 440 €"],
    ["GHAN (IRE)", "19 št.", "6 710 €"],
  ],
};

const countryFlags = {
  AUT: "🇦🇹",
  CZE: "🇨🇿",
  FR: "🇫🇷",
  GB: "🇬🇧",
  GER: "🇩🇪",
  HUN: "🇭🇺",
  IRE: "🇮🇪",
  JPN: "🇯🇵",
  POL: "🇵🇱",
  USA: "🇺🇸",
};

const normalized = (value) =>
  String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

function flagForHorse(name) {
  const code = name.match(/\(([A-Z]{2,3})\)/)?.[1];
  return countryFlags[code] || "🇸🇰";
}

const allEntries = races.flatMap((race, raceIndex) =>
  race.horses.map(([name, age, weight, stable, jockey], horseIndex) => ({
    raceIndex,
    horseIndex,
    race: race.name,
    code: race.code,
    time: race.time,
    name,
    age,
    weight,
    stable,
    jockey,
  })),
);

const raceList = document.querySelector("#race-list");
const upcomingList = document.querySelector("#upcoming-list");
const horseTable = document.querySelector("#horse-table");
const search = document.querySelector("#search");
const raceFilter = document.querySelector("#race-filter");
const sortHorses = document.querySelector("#sort-horses");
const betRace = document.querySelector("#bet-race");
const betType = document.querySelector("#bet-type");
const betHorse1 = document.querySelector("#bet-horse-1");
const betHorse2 = document.querySelector("#bet-horse-2");
const betHorse3 = document.querySelector("#bet-horse-3");
const betStake = document.querySelector("#bet-stake");
const ticketPreview = document.querySelector("#ticket-preview");

function countBy(entries, key) {
  return Object.entries(
    entries.reduce((acc, entry) => {
      acc[entry[key]] = (acc[entry[key]] || 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "sk"));
}

const stats = {
  jockeys: countBy(allEntries, "jockey"),
  stables: countBy(allEntries, "stable"),
  earners: careerStats.earners,
  starts: careerStats.starts,
};

function renderRaceOptions() {
  races.forEach((race, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = `${index + 1}. ${race.time} · ${race.name}`;
    raceFilter.appendChild(option);
  });
}

function renderUpcomingEvents() {
  upcomingList.innerHTML = upcomingEvents
    .map(
      (event, index) => `
        <article class="upcoming-card ${index === 0 ? "is-next" : ""}">
          <div>
            <p class="upcoming-date">${event.day} · ${event.date} · ${event.time}</p>
            <h3>${event.title}</h3>
            <p>${event.place}</p>
            <small>${event.note}</small>
          </div>
          <a class="map-link" href="${event.mapsUrl}" target="_blank" rel="noreferrer">
            Navigovať
          </a>
        </article>
      `,
    )
    .join("");
}

function renderBetRaceOptions() {
  races.forEach((race, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = `${index + 1}. ${race.name}`;
    betRace.appendChild(option);
  });
}

function horseMatches(horse, query) {
  if (!query) return true;
  const haystack = normalized(
    `${horse.name} ${horse.stable} ${horse.jockey} ${horse.race} ${horse.code}`,
  );
  return haystack.includes(normalized(query));
}

function getVisibleEntries() {
  const query = search.value.trim();
  const selectedRace = raceFilter.value;
  let entries = allEntries.filter((entry) => {
    const raceOk = selectedRace === "all" || entry.raceIndex === Number(selectedRace);
    return raceOk && horseMatches(entry, query);
  });

  const sort = sortHorses.value;
  if (sort === "name") entries = [...entries].sort((a, b) => a.name.localeCompare(b.name, "sk"));
  if (sort === "trainer") entries = [...entries].sort((a, b) => a.jockey.localeCompare(b.jockey, "sk"));
  if (sort === "weight") entries = [...entries].sort((a, b) => Number(b.weight) - Number(a.weight));
  return entries;
}

function renderProgram() {
  const query = search.value.trim();
  const selectedRace = raceFilter.value;
  raceList.innerHTML = "";

  races.forEach((race, raceIndex) => {
    if (selectedRace !== "all" && raceIndex !== Number(selectedRace)) return;

    const visibleHorses = race.horses
      .map(([name, age, weight, stable, jockey], horseIndex) => ({
        name,
        age,
        weight,
        stable,
        jockey,
        horseIndex,
        race: race.name,
        raceIndex,
      }))
      .filter((horse) => horseMatches(horse, query));

    if (!visibleHorses.length) return;

    const card = document.createElement("article");
    card.className = "race-card";
    card.innerHTML = `
      <div class="race-head">
        <div>
          <p class="race-date">${eventInfo.date} · ${race.time} · ${eventInfo.location}</p>
          <h3>${raceIndex + 1}. ${race.time} · ${race.name}</h3>
          <div class="race-meta">
            <span class="pill">${race.code}</span>
            <span>${race.type}</span>
            <span>${race.category}</span>
            <span>${race.distance}</span>
            <span>${race.purse}</span>
          </div>
          <a class="map-link" href="${eventInfo.mapsUrl}" target="_blank" rel="noreferrer">
            Google Maps navigácia
          </a>
        </div>
        <div class="race-count">${visibleHorses.length}/${race.horses.length}</div>
      </div>
      <div class="horse-grid">
        ${visibleHorses
          .map(
            (horse) => `
              <article class="horse-card">
                <h4><span class="flag" aria-hidden="true">${flagForHorse(horse.name)}</span>${horse.name}</h4>
                <dl>
                  <dt>Vek</dt><dd>${horse.age}</dd>
                  <dt>Váha</dt><dd>${horse.weight} kg</dd>
                  <dt>Stajňa</dt><dd>${horse.stable}</dd>
                  <dt>Jazdec</dt><dd>${horse.jockey}</dd>
                </dl>
              </article>
            `,
          )
          .join("")}
      </div>
      ${race.notes ? `<p class="note">${race.notes}</p>` : ""}
    `;
    raceList.appendChild(card);
  });

  if (!raceList.children.length) {
    raceList.innerHTML = `<article class="stat-card">Nenašiel som žiadny záznam pre aktuálny filter.</article>`;
  }
}

function renderHorseTable() {
  const entries = getVisibleEntries();
  horseTable.innerHTML = entries
    .map(
      (entry) => `
        <tr>
          <td><strong><span class="flag" aria-hidden="true">${flagForHorse(entry.name)}</span>${entry.name}</strong></td>
          <td>${eventInfo.date} · ${entry.time} · ${eventInfo.location} · ${entry.code} · ${entry.race}</td>
          <td>${entry.age}</td>
          <td>${entry.weight} kg</td>
          <td>${entry.stable}</td>
          <td>${entry.jockey}</td>
        </tr>
      `,
    )
    .join("");
}

function renderStats(list, target, suffix = "") {
  document.querySelector(target).innerHTML = list
    .slice(0, 12)
    .map((item) => {
      const [name, value, detail] = item;
      return `<li><div class="stat-line"><strong>${name}</strong><span>${value}${suffix}</span></div>${detail ? `<small>${detail}</small>` : ""}</li>`;
    })
    .join("");
}

function renderHorseSelect(select, horses, offset = 0) {
  select.innerHTML = horses
    .map(([name], index) => `<option value="${index}" ${index === offset ? "selected" : ""}>${flagForHorse(name)} ${name}</option>`)
    .join("");
}

function updateBetHorses() {
  const race = races[Number(betRace.value)] || races[0];
  renderHorseSelect(betHorse1, race.horses, 0);
  renderHorseSelect(betHorse2, race.horses, Math.min(1, race.horses.length - 1));
  renderHorseSelect(betHorse3, race.horses, Math.min(2, race.horses.length - 1));
  updateTicket();
}

function virtualOdds(type, selectedIndexes) {
  const base = selectedIndexes.reduce((total, index) => total + Number(index) + 1, 0);
  if (type === "win") return 1.8 + (base % 9) * 0.65;
  if (type === "place") return 1.2 + (base % 5) * 0.32;
  if (type === "p2") return 5.5 + (base % 14) * 1.1;
  return 12 + (base % 24) * 1.55;
}

function updateTicket() {
  const type = betType.value;
  const race = races[Number(betRace.value)] || races[0];
  const isCombo = type === "p2" || type === "p3";
  const isTrio = type === "p3";
  document.querySelectorAll(".combo-only").forEach((node) => {
    node.hidden = !isCombo;
  });
  document.querySelectorAll(".trio-only").forEach((node) => {
    node.hidden = !isTrio;
  });

  const minimum = type === "win" || type === "place" ? 1 : 0.5;
  betStake.min = String(minimum);
  let stake = Number(betStake.value || minimum);
  if (stake < minimum) {
    stake = minimum;
    betStake.value = String(minimum);
  }

  const selected = [Number(betHorse1.value)];
  if (isCombo) selected.push(Number(betHorse2.value));
  if (isTrio) selected.push(Number(betHorse3.value));

  const uniqueSelected = new Set(selected);
  const hasDuplicate = uniqueSelected.size !== selected.length;
  const odds = virtualOdds(type, selected);
  const possibleReturn = hasDuplicate ? 0 : stake * odds;
  const names = selected.map((index) => race.horses[index]?.[0]).filter(Boolean);
  const typeName = {
    win: "Víťaz",
    place: "Miesto",
    p2: "P2",
    p3: "P3",
  }[type];

  ticketPreview.innerHTML = `
    <h4>Ukážka tiketu</h4>
    <dl>
      <dt>Dátum</dt><dd>${eventInfo.date}</dd>
      <dt>Dostih</dt><dd>${race.name}</dd>
      <dt>Typ</dt><dd>${typeName}</dd>
      <dt>Tip</dt><dd>${names.map((name) => `${flagForHorse(name)} ${name}`).join(" → ")}</dd>
      <dt>Vklad</dt><dd>${stake.toFixed(2)} virtuálne €</dd>
      <dt>Min. vklad</dt><dd>${minimum.toFixed(2)} € podľa typu stávky</dd>
      <dt>Ilustr. kurz</dt><dd>${hasDuplicate ? "neplatná kombinácia" : odds.toFixed(2)}</dd>
      <dt>Možný návrat</dt><dd>${hasDuplicate ? "vyber rozdielne kone" : `${possibleReturn.toFixed(2)} virtuálne €`}</dd>
    </dl>
    <p class="ticket-warning">Simulácia používa archívnu štartovú listinu z 9.5.2026 a neslúži na reálne stávkovanie. Reálny tiket sa podáva iba v oficiálnej stávkovej kancelárii totalizátora a výhry sa určujú podľa skutočného poolu stávok.</p>
  `;
}

function render() {
  renderProgram();
  renderHorseTable();
}

renderRaceOptions();
renderBetRaceOptions();
renderUpcomingEvents();
renderStats(stats.jockeys, "#trainer-stats", "×");
renderStats(stats.stables, "#stable-stats", "×");
renderStats(stats.earners, "#earning-stats");
renderStats(stats.starts, "#starts-stats");
renderStats(stats.jockeys, "#jockey-stats", "×");
render();
updateBetHorses();

[search, raceFilter, sortHorses].forEach((control) => control.addEventListener("input", render));
[betRace].forEach((control) => control.addEventListener("input", updateBetHorses));
[betType, betHorse1, betHorse2, betHorse3, betStake].forEach((control) =>
  control.addEventListener("input", updateTicket),
);
