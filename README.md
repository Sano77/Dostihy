# Dostihy

Staticky webovy prehlad dostihoveho dna v Bratislave/Petrzalke.

Projekt obsahuje program, startovu listinu, kone, jazdcov, stajne, navstevnicke informacie, zaklady stavkovania a jednoduchu virtualnu simulaciu tiketu.

## Ako spustit lokalne

Otvorte subor `index.html` v prehliadaci.

Alternativne mozete spustit jednoduchy lokalny server:

```bash
python3 -m http.server 4173
```

Potom otvorte:

```text
http://localhost:4173/
```

## Subory

- `index.html` - struktura stranky
- `styles.css` - vizual, layout a responzivne zobrazenie
- `assistant.js` - data programu, filtrovanie, statistiky a simulacia stavkovania
- `godaddy-embed.html` - samostatny HTML embed variant, ak bude treba vlozit stranku do buildera

## Obsah stranky

- program dostihoveho dna 9.5.2026
- startujuce kone a vlajky krajin
- jazdci, stajne, hmotnosti a casy dostihov
- statistiky startovej listiny
- informacie o Dostihovej drahe v Petrzalke
- vstupne, doprava a parkovanie
- vysvetlenie totalizatora a druhov stavok
- virtualna simulacia stavkovania bez realnych penazi

## Publikovanie cez GitHub Pages

Po nahrati suborov do repozitara zapnite GitHub Pages:

1. Otvorte repozitar na GitHube.
2. Prejdite do `Settings`.
3. Otvorte `Pages`.
4. V casti `Build and deployment` nastavte `Deploy from a branch`.
5. Vyberte branch `main` a folder `/root`.
6. Ulozte nastavenie.

Verejna adresa bude v tvare:

```text
https://sano77.github.io/Dostihy/
```

## Zdroj dat

Data su spracovane z verejnych informacii portalu `zavodisko.sk`, najma z terminov dostihov, propozicii, startovych listin a vysledkov pre Bratislavu 9.5.2026.
