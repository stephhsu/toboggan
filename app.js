const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const userRoutes = require("./src/routes/users.routes.js");
const collectionRoutes = require("./src/routes/collections.routes.js");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/users", userRoutes.router);
app.use("/collections", collectionRoutes.router);

app.get("/", (req, res) => {
  res.send("Hello World! this is a test");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
