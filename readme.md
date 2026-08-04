# GLB 3D Model Viewer

An interactive web application for viewing and exploring GLB (GL Transmission Format Binary) 3D models directly in your browser. Load GLB files, inspect models in real time, customize the background color, adjust scene lighting, and navigate the scene with smooth camera controls—all powered by Vite for a fast development experience.

## Live Demo

🚀 View the live application:

**[GLB 3d Model Viewer Live](https://akarshit-1609.github.io/glb-3d-viewer/)**

## Prerequisites

Make sure you have the following installed:

- Node.js (LTS version recommended)
- npm

or

- Docker (If you want using `Dockerfile`)


## Features

- 🎮 Interactive 3D scene viewer
- 🎨 Change the background color
- 💡 Adjust scene lighting
- ⚡ Fast development powered by Vite
- 🔄 Hot Module Replacement (HMR) for instant updates during development
- 📱 Responsive interface

---

## Getting the Project

### Option 1: Clone the Repository

```bash
git clone https://github.com/akarshit-1609/glb-3d-viewer.git
cd glb-3d-viewer
```

### Option 2: Download ZIP

1. Download the project as a ZIP file.
2. Extract the ZIP archive.
3. Open a terminal in the extracted project folder.

---

## Running the Application with Node.js

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

The application will be available at:

**http://localhost:5173/glb-3d-viewer/**

---

## Running the Application with Docker

Follow the steps below to build and run the application using Docker.

### Build the Docker Image

```bash
docker build -t glb-3d-viewer .
```

### Run the Container

```bash
docker run -d --rm --name glb-3d-viewer -p 5173:5173 glb-3d-viewer
```

### Open the Application

Open your browser and navigate to:

 - **http://localhost:5173/glb-3d-viewer/**

### Stop the Container

When you're finished, stop the running container:

```bash
docker stop glb-3d-viewer
```

Since the container was started with the `--rm` option, it will be removed automatically after it stops.

Any changes you make to the source code will automatically reload in the browser thanks to Vite's Hot Module Replacement (HMR).

---

## Build for Production (Node.js)

```bash
npm run build
```

## Preview the Production Build

```bash
npm run preview
```


---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
