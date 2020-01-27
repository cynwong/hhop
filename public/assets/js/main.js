$(document).ready(() => {
  const search = $("#search").val.trim();

  function seachRecipe() {
    $.ajax({
      url: "/api/search",
      type: "GET",
      data: { search },
    }).then(() => {
      window.location.href = "/search";
    });
  }
  $(document).on("submit", "#searchForm", seachRecipe);
});
