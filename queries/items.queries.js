const Item = require("../database/models/item.model.js");
//conts {} =require 


exports.getItem = (sku) => {

    return Item.findOne({ sku: sku })
} 

exports.getItems = (sku) => {

    return Item.find({})
} 



