const Item = require("../database/models/item.model.js");
//conts {} =require 


exports.getItem = async (sku) => {

    return Item.findOne({ sku: sku })
} 

exports.getItems = async (sku) => {

    return Item.find({})
} 



