// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const movieRoutes = require('./routes/movieRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/User');
const Otp = require('./models/Otp');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const sendMail = require('./config/sendmail.js');
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);

app.post("/otp", async (req, res) => {

  let { emailid } = req.body;
  console.log(emailid)
  if (!emailid) {
    return res.json({
      success: false, // Proceed to password change
      message: "email is required!"
    });
  }
  const user = await User.findOne({ emailid: emailid })
  if (!user) {
    return res.json({
      success: false, // Proceed to password change
      message: "emailid is not found!"
    });
  }
  async function generateOtp(email) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

    // Remove any existing OTP for the email
    await Otp.deleteMany({ email });

    // Create a new OTP entry
    await Otp.create({ email, otp });

    sendMail(otp, email)
    console.log(`OTP for ${email}: ${otp}`);
    res.json({ success: true, email })
  }
  generateOtp(emailid)

})

app.post("/verify", (req, res, next) => {
  try {
    let { emailid, otp } = req.body;
    console.log(otp)
    console.log(emailid)

    async function verifyOtp(email, inputOtp) {
      const otpRecord = await Otp.findOne({ email, otp: inputOtp });

      if (otpRecord) {
        console.log('OTP verified');
        // Remove the OTP document after verification
        await Otp.deleteOne({ _id: otpRecord._id });
        return res.json({ success: true, email });
      }
      else {
        console.log('Invalid or expired OTP');
        return res.json({
          success: false,
          message: 'Invalid or expired OTP'
        });
      }
    }
    verifyOtp(emailid, otp);
  } catch (error) {
    next(error)
  }

})

// change password

app.post("/forgot/password", (req, res) => {
  let { emailid, password } = req.body;

  if (!emailid || !password) {
    return res.json({
      success: false,
      message: "emailid && password is empty please fill now"
    })
  }
  else {
    const salt = bcrypt.genSaltSync(10);
    let update = User.findOneAndUpdate({ emailid }, { password: bcrypt.hashSync(password, salt) }, {
      new: true,
      upsert: true
    }).then((data) => {
      console.log(data);
      if (!data) {
        return res.json({
          success: false,
          message: "emailid && password is false please try again"
        })
      }
      else {
        res.json({ success: true, message: "password update successfully" })
      }
    })

  }
})


// DB + Server Start
const PORT = process.env.PORT || 5000;
mongoose.connect('mongodb://127.0.0.1:27017/moviedb'||process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
