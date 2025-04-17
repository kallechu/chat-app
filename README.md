# Chat App 🗨️

Reaaliaikainen chat-sovellus, rakennettu MERN-stackilla (MongoDB, Express, React, Node.js) ja Socket.IO:lla. Käyttäjät voi liittyä olevassa oleviin huoneisiin,
tai luoda oman huoneen. Huoneissa voi puhua toisten kanssa reaaliaikaisesti. Käyttäjät voivat tarkastella omia huoneita, ja joko poistaa tai muuttaa nimeä.
Mongodb pyörii tällä hetkellä MONGODB:n Atlas pilvipalvelussa. .env tiedostossa on mongodb:n yhdistämislinkki, jonka tulen poistamaan sen jälkeen kun tämä on arvioitu.

## 🔧 Asennusohjeet

### 1. Kloonaa repositorio

```bash
git clone https://github.com/kallechu/chat-app.git
cd chat-app
```

### 2. Backendin käynnistys

```bash
cd backend
npm install
node server.js
```

### 3. Frontendin käynnistys

```bash
cd frontend
npm install
npm run dev
```