const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authModel = require("../models/auth");
const secret_key = "my_secret";

const signUp = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(req.body.password, salt);
  try {
    const newUser = await new authModel({
      ...req.body,
      password: hashPassword,
    });
    const user = await newUser.save();
    res.json({
      user: user,
      message: "A user added successfully",
    });
  } catch (e) {
    res.json({
      message: "Error occured " + e,
    });
  }
};

const login = async (req, res) => {
  const { emailId, password } = req.body;

  try {
    const user = await authModel.findOne({ emailId: emailId });
    if (!user) {
      return res.json({
        message: "User not found",
      });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (isValidPassword) {
      const token = jwt.sign(
        { id: user._id, email: user.emailId },
        secret_key,
        { expiresIn: "12h" }
      );
      res.json({
        message: "User login Successfull",
        token: token,
      });
    } else {
      res.json({
        message: "Not Valid User",
        token: "",
      });
    }
  } catch (e) {
    res.json({
      message: "Error Occured" + e,
    });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Logout Successfully",
  });
};

const authController = {
  signUp,
  login,
  logout,
};

module.exports = authController;
