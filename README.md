# React Tic Tac Toe Application with Vite

This project is a React application using TypeScript, set up with Vite for fast and efficient development. Follow the steps below to download, run, and test the application.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (version 6 or higher) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/zajacHubert/tic-tac-toe.git
   cd tic-tac-toe
   ```

2. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

### Running the Application

To start the development server, run:

Using npm:

```bash
npm run dev
```

Or using yarn:

```bash
yarn dev
```

The application will be available at http://localhost:5173

### Running tests

To run test, run:

Using npm:

```bash
npm test
```

Or using yarn:

```bash
yarn test
```

## Assumptions

- **Structure:** The proposed structure aims to facilitate easy expansion and editing of the application, but you can also adopt a different project structure.
- **Mechanics:** The transitions to subsequent game states are intuitive (e.g., after a reset, it could return to the "idle" state).
- **Styles:** I used global styles and reusable components, which allows for quick view editing if needed.
- **Error Handling:** Due to the simplified nature of the task, there are no specific places where errors are expected to occur. Therefore, I proposed potential handling for possible errors in the application.
- **UX:** Displaying game state information, highlighting clickable elements, and adding animations for a better user experience.
