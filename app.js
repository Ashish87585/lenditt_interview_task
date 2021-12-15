const express = require("express");
const passport = require("passport")
const dotenv = require("dotenv");
const app = express();

//config
dotenv.config({ path: "config/config.env" });

require("./auth/passport");

const port = 8080;
app.use(passport.initialize());
app.use(express.json());

require("./db/database");

const user = require("./routes/users");

app.use("/api/v1", user);

app.listen(port, (req, res) => {
  console.log(`server is running on http://localhost:${port}`);
});
