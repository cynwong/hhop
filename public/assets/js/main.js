$(document).ready(() => {
  function searchRecipe(event) {
    event.preventDefault();
    const search = $("#searchText").val().trim();
    const path = "/recipe/search/";
    $.ajax({
      url: path.concat(search),
      type: "GET",
    }).then(() => {
      window.location.href = path.concat(search);
    });
  }

  $("#searchForm").on("submit", searchRecipe);
});
