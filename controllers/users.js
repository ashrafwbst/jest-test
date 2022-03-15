const jwtSign = require("../helpers/jwtSign");
const users = [
  {
    id: 1,
    username: "test",
    password: "test",
    firstName: "Test",
    lastName: "User",
  },
];

async function authenticate({ username, password }) {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    const { password, ...userWithoutPassword } = user;
    const token = jwtSign.signJwt(
      userWithoutPassword.id,
      userWithoutPassword.username,
      userWithoutPassword.password
    );
    const payload = {
      userWithoutPassword: userWithoutPassword,
      token: token,
    };
    return payload;
  }
}

async function getAll() {
  return users.map((u) => {
    const { password, ...userWithoutPassword } = u;
    return userWithoutPassword;
  });
}

module.exports = {
  authenticate,
  getAll,
};
