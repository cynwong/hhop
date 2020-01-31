module.exports = {
  checkAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.flash("error_msg", "Please log in first.");
    return res.redirect("/user/login");
  },
  forwardAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) return next();
    return res.redirect("/user");
  },
};
