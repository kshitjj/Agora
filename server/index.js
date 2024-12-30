const express = require('express');
const { userRouter } = require('./routes/user.routes');
const app = express();
const port = 3001;
const mongoose = require('mongoose');
require('dotenv').config();

//middleware for parsing the data
app.use(express.json());

app.use('/api/v1/user', userRouter);

async function main() {
    await mongoose.connect(process.env.DATABASE_URL);
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`)
    })
}

main()

//Commented Routes till ported onto mongoose

// // Routes

// // Add a new user
// app.post("/users", async (req, res) => {
//     const { username, password, name, email } = req.body;
//     await usersCol.insertOne({ username, password, name, email });
//     res.status(201).send("User added successfully.");
// });

// // View items in a user's cart
// app.get("/cart/:username", async (req, res) => {
//     const { username } = req.params;
//     const items = await buyCol.find({ username }).project({ _id: 0 }).toArray();
//     res.json(items);
// });

// // Delete an item from the cart
// app.delete("/cart/:buyId", async (req, res) => {
//     const buyId = parseInt(req.params.buyId);
//     await buyCol.deleteOne({ buy_id: buyId });
//     res.send("Item deleted from cart.");
// });

// // Add an item to the cart
// app.post("/cart", async (req, res) => {
//     const { username, product_id } = req.body;
//     const count = await buyCol.countDocuments({ username, product_id });

//     if (count === 0) {
//         const buy_id = Math.floor(Math.random() * 10000);
//         await buyCol.insertOne({ buy_id, username, product_id });
//         res.send("Item added to cart.");
//     } else {
//         res.status(409).send("Item already in cart.");
//     }
// });

// // Fetch all products
// app.get("/products", async (req, res) => {
//     const products = await productsCol.find().project({ _id: 0 }).toArray();
//     res.json(products);
// });

// // Get details of a specific product
// app.get("/products/:productId", async (req, res) => {
//     const { productId } = req.params;
//     const product = await productsCol.findOne({ product_id: productId }, { projection: { _id: 0 } });
//     if (product) {
//         res.json(product);
//     } else {
//         res.status(404).send("Product not found.");
//     }
// });

// // Setup sample data
// app.post("/setup", async (req, res) => {
//     await usersCol.insertOne({ username: "sample_user", password: "sample_password", name: "Sample User", email: "sample@example.com" });

//     await productsCol.insertMany([
//         { product_id: "1", product_name: "Product A", price: 100, seller: "Seller 1", description: "Description of Product A" },
//         { product_id: "2", product_name: "Product B", price: 150, seller: "Seller 2", description: "Description of Product B" }
//     ]);

//     await buyCol.insertOne({ buy_id: 101, username: "sample_user", product_id: "1" });
//     res.send("Sample data created.");
// });

// // Start the server
// app.listen(port, async () => {
//     await connectToDatabase();
//     console.log(`Server running at http://localhost:${port}`);
// });
