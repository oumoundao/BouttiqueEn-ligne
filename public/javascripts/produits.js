debugger;
function nextPage(curentPage) {
  //pour qu'il \s'arret a la derniere page

  console.log(curentPage);
  // if (first + numberOfItems <= letterList.length) {
  //   first += numberOfItems;
  //   actualPage++;
  //   getItems(); /* focntion qui affiche la liste des items*/
  // }
}

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

function openAddItem() {
  modal1.style.display = "block";
}

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
  modal2.style.display = "block";
  async function getItem() {
    try {
      const resultat = await axios.get(
        `http://localhost:3000/produits/${sku}/produit`
      );
      return resultat.data;
    } catch (error) {
      console.log(error);
    }
  }

  getItem().then((item) => {
    console.log(item);

    // annul.onclick = function () {
    //   modal2.style.display = "none";
    // };

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
      .get(`http://localhost:3000/produits/delete/${sku}`)
      .then((resultat) => console.log(resultat.data));
    // } catch (error) {
    //   console.log(error);
    // }

    //modal1.style.display = "none";
  };
}

// closeDelete.onclick = function () {
//   modal3.style.display = "none";
// };

// closeEdit.onclick = function () {
//   modal3.style.display = "none";
// };

function closeModal(ID) {
  document.getElementById(ID).style.display = "none";
}
const items = [];

axios
  .get(`http://localhost:3000/produits`)
  .then((response) => (items = response.data));

let numberOfItem = 10;
let first = 0;
let actualPage = 1;
//il faudra ajouter cette variable a la fonction qui liste les items
//pour les afficher pour qu'il puisse afficher 10 items par page
//il va rempalcer listItem.leght= first + numberItems

//fonction qui permet d'aller a la porchaine page

//fonction qui permet d'aller a la page precedente
function previous(curentPage) {
  // if (first - numberOfItems >= 0) {
  //   first -= numberOfItems;
  //   actualPage--;
  //   getItems();
  //}
}

function curent(curentPage) {
  return curentPage;
}

function firstPage() {
  // first = 0;
  // actualPage = 1;
  // getItemst();
}

let maxPages = Math.ceil(letterList.length / numberOfItems);

function lastPage() {
  // first = maxPages * numberOfItems - numberOfItems;
  // actualPage = maxPages;
  // getItems();
}

//affiche les information de la page ou nous somme cad 1/10 par exple
//a verifer pour besoin utiliser
function showPageInfo() {
  document.getElementById("pageInfo").innerHTML = `
    Page ${actualPage} / ${maxPages}
  `;
}
