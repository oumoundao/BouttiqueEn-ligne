const Sale = require("../database/models/sale.model.js");

exports.createSale =  (lines, subtotal, gst, qst, total) => {
  const newSale = new Sale({
    lines: lines,
    subtotal: subtotal,
    gst: gst,
    qst: qst,
    total: total,
  });

  return newSale.save();
};
