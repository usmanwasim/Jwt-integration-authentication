const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

// const nodemailer = require("nodemailer");
// const multer = require("multer");
const userRoute = require("./routes/User");

const app = express();
const path = require("path");
const Port = process.env.PORT || 3090;

// middleware, Cors ,form body-parser,connect frontend to server
app.use(cors()); //cors for frontend compatibility
app.use(express.json()); // parse object data
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(express.static(path.join(__dirname, "./build"))); //link Public Ui\
app.use("/", userRoute);

// mongoDB Connection
mongoose.set("strictQuery", true); //for error in connection
mongoose
  .connect(
    "mongodb+srv://usman:8899@cluster0.9tsdnk0.mongodb.net/nodemailer?retryWrites=true&w=majority"
  )
  .then(() => console.log("DataBase Connection ......."))
  .catch((err) => console.log(err));

// for multer dir path to store data
// app.use("/uploads", express.static("./uploads")); // Link for multer
// Multer for the upload file
// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
//   },
// });
// const upload = multer({ storage: storage });

app.get("/*", function (req, res) {
  res.send("Route not found");
});

app.listen(Port, () => {
  console.log(`Current Server Running on Port ${Port}`);
});

// async function sendEmail({ data, img }) {
//   try {
//     let transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "mianusmanwasim@gmail.com",
//         pass: "pofjfasfffouyrgg",
//       },
//       tls: {
//         rejectUnAuthorized: false,
//       },
//     });
//     let mailOptions = {
//       from: "mianusmanwasim@gmail.com",
//       to: " bc210415459uwa@vu.edu.pk",
//       //sehrishshah0301@gmail.com",

//       subject: "Email With Attachments from",
//       html: `<h1>${data.Name}</h1><br><p>${data.Email}</p><br><p>${data.Contact}</p>`,
//       // attachment to send file hard-core
//       attachments: img,
//       //  [
//       //   {
//       //     filename: Date.now() + "file" + path.extname(img.originalname),
//       //     path: img.path,
//       //   },
//       // ],
//     };
//     const result = await transporter.sendMail(mailOptions);
//     return result;
//   } catch (error) {
//     return error;
//   }
// }
