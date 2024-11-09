const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://agora:agorian@cluster0.oxl4y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

// Collections
let usersCol, buyCol, productsCol;

// Connect to the database
async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db("Ecombase1");  // Replace with your database name
        usersCol = db.collection("users");
        buyCol = db.collection("buy");
        productsCol = db.collection("products");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}

// Add a new user
async function addNewUser(username, password, name, email) {
    const userData = { username, password, name, email };
    await usersCol.insertOne(userData);
    console.log("User added successfully.");
}

// View items in a user's cart
async function viewCartItems(username) {
    const items = await buyCol.find({ username }).project({ _id: 0 }).toArray();
    console.log("Cart Items:", items);
    return items;
}

// Delete an item from the cart
async function deleteItemFromCart(buyId) {
    await buyCol.deleteOne({ buy_id: buyId });
    console.log("Item deleted from cart.");
}

// Check for duplicates before adding to cart
async function isNoDuplicate(username, productId) {
    const count = await buyCol.countDocuments({ username, product_id: productId });
    return count === 0;
}

// Add an item to the cart
async function addToCart(username, productId) {
    const noDuplicate = await isNoDuplicate(username, productId);
    if (noDuplicate) {
        const buyId = Math.floor(Math.random() * 10000);
        const buyData = { buy_id: buyId, username, product_id: productId };
        await buyCol.insertOne(buyData);
        console.log("Item added to cart.");
    } else {
        console.log("Item already in cart.");
    }
}

// Fetch all products
async function fetchAllProducts() {
    const products = await productsCol.find().project({ _id: 0 }).toArray();
    console.log("All Products:", products);
    return products;
}

// Get details of a specific product
async function getProduct(productId) {
    const product = await productsCol.findOne({ product_id: productId }, { projection: { _id: 0 } });
    console.log("Product:", product);
    return product;
}

// Setup sample data in MongoDB collections
async function setupSampleData() {
    // Add a sample user
    await usersCol.insertOne({ username: "sample_user", password: "sample_password", name: "Sample User", email: "sample@example.com" });

    // Add sample products
    await productsCol.insertMany([
        { product_id: "1", product_name: "Product A", price: 100, seller: "Seller 1", description: "Description of Product A" },
        { product_id: "2", product_name: "Product B", price: 150, seller: "Seller 2", description: "Description of Product B" }
    ]);

    // Add a sample cart item
    await buyCol.insertOne({ buy_id: 101, username: "sample_user", product_id: "1" });
}

async function main() {
    await connectToDatabase();
    await setupSampleData();

    // Testing functions
    await addNewUser("new_user", "new_password", "New User", "newuser@example.com");
    await viewCartItems("sample_user");
    await deleteItemFromCart(101);
    await addToCart("sample_user", "2");
    await fetchAllProducts();
    await getProduct("1");

    // Close the database connection when done
    await client.close();
}

main().catch(console.error);
