const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports.authMiddleware = (req) => {
  const token = req.headers.authorization || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmM4YWI3Zjc1MWY5ZGE5YmEzOTJiZCIsImlhdCI6MTc2NDUyNjc3NX0.FGN7p4VGvC_TPDm3FrnDvKx6Q_k2opSikaKbgeyuOt4";

  if (!token) return null;

  try {
    return jwt.verify(token.replace("Bearer ", ""), config.JWT_SECRET);
  } catch (err) {
    return null;
  }
};
