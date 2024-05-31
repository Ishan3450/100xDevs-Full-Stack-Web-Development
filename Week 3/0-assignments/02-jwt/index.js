const jwt = require("jsonwebtoken");
const jwtPassword = "secret";
const zod = require("zod");

/**
 * Generates a JWT for a given username and password.
 *
 * @param {string} username - The username to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the username and password are valid.
 *                        Returns null if the username is not a valid email or
 *                        the password does not meet the length requirement.
 */
function signJwt(username, password) {
  const usernameSchema = zod.string().email();
  const passwordSchema = zod.string().min(6);

  let response = usernameSchema.safeParse(username);
  if (!response.success) {
    return null;
  }

  response = passwordSchema.safeParse(password);
  if (!response.success) {
    return null;
  }

  return jwt.sign({ username: username, password: password }, jwtPassword);
}

/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */
function verifyJwt(token) {
  try {
    const decodedToken = jwt.verify(token, jwtPassword);
    // console.log(decodedToken);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
 *                         Returns false if the token is not a valid JWT format.
 */
function decodeJwt(token) {
  const decodedToken = jwt.decode(token); // decoding doesn't requires password or the secret key
  // console.log(decodedToken);

  if (decodedToken) {
    return true;
  }
  return false;
}

// const token = signJwt("ishan@gmail.com", "admin123");
// verifyJwt(token);
// console.log(decodeJwt(token));

module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
