//const Line = require("../database/models/sale.model.js");
const Sale = require("../database/models/sale.model.js");
//conts {} =require 

exports.createSale = async (lines, subtotal, gst,qst,total) => {
    const newSale = new Sale({
        lines: lines,
        subtotal: subtotal,
        gst: gst,
        qst: qst,
        total: total,
      });

      return newSale.save();
    }

exports.getItem = async (sku) => {

    return Item.findOne({ sku: sku })
} 

exports.getItems = async (sku) => {

    return Item.find({})
} 
