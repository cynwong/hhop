
// $("#delete").click( deleteTodo ) => {
$("#delete").click(function (event) {
  const id = $(this).data("id");
  // if (this = authorId)
  // eslint-disable-next-line no-shadow
  function getRecipes() {
    // eslint-disable-next-line prefer-arrow-callback
    $.get("/recipe", function (data) {
      // eslint-disable-next-line no-undef
      recipe = data;
    });
  }
  // function deleteTodo(event) {
  event.stopPropagation();
  // const id = $(this).data("id");
  $.ajax({
    method: "DELETE",
    // eslint-disable-next-line prefer-template
    url: "/recipe/:" + id,
  }).then(getRecipes);
});
// eslint-disable-next-line no-unused-vars
function getRecipes() {
  // eslint-disable-next-line prefer-arrow-callback
  $.get("/recipe", function (data) {
    // eslint-disable-next-line no-undef
    recipe = data;
  });
}
