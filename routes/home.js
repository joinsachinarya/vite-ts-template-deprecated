const express = require("express");
const fs = require("fs");

const router = express.Router();

router.get("/", (req, res) => {
  fs.readFile("message.txt", (err, data) => {
    if (err) {
      console.error(err);
    }
    res.send(
      `${data}
      <form method="POST" action="/message" onsubmit="document.getElementById('username').value=localStorage.getItem('username')">
      <input type="text" name="message" id="message" placeholder="Type message">
      <input type="hidden" name="username" id="username">
      <br/>
      <button type="submit">Send</button>
      </form>
      `
    );
  });
});

router.post("/message", (req, res) => {
  let msg = req.body.message;
  let uname = req.body.username;
  fs.writeFile("message.txt", `${uname}:${msg} `, { flag: "a" }, (err) => {
    err ? console.error(err) : res.redirect("/");
  });
});

module.exports = router;
