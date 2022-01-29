const CONFIG_FILE = "./data/config.json";
const ITEMS_FILE = "./data/items.json";
const LINES_FILE = "./data/lines.json";
const SALES_FILE = "./data/sales.json";

const fs = require("fs");
const chalk = require("chalk");
const Loader = require("./loader");

const ConfigLoader = new Loader(CONFIG_FILE)
const ItemsLoader = new Loader(ITEMS_FILE);
const LinesLoader = new Loader(LINES_FILE);
const SalesLoader = new Loader(SALES_FILE, true);

exports.getConfigs = () => ConfigLoader.get();
exports.getItems = () => ItemsLoader.get();
exports.getLines = () => LinesLoader.get();
exports.getSales = () => SalesLoader.get();

//essai
exports.loadItems = () => ItemsLoader.load();

exports.addLine = (sku, quantity) => {
  const lines = this.getLines();
  const items = this.getItems();
  const Line = require("../database/models/Line.model");


  const item = items.find((item) => item.sku === sku);

  if (item) {
    let line = lines.find((line) => line.sku === sku);

    if (line) {
      line.quantity += Number(quantity);
    } else {
      line = {
        sku: sku,
        name: item.name,
        quantity: Number(quantity),
        price: item.sale_price,
        image_url: item.image_url,
      };

      lines.push(line);
    }
    //se connecter a la BD pour sauvegarder la ligne
    db.connect(() => {
      const MyLine = new Line({line});
          MyLine.save();
            })

    LinesLoader.save(lines);
    return line;
  } else {
    console.log(`Item sku #${sku} not found`);
  }
};

exports.addSale = (amount, tps, tvq, total) => {
  const lines = this.getLines();
  const Line = require("../database/models/Sale.model");
  const sale = {
    lines,
    amount: +amount,
    tps: +tps ,
    tvq: +tvq,
    total: +total,
    timestamp: new Date().getTime(),
  };
  db.connect(() => {
    const MySale = new Sale({sale});
        MySale.save();
          })
  SalesLoader.add(sale);
  LinesLoader.save([]);

  return sale;
};


