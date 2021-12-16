//Create token and save in cookie

const sendToken = (jwtToken, user, res) => {
  
    // option for cookie
    const options = {
      expires: new Date(
        Date.now + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
   res.status(200).cookie("token", jwtToken, options).json({
      success: true,
      user,
      jwtToken,
    });
  };
  
  module.exports = sendToken;
  