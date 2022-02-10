//const data = require("../data");

// const Item = require("../database/models/item.model.js");
// const Line = require("../database/models/line.model.js");
// const Sale = require("../database/models/sale.model.js");
const { getItem } = require("../queries/items.queries");
const { updateLine, createLine } = require("../queries/lines.queries");

exports.lineList = async (req, res) => {
  const sku = req.body?.sku;
  const quantity = req.body?.quantity;
  try {
    let foundItem = await getItem(sku);
//console.log(foundItem);
    if (foundItem) {
      let updatedLine = await updateLine(sku, quantity);

      if (!updatedLine) {
        await createLine(
          sku,
          quantity,
          foundItem.name,
          foundItem.sale_price,
          foundItem.image_url,
          foundItem.brand
        );
      }
      res.redirect("/sale");
    } else {
      throw new Error(`L'item ${sku} est introuvable`);
    }
  } catch (error) {
    console.log(error);
  }
};
