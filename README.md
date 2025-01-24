# eastNetic-task

This template should help get you started developing with Vue 3 in Vite.

# People Table Component

This project is a dynamic and interactive Vue.js table to display and manage user data. It features drag-and-drop row reordering, checkbox selection, a timer for task completion, and unit tests to ensure robust functionality.

---

## Features

- **Dynamic Row Generation**: Rows are created based on the `count` prop.
- **Drag and Drop**: Easily rearrange rows.
- **Checkbox Selection**: Enable or disable specific rows for interaction.
- **Timer**: A countdown timer starts when rows are generated, stopping upon task completion.
- **Success Notification**: Alerts the user when rows are arranged in descending order of the `potatoes` column.
- **Unit Tests**: Validates key functionalities, including drag-and-drop and checkbox logic.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Vue CLI** (optional, for local development)

---

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
