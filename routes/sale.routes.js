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
  
  const sale = data.addSale( amount, tps, tvq, total )

  res.redirect("/sale")
})

module.exports = router