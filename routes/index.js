const router = require("express").Router();
const saleRouter = require("./sale.routes");
const linesRouter = require("./lines.routes");
const itemsRouter = require("./items.routes");

router.get("/", (req, res) => {
  res.render("home");
});

router.use("/produits", itemsRouter);

router.use("/sale", saleRouter);

router.use("/lines", linesRouter);

module.exports = router;
