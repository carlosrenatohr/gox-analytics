# 📊 User Behavior Analytics API

# GOX ANALYTICS DEMO :chart_with_upwards_trend:chart 🌵

Hey, este proyecto es una API lista para trackear y analizar el comportamiento de usuarios en sitios web en tiempo real. Pensado para ser simple de instalar, usar y entender. Empecemos..

---

##  ¿Qué hace esto?❓

- Recibe y almacena eventos de usuarios (clics, visitas, etc).
- Expone endpoints de analytics (page views, actividad, cohortes).
- Listo para probar y extender.

---

## Stack 🤖

- Node.js + TypeScript
- MongoDB
- Docker Compose

---

##  Instalación rápida (local) 🛠️

1. **Cloná el repo:**

    ```bash
    git clone https://github.com/xxx/xxx.git
    cd gox-deno
    ```

2. **Levantá todo con Docker Compose:**

    > Si tenés Docker y Docker Compose instalado, solo corré:

    ```bash
    docker-compose up --build
    ```

    Esto va a levantar:
    - La API en Node.js (puerto 3000)
    - MongoDB (puerto 27017)

~~3. **Carga de datos demo (opcional):**~~
    ```bash
    npm run seed
    ```
    (Esto inserta datos de ejemplo para que puedas jugar con los endpoints y ver resultados al toque).

~~4. **Docs y pruebas:**~~
    - Entra a [http://localhost:3000/api-docs](http://localhost:3000/api-docs) para ver y probar la API (Swagger).
    - O usa el archivo Postman incluido.

---

##  Seguridad :female_detective:

- Necesitás una API Key para enviar eventos o consultar reportes.
- Por defecto, se usa `Bearer` + token  en el header como layer de seguridad.
- No compartas tu key real si usás esto en producción. :p

---

##  Endpoints principales :small_airplane:

- `POST /events` → Recibe eventos de usuario (uno o varios a la vez).
- `GET /stats/page-views?from=2025-08-01&to=2025-08-04`
- ...

~~Mirá [api-docs](http://localhost:3000/api-docs) o el Postman para todos los detalles y ejemplos.~~

---

##  Para devs 👀

- Código modular: todo está organizado en carpetas por feature.
- Usa TypeScript, así que si algo no compila... es por tipos.
~~- Pruebas unitarias con Jest/Vitest (ver `/tests`).~~
~~- Seed script en `/scripts/seed.ts`.~~

---


## ¿Y ahora qué? 👋

- Listo para producción si querés extender.
~~- Podés montar un UI rápido~~ (in progress..).
- Cualquier duda, chequeá los issues del repo o escribime. 

---

¡Y ya sabes, que los logs te acompañen! 🥲
