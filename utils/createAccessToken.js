const jwt = require("jsonwebtoken");


module.exports.createAccessToken = function createAccessToken(_id) {
    // const userpower= md5(User_Type);
    const maxAge = 3 * 24 * 60 * 60;
    const Token = jwt.sign({ _id }, process.env.JWT_KEY, {
        expiresIn: maxAge
    });
    return Token;
}