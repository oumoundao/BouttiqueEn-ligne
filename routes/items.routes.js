const router = require("express").Router();

const { MyItems, editItem } = require("../controllers/items.controller");
const {itemsList,  saleList } = require("../controllers/sales.controller");








router.get("/",MyItems );

router.put("/:sku", editItem)

//router.post("/close", saleList);

module.exports = router;