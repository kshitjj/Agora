const { Schema, default: mongoose } = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    email: { type : String, unique : true, required: true },
    username: { type : String, unique : true, required: true },
    name: String,
    password: { type : String, required: true }
})

const productSchema = new Schema({
    name: { type: String, required: true, trim: true },
    description: String,
    seller: { type: String, required: true },
    price: { type : Number, required: true }
})

const cartSchema = new Schema({
    productId: { type: ObjectId, required: true },
    sellerId: { type: ObjectId, required: true }
})

const userModel = mongoose.model("user", userSchema);
const productModel = mongoose.model("product", productSchema);
const cartModel = mongoose.model("cart", cartSchema);

module.exports = {
    userModel,
    productModel,
    cartModel
}