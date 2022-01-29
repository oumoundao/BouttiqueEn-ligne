const mongoose = require("mongoose");

//notre model avec lequel on va interagir en BD
const lineSchema = mongoose.Schema({
  sku: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
   price: {
    type: Number,
    required: true
  },
  image_url: {
    type: String,
  },
 
});

//item represente le nom de la collection et mongoDB v arajouter un s
module.exports = mongoose.model("line", lineSchema);
