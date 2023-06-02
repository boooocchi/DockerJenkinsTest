const express = require("express");
const app = express();
const path = require("path");
const sessions = require("express-session");
const { srcDir, rootDir } = require("./util/path-helper");
const cookieParser = require("cookie-parser");

var session;

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(srcDir, "views"));

app.get("/", (req, res) => {
  session = req.session;
  if (session && session.userid) {
    res.send(`Welcome User <a href='/logout'>click to logout</a>`);
  } else {
    res.render("edit");
  }
});

app.use(
  sessions({
    secret: "mysuperhimitsukey",

    saveUninitialized: true,

    cookie: { maxAge: 3600000 },

    resave: false
  })
);

app.post("/user", (req, res) => {
  if (req.body) {
    session = req.session;
    session.userid = req.body.user;
    console.log(req.session);
    res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
  } else {
    res.send("Invalid username or password");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
app.listen(8080, () => {
  console.log(`Server started (http://localhost:8080)!`);
});
