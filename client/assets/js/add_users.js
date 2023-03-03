let addUserForm = document.querySelector("#add_form");

function addUser() {
  var name = document.querySelector("#name");
  var email = document.querySelector("#email");
  var phone = document.querySelector("#phone");
  var image = document.querySelector("#image");

  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("email", email.value);
  formData.append("phone", phone.value);
  formData.append("image", image.files[0]);
  let url = "/users/add";
  let options = {
    method: "POST",
    body: formData,
  };

  fetch(url, options).then((res) => {
    if (res.ok) {
      window.location.href = "/pages/show_users.html";
    }
  });
}

addUserForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addUser();
});
