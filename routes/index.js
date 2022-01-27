const router = require("express").Router();
const saleRouter = require("./sale.routes")

router.get("/", (req, res) => {
  res.render("home")
})

router.use("/sale", saleRouter)

module.exports = router