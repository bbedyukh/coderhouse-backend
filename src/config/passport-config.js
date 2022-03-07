import passport from 'passport'
import local from 'passport-local'
import jwt from 'passport-jwt'
import { JWT, PORT } from './config.js'
import User from '../dao/models/User.js'
import { cookieExtractor } from '../utils.js'
import Role, { ROLES } from '../dao/models/Role.js'
import loggerHandler from '../middlewares/loggerHandler.js'
import { mail, transport } from '../services/mailService.js'
const logger = loggerHandler()

const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJwt = jwt.ExtractJwt

const initializePassport = () => {
  passport.use('signup', new LocalStrategy({ passReqToCallback: true, usernameField: 'email', session: false }, async (req, username, password, done) => {
    try {
      const { firstName, lastName, email, phone, prefix, address, age } = req.body
      if (!req.file) return done(null, false, { message: 'Couldn\'t upload avatar.' })

      console.log('phone', phone)

      const userFound = await User.findOne({ email })
      if (userFound) return done(null, false, { message: 'User already exists.' })

      const newUser = new User({
        firstName,
        lastName,
        email,
        password: await User.encryptPassword(password),
        username,
        phone: prefix + phone,
        address,
        age: parseInt(age),
        avatar: `${req.protocol}://${req.hostname}:${PORT}/uploads/${req.file.filename}`,
        role: await Role.findOne({ name: ROLES.USER })
      })

      const savedUser = await newUser.save()

      await transport.sendMail(mail(savedUser))

      return done(null, savedUser)
    } catch (err) {
      logger.error(err)
      return done(err)
    }
  }))

  passport.use('signin', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
    try {
      const userFound = await User.findOne({ email: username }).populate('role')
      if (!userFound) return done(null, false, { message: 'Username not found.' })

      const matchPassword = await User.comparePassword(password, userFound.password)
      if (!matchPassword) return done(null, false, { message: 'Username or password invalid.' })

      return done(null, { email: userFound.email, role: userFound.role.name, avatar: userFound.avatar })
    } catch (err) {
      logger.error(err)
      return done(err)
    }
  }))

  passport.use('jwt', new JWTStrategy({ jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), secretOrKey: JWT.SECRET }, async (jwtPayload, done) => {
    try {
      const userFound = await User.findOne({ email: jwtPayload.email }).populate('role')
      if (!userFound) return done(null, false, { message: 'User not found.' })

      return done(null, { email: userFound.email, role: userFound.role.name, avatar: userFound.avatar })
    } catch (err) {
      logger.error(err)
      return done(err)
    }
  }))

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser(async (id, done) => {
    console.log('deserializeUser', id)
    const result = await User.findById({ _id: id })
    done(null, result)
  })
}

export default initializePassport
