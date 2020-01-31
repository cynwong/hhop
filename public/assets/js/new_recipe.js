$(document).ready(function() {

var title = $("#newTitle").val().trim(); 
var Ingredients = $("#newIngredients").val().trim();
var Method = $("#newMethod").val().trim();
var Credit = $("#newCredit").val().trim();
var Source = $("#newSource").val().trim();
var addImage = $("#newImage").val().trim();

$(document).on("submit", "#newRecipe", addRecipe);

}