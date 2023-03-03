let myHeaders = new Headers();
let delId = "";
let url = "/users";

let options = {
  method: "GET",
  headers: myHeaders,
  mode: "cors",
  cache: "default",
};

let usersDiv = document.querySelector("#showUsers");
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
      let col = document.createElement("div");
      let card = document.createElement("div");
      let aImg = document.createElement("a");
      let img = document.createElement("img");
      let card_body = document.createElement("div");
      let h4Name = document.createElement("h4");
      let aName = document.createElement("a");
      let h6Email = document.createElement("h6");
      let h6Phone = document.createElement("h6");
      let divAction = document.createElement("div");
      let aEdit = document.createElement("a");
      let btnSuppr = document.createElement("button");

      usersDiv.appendChild(div);
      div.appendChild(col);
      col.appendChild(card);
      card.appendChild(aImg);
      aImg.appendChild(img);
      card.appendChild(card_body);
      card_body.appendChild(h4Name);
      h4Name.appendChild(aName);
      card_body.appendChild(h6Email);
      card_body.appendChild(h6Phone);
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
      h6Email.classList.add("mx-1");
      h6Email.innerText = "E-mail: " + elt.email;
      h6Phone.classList.add("mx-1");
      h6Phone.innerText = "Phone: " + elt.phone;
      aEdit.classList.add("text-success");
      aEdit.href = "edit_user.html#" + elt._id;
      aEdit.innerHTML = `<i
      class="fas fa-edit fa-lg mx-2"></i>`;
      btnSuppr.classList.add("text-danger", "btn", "btn-unstyled");
      //btnSuppr.href = "show_users.html#" + elt._id;
      btnSuppr.innerHTML = `<i
      class="fas fa-trash fa-lg mx-2"></i>`;
      btnSuppr.addEventListener("click", () => {
        console.log("j'ai été appuyé");
        deleteUser(elt._id);
      });
    });
  });

function deleteUser(id) {
  url = "/users/delete/" + id;
  console.log(url);
  let options = {
    method: "DELETE",
  };

  fetch(url, options).then((res) => {
    console.log(res);
    if (res.ok) {
      window.location.href = "/pages/show_users.html";
    }
  });
}
