const {createUser} = require("../queries/users.queries")

exports.getSignupForm = (req, res, next) => {
  res.render("signup.pug")
}

exports.createUser = async (req, res, next) => {
  try {
    console.log("req.body", req.body); 
    await createUser(req.body)
    res.redirect("/")
  } catch (error) {
    res.render("signup.pug", { error: error.message })
  }
}
