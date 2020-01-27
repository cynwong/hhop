$(document).ready(function () {
    const nameInput = $("#name").val().trim();
    const email = $("#email").val().trim();
    const password = $("#password").val().trim();
    const re_password = $("#re_password").val().trim();

    $(document).on("submit", "signup-form", signin);

    function signin(event) {
        event.preventDefault();
        checkInput();
    }

    function checkInput() {
        if (nameInput != "" && email != "" && password != "" && re_password != "") {
            checkPw();
        }else{
            alertext.text("Please complete the form.");
        }
    }

    function checkPw() {
        if (password != re_password) {
            alertext.text("Please make enter the same password");
        }else{
            checkUser();
        }
    }

    function checkUser() {
        $.ajax({
            method: "POST",
            url: "/api/signup",
            data: {nameInput, email, password}
        }).then((res) => {
            if(res) {
                alertext.text("Sign up successfully! Please log in.")
            }else{
                alertext.text("You have already created an account. Please log in.")
            }
        })
    }

    function

})