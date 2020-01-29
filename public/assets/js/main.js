$(document).ready(() => {
  
  function searchRecipe(event) {
    event.preventDefault();
    console.log("1");
    const search = $("#searchText").val().trim();
    console.log(search);
   
    $.ajax({
      url: "/api/search/:title",
      type: "GET",
      data: search ,
    }).then((res) => {
     console.log("search success");
    });
  }
  $("#searchForm").on("submit", searchRecipe);
});
