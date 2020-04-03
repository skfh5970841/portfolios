import express from "express";
const router = express.Router();

const mysql = require("mysql");
const dbconfig = require("../dbconfig.js");
const connection = mysql.createConnection(dbconfig);
const cors = require("cors");

var HTTPStatus = require("http-status-codes");

connection.connect();
setInterval(() => {
  connection.query("select 1");
}, 5000);

router.get("/", (req, res) => {
  res.render("home.html");
});

router.get("/api/data", (req, res) => {
  connection.query("select * from portfolio", (error, results, field) => {
    res.send(results);
  });
});

router.get("/api/userdata", (req, res) => {
  connection.query("select * from userinfo", (error, results, field) => {
    res.send(results);
  });
});

router.use(cors());
router.options("/api/login", cors());

router.post("/api/login/", (req, res) => {
  const query = `select * from userinfo where userid = '${req.body.username}'`;
  connection.query(query, (error, results, field) => {
    if (error) {
      console.log(error);
      res.send({
        code: 400,
        failed: "error ocurred"
      });
    } else {
      console.log(results);
      if (results === undefined) {
        res.status(HTTPStatus.OK).send("id_fail");
      } else {
        if (results[0].userpassword === req.body.password) {
          res.status(HTTPStatus.OK).send("success");
          req.session.user = {
            userid: results[0].userid
          };
        } else {
          res.status(HTTPStatus.OK).send("pw_fail");
        }
      }
    }
  });
});

router.options("/api/editdata", cors());

router.post("/api/editdata", (req, res) => {
  const { id, editImageurl, editName, editContent } = req.body;
  const query = `UPDATE portfolio SET name='${editName}', image_url='${editImageurl}', content='${editContent}' WHERE id=${id}`;
  connection.query(query, (error, results, field) => {
    if (error) {
      console.log(error);
      res.send("error occured");
    } else {
      res.send("success");
    }
  });
  console.log(id, editImageurl, editName, editContent);
});

router.options("/api/adddata", cors());

router.post("/api/adddata", (req, res) => {
  const { addImgurl, addName, addContent } = req.body;
  console.log(addImgurl);
  const query = `INSERT INTO portfolio(id, portfolio.name, image_url, content) VALUES (((SELECT MAX(id)+1 FROM portfolio AS temp)), '${addName}', '${addImgurl}', '${addContent}')`;
  connection.query(query, (error, results, field) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      res.send("success");
    }
  });
});

router.get("/portfolio", (req, res) => {
  console.log(req.session.user);
  if (req.session.user) {
    res.render("main.html");
  } else {
    res.redirect("/");
  }
});
router.get("/login", (req, res) => {
  res.render("login.html");
});
router.post("/login", (req, res) => {
  var userid = req.body.userid;
  var password = req.body.password;
  const query = `select * from userinfo where userid = '${userid}'`;
  console.log(query);
  connection.query(query, (error, results, field) => {
    if (error) {
      console.log(error);
      res.send({
        code: 400,
        failed: "error ocurred"
      });
    } else {
      if (results === undefined) {
        res.send(
          "<span>There is no matched userid here Please confirm your id and try again</span><br/><a src='/login'></a>"
        );
      } else {
        if (results[0].userpassword === password) {
          req.session.user = {
            userid: results[0].userid
          };
          res.redirect("/portfolio");
        }
      }
    }
  });
});

router.get("/logout", (req, res) => {
  delete req.session;
  res.redirect("/");
});

export default router;
