const jwt = require("jsonwebtoken");
const AuthModel = require('../model/authenticationModel');
const UserSessionModel = require("../model/userSessionModel");



module.exports.verifyUserToken = verifyUserToken = async (req, res, next) => {
  const authorizationToken = req.headers["authorization"];
  console.log("---auth---", req.Headers);


  const isBearerToken =
    authorizationToken && authorizationToken.startsWith("Bearer ");

  const accessToken = isBearerToken
    ? authorizationToken.replace("Bearer ", "")
    : null;

  if (accessToken) {
    try {
      const verifiedAccessToken = await jwt.verify(
        accessToken,
        process.env.JWT_KEY
      );
      const userSession = await UserSessionModel.findById(
        verifiedAccessToken._id // Use payload to access the user ID
      );

      if (!userSession.active) {
        return res.status(401).json({ message: "User session not active" });
      }

      const user = await AuthModel.findById(userSession.user);
      console.log("A", user);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user; // Attach user data to the request object
      req.userSession = userSession; // Attach user session data to the request object
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.log({ verifyTokenError: error });
      if (error && error.name === "TokenExpiredError") {
        const decodedToken = jwt.decode(accessToken);
        if (decodedToken) {
          await UserSessionModel.findByIdAndUpdate(
            decodedToken.payload,
            { active: false, deleted: true },
            { new: true }
          );
          return res.status(401).json({ message: "Access Token Expired." });
        }
        return res.status(500).json({ message: "Internal Server Error" });
      } else {
        return res.status(401).json({ message: "Invalid Token" });
      }
    }
  } else {
    return res.status(401).json({ message: "Access Token not provided" });
  }
};
