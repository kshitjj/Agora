const { Router } = require('express');
const userRouter = Router();
const { userModel, cartModel, productModel } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userMiddleware } = require('../middlewares/user');
require('dotenv').config();

userRouter.post('/signup', async function(req, res){
    const { email, username, name, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 5);

    await userModel.create({
        email: email,
        username: username,
        name: name,
        password: hashedPassword
    });

    res.json({
        message: "You are signed up!"
    })
})

userRouter.post('/login', async function(req, res){
    const { username, password } = req.body;
    const response = await userModel.findOne({
        username: username,
    })

    if(bcrypt.compareSync(password, response.password.toString())){
        const token = jwt.sign({
            id: response._id.toString()
        }, process.env.JWT_SECRET);

        res.json({
            token
        })
    }else{
        res.status(403).json({
            message: "Incorrect Creds!"
        })
    }
})

userRouter.post('/product', userMiddleware, async function(req, res){
    const { name, description, price } = req.body;
    const userId = req.userId;
    await productModel.create({
        name: name,
        description: description,
        seller: userId,
        price: price
    })

    res.json({
        message: "Product added successfully"
    })
})


userRouter.post('/cart', userMiddleware, async function(req, res){
    const productId = req.body;
    const userId = req.userId;
    await cartModel.create({
        sellerId: userId,
        productId: productId
    })

    res.json({
        message: "Item successfully added to the cart!"
    })
})

userRouter.delete('/cart', userMiddleware, async function(req, res){
    const productId = req.body;   

    try {
        await cartModel.deleteOne({ productId });
        return res.json({
            message: "Item was successfully removed!"
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while removing the item.",
        });
    }
})

userRouter.get('/cart', userMiddleware, async function(req, res){
    const userId = req.userId;
    
    const response = await cartModel.find({
        userId
    });

    if(response.length === 0){
        res.json({
            message: "No items in cart"
        })
    }else{
        res.json({response})        
    }
})

module.exports = {
    userRouter: userRouter
}