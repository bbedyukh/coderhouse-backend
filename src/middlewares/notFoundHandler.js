import loggerHandler from './loggerHandler.js'
const logger = loggerHandler()

const notFoundHandler = (req, res) => {
  logger.warn(`${req.method} method in path ${req.path} not implemented.`)
  res.status(404).json({ status: 'error', description: `${req.method} method in path ${req.path} not implemented.` })
}

export default notFoundHandler
