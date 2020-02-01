$(document).ready(() => {
  const alertText = $("#alert-text");
  // Update existing recipe
  //
  //
  // Delete recipe -- Only user submitted
  function deleteRecipe() {
    $.ajax({
      method: "DELETE",
      url: "/api/delete/",
    })
      .then((res) => {
        if (res) {
          // check if user posted recipe
          //
          //
        } else {
          alertText.text("You do not have authority to delete this recipe");
        }
      });
  }

  $(document).on("delete", "#delete", deleteRecipe);
});
