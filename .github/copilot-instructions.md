# Copilot Instructions for sochma_frontend

## Overview
This is a Vue 3 + Vite project for the Sochma frontend. The codebase is organized for modularity and scalability, with clear separation of views, components, stores, and language files. The main entry point is `src/main.js`, and the root component is `src/components/App.vue`.

## Architecture & Structure
- **Components**: Located in `src/components/`, grouped by feature (e.g., `Auth`, `Deals`, `Header`).
- **Views**: Page-level components in `src/views/`, further organized by domain (e.g., `Dashboard/Home/HomeView.vue`).
- **State Management**: Vuex store modules in `src/stores/modules/` (e.g., `deal.js`, `user.js`). The store is assembled in `src/stores/index.js`.
- **Routing**: Managed in `src/router/index.js`.
- **Localization**: Language files in `src/lang/{en,ru,uz}/` as JSON. Use these for i18n.
- **Assets**: Static files in `src/assets/` and `public/`.

## Developer Workflows
- **Install dependencies**: `npm install`
- **Start dev server**: `npm run dev`
- **Build for production**: `npm run build`
- **Hot reload**: Supported via Vite during development.
- **Recommended IDE**: VSCode with Volar extension (disable Vetur).

## Patterns & Conventions
- **Component Organization**: Feature folders (e.g., `Auth`, `Deals`) contain both views and subcomponents. Prefer local registration for feature-specific components.
- **Vuex Modules**: Each domain (e.g., `deal`, `user`) has its own store module. Mutations and actions are split by domain.
- **Routing**: Use nested routes for dashboard sections. Route definitions are in `src/router/index.js`.
- **Localization**: Use language JSON files for all user-facing text. Reference keys, not hardcoded strings.
- **Styling**: Tailwind CSS is configured via `tailwind.config.js` and used throughout components. Global styles in `src/index.css`.
- **API Integration**: API abstractions are expected in `src/api/` (not present in current structure, but referenced in README).

## Integration Points
- **External Dependencies**: Vite, Vue 3, Vuex, Tailwind CSS. See `package.json` for full list.
- **Language Switcher**: Implemented in `src/components/Header/LanguageSwitcher.vue`.
- **Menu & Navigation**: See `src/components/Header/LeftMenuView.vue` and dashboard views.

## Examples
- To add a new dashboard view, create a Vue file in `src/views/Dashboard/{Section}/` and register the route in `src/router/index.js`.
- To add a new language, create a JSON file in `src/lang/` and update the language switcher logic.
- To add a new Vuex module, create it in `src/stores/modules/` and import it in `src/stores/index.js`.

## Special Notes
- The README structure diagram may be outdated; always check the actual folder structure.
- Some referenced folders (e.g., `src/api/`, `src/store/`) may differ from current structure; adapt instructions as needed.

---

If any section is unclear or missing important project-specific details, please provide feedback to improve these instructions.