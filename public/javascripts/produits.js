const emailInput = document.querySelector('blur', event => {

    axios
    .get('produits', {params: {email: event.target.value}})
    .then (res => {
    console.log("Response: ", res.data);
   if (res.data.user) {
     event.target.classList.add("error-existing")  
   } else {
    event.target.classList.remove("error-existing")  
   }
})
})

function openEditItem(sku)
{

}