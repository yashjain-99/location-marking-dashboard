# Personalized Location Map App

## _Save, Explore, and Share Your Favorite Locations!_

The Personalized Location Map App is a full-stack web application designed to allow users to log in, mark their favorite locations on a map, and add descriptions to each place. Each user has a personalized experience, where only their marked locations are visible upon logging in, making it easy to track and share meaningful spots.

## ✨ Features ✨

- **Personalized Map:** Each user sees only their marked locations after logging in.
- **Interactive Map:** Drop pins to mark any location on the map and add custom descriptions using **Mapbox**.
- **Login & Authentication:** Secure login and account management with **Keycloak** integration.
- **Easy Setup:** Docker-based development environment to get started quickly.

## Tech Stack

This app is built using modern technologies for a robust and scalable experience:

- [React]/[TypeScript] - A modern JavaScript library for building user interfaces.
- [Vite] - Build tool for fast development and optimized production builds.
- [Mapbox] - Map service for displaying and interacting with geospatial data.
- [Node.js] - JavaScript runtime for building the backend.
- [Docker] - Containerized deployment to ensure easy setup and consistency across environments.
- [Keycloak] - Identity and access management for user authentication.
- [PostgreSQL] - Relational database for storing location data.
- [Prisma] - ORM for easy interaction with the PostgreSQL database.
- [Nginx] - Web server used for serving and hosting the Vite app.

## Usage

Follow these steps to set up and run the app locally:

### 1. Clone the repository:
```bash
git clone https://github.com/your-username/location-map-app.git
cd location-map-app
```

### 2. Set up environment variables:
- Copy the env.example file to .env:
```bash
cp env.example .env
```
- Make any necessary adjustments in the .env file, such as your Mapbox API key, Keycloak credentials, or database settings.

### 3. Build and run the project with Docker:
```bash
docker-compose up --build
```

### 4. Access the web application:
- Visit the web app at http://localhost:5173.

### 5. Access the Keycloak Admin console:
- Visit the Keycloak admin at http://localhost:8080 to manage user authentication and settings.

## Support and Contact

If you have any questions, suggestions, or encounter any issues, feel free to reach out to me at [yashj133.yj@gmail.com]. I appreciate your feedback.

[React]: <https://reactjs.org/>
[TypeScript]: <https://www.typescriptlang.org/>
[Node.js]: <https://nodejs.org/>
[Docker]: <https://www.docker.com/>
[Keycloak]: <https://www.keycloak.org/>
[PostgreSQL]: <https://www.postgresql.org/>
[Prisma]: <https://www.prisma.io/>
[Vite]: <https://vitejs.dev/>
[Nginx]: <https://www.nginx.com/>
[Mapbox]: <https://www.mapbox.com/>
