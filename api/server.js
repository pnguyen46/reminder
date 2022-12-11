const express = require("express");
const app = express();
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoute = require("./routes/main");
//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

//Connect To Database
connectDB();

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

app.use("/api", mainRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
