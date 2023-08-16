const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
const users = [];

router.get("/login", (req, res) => {
  res.send(
    `<form method="POST" action="/login"><input type="text" name="username" placeholder="Type username"><button type="submit">Log in</button></form>`
  );
});

router.post("/login", (req, res) => {
  let username = req.body.username;
  users.push(username);
  console.log(`Logged in as ${username}`);
  // console.log(users);
  res.redirect("/");
});
module.exports = router;
