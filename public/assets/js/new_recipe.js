// $(document).ready(() => {

const title = $("#newTitle");
const ingredients = $("#newIngredients");
const method = $("#newMethod");
const credit = $("#newCredit");
const source = $("#newSource");
const addImage = $("#newImage");
// const alertText = $("#alert-text");
// const submit = $("#submit");

$("#submit").on("click", (event) => {
  event.preventDefault();
  // function newRecipe() {
  $.ajax({
    method: "POST",
    url: "/api/add",
    data: {
      title: title.val(),
      ingredients: ingredients.val(),
      method: method.val(),
      credit: credit.val(),
      source: source.val(),
      addImage: addImage.val(),
    },
  }).then((res) => {
    
    if (res) {
      // alertText.text("New Recipe added Successfully");
      // redirect to view recipe
      console.log(res);
    }
  });
});

/* function runValidation() {
  //  const recipe = [];
  if (title !== "" && ingredients !== "" && method !== "") {
    newRecipe();
  } else {
    alertText.text("Please check if all required information has been filled");
  }
} */


// eslint-disable-next-line max-len
// bring both functions together --- grab the data as array and check against the array and then-- display and error

/* function runCheck() {
  if (title !== "" && ingredients !== "" && method !== "") {
    newRecipe();
  } else {
    alertText.text("Please check if all required information has been filled");
  }
}

function submitRecipe(event) {
  event.preventDefault();
  runCheck();
}
 */

// $("#newRecipe").on("click", (submit));
// $("#newRecipe").on("click", runValidation);
// document.getElementByID("submit").addEventListener("click", submitRecipe);
// $(document).on("submit", "#newRecipe", submit);
// });


/*

    $("#add-btn").on("click", function(event) {
      event.preventDefault();
      var newCharacter = {
        name: $("#name").val().trim(),
        role: $("#role").val().trim(),
        age: $("#age").val().trim(),
        forcePoints: $("#force-points").val().trim()
      };

      // Question: What does this code do??
      $.post("/api/characters", newCharacter)
        .then(function(data) {
          console.log("add.html", data);
          alert("Adding character...");
        });
    });
 */
