// $(document).ready(() => {

const alertext = $("#alertext");

function validation(res) {
  if (res) {
    // window.location.href = "/user";
  } else {
    alertext.text("Please enter the correct email and password!");
    $("#email").val("");
    $("#password").val("");
  }
}

function checkPwEm(email, password) {
  if (email !== "" && password !== "") {
    $.post("/user/login", { email, password })
      .then((res) => {
        validation(res);
      });
  }
}

function tryLogin(event) {
  event.preventDefault();
  const email = $("#email").val().trim();
  const password = $("#password").val().trim();
  checkPwEm(email, password);
}

$("#signin").on("click", tryLogin);
// });
