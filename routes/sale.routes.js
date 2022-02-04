const router = require("express").Router();

const {itemsList,  saleList } = require("../controllers/sale.controllers");
const data = require("../data");
//on aura plus besoin d'impoter les model car on va plus les impoter d'ici
//const Item = require("../database/models/item.model.js");
//const Line = require("../database/models/line.model.js");
//const Sale = require("../database/models/sale.model.js");



//router.get("/",itemsList );//est ce que c pas plutot itemsList


router.get("/",itemsList );

router.post("/close", saleList);

module.exports = router;
