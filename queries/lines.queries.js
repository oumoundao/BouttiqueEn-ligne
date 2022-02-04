const Line = require("../database/models/line.model.js");
//conts {} =require 

exports.createLine = (sku, quantity,name, sale_price,image_url,brand) => {
    const newLine = new Line({
        sku: sku,
        quantity: quantity,
        name: name,
        price: sale_price,
        image_url: image_url,
        brand: brand,
      });

      return newLine.save();
      } 


exports.getLineUpdate = (sku,quantity) => {

    return Line.findOneAndUpdate(
        { sku: sku },
        { $inc: { quantity: quantity } },
        { runValidators: true, new: true }
      );
} 

exports.getLines = () => {

    return Line.find({});
} 

exports.deleteLines = () => {

    return Line.deleteMany({});
} 

