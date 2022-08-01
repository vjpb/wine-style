class ContactForm {
  constructor(name, email, textArea) {
    this.name = name;
    this.email = email;
    this.textArea = textArea;
  }
}
let formRequests = document.getElementById('formRequest');

let arrayRequest = [];

formRequest.addEventListener('submit', (e) => {
  e.preventDefault();
  let datForm = new FormData(e.target);
  const request = new ContactForm(
    datForm.get("name"),
    datForm.get("email"),
    datForm.get("textarea")
  );
  arrayRequest.push(request);
  formRequest.reset();

  swal({
    title: "Gracias por escribirnos!",
    text: "Nos pondremos en contacto a la brevedad",
    icon: "success",
  });
  requestAddLocalStorage();
});

function requestAddLocalStorage() {
  localStorage.setItem("arrayRequest", JSON.stringify(arrayRequest));
}

window.onload = function () {
  const storageRequest = JSON.parse(localStorage.getItem("arrayRequest"));
  if (storageRequest) {
    arrayRequest = storageRequest;
  }
};
