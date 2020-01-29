// $(document).ready(() => {
const alertext = $("#alertext");

function checkUser(username, email, password) {
  $.post("/user/register", {
    username, email, password,
  }).then((res) => {
    if (res) {
      alertext.text("Sign up successfully! Please log in.");
    } else {
      alertext.text("You have already created an account. Please log in.");
    }
  });
}

function checkPw(username, email, password, rePassword) {
  if (password !== rePassword) {
    alertext.text("Please make enter the same password");
  } else {
    checkUser(username, email, password);
  }
}

function checkInput(username, email, password, rePassword) {
  if (username !== "" && email !== "" && password !== "" && rePassword !== "") {
    checkPw(username, email, password, rePassword);
  } else {
    alertext.text("Please complete the form.");
  }
}

function signin(event) {
  event.preventDefault();
  const username = $("#user-name").val().trim();
  const email = $("#user-email").val().trim();
  const password = $("#user-pwd").val().trim();
  const rePassword = $("#re-pwd").val().trim();
  checkInput(username, email, password, rePassword);
}

$("#signup").on("click", signin);
// });
