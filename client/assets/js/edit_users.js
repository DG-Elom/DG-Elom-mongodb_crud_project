let editUserForm = document.querySelector("#edit_form");

let name = document.querySelector("#name");
let email = document.querySelector("#email");
let phone = document.querySelector("#phone");
let showOldImg = document.querySelector("#showOldImg");
let new_image = document.querySelector("#new_image");
let oldImage = "";
var url = window.location;

var userId = url.hash;
userId = userId.substring(1);
console.log(userId);

let myHeaders = new Headers();
let urlFinal = "/users/edit/" + userId;

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
    name.value = response.name;
    email.value = response.email;
    phone.value = response.phone;
    showOldImg.src = "../assets/img/" + response.image;
    oldImage = response.image;
  });

function editUser() {
  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("email", email.value);
  formData.append("phone", phone.value);
  if (new_image.files[0] != null) {
    formData.append("image", new_image.files[0]);
  }

  let url = "/users/update/" + userId;
  let options = {
    method: "PUT",
    body: formData,
  };

  fetch(url, options).then((res) => {
    if (res.ok) {
      window.location.href = "/pages/show_users.html";
    }
  });
}

editUserForm.addEventListener("submit", (event) => {
  event.preventDefault();
  editUser();
});
