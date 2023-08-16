const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.send(
    `<form method="POST" action="/login" onsubmit="localStorage.setItem('username', document.getElementById('username').value)"><input type="text" name="username" id="username" placeholder="Type username"><button type="submit">Log in</button></form>`
  );
});

router.post("/login", (req, res) => {
  console.log(`Logged in!`);
  res.redirect("/");
});
module.exports = router;
