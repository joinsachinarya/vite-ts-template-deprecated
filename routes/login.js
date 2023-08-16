const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.send(
    `<form method="POST" action="/login" onsubmit="localStorage.setItem('username', document.getElementById('username').value)"><input type="text" name="usernameLoginPage" id="username" placeholder="Type username"><button type="submit">Log in</button></form>`
  );
});

router.post("/login", (req, res) => {
  let username = req.body.usernameLoginPage;
  console.log(`Logged in as ${username}!`);
  res.redirect("/");
});
module.exports = router;
