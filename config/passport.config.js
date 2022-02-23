const passport = require("passport")
const { app } = require("../app")
const { getUserById, findByEmail } = require("../queries/users.queries")

const LocalStrategy = require("passport-local").Strategy

app.use( passport.initialize() )
app.use( passport.session() )


passport.serializeUser( (user, done) => {
  done(null, user._id)
})

passport.deserializeUser( async (id, done) => {
  try {
    const user = await getUserById(id)
    done(null, user)
  } catch (error) {
    done(error, null)
  }
} )

passport.use("local", new LocalStrategy( { usernameField: "email" }, async (email, password, done) => {

  try {
    //Vérifier à l'aide des queries si le User existe (email).
    const user = await findByEmail(email)
    if(user) {
        //Vérifier que le User qui existe a aussi le même password que celui entré par le user.
        const match = user.comparePassword(password)
        if(match) {
          //L'authentification dois fonctionner et laisser le User passer
          done(null, user)
        } else {
          done(null, false, { message : "Wrong email or password" })
        }
    }
    else {
      done(null, false, { message : "Wrong email or password" })
    }
    
  } catch (error) {
    done(error, null)
  }

  //Objectif final
  //done(null, user)

} ))