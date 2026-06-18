# Klondike Clone

A browser-based implementation of Klondike Solitaire built with React and TypeScript.

## Project overview

- Play Klondike (classic solitaire) in the browser.
- Game logic and rules are implemented in `src/engine`.
- UI components live in `src/ui/components` and the app entry is `src/main.tsx`.

## Tech stack

- Vite (dev server & build)
- React 19
- TypeScript
- ESLint & Prettier for linting/formatting

## Project structure (important folders)

- `src/engine` — core game logic, rules, and move handling
- `src/ui/components` — React components for cards, piles, and UI
- `src/hooks` — custom hooks (e.g. `useGame`)
- `public` — static assets served by Vite

## Prerequisites

- Node.js (16+ recommended)
- npm (or use a compatible package manager)

## Install & run

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview a production build locally:

```bash
npm run preview
```

Run linting and formatting:

```bash
npm run lint
npm run format
```

## Where to look first

- App entry: `src/main.tsx`
- Core rules: `src/engine/rules`
- Move implementations: `src/engine/moves`

---
