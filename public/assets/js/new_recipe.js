// $(document).ready(() => {

const title = $("#newTitle");
const ingredients = $("#newIngredients");
const method = $("#newMethod");
const credit = $("#newCredit");
const source = $("#newSource");
const addImage = $("#newImage");
const alertText = $("#alert-text");
// const submit = $("#submit");

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
// eslint-disable-next-line max-len
// bring both functions together --- grab the data as array and check against the array and then-- display and error
function runCheck() {
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


// $("#newRecipe").on("click", (submit));
// $("#newRecipe").on("click", "#submit", submitRecipe);

// document.getElementByID("submit").addEventListener("click", submitRecipe);
// $(document).on("submit", "#newRecipe", submit);
// });
