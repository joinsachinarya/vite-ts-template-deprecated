const express = require("express");
const homeRoute = require("./routes/home");
const loginRoute = require("./routes/login");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(homeRoute);
app.use(loginRoute);

app.listen(4000, (req, res) => {
  console.log("Server listening at port 4000");
});
