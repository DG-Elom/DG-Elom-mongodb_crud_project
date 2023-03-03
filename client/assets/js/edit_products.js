function ownerOptions(owner) {
  let myHeaders = new Headers();
  let url = "/users";

  let options = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };

  let ownerSelect = document.querySelector("#owner");
  fetch(url, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((response) => {
      let userOptions = response.map((user) => {
        if (user.name == owner) {
          return `<option value="${user.name}" selected>${user.name}</option>`;
        }
        return `<option value="${user.name}">${user.name}</option>`;
      });
      ownerSelect.innerHTML = userOptions.join("");
    });
}

let editProductForm = document.querySelector("#edit_form");

let name = document.querySelector("#name");
let price = document.querySelector("#price");
let stock = document.querySelector("#stock");
let description = document.querySelector("#description");
let showOldImg = document.querySelector("#showOldImg");
let new_image = document.querySelector("#new_image");
let oldImage = "";
var url = window.location;

var productId = url.hash;
productId = productId.substring(1);

let myHeaders = new Headers();
let urlFinal = "/products/edit/" + productId;

let options = {
  method: "GET",
  headers: myHeaders,
  mode: "cors",
  cache: "default",
};

fetch(urlFinal, options)
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((response) => {
    console.log("Réponse: ", response);
    name.value = response.name;
    price.value = response.price;
    stock.value = response.stock;
    description.value = response.description;
    showOldImg.src = "../assets/img/" + response.image;
    oldImage = response.image;
    ownerOptions(response.owner);
  });

function editProduct() {
  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("price", price.value);
  formData.append("stock", stock.value);
  formData.append("owner", owner.value);
  formData.append("description", description.value);
  if (new_image.files[0] != null) {
    formData.append("image", new_image.files[0]);
  }

  let url = "/products/update/" + productId;
  let options = {
    method: "PUT",
    body: formData,
  };

  fetch(url, options).then((res) => {
    if (res.ok) {
      window.location.href = "/pages/show_products.html";
    }
  });
}

editProductForm.addEventListener("submit", (event) => {
  event.preventDefault();
  editProduct();
});
