// const emailInput = document.querySelector("blur", (event) => {
//   axios
//     .get("produits", { params: { email: event.target.value } })
//     .then((res) => {
//       console.log("Response: ", res.data);
//       if (res.data.user) {
//         event.target.classList.add("error-existing");
//       } else {
//         event.target.classList.remove("error-existing");
//       }
//     });
// });

function openAddItem() {
  const modal = document.getElementById("myModal1");

  modal.style.display = "block";

  const annul = document.getElementById("annul");
  annul.onclick = function () {
    modal.style.display = "none";
  };
  const skuinput = document.querySelector("#Sku");
  const imginput = document.querySelector("#Img");
  const brandinput = document.querySelector("#Brand");
  const nameinput = document.querySelector("#Name");
  const descinput = document.querySelector("#Descript");
  const priceinput = document.querySelector("#Price");

  skuinput.value = newsku;
  imginput.value = item.image_url;
  brandinput.value = item.brand;
  nameinput.value = item.name;
  descinput.value = item.description;
  priceinput.value = item.sale_price;

  const newProduct = {
    sku: skuinput.value,
    name: nameinput.value,
    description: descinput.value,
    sale_price: priceinput.value,
    image_url: imginput.value,
    brand: brandinput.value,
  };
  axios.post(`http://localhost:3000/produits/produit`, newProduct);
}

function openEditItem(sku) {
  async function getItem() {
    try {
      const resultat = await axios.get(
        `http://localhost:3000/produits/produit/${sku}`
      );
      return resultat.data;
    } catch (error) {
      console.log(error);
    }
  }

  getItem().then((item) => {
    console.log(item);
    const modal = document.getElementById("myModal2");
    modal.style.display = "block";
    const annul = document.getElementById("ann");
    annul.onclick = function () {
      modal.style.display = "none";
    };

    //console.log("hello");
    const skuinput = document.querySelector("#sku");
    const imginput = document.querySelector("#img");
    const brandinput = document.querySelector("#brand");
    const nameinput = document.querySelector("#name");
    const descinput = document.querySelector("#descript");
    const priceinput = document.querySelector("#price");

    skuinput.value = sku;
    imginput.value = item.image_url;
    brandinput.value = item.brand;
    nameinput.value = item.name;
    descinput.value = item.description;
    priceinput.value = item.sale_price;
  });
}

function opendeleteItem(sku) {
  const modal = document.getElementById("myModal3");
  modal.style.display = "block";
  const annul = document.getElementById("non");
  annul.onclick = function () {
    modal.style.display = "none";
  };
}
