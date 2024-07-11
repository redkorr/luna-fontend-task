# Zadanie rekrutacyjne: aplikacja do zarządzania modułami IoT

Ta aplikacja frontend do [zadania rekrutacyjnego](https://gitlab.com/piotrdurniat/recruitment-luna)

## Stack

<img src='https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB'>

<img src='https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white'>

<img src='https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white'>

<img src='https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white'>

<img src='https://img.shields.io/badge/Zod-000000?style=for-the-badge&logo=zod&logoColor=3068B7'>

<img src='https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white'>

<img src='https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white'>

<img src='https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E'>

## Instalacja

```bash
git clone https://github.com/redkorr/luna-frontend-task.git
cd luna-frontend-task
npm ci
# Podczas gdy backend jest uruchomiony
npm run dev
```

Aplikacja powinna uruchomić się pod adresem: `http://localhost:5173`

## Testy

```bash
npm run test
```

## Endpointy

`/` => Strona listy modułów

`/:id` => Strona szczegołów modułów

## Zaimplementowane funkcje

- Strona listy modułów
- Strona szczegółów modułu
- Wyświetlanie aktualnej wartości temperatury
- Wyświetlanie danych historycznych temperatury
- Możliwość zmiany motywu ciemny/jasny
- Możliwość skopiowania id modułu
- Pobieranie danych historycznych modułu w plikach `.csv`
- Obsługa błędów i pustych stanów
- Możliwość ukrywania kolumn w liście modułów
- Filtrowanie listy modułów po nazwie
- Dodawanie modułów z poziomu listy
- Inny layout dla mobilnej listy modułów

## Potencjalne usprawnienia

- Dodanie state managera by uniknąć `prop drilling`

## Widoki aplikacji

### Desktop

![desktop-1](./public/screenshots/desktop-1.png)

![desktop-2](./public/screenshots/desktop-2.png)

![desktop-3](./public/screenshots/desktop-3.png)

![desktop-4](./public/screenshots/desktop-4.png)

![desktop-5](./public/screenshots/desktop-5.png)

### Mobile

![mobile-1](./public/screenshots/mobile-1.png)

![mobile-2](./public/screenshots/mobile-2.png)

![mobile-3](./public/screenshots/mobile-3.png)

![mobile-4](./public/screenshots/mobile-4.png)

![mobile-5](./public/screenshots/mobile-5.png)
