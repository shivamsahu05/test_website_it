
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  if (request.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // const connection = await mysql.createConnection({
    //   host: process.env.MYSQL_HOST,
    //   user: process.env.MYSQL_USER,
    //   password: process.env.MYSQL_PASSWORD,
    //   database: process.env.MYSQL_DATABASE,
    //   port: Number(process.env.MYSQL_PORT),
    // });
    

    await connection.execute(
      'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );

    await connection.end();
    
    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}


