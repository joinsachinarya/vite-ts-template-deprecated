const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
  res.send(
    `<form method="POST" action="/message"><input type="text" name="message" placeholder="Type message"><button type="submit">Send</button></form>`
  );
});

module.exports = router;
