// Check user authentication
module.exports = {
  // do not allowed user to view without authentication
  checkAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) return next();
    // if not authenticated,
    return res.redirect("/user/login");
  },
  // do not allowed logged-in user to access the page
  forwardAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) return next();
    return res.redirect("/user");
  },
};
