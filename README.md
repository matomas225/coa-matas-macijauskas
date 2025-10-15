# Soundify

Soundify is a modern music player application built with React and TypeScript. It provides a platform for users to manage their playlists, play music, and enjoy a seamless audio experience. This project is designed to be a scalable and robust music application, leveraging a powerful tech stack to deliver high performance and a rich user interface.

## Features

- **User Authentication**: Secure login and registration system.
- **Playlist Management**: Create, update, and delete playlists.
- **Music Playback**: A fully functional audio player with controls for play, pause, skip, and volume adjustment.
- **Song Management**: Upload, edit, and organize songs within albums.
- **Album Organization**: Group songs into albums for better organization.
- **Responsive Design**: A mobile-first design that ensures a great user experience across all devices.

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Redux, React Router
- **Styling**: SCSS, Sass
- **Testing**: Vitest, React Testing Library
- **Linting**: ESLint, Prettier
- **Internationalization**: i18next
- **Backend**: Node.js, Express, MongoDB, JWT

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/matomas225/coa-matas-macijauskas.git
   ```

2. Install NPM packages

   ```sh
   npm install
   ```

### Running the Application

To run the application in development mode, use the following command:

```sh
npm run dev
```

This will start the development server, and you can view the application at `http://localhost:5173`.

## Available Scripts

- `npm run dev`: Runs the app in the development mode.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run preview`: Serves the production build locally for preview.
- `npm run test`: Launches the test runner in the interactive watch mode.
- `npm run coverage`: Generates a test coverage report.
- `npm run lint`: Lints the codebase using ESLint.

## Testing

This project uses Vitest and React Testing Library for testing. To run the tests, use the following command:

```sh
npm run test
```

To generate a test coverage report, run:

```sh
npm run coverage
```

## Project Structure

The project follows a standard React project structure, with all the source code located in the `src` directory.

```
/src
|-- assets
|-- components
|-- hooks
|-- locales
|-- pages
|-- services
|-- state
|-- styles
|-- utils
```

- **`assets`**: Contains static assets like images, fonts, etc.
- **`components`**: Contains reusable React components.
- **`hooks`**: Contains custom React hooks.
- **`locales`**: Contains translation files for internationalization.
- **`pages`**: Contains the main pages of the application.
- **`services`**: Contains API-related services.
- **`state`**: Contains Redux store and slice definitions.
- **`styles`**: Contains global styles, variables, and mixins.
- **`utils`**: Contains utility functions.

