$(document).ready(() => {
  const search = $("#searchText").val().trim();

  // function searchResult(response) {
  //   console.log("response");
  //   $("#resultDisplay").empty();
  // const recipeTitle = response.title;
  // const recipeImg = response.photo;

  //   response.forEach((element, i) => {
  //     const row = $("<div>").addClass("col-md-4");
  //     const card = $("<div>").attr({
  //       class: "card mb-4 box-shadow",
  //     });
  //     const recipeImg = $("<img>").attr({
  //       class: "card-img-top",
  //       src: "",
  //     });
  //     const recipediv = $("<div>").addClass("card-body");
  //     const recipeTitle = $("<h5>").addClass("card-title").text(element.title);
  //     const btnLine = $("<div>").addClass("d-flex justify-content-between align-items-center")
  //     const btndiv = $("<div>").addClass("btn-group");
  //     const viewBtn = $("<button>").attr({
  //       type: "button",
  //       id: "viewBtn",
  //       class: "btn btn-sm btn-outline-secondary",
  //     }).text("View");
  //     const favBtn = $("<button>").attr({
  //       type: "button",
  //       id: "favBtn",
  //       class: "btn btn-sm btn-outline-secondary",
  //     });
  //     const favIcon = $("<i>").addClass("fab fa-gratipay");
  //     const favNum = $("<small>").addClass("text-muted");
  //     const favNo = $("<span>").attr({
  //       id: "favNo",
  //     });
  //   });
  // }
  function searchRecipe(event) {
    event.preventDefault();
    $.ajax({
      url: "/api/search",
      type: "GET",
      data: { search },
    }).then(() => {
      window.location.href = "/search";
      // searchResult(response);
    });
  }
  $(document).on("submit", "#searchForm", searchRecipe);
});
