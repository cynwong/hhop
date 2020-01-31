$(document).ready(() => {
  function searchRecipe(event) {
    event.preventDefault();
    const search = $("#searchText").val().trim();
    $.ajax({
      url: "/api/search/:title",
      type: "GET",
      data: search,
    // }).then((res) => {
    });
  }

  $("#searchForm").on("submit", searchRecipe);
});
