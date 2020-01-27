$(document).ready(function () {
    const email = $("#email").val().trim();
    const password = $("#password").val().trim();

    $(document).on("submit", "signup-form", tryLogin);

    function tryLogin(event) {
        event.preventDefault();
        checkPwEm();
    }

    function checkPwEm() {
        if (emailInput != "" && password != "") {
            $.ajax({
                url: "/api/login",
                type: "GET",
                data: { email, password }
            }).then((res) => {
                validation(res);
            })
        }
    }

    function validation(res) {
        if (res) {
            window.location.href = "/user";
        } else {
            alertext.text("Please enter the correct email and password!");
            email.val("");
            password.val("");
        }
        
    }

    function 
})