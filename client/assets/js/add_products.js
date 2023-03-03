let addProductForm = document.querySelector("#add_form");

function addProduct() {
  let name = document.querySelector("#name");
  let price = document.querySelector("#price");
  let stock = document.querySelector("#stock");
  let owner = document.querySelector("#owner");
  let description = document.querySelector("#description");
  var image = document.querySelector("#image");

  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("price", price.value);
  formData.append("stock", stock.value);
  formData.append("owner", owner.value);
  formData.append("description", description.value);
  formData.append("image", image.files[0]);
  let url = "/products/add";
  let options = {
    method: "POST",
    body: formData,
  };

  fetch(url, options).then((res) => {
    if (res.ok) {
      window.location.href = "/pages/show_products.html";
    }
  });
}

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
    let userOptions = response.map(
      (user) => `<option value="${user.name}">${user.name}</option>`
    );
    userOptions.unshift('<option value="">Select an Owner</option>');
    ownerSelect.innerHTML = userOptions.join("");
  });

addProductForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addProduct();
});
