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

let imageToShow = document.querySelector("#display");
const skuinput = document.querySelector("#Sku");
let imginput = document.querySelector("#Img");
const brandinput = document.querySelector("#Brand");
const nameinput = document.querySelector("#Name");
const descinput = document.querySelector("#Descript");
const priceinput = document.querySelector("#Price");

const skuinput2 = document.querySelector("#sku");
const imginput2 = document.querySelector("#img");
const brandinput2 = document.querySelector("#brand");
const nameinput2 = document.querySelector("#name");
const descinput2 = document.querySelector("#descript");
const priceinput2 = document.querySelector("#price");

const closeadd = document.getElementById("annul");
const closeEdit = document.getElementById("ann");
const closeDelete = document.getElementById("non");

const confAdd = document.getElementById("conf1");
const confEdit = document.getElementById("conf2");
const confdelete = document.getElementById("conf3");

const modal1 = document.getElementById("myModal1");
const modal2 = document.getElementById("myModal2");
const modal3 = document.getElementById("myModal3");

imginput.onchange = function (event) {
  debugger;
  let files = event.target.files || event.dataTransfer.files;
  if (!files.length) {
    console.warn("no file detected");
    return false;
  }
  const file = files[0];
  imginput = file;
  let reader = new FileReader();

  reader.onload = (e) => (imageToShow.src = e.target.result);
  reader.readAsDataURL(file);
};

function openAddItem() {
  modal1.style.display = "block";
}

closeadd.onclick = function () {
  modal1.style.display = "none";
};
confAdd.onclick = function () {
  const newProduct = {
    sku: skuinput.value,
    name: nameinput.value,
    description: descinput.value,
    sale_price: priceinput.value,

    brand: brandinput.value,
  };
  //pour construire un objet de type form data
  const formData = new FormData();

  //Object.keys va recuperer les propriete sous formme de tableau et le parcourir avec foreach
  Object.keys(newProduct).forEach((name) => {
    //pour chaque proipriete il va l"ajouter
    formData.append(name, newProduct[name]);
  });
  formData.append("image_url", imginput);

  //le murter attend un type de form data
  axios
    .post(`http://localhost:3000/produits`, formData)
    .then((res) => {
      //res.data
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  modal1.style.display = "none";
};

function openEditItem(sku) {
  async function getItem() {
    try {
      const resultat = await axios.put(`http://localhost:3000/produits/${sku}`);
      return resultat.data;
    } catch (error) {
      console.log(error);
    }
  }y

  getItem().then((item) => {
    console.log(item);

    modal2.style.display = "block";

    annul.onclick = function () {
      modal2.style.display = "none";
    };

    //console.log("hello");

    skuinput2.value = sku;
    imginput2.value = item.image_url;
    brandinput2.value = item.brand;
    nameinput2.value = item.name;
    descinput2.value = item.description;
    priceinput2.value = item.sale_price;
  });
}

function opendeleteItem(sku) {
  modal3.style.display = "block";

  confdelete.onclick = function () {
    debugger;
    //try {
    //const resultat = await axios
    axios
      .delete(`http://localhost:3000/produits/${sku}`)
      .then((resultat) => console.log(resultat.data));
    // } catch (error) {
    //   console.log(error);
    // }

    //modal1.style.display = "none";
  };
}

closeDelete.onclick = function () {
  modal3.style.display = "none";
};
