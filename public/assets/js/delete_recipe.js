/* eslint-disable no-undef */
const title = $("#newTitle");
const ingredients = $("#newIngredients");
const method = $("#newMethod");
const credit = $("#newCredit");
const source = $("#newSource");
const addImage = $("#newImage");
const isPvt = $("isPvt");

const data = {
  title: title.val(),
  ingredients: ingredients.val(),
  method: method.val(),
  creditTo: credit.val(),
  source: source.val(),
  photo: addImage.val(),
  isPvt: isPvt.val(),
};
// Delete
function deleteRecipe() {
  // eslint-disable-next-line no-alert
  alert("debug 1 --- Your recipe will be deleted");
  $.ajax({
    method: "DELETE",
    url: `/recipe/${id}`,
    data,
    id: this,
  })
    .then(() => {
      console.log("debug 2");
      try {
        res.json();
      } catch (err) {
        console.log(err);
      }
    });
}

$("#delete").click(deleteRecipe);
