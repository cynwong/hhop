
$(document).ready(() => {
  // listener for save button
  $("#btn-save").click(async (event) => {
    event.preventDefault();

    const errors = [];

    // get form elements
    const $password = $("#password");
    const $rePassword = $("#re-password");

    // get values
    const password = $password.val().trim();
    if (!password) {
      errors.push({ msg: "Password is required." });
    }
    if (password.length < 8) {
      errors.push({ msg: "Password must be 8-16 characters long." });
    }

    const rePassword = $rePassword.val().trim();
    if (password !== rePassword) {
      errors.push({ msg: "Two password must be identical." });
    }

    // clean the form
    $password.val("");
    $rePassword.val("");

    if (errors.length > 0) {
      // eslint-disable-next-line no-undef
      return alertUser(errors);
    }

    try {
      const response = await $.ajax({
        url: "/user/password",
        method: "POST",
        data: {
          password,
          rePassword,
        },
      });

      if (response.error) {
        // eslint-disable-next-line no-undef
        return alertUser(response.error);
      }

      // eslint-disable-next-line no-undef
      return alertSuccess(response.success_msg);
    } catch (error) {
      const errMsg = error.responseJSON.error ? error.responseJSON.error : [{ msg: "Something went wrong. Try again later." }];
      // eslint-disable-next-line no-undef
      return alertUser(errMsg);
    }
  });
});
