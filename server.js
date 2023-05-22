// required dependencies
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// express and port set up
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers if needed
const hbs = exphbs.create({ helpers });

// set up session
const sess = {
  secret: "betsyrossmuseum",
  cookie: {
    maxAge: 3600000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// tell app to use the associated modules and routes
app.use(session(sess));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use("/bulma", express.static(__dirname + "/node_modules/bulma/css/"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

// use force true when running for very first time and only then

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
