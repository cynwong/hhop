$(document).ready(() => {
 const alertText = $("#alert-text");
  // Update existing recipe
  //
  //
  // Delete recipe -- Only user submitted
  function DELETE() {
    const listItemData = $(this).parent("#").parent("#").data("recipe");
    const id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/delete/" + id
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

  $(document).on("delete", "#delete", DELETE);
});
