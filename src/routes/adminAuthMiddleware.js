
// This middleware will be used to authenticate the admin user before allowing them to access the admin routes.

const adminAuthMiddleware = (req, res, next) => {
  const { username, password } = req.body; // Get the username and password from the request body

  // Check if the username and password are admin and adminpassword respectively
  if (username === "admin" && password === "adminpassword") {
    next(); // If yes, proccede to admin routes
  } else {
    res.status(401).json({ message: "Unauthorized access" });
  }
};

module.exports = adminAuthMiddleware;

