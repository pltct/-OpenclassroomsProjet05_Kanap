//*** recupere donnee localstorage ***//
let panier = JSON.parse (localStorage.getItem ("panier"));

//*** recupere donnee api ***//
fetch('http://localhost:3000/api/products/')
  .then((response) => response.json())
  .then((data) => {  

      if (panier === null) {
          alert ("Veuillez selectionner un article")
        } else {
            //*** parcours panier ***//
            for (let i = 0; i < panier.length; i++){
                
                let id = panier[i].idProduct;
                const idProductSelect = data.find(element => element._id === id);

                //*** affiche les donnees ***// 
                const sectionCartItems = document.querySelector ("#cart__items");
                const articleElement = document.createElement ("article");
                articleElement.classList.add ("cart__item");
                articleElement.dataset.id = panier[i].idProduct;
                articleElement.dataset.color = panier[i].colorProduct;
                
                const divImage = document.createElement ("div");
                divImage.classList.add ("cart__item__img");
                
                const imageElement = document.createElement ("img");         
                imageElement.src = idProductSelect.imageUrl;
                imageElement.alt = idProductSelect.altTxt;
                
                const divContent = document.createElement ("div");
                divContent.classList.add ("cart__item__content");
            
                const divDescription = document.createElement ("div");
                divDescription.classList.add ("cart__item__content__description");
                
                const nomElement = document.createElement("h2");
                nomElement.innerText = idProductSelect.name;
            
                const colorElement = document.createElement("p");
                colorElement.innerText = panier[i].colorProduct;
            
                const priceElement = document.createElement("p");
                priceElement.innerText = idProductSelect.price + " €";
            
                const divSettings = document.createElement ("div");
                divSettings.classList.add ("cart__item__content__settings");
            
                const divSettingsQuantity = document.createElement ("div");
                divSettingsQuantity.classList.add ("cart__item__content__settings__quantity");
            
                const quantityElement = document.createElement ("p");
                quantityElement.innerText = "Qté : ";
                
                const inputElement = document.createElement ("input");
                inputElement.type = "number";
                inputElement.classList.add ("itemQuantity");
                inputElement.name = "itemQuantity";
                inputElement.min = "1";
                inputElement.max = "100";
                inputElement.value = panier[i].quantityProduct;
                inputElement.addEventListener ("change", function () {
                    let quantityValue = Number(this.value); // prend la valeur et je la nomme dans une variable
                    panier[i].quantityProduct = quantityValue; // j'associe à panier[i].quantityProduct
                    localStorage.setItem("panier", JSON.stringify(panier)); // la stock dans le localstorage
                    location.reload(); // actualise la page
                })

                const divDelete = document.createElement ("div");
                divDelete.classList.add ("cart__item__content__settings__delete");
            
                const deleteElement = document.createElement("p");
                deleteElement.classList.add ("deleteItem");
                deleteElement.innerText = "Supprimer";
                deleteElement.addEventListener ("click", function () {
                    panier.splice(i, 1); //supprime le ieme element //
                    localStorage.setItem("panier", JSON.stringify(panier)); 
                    location.reload(); 
                })
            
                const totalQuantity = document.querySelector ("#totalQuantity");
                totalQuantity.innerText = Number(panier[i].quantityProduct) + Number(totalQuantity.textContent);
            
                const totalPrice = document.querySelector ("#totalPrice");
                let total = 0;
                const totalPriceArticle = idProductSelect.price * panier[i].quantityProduct;
                total = Number(totalPrice.textContent) + totalPriceArticle;
                totalPrice.innerText = total;
                
                sectionCartItems.appendChild (articleElement);
                articleElement.appendChild (divImage);
                divImage.appendChild (imageElement);
                articleElement.appendChild (divContent);
                divContent.appendChild (divDescription);
                divContent.appendChild (divSettings);
                divDescription.appendChild (nomElement,);
                divDescription.appendChild (colorElement);
                divDescription.appendChild (priceElement);
                divSettings.appendChild (divSettingsQuantity);
                divSettings.appendChild (divDelete);
                divSettingsQuantity.appendChild (quantityElement);
                divSettingsQuantity.appendChild (inputElement);
                divDelete.appendChild (deleteElement);
            }
        }
})  

//*** selection du bouton commander ***//
const btnCommand = document.querySelector("#order");
btnCommand.addEventListener("click", function (e) {
    e.preventDefault();
    const form = document.querySelector(".cart__order__form");
    const inputs = form.querySelectorAll("input");
    
    //message element vide pour utilisateur//
    if (panier.length === 0) {
        alert ("Veuillez selectionner un article avant de commander");
        return;
    } else {
        for (let input of inputs)
        if (input.value === "") {
            alert ("Veuillez remplir tous les champs svp");
            return;
        };
    };

    //les id dans un array//
    let ids = [];
    for (let article of panier) {
        ids.push(article.idProduct);
    };

    //creation de l'objet//
    const dataContact = {
        contact: {
            firstName: document.querySelector("#firstName").value, //recupere la valeur du formulaire pour l'objet "contact"
            lastName: document.querySelector("#lastName").value,
            address: document.querySelector("#address").value,
            city: document.querySelector("#city").value,
            email: document.querySelector("#email").value
        },
        products: ids
    };

    //*** regEx ***//
    const regExfirstNameLastNameCity = /^[A-Za-z\-']{3,20}$/;
    if (regExfirstNameLastNameCity.test(firstName.value) 
    && regExfirstNameLastNameCity.test(lastName.value) 
    && regExfirstNameLastNameCity.test(city.value)) {
    } else {
        alert ("Le nom, le prénom et la ville, doit être composés que de lettres et au minimum 3");
        return;
    };

    const regExAdress = /^[A-Za-z0-9\é\è\-' ]{5,40}$/;
    if (regExAdress.test(address.value)) {
    } else {
        alert ("Adresse non valide");
        return;
    };

    const regExEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,3}$/;
    if (regExEmail.test(email.value)) {
    } else {
        alert ("Email non valide");
        return;
    };

    fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataContact)
    })
       .then((Response) => Response.json())
       .then((data) => {
        window.location.href = "confirmation.html?orderId=" + data.orderId;
        })
       .catch((error) => console.error(error));

})