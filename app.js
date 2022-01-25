// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const { application } = require("express");

// internal routes
const loginRouter = require("./router/loginRouter");

// internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/common/errorHandler");

const app = express();
dotenv.config();

// database connection
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true, // mongoose recomendation for connection url perser
    useUnifiedTopology: true, // mongoose recomendation for server discover and montoring engine
  })
  .then(() => console.log("database connection successful!"))
  .catch((error) => console.log(error));

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use("/", loginRouter);
//app.use("/users", userRouter);
//app.use("/inbox", inboxRouter);

// error handling
// 1. 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("Application listening to port: " + process.env.PORT);
});
