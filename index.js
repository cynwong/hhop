const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

const userRoutes = require("./routes/user_routes");
const favouriteRoute = require("./routes/favourite_routes");
const recipeRoute = require("./routes/recipe_routes");
// const hbsRoute = require("./routes/hbs_routes");

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
app.engine(".hbs", exphbs({
  defaultLayout: "main",
  extname: "hbs", // shorten the handlebars extension
  layoutsDir: path.resolve(__dirname, "views", "layouts"),
}));
app.set("view engine", ".hbs");
app.set("views", path.resolve(__dirname, "views"));

// add static folder.
app.use(express.static("public"));

// add route for handlebars template
app.get("/", (_, res) => res.render("index", {
  title: "Recipe Lovers!",
  isMain: true,
}));
app.get("/signup", (_, res) => res.render("signup", {
  title: "Recipe Lovers!: Register new user",
  isLogin: true,
}));
app.get("/login", (_, res) => res.render("login", {
  title: "Recipe Lovers!: User login",
  isLogin: true,
}));
app.get("/user", (_, res) => res.render("user", {
  title: "Recipe Lovers!: User dashboard",
  isMain: true,
}));
app.get("/search", (_, res) => res.render("search", {
  title: "Recipe Lovers!: Search",
  isMain: true,
  isSearch: true,
}));
app.get("/recipe", (_, res) => res.render("recipe", {
  title: "Recipe Lovers!",
  isMain: true,
  isSearch: true,
}));

// apis
app.get("/api/users", userRoutes);
app.get("api/favourites", favouriteRoute);
app.get("/api/recipe", recipeRoute);

// misc routes redirect back to homepage.
app.get("/*", (_, res) => res.redirect("/"));

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
