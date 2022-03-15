const crypto = require("crypto");

function encryptData(data) {
  try {
    const algorithm = "aes-192-cbc";
    const password = "dummy";
    const key = crypto.scryptSync(password, "salt", 24);
    const iv = Buffer.alloc(16, 0);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  } catch (e) {
    console.log(e);
    return null;
  }
}

function decryptPass(encryptedPassword) {
  try {
    const algorithm = "aes-192-cbc";
    const password = "dummy";
    const key = crypto.scryptSync(password, "salt", 24);
    const iv = Buffer.alloc(16, 0);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const encrypted = encryptedPassword;
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (e) {
    return null;
  }
}
module.exports = {
  encryptData,
  decryptPass,
};
