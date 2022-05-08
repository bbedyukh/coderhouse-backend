import { JWT } from '../config/config.js'
import jwt from 'jsonwebtoken'

export const current = (req, res) => {
  const { user } = req
  res.send({ status: 'success', payload: user })
}

export const register = (req, res) => {
  res.send({ status: 'success', message: 'Signed up' })
}

export const login = (req, res) => {
  const { user } = req

  const token = jwt.sign(user, JWT.SECRET)

  res.cookie(JWT.COOKIE, token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000
  })

  res.cookie('sessionCookie', 'boom', {
    maxAge: 60 * 60 * 1000
  })

  res.send({ status: 'success', payload: { user } })
}

export const logout = (req, res) => {
  res.clearCookie(JWT.COOKIE)
  res.clearCookie('sessionCookie')
  res.json({ message: 'Logged out' })
}
