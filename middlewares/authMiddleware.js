const jwt = require("jsonwebtoken");
const authModel = require("../models/auth");
const secret_key = "my_secret";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json({
      messaage: "User not authenticated",
    });
  }
  try {
    jwt.verify(token, secret_key);
    const userId = jwt.decode(token);
    const user = await authModel.findById(userId.id);
    req.user = user;
  } catch (e) {
    return res.json({
      messaage: "User not authenticated",
    });
  }

  next();
};

module.exports = authMiddleware;
