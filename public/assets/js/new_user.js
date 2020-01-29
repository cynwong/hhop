$(document).ready(() => {
  const nameInput = $("#name").val().trim();
  const email = $("#email").val().trim();
  const password = $("#password").val().trim();
  const rePassword = $("#rePassword").val().trim();
  const alertText = $("#alert-text");

  function checkUser() {
    $.ajax({
      method: "POST",
      url: "/api/signup",
      data: { nameInput, email, password },
    }).then((res) => {
      if (res) {
        alertText.text("Sign up successfully! Please log in.");
      } else {
        alertText.text("You have already created an account. Please log in.");
      }
    });
  }

  function checkPw() {
    if (password !== rePassword) {
      alertText.text("Please make enter the same password");
    } else {
      checkUser();
    }
  }

  function checkInput() {
    if (nameInput !== "" && email !== "" && password !== "" && rePassword !== "") {
      checkPw();
    } else {
      alertText.text("Please complete the form.");
    }
  }

  function signin(event) {
    event.preventDefault();
    checkInput();
  }

  $(document).on("submit", "#signup-form", signin);
});
