$(document).ready(() => {
  function searchRecipe(event) {
    event.preventDefault();
    console.log("1");
    const search = $("#searchText").val().trim();
    const path = "/recipe/search/";
    // console.log(search);
    $.ajax({
      url: path.concat(search),
      type: "GET",
    }).then((res) => {
      console.log("search success");
      window.location.href = path.concat(search);;
      console.log(window.location.href);
      console.log("the results on client side is: ", res);
    });
  }

  $("#searchForm").on("submit", searchRecipe);
});
