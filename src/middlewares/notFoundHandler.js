const notFoundHandler = (req, res) => {
  // console.log(`[${date}] - ${req.method} ${req.path} not implemented.`)
  res.status(404).json({ error: -2, description: `Path ${req.path} method ${req.method} not implemented.` })
}

export default notFoundHandler
