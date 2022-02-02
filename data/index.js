const CONFIG_FILE = "./data/config.json";
const ITEMS_FILE = "./data/items.json";
const LINES_FILE = "./data/lines.json";
const SALES_FILE = "./data/sales.json";
const db = require("../database");
const fs = require("fs");
const chalk = require("chalk");
const Loader = require("./loader");

const Item = require("../database/models/Items.model");
const Line = require("../database/models/Line.model");
const Sale = require("../database/models/Sale.model");

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

exports.addLine = (Sku, quantity) => {
  const lines = Line.find();
  const items = Item.find( ) 



  // const item = items.find((item) => item.sku === sku);

  // if (item) {
  //   let line = lines.find((line) => line.sku === sku);

  //   if (line) {
  //     line.quantity += Number(quantity);
  //   } else {
  //     line = {
  //       sku: sku,
  //       name: item.name,
  //       quantity: Number(quantity),
  //       price: item.sale_price,
  //       image_url: item.image_url,
  //     };

  //     lines.push(line);
  //   }
    //se connecter a la BD pour sauvegarder la ligne
    db.connect(() => {
 //trouve dans la collection la ligne dont le sku egal au sku donne en parametre
 let item = items.find( { sku: Sku } ) 
     

  if (item) {
    let line = lines.find((line) => line.sku === Sku);

    if (line) {
      line.quantity += Number(quantity);
    } else {
      line = {
        sku: Sku,
        name: item.name,
        quantity: Number(quantity),
        price: item.sale_price,
        image_url: item.image_url,
      };

      lines.push(line);
    }
      //trouve la ligne dont le sku egal au sku donne en parametre
      
      const MyLine = new Line({line});
      //db.line.insertOn({MyLine}) 
      MyLine.save()  
           // }
console.log(line);
    
    return line;

  } else {
    console.log(`Item sku #${sku} not found`);
  };
})
}
exports.addSale = (amount, tps, tvq, total) => {
  //const lines = this.getLines();
  const lines =  line.find( ) 
 
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
  //SalesLoader.add(sale);
 // LinesLoader.save([]);

  return sale;
}
