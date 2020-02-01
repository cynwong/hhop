$(document).ready(() => {
  const alertText = $("#alert-text");
  // Update existing recipe
  //
  //
  // Delete recipe -- Only user submitted
  function delete() {
    $.ajax({
      method: "DELETE",
      url: `/api/delete/${id}`,
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

  $(document).on("delete", "#delete", delete);
});
