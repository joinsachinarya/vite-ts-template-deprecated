const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  let texFileMessage = fs.readFileSync("message.txt", "utf-8");
  res.send(
    `<form method="POST" action="/message" onsubmit="document.getElementById('username').value=localStorage.getItem('username')">
    <input type="text" name="message" placeholder="Type message">
    <button type="submit">Send</button>
    </form>
    <div>
    <p id="username"></p>
    ${texFileMessage}
    </div>`
  );
});

router.post("/message", (req, res) => {
  let msg = req.body.message;
  fs.appendFileSync("message.txt", msg + "\n");
  res.redirect("/");
});
module.exports = router;
