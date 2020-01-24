// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 8080;

const userRoutes = require("./routes/user_routes");
const favouriteRoute = require("./routes/favourite_routes");
const recipeRoute = require("./routes/recipe_routes");

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// add static folder.
app.use("assets", express.static("public/assets"));

// Home page
app.get("/", (_, res) => res.render("index"));

// apis
app.get("/api/users", userRoutes);
app.get('api/favourites', favouriteRoute);
app.get("/api/recipe", recipeRoute);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

app.get("...", function () {
  console.log("hello");
});
