const mongoose = require("mongoose");

//notre model avec lequel on va interagir en BD
const saleSchema = mongoose.Schema({
line:{
    type: String,/* represente lesligne d'achat*/
},
  amount : {
    type: Number,
    required: true
  },
  tps: { 
    type:Number,
    required: true
  },
  tvq: {
    type: Number,
    required: true
  },
   total: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  },
 
});

//item represente le nom de la collection et mongoDB v arajouter un s
module.exports = mongoose.model("sale", saleSchema);