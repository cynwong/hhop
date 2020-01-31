
$(document).ready(() => {
  $("#sign-up").click(async (event) => {
    event.preventDefault();

    // Get form elements
    const $name = $("#user-name");
    const $email = $("#user-email");
    const $password = $("#user-pwd");
    const $rePassword = $("#re-pwd");

    const errors = [];

    // get form data
    const name = $name.val().trim();
    if (!name) errors.push({ msg: "Name is required." });

    const email = $email.val().trim();
    if (!email) errors.push({ msg: "Email is required." });

    const password = $password.val().trim();
    if (!password) errors.push({ msg: "Password is required." });
    if (password.length < 8) errors.push({ msg: "Password must be 8-16 characters long." });

    const rePassword = $rePassword.val().trim();
    if (password !== rePassword) errors.push({ msg: "Passwords must be identical." });

    if (errors.length > 0) {
      // if errors alert the user
      // eslint-disable-next-line no-undef
      return alertUser(errors);
    }

    // if validation passed, then send data to server
    try {
      const response = await $.post("/user/register", {
        name,
        email,
        password,
      });

      if (response.error) {
        // if error, alert the user
        // eslint-disable-next-line no-undef
        return alertUser(response.error);
      }

      // if everything ok, redirect to user login page
      window.location.replace("/user/login");
    } catch (error) {
      // eslint-disable-next-line no-undef
      return alertUser(error.responseJSON.error);
    }
  });
});
