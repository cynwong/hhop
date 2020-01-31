$(document).ready(() => {

  $(document).on("delete", "#delete", DELETE);


  // Update existing recipe






  // Delete recipe -- Only user submitted
  function DELETE() {
    var listItemData = $(this).parent("#").parent("#").data("recipe");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/delete/" + id
    })
      .then((res) => {
        if (res) {
          // check if user posted recipe


        } else {
          alertText.text("You do not have authority to delete this recipe");
        }
      });
  }

});
