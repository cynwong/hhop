const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 8080;

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
app.engine("hbs", exphbs({
  defaultLayout: "main",
  extname: "hbs", // shorten the handlebars extension
}));
app.set("view engine", "handlebars");

// add static folder.
app.use(express.static("public"));

// add route for handlebars template
app.get("/", (_, res) => res.render("index.hbs"));
app.get("/signup", (_, res) => res.render("signup.hbs"));
app.get("/login", (_, res) => res.render("login.hbs"));


// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
