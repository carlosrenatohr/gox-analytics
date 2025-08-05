# 📊 GOX ANALYTICS - User Behavior Analytics API 🌵

Hey! This project is an API ready to track and analyze user behavior on websites in real time. It’s designed to be super easy to install, use, and understand. Let’s get started…

---

## What does this do?❓

- Receives and stores user events (clicks, visits, etc.).
- Exposes analytics endpoints (page views, activity, cohorts).
- Ready to test and extend.

---

## Stack 🤖

- Node.js + TypeScript
- MongoDB
- Docker Compose

---

## Quick Install (Local) 🛠️

1. **Clone the repo:**

    ```bash
    git clone https://github.com/xxx/xxx.git
    cd gox-deno
    ```

2. **Spin everything up with Docker Compose:**

    > If you’ve got Docker and Docker Compose installed, just run:

    ```bash
    docker-compose up --build
    ```

    This will start up:
    - The Node.js API (port 3000)
    - MongoDB (port 27017)

~~3. **Load demo data (optional):**~~  
    ```bash
    npm run seed
    ```
    (This inserts sample data so you can play around with the endpoints and see results instantly.)

~~4. **Docs and testing:**~~  
    - Go to [http://localhost:3000/api-docs](http://localhost:3000/api-docs) to view and test the API (Swagger).
    - Or use the included Postman collection.

---

## Security :female_detective:

- You’ll need an API Key to send events or get reports.
- By default, it uses `Bearer` + token in the header as a security layer.
- Don’t share your real key if you use this in production. :p

---

## Main Endpoints :small_airplane:

- `POST /events` → Receives user events (one or multiple at a time).
- `GET /stats/page-views?from=2025-08-01&to=2025-08-04`
- ...

~~Check out [api-docs](http://localhost:3000/api-docs) or the Postman collection for all the details and examples.~~

---

## For Devs 👀

- Modular code: everything’s organized in folders by feature.
- Uses TypeScript, so if something doesn’t compile… it’s probably a type issue.
~~- Unit tests with Jest/Vitest (see `/tests`).~~  
~~- Seed script in `/scripts/seed.ts`.~~

---

## What’s next? 👋

- Ready for production if you want to build on top.
~~- You can throw together a quick UI~~ (in progress…).
- Any questions? Check the repo’s issues or just hit me up.

---

And remember—may the logs be with you! 🥲