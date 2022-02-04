const router = require("express").Router();
const saleRouter = require("./sale.routes")
const linesRouter = require("./lines.routes")

router.get("/", (req, res) => {
  res.render("home")
})

router.use("/sale", saleRouter)

router.use("/lines", linesRouter)

module.exports = router