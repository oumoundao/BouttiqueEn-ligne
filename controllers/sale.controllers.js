const data = require("../data");

// const Item = require("../database/models/item.model.js");
// const Line = require("../database/models/line.model.js");
// const Sale = require("../database/models/sale.model.js");
const { getItems } = require("../queries/items.queries");
const { getLines, deleteLines } = require("../queries/lines.queries");
const { createSale } = require("../queries/sales.queries");

function getConfigs() {
  var configs;
  if (!configs) configs = data.getConfigs();
  return configs;
}

function getResults(lines) {
  const subtotal = +lines
    .reduce((acc, line) => {
      return acc + line.total;
    }, 0)
    .toFixed(2);
  const gst = +(subtotal * getConfigs().taxes.gst).toFixed(2);
  const qst = +(subtotal * getConfigs().taxes.qst).toFixed(2);
  const total = +(subtotal + gst + qst).toFixed(2);

  return { subtotal, gst, qst, total };
}

exports.itemsList = async (req, res) => {
  try {
 
const [itemPromise,linePromise] = await Promise.all([getItems(),getLines()])
    const results = getResults(linePromise);
    res.render("sale", {
      configs: getConfigs(),
      items: itemPromise,
      lines: linePromise,
      results: results,
    });
  } catch (error) {
    console.log(error);
  }

};

exports.saleList = async (req, res) => {
  try {
    const lines = await getLines();

    const results = getResults(lines);
    await createSale(
      lines,
      results.subtotal,
      results.gst,
      results.qst,
      results.total
    );

await deleteLines()

res.redirect("/sale");
  } catch (error) {
    console.log(error);
   res.redirect("/sale");
  }

  };
