import winston from 'winston'
import { __dirname } from '../utils.js'
const { combine, timestamp, json } = winston.format
const LEVEL = Symbol.for('level')

const filterOnly = (level) => {
  return winston.format(info => {
    if (info[LEVEL] === level) {
      return info
    }
  })()
}

const loggerHandler = (req, res) => {
  return winston.createLogger({
    format: combine(
      timestamp(),
      json()
    ),
    transports: [
      new winston.transports.Console({ level: 'info' }),
      // new winston.transports.File({ filename: 'debug.log', level: 'debug', format: filterOnly('debug') }),
      new winston.transports.File({ filename: `${__dirname}/logs/info.log`, format: filterOnly('info') }),
      new winston.transports.File({ filename: `${__dirname}/logs/warn.log`, format: filterOnly('warn') }),
      new winston.transports.File({ filename: `${__dirname}/logs/error.log`, format: filterOnly('error') })
    ]
  })
}

export default loggerHandler
