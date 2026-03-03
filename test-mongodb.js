/**
 * MongoDB Connection Test Script
 * Run: node test-mongodb.js
 */

const { MongoClient } = require("mongodb");

// Your MongoDB Atlas connection string
const MONGODB_URI = "mongodb+srv://Vercel-Admin-atlas-yellow-bell:Shivam_%23%21123@atlas-yellow-bell.1ennr99.mongodb.net/contactDB?retryWrites=true&w=majority";

async function testConnection() {
  console.log("🔄 Testing MongoDB Atlas Connection...\n");
  
  const client = new MongoClient(MONGODB_URI, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  });

  try {
    // Connect to MongoDB
    console.log("📡 Connecting to MongoDB Atlas...");
    await client.connect();
    console.log("✅ Connected successfully!\n");

    // Get database and collection
    const db = client.db("contactDB");
    const collection = db.collection("messages");

    // Test insert
    console.log("📝 Inserting test document...");
    const testDoc = {
      name: "Test User",
      email: "test@example.com",
      message: "This is a test message",
      createdAt: new Date(),
    };
    
    const result = await collection.insertOne(testDoc);
    console.log(`✅ Document inserted! ID: ${result.insertedId}\n`);

    // Verify insertion
    console.log("🔍 Verifying insertion...");
    const insertedDoc = await collection.findOne({ _id: result.insertedId });
    
    if (insertedDoc) {
      console.log("✅ Document found in database:");
      console.log(insertedDoc);
    }

    // Clean up - delete test document
    await collection.deleteOne({ _id: result.insertedId });
    console.log("\n🗑️ Test document cleaned up\n");

    console.log("🎉 ALL TESTS PASSED! MongoDB is working correctly.");

  } catch (err) {
    console.error("❌ MongoDB Connection Error:");
    console.error(err.message);
    
    if (err.message.includes("ECONNREFUSED")) {
      console.log("\n🔧 Fix: Add IP 0.0.0.0/0 in MongoDB Atlas → Network Access");
    }
    if (err.message.includes("querySrv")) {
      console.log("\n🔧 Fix: Check cluster name in URI");
    }
    if (err.message.includes("Authentication failed")) {
      console.log("\n🔧 Fix: Check username and password in URI");
    }
    
    process.exit(1);
  } finally {
    await client.close();
    console.log("\n🔌 Connection closed.");
  }
}

testConnection();

