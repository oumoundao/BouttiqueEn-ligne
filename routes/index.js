const router = require("express").Router();
const salesRouter = require("./sales.routes");
const linesRouter = require("./lines.routes");
const itemsRouter = require("./items.routes");

router.get("/", (req, res) => {
  res.render("home");
});

router.use("/produits", itemsRouter);
router.use("/sale", salesRouter);
router.use("/lines", linesRouter);

module.exports = router;
