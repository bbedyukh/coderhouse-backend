import passport from "passport"
import fbStrategy from 'passport-facebook'
import { userModel } from '../models/User.js'
import dotenv from 'dotenv'
dotenv.config()

const FacebookStrategy = fbStrategy.Strategy

const initializePassportConfig = () => {
  passport.use('facebook', new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: 'https://d2da-2800-810-487-9071-8bea-2e94-6e5a-ce1e.ngrok.io/auth/facebook/callback',
    profileFields: ['emails']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      console.log(accessToken)
      console.log(profile)
      const user = await userModel.findOne({ email: profile.emails[0].value })
      done(null, user)
    } catch (err) {
      done(err)
    }
  }))

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  
  passport.deserializeUser((id, done) => {
    userModel.findById(id, done)
  })
}

export default initializePassportConfig