const db = require("../db/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const sendToken = require("../middleware/utils");
const Op = Sequelize.Op;

const register = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  try {
    const userData = req.body;

    if (!userData.name || !userData.mobile || !userData.email || !userData.password) {
      return res.json({
        success: false,
        message: "All field are required"
      })
    }

    if (userData.password) {
      userData.password = bcrypt.hashSync(String(userData.password), salt);
    }
    const isAllReadyRegister = await db.users.findOne({
      where: {
        mobile: userData.mobile,
        email: userData.email,
      },
    });

    if (isAllReadyRegister) {
      return res.json({
        success: false,
        message: "User Allready register",
      });
    }

    const newUser = await db.users.create(userData);

    return res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      body: {
        message: "Something went wrong",
      },
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password) {
      return res.json({
        success: false,
        message: "All field are required"
      })
    }

    const user = await db.users.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.json({
        success: false,
        message: "Email is not found",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log("isPasswordMatch", isPasswordMatch);
    if (!isPasswordMatch) {
      return res.json({
        success: false,
        message: "Invalid credential",
      });
    }

    const jwtToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET
    );

    sendToken(jwtToken, user, res)

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      body: {
        message: "Something went wrong",
      },
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await db.users.findAll();

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      body: {
        message: "Something went wrong",
      },
    });
  }
};

const logout = async (req, res) => {
  try {
    await res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged out success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      body: {
        message: "Something went wrong",
      },
    });
  }
};

module.exports = {
  register,
  login,
  getUser,
  logout,
};
