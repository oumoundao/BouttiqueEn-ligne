const fs = require("fs");
const mongoose = require("mongoose");
const db = require("./database");
const Item = require("./database/models/Items.model");

//fonction pour faire migrer tous les items du fichier items.json dans le database
//Lire le fichier JSON et le mettre dans un Objet JS
const items = JSON.parse(fs.readFileSync("data/items.json", "utf-8"));

//parcourir tous le fichier avec juste les informmations pertinent defini dans item.model avec une boucle

//fonction d'importation

db.connect(() => {
  for (let i in items) {
    const item = items[i];
    const MyItem = new Item({
      sku: item.sku,
      name: item.name,
      description: item.description,
      sale_price: item.sale_price,
      image_url: item.image_url,
      brand: item.brand,
    });
    MyItem.save();
    console.log(`${i} - ${item.sku} ajoute`);
  }
  //je declare un tableau vide
  //const tab =[]

  //     //on parcours les items pour les mettre dams le tableau
  //
  //       {
  //       tab.push(Item)
  //       console.log("item Ajoute");
  //   }
  //     //puis on met le tableau dans mongodb0c
  //   tab.save();
});
