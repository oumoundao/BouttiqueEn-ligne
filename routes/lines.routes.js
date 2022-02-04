const router = require("express").Router();

const { itemsList, lineList } = require("../controllers/lines.controller");
//const data = require("../data");
//on aura plus besoin d'impoter les model car on va plus les impoter d'ici
//const Item = require("../database/models/item.model.js");
//const Line = require("../database/models/line.model.js");
//const Sale = require("../database/models/sale.model.js");

//est ce que c pas plutot itemsList

router.post("/", lineList);

module.exports = router;
