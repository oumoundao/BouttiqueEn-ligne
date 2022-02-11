const { readItems, updateItem} = require("../queries/items.queries");



exports.MyItems = async (req, res) => {
    const items =await readItems()
    try {
   
        res.render("produits",  {items} );
     
    } catch (error) {
      console.log(error);
    }
  
  };
  exports.editItem= async (req, res) => {
     const  {name, brand, sale_price, description, image_url, sku
     } = req.body
try {
    const itemUpdated= await updateItem({brand,description,image_url, name, sku,sale_price })
    res.redirect("/produits")
} catch (error) {
    console.log(error);
}

  }
 
