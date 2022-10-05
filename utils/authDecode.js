const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const authHeader = String(req.headers["authorization"] || "");
    if (authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7, authHeader.length);
      const payload = jwt.decode(token);
      if (payload) {
        req.isAuth = true;
        req.userId = payload.userId;
        return next();
      } else {
        req.isAuth = false;
      }
    } else {
      req.isAuth = false;
      return next();
    }
  } catch (err) {
    console.log(`[authDecode] error:${err}`);
    throw err;
  }
};
