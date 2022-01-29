//on va importer notre modele
const Item =require("../database/models/Items.model")
const Line = require("./database/models/Line.model");
const router = require("express").Router();

const data = require("../data");
let error = null

router.get("/", (req, res) => {
  const configs = data.getConfigs()
  const items = data.getItems()
  items.sort((a, b) => a.name.localeCompare(b.name))
  const lines = data.getLines()
  console.log("ERROR", error);
  res.render("sale", { configs: configs, items: items, lines: lines, error: error});
  error = null
});

router.post("/", (req, res) => {
//mettre les donnee du fichier lines dans un objet JS
  const line =JSON.parse(fs.readFileSync("data/lines.json", 'utf-8'))
//Mettre l"objet JS a la BD
//Au lieu de le mettre un par un on peut le mettre d'un seul cout avec MyLine.create sans boucle
db.connect(() => {
  
    const MyLine = new Line({
      sku: line.sku,
      name: line.name,
      quantity: line.quantity,
      price: line.sale_price,
      image_url: line.image_url,
      
    });
    MyLine.save();
      
    })

  console.log(req.body);
  const sku = req.body?.sku
  const quantity = req.body?.quantity
  if(sku && quantity && quantity > 0) {
    data.addLine(req.body.sku, req.body.quantity)
  } else {
    error = "Must get sku AND quantity to add Product"
    console.log(error)
  }

  res.redirect("/sale")
  
});

router.post("/close", (req, res) => {
  //TODO: Sauvegarder la vente ICI
  console.log("CLOSE", req.body)
  const { amount, tps, tvq, total } = req.body
  //mettre les formule ici
  const sale = data.addSale( amount, tps, tvq, total )

  res.redirect("/sale")
})

module.exports = router