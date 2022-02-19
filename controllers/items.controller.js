const {
  deleteItem,
  readItem,
  readItems,
  updateItem,
  createItem,
} = require("../queries/items.queries");

exports.MyItems = async (req, res) => {
  const items = await readItems();
  try {
    res.render("produits", { items });
  } catch (error) {
    console.log(error);
  }
};

//permet de retrouver un item donnee
exports.MyItem = async (req, res) => {
  const item = await readItem(req.params.sku);
  try {
    res.status(200).json(item);
  } catch (error) {
    console.log(error);
  }
};
exports.editItem = async (req, res) => {
  const { name, brand, sale_price, description, image_url, sku } = req.body;
  try {
    const itemUpdated = await updateItem({
      brand,
      description,
      image_url,
      name,
      sku,
      sale_price,
    });
    res.redirect("/produits");
  } catch (error) {
    console.log(error);
  }
};

exports.addItem = async (req, res) => {
  const { name, brand, sale_price, description, sku } = req.body;
  console.log("Bonjour", req.file);
  const image_url = req.file.fieldname;

  try {
    const item = await createItem({
      sku,
      name,
      description,
      sale_price,
      image_url,
      brand,
    });
    //res.render("produits" /*, { item}*/);
    res.status(200).json(item);
    //res.redirect("/produits");
  } catch (error) {
    console.log(error);
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await deleteItem(req.params.sku);

    res.status(200).json(item);
    // res.redirect("/produits");
  } catch (error) {
    console.log(error);
  }
};
