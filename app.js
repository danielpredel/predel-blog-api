var express = require("express");
var path = require("path");
var logger = require("morgan");
var port = process.env.PORT || 3000;
const dbConnection = require("./src/configs/db");
dbConnection();

var usersRouter = require("./src/routes/user.routes");
var postRouter = require("./src/routes/post.routes");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/posts", postRouter);

app.listen(port, () => {
  if (process.env.ENV && process.env.ENV === "DEV") {
    console.log(`App listening on port ${port}`);
    console.log(`http://localhost:${port}`);
  }
});
