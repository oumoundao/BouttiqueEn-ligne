const HTTP_PORT = 3000;

const mongoose = require('mongoose');
const express = require("express");
const app = express();
const path = require("path");
const router = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(router);

app.set("view engine", "pug");

const db = require("./database");
const Item = require("./database/models/items.model");

const fs = require("fs");


db.connect(() => {
        console.log("Yesssssss Je suis bien conneecte");
        const newItem = new Item({
          sku: "6510943",
          name: "Liz Claiborne ® Wide-Leg Linen-Blend Pants",
          description: "Be ready for whatevero",
          sale_price: 26.18,
          image_url: "http://s7d9.scene7.com/is/image/JCPenney/DP0128201617062485M.tif?hei=380&amp;wid=380&op_usm=.4,.8,0,0&resmode=sharp2&op_usm=1.5,.8,0,0&resmode=sharp",
          brand: "LIZ CLAIBORNE"
        });
        newItem.save();
      });

      db.items.insert(Item)
app.listen(HTTP_PORT, () => {
  console.log(`Serveur NodeJS démarré sur http://localhost:${HTTP_PORT}`);

  });
