// imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.DB_URI;

// database connection
const promise = mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
promise.then(() => {
  console.log("Connected on the database!");
});
mongoose.set("strictQuery", false);

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false,
  })
);

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

// static pages
app.use("/pages", express.static("./client/pages"));
app.use("/assets", express.static("./client/assets"));
app.use("/", express.static("./client/"));
app.use(express.static("uploads"));

// route prefix
app.use("/", require("./routes/route"));
app.use("/users", require("./routes/users_routes"));
app.use("/products", require("./routes/products_routes"));

// listen port
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
