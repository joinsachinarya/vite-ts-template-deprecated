const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.send(
    `<form method="POST" action="/home"><input type="text" name="username" placeholder="Type username"><button type="submit">Log in</button></form>`
  );
});

router.post("/login", (req, res) => {
  console.log("Logged in!");
  res.redirect("/");
});
module.exports = router;
