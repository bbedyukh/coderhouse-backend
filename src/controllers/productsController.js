import ProductsService from '../services/productsService.js'
import dotenv from 'dotenv'
dotenv.config()
const service = new ProductsService()

export const getProducts = async (req, res) => {
  service.getProducts()
    .then(products => {
      res.status(200).json({ status: 'success', payload: products })
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ status: 'error', message: err.message })
    })
}

export const getProduct = async (req, res) => {
  const productId = req.params.id
  service.getProduct(productId)
    .then(product => {
      res.status(200).json({ status: 'success', payload: product })
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ status: 'error', message: err.message })
    })
}

export const createProduct = async (req, res) => {
  const file = req.file
  const product = req.body
  product.picture = `${req.protocol}://${req.hostname}:${process.env.PORT}/uploads/${file.filename}`
  service.createProduct(product)
    .then(result => {
      res.status(200).json({ status: 'success', payload: result })
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ status: 'error', message: err.message })
    })
}

export const updateProduct = async (req, res) => {
  const productId = req.params.id
  const file = req.file
  const product = req.body
  product.picture = `${req.protocol}://${req.hostname}:${process.env.PORT}/uploads/${file.filename}`
  service.updateProduct(productId, product)
    .then(result => {
      res.status(200).json({ status: 'success', message: 'Product has been updated successfully.' })
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ status: 'error', message: err.message })
    })
}

export const deleteProduct = async (req, res) => {
  const productId = req.params.id
  service.deleteProduct(productId)
    .then(result => {
      res.status(200).json({ status: 'success', message: 'Product has been deleted successfully.' })
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ status: 'error', message: err.message })
    })
}
