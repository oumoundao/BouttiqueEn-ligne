//on va y metre toute les methodes qui sont relative au sales et donc c depuis les methode qui vont etre present dans ce fichier qu'on va retourner une reponse au client

const data = require("../data");

const Item = require("../database/models/item.model.js");
const Line = require("../database/models/line.model.js");
const Sale = require("../database/models/sale.model.js");
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
    const lines = await getLines();
    const items = await getItems();
    //console.log(items[0]);
    //items = items.length ? items.collation({ locale: "fr_CA" }).sort({ name: 1 }) : items;

    //operation ternaire
    // items = items/*.collation({ locale: "fr_CA" })*/.sort({ name: 1 });

    const results = getResults(lines);
    res.render("sale", {
      configs: getConfigs(),
      items: items,
      lines: lines,
      results: results,
    });
  } catch (error) {
    console.log(error);
  }
  //const linePromise = getLines();
  //const itemPromise = getItems()
  //   .collation({ locale: "fr_CA" })
  //   .sort({ name: 1 });
  //   await Promise.all([linePromise, itemPromise])
  //   .then(([lines, items]) => {
  //     const results = getResults(lines);
  //     res.render("sale", {
  //       configs: getConfigs(),
  //       items: items,
  //       lines: lines,
  //       results: results,
  //     });
  //   })
  //   .catch((error) => console.log(error));
};

exports.saleList = async (req, res) => {
  await getLines()
    .then((lines) => {
      const results = getResults(lines);
      createSale(
        lines,
        results.subtotal,
        results.gst,
        results.qst,
        results.total
      );
      // const newSale = new Sale({
      //   lines: lines,
      //   subtotal: results.subtotal,
      //   gst: results.gst,
      //   qst: results.qst,
      //   total: results.total,
      // });

      // return newSale.save();
    })
    .then(() => {
      return deleteLines();
    })
    .then(() => {
      res.redirect("/sale");
    })
    .catch((error) => console.log(error));
};
