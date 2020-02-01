
$(document).ready(() => {
  // Login page "Log In" button onClick listener
  $("#btn-login").click(async (event) => {
    event.preventDefault();

    const errors = [];

    // Get elements
    const $email = $("#email");
    const $password = $("#password");

    // Get form values
    const email = $email.val().trim();
    if (!email) errors.push({ msg: "Email is required." });

    const password = $password.val().trim();
    if (!password) errors.push({ msg: "Password is required." });

    // reset password field
    $password.val("");

    if (errors.length > 0) {
      // if errors, alert user
      // eslint-disable-next-line no-undef
      return alertUser(errors);
    }

    try {
      const response = await $.ajax({
        url: "/user/login",
        method: "POST",
        data: {
          email,
          password,
        },
      });
      if (response.error) {
        // if error, alert the user
        // eslint-disable-next-line no-undef
        return alertUser(response.error);
      }

      // if everything ok, redirect to user dashboard page
      return window.location.replace("/user");
    } catch (error) {
      // eslint-disable-next-line no-undef
      return alertUser(error.responseJSON.error);
    }
  });
});
