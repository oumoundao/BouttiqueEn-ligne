const mongoose = require("mongoose");

//notre model avec lequel on va interagir en BD
const itemSchema = mongoose.Schema({
  sku: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  sale_price: {
    type: Number,
    required: true
  },
  image_url: {
    type: String,
  },
  brand: {
    //verifier le type
    type: String,
  },
});

//item represente le nom de la collection et mongoDB v arajouter un s
module.exports = mongoose.model("item", itemSchema);
