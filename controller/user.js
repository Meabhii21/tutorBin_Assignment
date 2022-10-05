const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../model/users.models");

/**
 * SignUp API Functionality
 */
const userSignup = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const checkUserExist = await Users.findOne({ email: email });
    if (checkUserExist) {
      return res.json({
        status: 403,
        message: "User already exist",
      });
    }
    console.log("password", password);
    await Users.create({
      name: name,
      email: email,
      password: password,
    });
    return res.json({
      status: 200,
      message: "User Signed up successfuly",
    });
  } catch (err) {
    console.log(`[userSignup] API error:${err}`);
    return res.json({
      status: 500,
      message: "Something went wrong",
      err: err,
    });
  }
};

/**
 * LogIn API Functionality
 */
const userLogin = async (req, res) => {
  try {
    const password = req.body.password;
    const email = req.body.email;
    const userData = await Users.findOne({ email: email });
    if (userData) {
      const checkPasswordMatch = bcrypt.compareSync(
        password,
        userData.password
      );
      if (checkPasswordMatch) {
        const userKey = process.env.JWT_SECRET_KEY;
        const expireTime = process.env.JWT_EXPIRE_LIMIT;
        let token = jwt.sign(
          {
            userId: userData._id,
            email: userData.email,
          },
          userKey,
          {
            expiresIn: expireTime,
          }
        );
        return res.json({
          status: 200,
          message: "User logged in successfully",
          token: token,
        });
      } else {
        return res.json({
          status: 200,
          message: "Incorrect Passowrd.Please enter the correct password",
        });
      }
    }
    return res.json({
      status: 403,
      message:
        "user doesn't exist. Please Signup to access tutorbin exclusive features.",
    });
  } catch (err) {
    console.log(`[userLogin] API error:${err}`);
    return res.json({
      status: 500,
      message: "something went wrong",
      err: err,
    });
  }
};
module.exports = { userLogin, userSignup };
