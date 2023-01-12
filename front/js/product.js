let params = (new URL(document.location)).searchParams;
let id = params.get('id');
console.log(id);

fetch('http://localhost:3000/api/products/' + id)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)


  })