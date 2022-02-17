const {
  MyItem,
  MyItems,
  editItem,
  addItem,
  deleteItem,
} = require("../controllers/items.controller");
const { itemsList, saleList } = require("../controllers/sales.controller");
const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" }).single("image_url");
const { v4: uuidv4 } = require("uuid");
/*const upload = multer({storage: storage}).single('image');{
  filename: function (req, file, cb) {
    debugger;
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  } /*dest: "uploads/"
}*/

// const MIME_TYPES = {
//   "image/jpg": "jpg",
//   "image/jpeg": "jpg",
//   "image/png": "png",
// };
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "images");
//   },
//   filename: (req, file, callback) => {
//     const name = file.originalname.split(" ").join("_");
//     const extension = MIME_TYPES[file.mimetype];
//     callback(null, name + uuidv4().split("-")[0] + "." + extension);
//   },
// });
//const upload = multer({ storage: storage }).single("image_url");

//const { deleteItem } = require("../queries/items.queries");

//module.exports = multer({storage: storage}).single('image');

//multer

router.get("/", MyItems);

//route pour permettre de rtrouver un item sellectionne
router.delete("/:sku", deleteItem);

router.get("/:sku", MyItem);

router.put("/:sku", upload, editItem);

router.post("/", upload, addItem);

module.exports = router;
