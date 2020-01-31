const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

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

// --- add routes ---
// root route : Home page.
app.get("/", (_, res) => res.render("index", {
  title: "Recipe Lovers!",
  isMain: true,
}));

// add /user routes
app.use("/user", require("./routes/user_routes"));
// add /recipe routes
app.use("/recipe", require("./routes/recipe_routes"));
// add /favourites routes
app.use("/favourites", require("./routes/favourite_routes"));


// misc routes redirect back to homepage.
app.get("/*", (_, res) => res.redirect("/"));

// Run the server
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
