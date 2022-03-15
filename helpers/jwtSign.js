const encryptData = require("../service/index.js");
const jwt = require("jsonwebtoken");
function signJwt(id, name, email, blockbyAdmin) {
  try {
    const payload = {
      userid: id,
      userEmail: email,
      userName: name,
    };
    const token = jwt.sign(payload, "dummy", {
      expiresIn: "24h",
    });
    const encryptedToken = encryptData.encryptData(token);
    console.log("Dsd =>", encryptedToken);
    if (encryptedToken) {
      return encryptedToken;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
}
module.exports = {
  signJwt,
};
