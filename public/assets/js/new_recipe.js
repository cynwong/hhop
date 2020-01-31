$(document).ready(() => {
  const title = $("#newTitle").val().trim();
  const ingredients = $("#newIngredients").val().trim();
  const method = $("#newMethod").val().trim();
  const credit = $("#newCredit").val().trim();
  const source = $("#newSource").val().trim();
  const addImage = $("#newImage").val().trim();
  const alertText = $("#alert-text");

  function newRecipe() {
    $.ajax({
      method: "POST",
      url: "/api/add",
      data: {
        title, ingredients, method, credit, source, addImage,
      },
    }).then((res) => {
      if (res) {
        alertText.text("New Recipe added Successfully");
      }
    });
  }

  function runCheck() {
    if (title !== "" && ingredients !== "" && method !== "") {
      newRecipe();
    } else {
      alertText.text("Please check if all required information has been filled");
    }
  }

  function submit(event) {
    event.preventDefault();
    runCheck();
  }


  $(document).on("submit", "#newRecipe", submit);
});
