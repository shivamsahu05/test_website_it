import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

let cachedClient = null;
let cachedDb = null;

async function getDb() {
  if (cachedDb && cachedClient?.topology?.isConnected()) return cachedDb;
  
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) throw new Error("MONGODB_URI not defined");
  
  cachedClient = new MongoClient(MONGODB_URI, {
    maxPoolSize: 10,
    minPoolSize: 1,
    maxIdleTimeMS: 30000,
    serverSelectionTimeoutMS: 5000,
  });
  
  await cachedClient.connect();
  cachedDb = cachedClient.db("contactDB");
  return cachedDb;
}

let transporter = null;
function getTransporter() {
  if (transporter) return transporter;
  
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
  
  if (!EMAIL_USER || !EMAIL_PASSWORD) return null;
  
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user: EMAIL_USER, pass: EMAIL_PASSWORD },
  });
  return transporter;
}

export async function POST(request) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
  
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 200, headers });
  }
  
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Use POST" }), { status: 405, headers });
  }

  let body;
  try { 
    body = await request.json(); 
  } catch { 
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers }); 
  }

  const { name, email, message } = body;
  
  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: "All fields required" }), { status: 400, headers });
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: "Invalid email format" }), { status: 400, headers });
  }

  try {
    const db = await getDb();
    const result = await db.collection("messages").insertOne({ 
      name: name.trim(), 
      email: email.trim().toLowerCase(), 
      message: message.trim(), 
      createdAt: new Date() 
    });

    const mailer = getTransporter();
    if (mailer) {
      mailer.sendMail({
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_USER,
        subject: `New Contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      }).catch(console.error);
    }

    return new Response(
      JSON.stringify({ message: "Message saved successfully", id: result.insertedId }), 
      { status: 201, headers }
    );
  } catch (err) {
    console.error("MongoDB connection error:", err);
    return new Response(JSON.stringify({ error: "Database connection failed" }), { status: 500, headers });
  }
}

