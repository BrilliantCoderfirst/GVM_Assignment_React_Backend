const AuthModel = require("../model/authenticationModel");
const UserSessionModel = require("../model/userSessionModel");


module.exports.createUserSession = async function createUserSession(userId) {
  try {
    // Find the AuthModel user by ID
    const user = await AuthModel.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Create a new user session and associate it with the user
    const userSession = new UserSessionModel({
      // Other user session data
      // ...

      // Associate with the AuthModel user
      user: user._id,
    });

    await userSession.save();
    return userSession;
  } catch (error) {
    throw error;
  }
}
