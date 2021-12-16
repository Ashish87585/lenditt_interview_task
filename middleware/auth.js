const jwt = require("jsonwebtoken");
const db = require("../db/database");

exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return next(new ErrorHandler("Please login first", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await db.users.findOne({id: decodedData.id});
    
    next();
  } catch (error) {
    console.log(error);
  }
};