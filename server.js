import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import MYSQLStore from "express-mysql-session";

const dbconfig = require("./dbconfig");
const sessionStore = new MYSQLStore(dbconfig);
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(
  session({
    secret: "portfoliosessionsecretcode",
    store: sessionStore,
    resave: false,
    saveUninitialized: true
  })
);

var server = app.listen(process.env.PORT || 8888, () => {
  console.log("express portfolio server started");
});

app.engine("html", require("ejs").renderFile);
app.set("views", __dirname + "/view");

import router from "./router/main";
app.use("/", router);
