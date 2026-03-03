import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: NextRequest) {
  try {
    // Validate request method
    if (request.method !== 'POST') {
      return NextResponse.json(
        { message: 'Method not allowed' },
        { status: 405 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'All fields are required (name, email, message)' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create MySQL connection
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: Number(process.env.MYSQL_PORT) || 3306,
    });

    try {
      // Insert data into contacts table
      await connection.execute(
        'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
        [name, email, message]
      );

      return NextResponse.json(
        { message: 'Message sent successfully!' },
        { status: 200 }
      );
    } finally {
      // Always close the connection
      await connection.end();
    }
  } catch (error: any) {
    console.error('Database error:', error);
    
    // Handle specific error types
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      return NextResponse.json(
        { message: 'Database authentication failed' },
        { status: 500 }
      );
    }
    
    if (error.code === 'ER_NO_SUCH_TABLE') {
      return NextResponse.json(
        { message: 'Database table not found. Please set up the database.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Server error: ' + (error.message || 'Unknown error') },
      { status: 500 }
    );
  }
}

