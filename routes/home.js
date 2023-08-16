const express = require("express");
const fs = require("fs");

const router = express.Router();

router.get("/", (req, res) => {
  let texFileMessage = fs.writeFileSync("messages.txt", "msg");
  res.send(
    `<form method="POST" action="/message"><p>${texFileMessage}</p><input type="text" name="message" placeholder="Type message"><button type="submit">Send</button></form>`
  );
});

router.post("/message", (req, res) => {
  let msg = req.body;
  console.log(msg);
  res.redirect("/");
});
module.exports = router;
