// const userService = require("../controllers/users");

// module.exports = basicAuth;

// async function basicAuth(req, res, next) {
//   // make authenticate path public
//   if (req.path === "/users/authenticate") {
//     return next();
//   }

//   // check for basic auth header
//   if (
//     !req.headers.authorization ||
//     req.headers.authorization.indexOf("Basic ") === -1
//   ) {
//     return res.status(401).json({ message: "Missing Authorization Header" });
//   }

//   // verify auth credentials
//   const base64Credentials = req.headers.authorization.split(" ")[1];
//   const credentials = Buffer.from(base64Credentials, "base64").toString(
//     "ascii"
//   );
//   const [username, password] = credentials.split(":");
//   const user = await userService.authenticate({ username, password });
//   if (!user) {
//     return res
//       .status(401)
//       .json({ message: "Invalid Authentication Credentials" });
//   }

//   // attach user to request object
//   req.user = user;

//   next();
// }
const decryptPass = require("../service/index.js");
const authenticate = require("../controllers/users");
const jwt = require("jsonwebtoken");
const users = [
  {
    id: 1,
    username: "test",
    password: "test",
    firstName: "Test",
    lastName: "User",
  },
];

async function userAuth(req, res, next) {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];

    if (token) {
      const decryptedToken = decryptPass.decryptPass(token);
      console.log("ddd =>", decryptedToken);
      const tokenVerify = jwt.verify(decryptedToken, "dummy");
      console.log("tokenVerify", tokenVerify);
      if (tokenVerify) {
        const { userid } = tokenVerify;
        req.tokenId = { userid };

        // const userData = users.find((u) => u.id == userid);
        next();
        // if (userData?.isBlock !== true) {
        //   next();
        // } else {
        //   res.status(401).send({ msg: "Your are block by admin", code: 402 });
        // }
      }
    } else {
      res.status(401).send({ msg: "Your Token Is Not Authorized", code: 401 });
    }
  } catch (err) {
    console.log("Error in check auth", err);
    res.status(500).json({ msg: "Your token is expire", code: 501 });
  }
}
module.exports = { userAuth: userAuth };
