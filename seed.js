const fs = require("fs");
const mongoose = require('mongoose');
const db = require("./database");
const Item = require("./database/models/items.model");

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
//fonction pour faire migrer tous les items du fichier items.json dans le database
//Lire le fichier JSON
const items =JSON.parse(fs.readfilesSync(`${__dirname}/_data/items.json`, 'utf-8'))

//parcourir tous le fichier avec juste les informmations pertinent defini dans item.model avec une boucle


//fonction d'importation
const Migrate =  () => {
       // each item in items
        newItem.save();
      

}

//mongoimport –jsonArray –db nom_base_de_données –collection nom_collection –fichier emplacement_fichier
//mongoimport --db dbName --collection collectionName --file fileName.json --jsonArray
//mongoimport --db dbName --collection collectionName --file fileName.json