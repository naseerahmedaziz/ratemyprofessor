// This middleware will be used to authenticate the admin user before allowing them to access the admin routes.
const jwt = require('jsonwebtoken');

const generateToken = (role) => {
    const payload = {
        user: 'admin@admin.com',
        role: role
    };

    return jwt.sign(payload, 'MY_SECRET_KEY');
};

const adminAuthMiddleware = (req, res, next) => {
  const { email, password } = req.body;

  if (email === 'admin@admin.com' && password === '12345678') {
      const token = generateToken('admin');
      res.json({ token });
  } else {
      res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = { adminAuthMiddleware };

