const Line = require("../database/models/sale.model.js");
//conts {} =require 


exports.getItem = (sku) => {

    return Item.findOne({ sku: sku })
} 

exports.getItems = (sku) => {

    return Item.find({})
} 
