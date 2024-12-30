const { Router } = require('express');
const userRouter = Router();
const { userModel, cartModel } = require('../db');
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

userRouter.get('/cart', userMiddleware, async function(req, res){
    const userId = req.body;
    
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