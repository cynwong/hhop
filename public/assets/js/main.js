$(document).ready(() => {
  function searchRecipe(event) {
    event.preventDefault();
    const search = $("#searchText").val().trim();
    const path = "/recipe/search/";
    const notice = $("#noResult");
    $.ajax({
      url: path.concat(search),
      type: "GET",
    }).then((res) => {
      window.location.href = path.concat(search);
      if(res.length === 0) {
        notice.text("No result");
      }
    });
  }

  $("#searchForm").on("submit", searchRecipe);
});
