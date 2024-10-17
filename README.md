# Tensorflowjs + React + React Three Fiber

This is a fun project that integrates TensorFlow.js for pose detection with a React application using React Three Fiber for 3D rendering.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Scripts](#scripts)

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

To start the development server, run:
```sh
npm run dev
```
This will start the Vite development server and you can view the application in your browser at http://localhost:3000.

## Project Structure
- src/App.tsx: Main application component.
- src/components/Model.tsx: 3D model component using React Three Fiber.
- src/components/Video.tsx: Video component for displaying the camera feed.
- src/util/usePoseDetection.ts: Custom hook for pose detection using TensorFlow.js.
- src/util/video.ts: Utility functions for handling video input devices.