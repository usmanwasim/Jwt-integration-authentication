const User = require("../Schema/SignUp");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.header("jwt-token");

  if (!token) return res.status(400).send("Please Login First");
  try {
    // verify access token
    jwt.verify(token, process.env.jwtPrivateKey, async (err, decoded) => {
      if (err) {
        res.status(406).send("Expired Token");
      } else {
        // find user
        const user = await User.findOne({ _id: decoded?._id }).select(
          "-password"
        );
        if (!user) res.status(400).send("Invalid Token: User do not exist");
        // set user
        req.user = user;
        next();
      }
    });
  } catch (err) {
    console.log(err, "error in auth middleware");
  }
};

module.exports = auth;
