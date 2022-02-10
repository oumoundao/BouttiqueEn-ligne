const router = require("express").Router();

const { lineList } = require("../controllers/lines.controller");


router.post("/", lineList);

module.exports = router;
