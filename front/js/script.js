// Recuperation des articles depuis le fichier JSON
fetch('http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((data) => {
    
    for (let i = 0; i < data.length; i++) {
        
      // Creation des balises
      const anchor = document.createElement("a");
      anchor.href = "./product.html?id=" + data[i]._id;
      
      const articleElement = document.createElement("article");
        
      const imageElement = document.createElement("img");
      imageElement.src = data[i].imageUrl;
      imageElement.alt = data[i].altTxt;

      const nomElement = document.createElement("h3");
      nomElement.innerText = data[i].name;
  
      const descriptionElement = document.createElement("p");
      descriptionElement.innerText = data[i].description;

      // Rattachement de nos balises au DOM      
      const sectionItems = document.querySelector("#items")

      // Rattache la balise a son parent
      sectionItems.appendChild (anchor);
      anchor.appendChild (articleElement);
      articleElement.appendChild (imageElement);
      articleElement.appendChild (nomElement);
      articleElement.appendChild (descriptionElement);
    };
});