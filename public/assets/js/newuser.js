$(document).ready(() => {
  const nameInput = $("#name").val().trim();
  const email = $("#email").val().trim();
  const password = $("#password").val().trim();
  const rePassword = $("#rePassword").val().trim();
  const alertext = $("#alertext");

  function checkUser() {
    $.ajax({
      method: "POST",
      url: "/api/signup",
      data: { nameInput, email, password },
    }).then((res) => {
      if (res) {
        alertext.text("Sign up successfully! Please log in.");
      } else {
        alertext.text("You have already created an account. Please log in.");
      }
    });
  }

  function checkPw() {
    if (password !== rePassword) {
      alertext.text("Please make enter the same password");
    } else {
      checkUser();
    }
  }

  function checkInput() {
    if (nameInput !== "" && email !== "" && password !== "" && rePassword !== "") {
      checkPw();
    } else {
      alertext.text("Please complete the form.");
    }
  }

  function signin(event) {
    event.preventDefault();
    checkInput();
  }

  $(document).on("submit", "signup-form", signin);
});
