# 002 Assignment Demo

This project is a **React** application bootstrapped with **Vite**, featuring ESLint configuration, Fast Refresh, and PostgreSQL database integration using Docker.

---

## Table of Contents

- [Technologies Used](#technologies-used)  
- [Installation](#installation)  
- [Available Scripts](#available-scripts)  
- [Database](#database)  
- [ESLint](#eslint)  

---

## Technologies Used

### Frontend
- **React** `^19.1.1`  
- **React DOM** `^19.1.1`  
- **Vite** `^7.1.7`  
- **@vitejs/plugin-react** `^5.0.4` (for Fast Refresh)

### Backend / Database
- **PostgreSQL** (`pg` `^8.16.3`)  
- **Docker** `^0.2.14`  

### Development Tools
- **ESLint** `^9.36.0`  
- **@eslint/js** `^9.36.0`  
- **eslint-plugin-react-hooks** `^5.2.0`  
- **eslint-plugin-react-refresh** `^0.4.22`  
- **@types/react** `^19.1.16`  
- **@types/react-dom** `^19.1.9`  
- **globals** `^16.4.0`  

---

## Installation

1. Clone the repository:  
   ```bash
   git clone https://stugit.cmp.uea.ac.uk/prg23hxu/002-Assignment-demo
   cd 002-assignment-demo

2. Install dependencies:
    ```bash
    npm i
    ```
    or
    ```bash
    npm install
    ```
## Available Scripts

1. Run the React App:
    ```bash
    npm run dev
    ```
2. Start / Rebuild PostgreSQL via Docker:
    ```bash
    npm run db
    ```

This command will:
Stop any running containers (docker-compose down)
Build and start containers in detached mode (docker-compose up --build -d)
Make sure you have a docker-compose.yml configured for PostgreSQL.