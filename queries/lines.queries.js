const Line = require("../database/models/line.model.js");
//conts {} =require 


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

