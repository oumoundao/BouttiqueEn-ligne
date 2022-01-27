const mongoose =require("mongoose")

const itemschema = mongoose.Schema({
    sku: {
        type: Number,
        unique: true, 
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    sale_price: {
        type: Number,
        required: true,
        },
    image_url: {
            type: String,
            required: true,
            },
    brand: {
        //verifier le type
        type: String,
        required: true,
                }
    })
    module.exports = mongoose.model('Item', itemschema);
    