const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const session = require("express-session");

// get homepage setting
const {
  HomePageSettings,
  UnauthorizedPageSettings,
} = require("./config/page_settings");

// configure passport
const passport = require("./config/passport");

// setup express app
const app = express();
const PORT = process.env.PORT || 8080;

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express Session
app.use(session({
  secret: "secret code",
  resave: true,
  saveUninitialized: true,
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Set Handlebars.
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", ".hbs");
const helpers = {
  greaterThan: (v1, v2, options) => {
    if (v1 > v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  },
};
app.engine(".hbs", exphbs({
  defaultLayout: "main",
  extname: "hbs", // shorten the handlebars extension
  layoutsDir: path.resolve(__dirname, "views", "layouts"),
  helpers,
}));

// add static folder.
app.use(express.static("public"));

// --- add routes ---
// root route : Home page.
app.get("/", (req, res) => {
  const pageSettings = { ...HomePageSettings };
  if (req.isAuthenticated()) {
    pageSettings.username = req.user.name;
  }
  res.render("index", pageSettings);
});

// add /user routes
app.use("/user", require("./routes/user_routes"));
// add /recipe routes
app.use("/recipe", require("./routes/recipe_routes"));
// add /favourites routes
app.use("/favourite", require("./routes/favourite_routes"));

// 404 page
app.use("/404", (req, res) => {
  const pageSettings = { ...UnauthorizedPageSettings };
  if (req.user) {
    pageSettings.username = req.user.name;
  }
  res.render("not_authorized", pageSettings);
});

// misc routes redirect back to homepage.
app.get("/*", (_, res) => res.redirect("/"));

// Run the server
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
