const data = require("../data");

const Item = require("../database/models/item.model.js");
const Line = require("../database/models/line.model.js");
const Sale = require("../database/models/sale.model.js");
const { getItem } = require("../queries/items.queries");
const { getLineUpdate } = require("../queries/lines.queries");


  exports.lineList=   (req, res) => {
    const sku = req.body?.sku;
    const quantity = req.body?.quantity;
  
    if (sku && quantity && quantity > 0) {
      let foundItem;
      getItem(sku)
        .then(item => { //ou e ce que je met la await ici
          foundItem = item;
          if (foundItem) {
            return getLineUpdate(sku,quantity)
          } else {
            throw new Error(`L'item ${sku} est introuvable`);
          }
        })
        .then(line => {
          if (!line) {
            const newLine = new Line({
              sku: sku,
              quantity: quantity,
              name: foundItem.name,
              price: foundItem.sale_price,
              image_url: foundItem.image_url,
              brand: foundItem.brand,
            });
  
            return newLine.save();
          }
        })
        .then(line => {
          res.redirect("/sale");
        })
        .catch(error => {
          console.log(`Erreur lors de la sauvegarde de la ligne d'achat : ${error.message}`);
          res.redirect("/sale");
        });
    } else {
      console.log(`Le SKU et la QUANTITÉ sont obligatoires`);
      res.redirect("/sale");
    }
  }