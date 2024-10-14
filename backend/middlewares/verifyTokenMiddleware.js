const jwt = require("jsonwebtoken");
const jwtSecret = "98fda@7s9f89saf98as8f!@#a8sdf@678!@#056456@63!@#$%";

const verifyTokenMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user_id = decoded.id; 
    req.email = decoded.email

    next(); 
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

module.exports = verifyTokenMiddleware;
