//   ---  mount-modules  ---
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

//   ---  mount-routes  ---
const userRoutes = require("./routes/user");

dotenv.config({ path: "./.env" });

//   ---  variables  ---
const app = express();

//   ---  middlewares  ---
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1/user/", userRoutes);

//   ---  routes  ---
app.get("/", (req, res) => {
	res.end("Hello from the Server Side!!!\nServer is working FiNe..!");
});

//   ---  exports  ---
module.exports = app;
