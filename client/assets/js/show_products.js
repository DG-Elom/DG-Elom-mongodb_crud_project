let myHeaders = new Headers();
let url = "/products";

let options = {
  method: "GET",
  headers: myHeaders,
  mode: "cors",
  cache: "default",
};

let productsDiv = document.querySelector("#showProducts");
fetch(url, options)
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((response) => {
    let div = document.createElement("div");
    div.classList.add("row", "my-5", "mx-auto");
    response.forEach((elt) => {
      let createdAtDate = new Date(elt.createdAt);
      let formattedDate = createdAtDate.toLocaleDateString();

      let col = document.createElement("div");
      let card = document.createElement("div");
      let aImg = document.createElement("a");
      let img = document.createElement("img");
      let card_body = document.createElement("div");
      let h4Name = document.createElement("h4");
      let aName = document.createElement("a");
      let h6Price = document.createElement("h6");
      let h6Stock = document.createElement("h6");
      let h6Owner = document.createElement("h6");
      let h6Date = document.createElement("h6");
      let h6Description = document.createElement("h6");
      let divAction = document.createElement("div");
      let aEdit = document.createElement("a");
      let btnSuppr = document.createElement("button");

      productsDiv.appendChild(div);
      div.appendChild(col);
      col.appendChild(card);
      card.appendChild(aImg);
      aImg.appendChild(img);
      card.appendChild(card_body);
      card_body.appendChild(h4Name);
      h4Name.appendChild(aName);
      card_body.appendChild(h6Price);
      card_body.appendChild(h6Stock);
      card_body.appendChild(h6Owner);
      card_body.appendChild(h6Date);
      card_body.appendChild(h6Description);
      card_body.appendChild(divAction);
      divAction.appendChild(aEdit);
      divAction.appendChild(btnSuppr);

      col.classList.add("col-lg-3", "col-md-6", "mb-4", "mx-auto");
      card.classList.add("card", "h-100", "w-100", "shadow");
      img.classList.add("card-img-top");
      img.src = "../assets/img/" + elt.image;
      img.height = "100";
      card_body.classList.add("card-body", "text-center");
      h4Name.classList.add("card-title", "text-center");
      aName.innerText = elt.name;
      aName.href = "#";
      h6Price.classList.add("mx-1");
      h6Price.innerText = "Price: " + elt.price + "€";
      h6Stock.classList.add("mx-1");
      h6Stock.innerText = "Number in stock: " + elt.stock;
      h6Owner.classList.add("mx-1");
      h6Owner.innerText = "Owner: " + elt.owner;
      h6Date.classList.add("mx-1");
      h6Date.innerText = "Created Date: " + formattedDate;
      h6Description.classList.add("mx-1");
      h6Description.innerText = "Description: " + elt.description;
      aEdit.classList.add("text-success");
      aEdit.href = "edit_product.html#" + elt._id;
      aEdit.innerHTML = `<i
      class="fas fa-edit fa-lg mx-2"></i>`;
      btnSuppr.classList.add("text-danger", "btn", "btn-unstyled");
      btnSuppr.innerHTML = `<i
      class="fas fa-trash fa-lg mx-2"></i>`;
      btnSuppr.addEventListener("click", () => {
        deleteProduct(elt._id);
      });
    });
  });

function deleteProduct(id) {
  url = "/products/delete/" + id;
  console.log(url);
  let options = {
    method: "DELETE",
  };

  fetch(url, options).then((res) => {
    console.log(res);
    if (res.ok) {
      window.location.href = "/pages/show_products.html";
    }
  });
}
