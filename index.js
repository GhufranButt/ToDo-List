const express = require("express");
const app = express();
const db = require("./db");
const bcrupt = require("bcrypt");
// const userRoutes = require("./routes/Users");
// // const { authenticateUser } = require("./middleware");

// require("./Models/sequelize");
// app.use("/register", require("./routes/Users"));
// app.use("/login", require("./routes/Users"));
app.use(express.json());

// app.use("/catogeries", require("./routes/Categories"));
app.use("/", require("./routes/Task"));
// app.use(userRoutes);

app.listen(3004, () => {
  console.log("App is running on 3004 Port");
});

// const os = require("os");

// console.log(os.cpus().length);
