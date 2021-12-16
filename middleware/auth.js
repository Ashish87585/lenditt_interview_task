const jwt = require("jsonwebtoken");
const db = require("../db/database");

exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "login first"
      })
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await db.users.findOne({id: decodedData.id});
    
    next();
  } catch (error) {
    console.log(error);
  }
};