const router = require("express").Router();

const { MyItems } = require("../controllers/items.controller");
const {itemsList,  saleList } = require("../controllers/sale.controllers");








router.get("/",MyItems );

//router.post("/close", saleList);

module.exports = router;