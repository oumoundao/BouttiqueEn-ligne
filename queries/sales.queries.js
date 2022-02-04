//const Line = require("../database/models/sale.model.js");
const Sale = require("../database/models/sale.model.js");
//conts {} =require 

exports.createSale = (lines, subtotal, gst,qst,total) => {
    const newSale = new Sale({
        lines: lines,
        subtotal: subtotal,
        gst: gst,
        qst: qst,
        total: total,
      });

      return newSale.save();
    }

exports.getItem = (sku) => {

    return Item.findOne({ sku: sku })
} 

exports.getItems = (sku) => {

    return Item.find({})
} 
