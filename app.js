const HTTP_PORT = 3000;

const express = require("express");
const app = express();
const db = require("./database");
const path = require("path");
const router = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(router);

app.set("view engine", "pug");

db.connect(() => {
  app.listen(HTTP_PORT, () => {
    console.log(`Serveur NodeJS démarré sur http://localhost:${HTTP_PORT}`);
  });
});
