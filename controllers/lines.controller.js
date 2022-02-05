const data = require("../data");

const Item = require("../database/models/item.model.js");
const Line = require("../database/models/line.model.js");
const Sale = require("../database/models/sale.model.js");
const { getItem } = require("../queries/items.queries");
const {
  updateLine,
  createLine,
  getLines,
  getLine,
} = require("../queries/lines.queries");

exports.lineList = async (req, res) => {
  const sku = req.body?.sku;
  const quantity = req.body?.quantity;

  try {
    if (sku && quantity && quantity > 0) {
      let foundItem = await getItem(sku);
      let foundLines = await getLines();
      let foundline = foundLines.find((line) => (line.sku = sku));
      //console.log(foundLines.length);
      if (foundline) {
        let updatedLine = await updateLine(sku, quantity);
        //return updatedLine;
      } else {
        createLine(
          sku,
          quantity,
          foundItem.name,
          foundItem.sale_price,
          foundItem.image_url,
          foundItem.brand
        );
        const newLine = new Line({
          sku: sku,
          quantity: quantity,
          name: foundItem.name,
          price: foundItem.sale_price,
          image_url: foundItem.image_url,
          brand: foundItem.brand,
        });

        //return newLine.save();
        }
      
    } else {
      console.log(`Le SKU et la QUANTITÉ sont obligatoires`);
    
    }
    res.redirect("/sale");
  } catch (error) {
    console.log( `Erreur lors de la sauvegarde de la ligne d'achat : ${error.message}`);
  }

  // if (sku && quantity && quantity > 0) {
  //   let foundItem;
  //   await getItem(sku)
  //     .then((item) => {
  //       //ou e ce que je met la await ici
  //       foundItem = item;
  //       if (foundItem) {
  //         return updateLine(sku, quantity);
  //       } else {
  //         throw new Error(`L'item ${sku} est introuvable`);
  //       }
  //     })
  //     .then((line) => {
  //       if (!line) {
  //         createLine(
  //           sku,
  //           quantity,
  //           foundItem.name,
  //           foundItem.sale_price,
  //           foundItem.image_url,
  //           foundItem.brand
  //         ); /*
  //           const newLine = new Line({
  //             sku: sku,
  //             quantity: quantity,
  //             name: foundItem.name,
  //             price: foundItem.sale_price,
  //             image_url: foundItem.image_url,
  //             brand: foundItem.brand,
  //           });

  //           return newLine.save();*/
  //       }
  //     })
  //     .then((line) => {
  //       res.redirect("/sale");
  //     })
  //     .catch((error) => {
  //       console.log(
  //         `Erreur lors de la sauvegarde de la ligne d'achat : ${error.message}`
  //       );
  //       res.redirect("/sale");
  //     });
  // } else {
  //   console.log(`Le SKU et la QUANTITÉ sont obligatoires`);
  //   res.redirect("/sale");
  // }
};
