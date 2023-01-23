let params = (new URL(document.location)).searchParams;
let id = params.get('id');

fetch('http://localhost:3000/api/products/' + id)
  .then((response) => response.json())
  .then((data) => {

    // creation des balises
    const imageElement = document.createElement("img");
    imageElement.src = data.imageUrl;
    imageElement.alt = data.altTxt;
    // rattachement de nos balise au DOM
    const divItemImg = document.querySelector(".item__img");
    // Rattache la balise a son parent
    divItemImg.appendChild(imageElement);

    const nameElement = document.querySelector("#title");
    // Modifier le contenu du text
    nameElement.innerText = data.name;

    const priceElement = document.querySelector("#price");
    priceElement.innerText = data.price;

    const descriptionElement = document.querySelector("#description");
    descriptionElement.innerText = data.description;

    const selectElement = document.querySelector("#colors");

    for (let i = 0; i < data.colors.length; i++) {
      const option = document.createElement("option");
      option.innerText = data.colors[i];
      option.value = data.colors[i];
      selectElement.appendChild(option);
    }
  })

const button = document.querySelector("#addToCart");
button.addEventListener("click", () => {
  const color = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;
  if (color === "") {
    alert ("Veuillez sélectionner une couleur");
  } else {
    if (quantity >= 1 && quantity <= 100){
      const data = {
        id: id,
        color: color,
        quantity: Number(quantity),
      }
      
      let panier = localStorage.getItem("panier");
      if (panier === null) {
        panier = [];
      } else {
        panier = JSON.parse(panier);
      }

      // si le canapé est déja dans le panier (meme id, meme couleur)
      let canape = 0;
      for (let i = 0; i < panier.length; i++){
        if (panier[i].color === data.color && panier[i].id === data.id) {
          canape = 1;
          let newQuantity = panier[i].quantity + data.quantity;
          if (newQuantity > 100){
            alert ("Quantité supérieure à 100");
          } else {
            // alors je modifie la quantité
            panier[i].quantity = newQuantity;
          }
        }
      } 
      if (canape === 0) {
        panier.push(data);
      } 
      // sinon j'ajoute le canapé au panier     
      localStorage.setItem("panier",JSON.stringify(panier));
    } else {
      alert ("Quantité non comprise entre 1 et 100");
    }
  }

})

