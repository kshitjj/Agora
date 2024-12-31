const { Router } = require('express');
const { productModel } = require('../db');
const productRouter = Router();




productRouter.get('/products', async function(req, res){
    const response = await productModel.find()

    res.json(response)
})

module.exports = {
    productRouter: productRouter
}