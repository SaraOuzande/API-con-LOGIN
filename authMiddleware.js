function isAuthenticated(req, res, next) {
    if (req.session && req.session.loggedIn) {
      return next();
    }
    res.redirect('/'); 
  }
  
  module.exports = { isAuthenticated };
  