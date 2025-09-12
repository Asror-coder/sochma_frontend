
# Sochma Frontend

Welcome to the Sochma frontend! This is a Vue 3 + Vite project for a modular, scalable web application. This guide will help you get started quickly and understand the project's structure and workflows.

## What is this project?
This is the frontend for Sochma, built with Vue 3, Vite, Vuex, and Tailwind CSS. It provides a dashboard, authentication, deal management, and multi-language support.

## Key Features
- Modular feature-based architecture (Auth, Deals, Calculator, Dashboard, etc.)
- Vuex for state management (see `src/stores/`)
- Routing via Vue Router (see `src/router/index.js`)
- Internationalization (i18n) with JSON language files (`src/lang/`)
- Tailwind CSS for styling

## Project Structure

```
src/
  main.js                # App entry point
  components/            # Feature components (Auth, Deals, Header, etc.)
  views/                 # Page-level views (Dashboard, Auth, etc.)
  stores/                # Vuex store modules
  router/                # Route definitions
  lang/                  # i18n language files (en, ru, uz)
  assets/                # Static assets
public/                  # Public files (favicon, etc.)
index.html               # Main HTML file
tailwind.config.js       # Tailwind CSS config
vite.config.js           # Vite config
```

## Getting Started
1. **Install dependencies:**
    ```sh
    npm install
    ```
2. **Start development server:**
    ```sh
    npm run dev
    ```
3. **Build for production:**
    ```sh
    npm run build
    ```

## Recommended IDE Setup
- Use [VSCode](https://code.visualstudio.com/) with the [Volar extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (disable Vetur).

## Customization & Configuration
- See [Vite Configuration Reference](https://vitejs.dev/config/).
- Tailwind CSS is configured in `tailwind.config.js`.

## Conventions & Patterns
- **Feature folders:** Components and views are grouped by feature for maintainability.
- **Vuex modules:** Each domain (e.g., deals, user) has its own store module in `src/stores/modules/`.
- **Language support:** Add new languages by creating a JSON file in `src/lang/` and updating the language switcher.
- **Routing:** Add new views and register them in `src/router/index.js`.

## Useful Links
- [Vite Documentation](https://vitejs.dev/)
- [Vue 3 Documentation](https://vuejs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

---

If you have questions or need help, check `.github/copilot-instructions.md` for AI agent guidance or open an issue.