const Item = require("../database/models/item.model.js");

exports.getItem = (sku) => {
  return Item.findOne({ sku: sku });
};

exports.getItems = () => {
  return Item.find({}).collation({ locale: "fr_CA" }).sort({ name: 1 });;
};
