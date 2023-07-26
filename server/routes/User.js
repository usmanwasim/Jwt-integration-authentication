const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Schema/SignUp");
const Blacklist = require("../Schema/blacklist");
const auth = require("../Middleware/auth");

router.post("/signup", async (req, res) => {
  const user = req.body;
  try {
    const findUser = await User.findOne({ email: user?.email });
    if (findUser) {
      res.status(400).send("user Email already exist");
    }
    const Document = new User(user);
    await Document.generateHashedPassword();
    await Document.save();
    res.status(200).send("SignUp Successfully");
  } catch (err) {
    res.status(400).send("SignUp Faild");
  }
});

// post request to Nodemailer Email from
router.post("/login", async (req, res) => {
  try {
    // let paths = [];
    // req.files.forEach((item) => {
    //   paths.push({
    //     fileName: Date.now() + "file" + path.extname(item.originalname),
    //     path: item.path,
    //   });
    // });
    // const data = {
    //   data: {
    //     Name: Name,
    //     Contact: Contact,
    //     Email: Email,
    //   },
    //   // img: paths,
    // };

    // Call nodemailer function for send mail
    // sendEmail(data)
    //   .then((res) => {
    //     console.log("Email is sent ", res);
    //   })
    //   .catch((err) => {
    //     console.log("Error in mail sending", err);
    //   });
    //

    const { password, email } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).send("Invalid Email");
    }
    // compare password
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
      res.status(400).send("Invalid Password");
    }
    // JWT accessToken generation
    let accessToken = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.jwtPrivateKey,
      {
        expiresIn: "30s",
      }
    );
    // JWT accessToken generation
    let refreshToken = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.jwtPrivateKey,
      {
        expiresIn: "7d",
      }
    );
    await User.findOneAndUpdate(
      { email: email },
      { refreshToken: refreshToken },
      { new: true }
    );
    res.status(200).send(accessToken);
  } catch (error) {
    console.log(error);
    res.status(400).send("Login Faild");
  }
});

router.get("/verify", auth, (req, res, next) => {
  const user = req.user;
  if (user) {
    if (user?.role === "user") {
      res.status(201).send(false);
    } else {
      res.status(201).send(true);
    }
  }
});

// refresh token generation
router.get("/refresh", async (req, res) => {
  try {
    const token = req.header("jwt-token");
    // decode access token
    const decoded = jwt.decode(token, process.env.jwtPrivateKey);
    // find user
    const findUser = await User.findOne({ _id: decoded?._id }).select(
      "-password"
    );
    if (!findUser) res.status(400).send("Invalid Token: User do not exist");
    // verify refresh token
    const refrechTokenVerify = jwt.verify(
      findUser.refreshToken,
      process.env.jwtPrivateKey
    );
    if (!refrechTokenVerify) {
      res.status(400).send("Expired Refresh Token");
    }
    const checkBlacklist = await Blacklist.findOne({
      token: findUser?.refreshToken,
    });
    console.log(checkBlacklist, "checkBlacklist");
    if (checkBlacklist) res.status(400).send("Refresh Token is Blacklisted");

    // Generate access token
    const accessToken = jwt.sign(
      {
        _id: findUser?._id,
        name: findUser?.name,
      },
      process.env.jwtPrivateKey,
      {
        expiresIn: "30s",
      }
    );
    if (findUser?.role === "user") {
      res.status(200).json({ token: accessToken, role: false });
    } else {
      res.status(200).json({ token: accessToken, role: true });
    }
  } catch (error) {
    res.status(400).send("Regenerate Token Faild");
  }
});

router.get("/logout", auth, async (req, res) => {
  try {
    const user = req.user;
    const blacklisttoken = new Blacklist({ token: user?.refreshToken });
    await blacklisttoken.save();
    await User.findOneAndUpdate({ _id: user?._id }, { refreshToken: "" });
    res.status(200).send("Logout Successfully");
  } catch (error) {
    res.status(400).send("Logout Faild");
  }
});

module.exports = router;
