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

    const nameElement = document.querySelector("#title")
    // Modifier le contenu du text
    nameElement.innerText = data.name

    const priceElement = document.querySelector("#price")
    priceElement.innerText = data.price

    const descriptionElement = document.querySelector("#description")
    descriptionElement.innerText = data.description

    const selectElement = document.querySelector("#colors")

    for (let i = 0; i < data.colors.length; i++) {
      const option = document.createElement("option")
      option.innerText = data.colors[i]
      option.value = data.colors[i]
      selectElement.appendChild(option)
    }
  })