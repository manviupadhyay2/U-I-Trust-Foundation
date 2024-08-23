const jwt = require('jsonwebtoken');

const generateToken = async (user) => {
  const payload = {
    user: {
      id: user.id,
      role: user.role
    }
  };

  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  // console.log(token);
  token = token.split(' ')[1];
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = { generateToken, verifyToken };
