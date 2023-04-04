const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/user.js");
require('./passport.js')
dotenv.config();

mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("CONNECTED TO MONGO DB");
});
app.use(cors({
  origin: process.env.URL_CLIENT
}));
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser());
app.use(express.json());

//ROUTES
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.listen(process.env.PORT, () => {
  console.log("Server is running")
});



// app.use('/', (req, res) => { res.send('app run')})
// const port = process.env.PORT || 8888
// app.listen(port, () => { console.log("Server is running")})