const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.get("/", (req, res) => {
  let texFileMessage = fs.readFileSync("message.txt", "utf-8");
  res.send(
    `<form method="POST" action="/message"><p>${texFileMessage}</p><input type="text" name="message" placeholder="Type message"><button type="submit">Send</button></form>`
  );
});

router.post("/message", (req, res) => {
  let msg = req.body.message;
  fs.writeFileSync("message.txt", msg);
  res.redirect("/");
});
module.exports = router;
