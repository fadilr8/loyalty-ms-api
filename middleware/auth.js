const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.status(403).json('Unauthorized');

  const [, token] = authHeader?.split(' ');

  if (!token) return res.status(401).json('Unauthenticated');

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json('Forbidden');

    req.user = user;
    req.id = user.id;

    next();
  });
};

module.exports = auth;
