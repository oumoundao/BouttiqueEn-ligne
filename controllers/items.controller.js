const { getItems } = require("../queries/items.queries");

exports.MyItems = async (req, res) => {
    const items =await getItems()
    try {
   
        res.render("produits",  {items} );
     
    } catch (error) {
      console.log(error);
    }
  
  };