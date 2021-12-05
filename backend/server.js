const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
var HTTP_PORT = 8000;

// Start server
app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

// API endpoints
app.get("/", (req, res, next) => {
  res.json({ message: "Ok" });
});

require("./app/routes/agile.route.js")(app);

// Default response for any other request
app.use(function (req, res) {
  res.status(404);
});
