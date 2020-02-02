/* eslint-disable no-undef */
// $(document).ready(() => {

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
  // event.stopPropagation();
  alert("Hell break loose.");
  $.ajax({
    method: "DELETE",
    url: `/recipe/${id}`,
    data,
    id: this,
  })
    .then((Res) => {
      try {
        res.json(Res);
      } catch (err) {
        console.log(err);
      }
    });
}

$("#delete").click(deleteRecipe);

// });
