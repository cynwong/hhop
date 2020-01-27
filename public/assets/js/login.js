$(document).ready(() => {
  const email = $("#email").val().trim();
  const password = $("#password").val().trim();
  const alertext = $("#alertext");

  function validation(res) {
    if (res) {
      window.location.href = "/user";
    } else {
      alertext.text("Please enter the correct email and password!");
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
  $(document).on("submit", "signup-form", tryLogin);
});
