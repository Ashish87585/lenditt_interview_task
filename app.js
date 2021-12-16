const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cookieParser = require("cookie-parser");

//config
dotenv.config({ path: "config/config.env" });

const port = 8080;
app.use(cookieParser());
app.use(express.json());

require("./db/database");

const user = require("./routes/users");

app.use("/api/v1", user);

app.listen(port, (req, res) => {
  console.log(`server is running on http://localhost:${port}`);
});
