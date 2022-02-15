const router = require("express").Router();
const multer = require("multer");
const upload = multer({filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }  /*dest: "uploads/"*/ }).single("image_url");

const {
  MyItem,
  MyItems,
  editItem,
  addItem,
  deleteItem,
} = require("../controllers/items.controller");
const { itemsList, saleList } = require("../controllers/sales.controller");
//const { deleteItem } = require("../queries/items.queries");

//multer

//module.exports = multer({storage: storage}).single('image');

//multer

router.get("/", MyItems);

//route pour permettre de rtrouver un item sellectionne
router.delete("/produit/:sku", deleteItem);

router.get("/produit/:sku", MyItem);

router.put("/:sku", upload, editItem);

router.post("/produits", upload, addItem);

module.exports = router;
