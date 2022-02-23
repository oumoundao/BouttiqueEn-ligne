exports.getSigninForm = (req, res, next) => {
    res.render("signin.pug")
  }
  
  exports.deleteSession = (req, res, next) => {
    req.logout()
    res.redirect("/")
  }