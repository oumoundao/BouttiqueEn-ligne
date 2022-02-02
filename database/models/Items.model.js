const mongoose = require("mongoose");

//notre model avec lequel on va interagir en BD
const itemSchema = mongoose.Schema({
  sku: {
    type: String,
    unique: true,
    required: true,
    minLength:[7, "{Value} must have exactly 7 characters"] 
  },
  name: {
    type: String,
    required: true,
    maxLength: 125
  },
  description: {
    type: String,
     maxLength: 3000
  },
  sale_price: {
    type: Number,
    required: true,
    minimum: 0
  },
  image_url: {
    type: String,
  },
  brand: {
    //verifier le type
    type: String,
    minLength: 2,
    maxLength: 30
  },
});

//item represente le nom de la collection et mongoDB v arajouter un s
module.exports = mongoose.model("item", itemSchema);
