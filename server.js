const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require('cors');
const connectDB = require("./config/database");
const mainRoute = require("./routes/main");

app.use(cors());
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
