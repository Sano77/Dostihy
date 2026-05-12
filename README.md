# Vysoka Apartments AI Assistant

Staticky prototyp chat asistenta pre hosti webu `www.vysokaapartments.com`.

## Ako spustit

Otvorte subor `index.html` v prehliadaci.

## Vlozenie do GoDaddy Website Buildera

Pre GoDaddy pouzite subor `godaddy-embed.html`. Skopirujte cely jeho obsah do HTML sekcie vo Websites + Marketing:

1. GoDaddy dashboard -> Websites + Marketing -> Manage.
2. Otvorte stranku, kde chcete asistenta zobrazit.
3. Add Section -> vyhladajte HTML -> Add.
4. Do pola Custom Code vlozte cely obsah `godaddy-embed.html`.
5. Dajte Preview a potom Publish.

GoDaddy vlastny kod vklada ako sekciu na konkretnej stranke, preto ho treba vlozit na kazdu stranku, kde sa ma asistent zobrazit.

## Co vie

- odpovedat na polohu a adresu Vysoka 20, Bratislava
- vysvetlit vybavenie apartmanov
- nasmerovat hosta na direct booking, Airbnb, Booking.com alebo telefon
- poradit atrakcie v okoli centra Bratislavy
- odpovedat slovensky aj zakladne anglicky

## Napojenie na realnu AI

Subor `assistant.js` teraz pouziva lokalnu znalostnu bazu, aby widget fungoval aj bez backendu. Pre produkciu odporucam pridat maly server endpoint, ktory:

1. prijme otazku hosta,
2. prida overenu znalostnu bazu Vysoka Apartments,
3. zavola AI model,
4. vrati odpoved bez vymyslania cien alebo dostupnosti.

Aktualne ceny a dostupnost by mal asistent vzdy overovat cez rezervacny system alebo Airbnb.
