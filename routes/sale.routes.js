//on va importer notre modele
const Item =require("../database/models/Items.model")
const Line = require("../database/models/Line.model");
const db = require("../database");
const router = require("express").Router();
const fs = require("fs");
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
//61f488cfffcb4821176dfe5f

// router.get("/:id",(req, res) => {
//   const item =Item.findById({61f488cfffcb4821176dfe5f}) 
//   line=req.params.id
// } )


router.post("/", (req, res) => {
//mettre les donnee du fichier lines dans un objet JS
  //const line =JSON.parse(fs.readFileSync("../data/lines.json", 'utf-8'))
//Mettre l"objet JS a la BD
//Au lieu de le mettre un par un on peut le mettre d'un seul cout avec MyLine.create sans boucle


  console.log(req.body);
  const sku = req.body?.sku
  const quantity = req.body?.quantity
  if(sku && quantity && quantity > 0) {
   // data.addLine(req.body.sku, req.body.quantity)
  const lines = Line.find();
  const items = Item.find( ) 
  const item = items.find( { sku: sku} ) 
    db.connect(() => {
  
      const MyLine = new Line(
        {
          sku: sku,
          name: item.name,
          quantity: Number(quantity),
          price: item.sale_price,
          image_url: item.image_url,
        }
        /*data.addLine(req.body.sku, req.body.quantity)*/);
      
        lines.push(MyLine);
          MyLine.save();
        
      })
  } else {
    error = "Must get sku AND quantity to add Product"
    console.log(error)
  }

  res.redirect("/sale")
  
});

router.post("/close", (req, res) => {

  // const amount = +lines.reduce( (acc, line) => { return acc + line.price * line.quantity}, 0 ).toFixed(2)
  // const tps =  +(amount * configs.taxes.gst).toFixed(2)
  // const tvq = +(amount * configs.taxes.qst).toFixed(2)
  // const total = +(amount + tps + tvq).toFixed(2)

  //TODO: Sauvegarder la vente ICI
  console.log("CLOSE", req.body)
  const { amount, tps, tvq, total } = req.body
  //mettre les formule ici
  const sale = data.addSale( amount, tps, tvq, total )

  res.redirect("/sale")
})

module.exports = router