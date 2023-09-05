const express = require("express");
const AuthModel = require("../model/authenticationModel");
const jwt = require("jsonwebtoken");
JWT_KEY = process.env.JWT_KEY;
const userService = require("../service/userService");
const UserSessionModel = require("../model/userSessionModel");
const { createAccessToken } = require("../utils/createAccessToken");


module.exports.signup = async function singup(req, res) {
  try {
    let singupData = req.body;

    const user = await AuthModel.create(singupData);

    const session = await UserSessionModel.create({
      user: user._id,
    });

    const JWT_TOKEN_ACCESS = createAccessToken(session._id);

    res.set({ "x-access": JWT_TOKEN_ACCESS });
    res
      .status(200)
      .json({ message: "User Sigup Successfully", data: user, status: 200 });
  }
  catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

// module.exports.login = async function login(req, res) {
//   try {
//     const userData = req.body;
//     if (userData.email) {
//       let user = await AuthModel.findOne({ email: userData.email });
//       if (user) {
//         if (user.password === userData.password && user.email === userData.email) {
//           let uid = user["_id"];
//           let token = jwt.sign({ payload: uid }, JWT_KEY);
//           res.cookie("isLoggedIn", token, { httpOnly: true });
//           if (user.role == "Admin") {
//             return res.status(200).send({
//               message: "User Is Logged In",
//               status: 0,
//               data: user,
//             });
//           }
//           if (user.role == "Vendor") {
//             return res.status(200).send({
//               message: "User Is Logged In",
//               status: 1,
//               data: user,
//             });
//           }
//           if (user.role == "Customer") {
//             return res.status(200).send({
//               message: "User Is Logged In",
//               status: 2,
//               data: user,
//             });
//           }
//         } else {
//           res.status(403).send({
//             message: "Wrong Credentials",
//           });
//         }
//       } else {
//         res.status(403).send({
//           message: "User Not Found",
//         });
//       }
//     } else {
//       res.status(403).send({
//         message: "Email field is empty",
//       });
//     }
//   } catch (error) {
//     res.status(404).send({
//       message: error.message,
//     });
//   }
// };

module.exports.login = login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await AuthModel.findOne({ email });

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    // Check if the password matches
    if (user.password !== password) {
      return res.status(403).json({ message: "Wrong credentials" });
    }

    // Generate a new token
    const token = jwt.sign({ userId: user._id }, JWT_KEY, { expiresIn: "1h" });



    // const { JWT_TOKEN_ACCESS } = await userLoginService(user._id, req);
    const isSessionExist = await UserSessionModel.find({
      user: user._id,
    });
  
    if (isSessionExist.length !== 0) {
      await UserSessionModel.updateMany(
        {
          user: user._id,
        },
      );
    }
  
    const newSession = await UserSessionModel.create({
      user: user._id,
    });
    const JWT_TOKEN_ACCESS = createAccessToken(newSession._id);
    res.set({ "x-access": JWT_TOKEN_ACCESS });







    // If authentication is successful, create a user session
    // const userId = user._id; // Replace with the actual user ID
    // const userSession = await userService.createUserSession(userId);
    if (user.role == "Admin") {
      return res.status(200).send({
        message: "User Is Logged In",
        status: 0,
        data: user,
        JWT_TOKEN_ACCESS: JWT_TOKEN_ACCESS
      });
    }
    if (user.role == "Vendor") {
      return res.status(200).send({
        message: "User Is Logged In",
        status: 1,
        data: user,
        JWT_TOKEN_ACCESS: JWT_TOKEN_ACCESS
      });
    }
    if (user.role == "Customer") {
      return res.status(200).send({
        message: "User Is Logged In",
        status: 2,
        data: user,
        JWT_TOKEN_ACCESS: JWT_TOKEN_ACCESS
      });
    }

    //   res.status(200).json({ message: "Login successful", token });
    // } catch (error) {
    //   res.status(500).json({ message: "Internal Server Error" });
    // }

    // console.log("Token", JWT_TOKEN_ACCESS)

    // res.status(200).json({ message: "Login successful", JWT_TOKEN_ACCESS });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};


module.exports.logout = logout = async (req, res) => {
  try {
    const userSessionId = req.params.id;
    console.log(userSessionId)
    const userSession = await UserSessionModel.findOneAndDelete({ user: userSessionId });

    if (!userSession) {
      return res.status(403).send({
        message: "User Invalid",
        data: userSession
      });
    }

    // The rest of your code...

    res.status(200).json({ message: "User logged out successfully.", data: userSession, status: 200 });
  } catch (error) {
    res.status(404).send({
      message: error.message
    });
  }
};
