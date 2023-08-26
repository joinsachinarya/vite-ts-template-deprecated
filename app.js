const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("../client"));

app.get("/api/data", (req, res) => {
  const data = { message: "Hello from the server!" };
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
