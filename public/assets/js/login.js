$(document).ready(() => {
  const email = $("#email").val().trim();
  const password = $("#password").val().trim();
  const alertText = $("#alert-text");

  function validation(res) {
    if (res) {
      window.location.href = "/user";
    } else {
      alertText.text("Please enter the correct email and password!");
      email.val("");
      password.val("");
    }
  }
  function checkPwEm() {
    if (email !== "" && password !== "") {
      $.ajax({
        url: "/api/login",
        type: "GET",
        data: { email, password },
      }).then((res) => {
        validation(res);
      });
    }
  }
  function tryLogin(event) {
    event.preventDefault();
    checkPwEm();
  }
  $(document).on("submit", "#signup-form", tryLogin);
});
