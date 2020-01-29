const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const passport = require("passport");
const flash = require("flash");
const session = require("express-session");

const { forwardAuthenticated } = require("./config/auth");

const app = express();
const PORT = process.env.PORT || 8080;

// Passport configuration
require("./config/passport")(passport);

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express Session
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true,
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Flash
app.use(flash());

// Express Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.errors = req.flash("errors");
  next();
});

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
app.get("/", forwardAuthenticated, (_, res) => res.render("index", {
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
