import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { name, email, phone, budget, message } = await req.json();

    if (!name || !email || !phone || !budget || !message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD, // App password
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.MY_EMAIL,
      to: process.env.MY_EMAIL,
      subject: `New Proposal Request from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Budget: ${budget}

Message:
${message}
      `,
    };

    // Send email
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err) => {
        if (err) reject(err);
        else resolve('Email sent');
      });
    });

    return NextResponse.json({
      success: true,
      message: 'Proposal request sent successfully!',
    });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send proposal request.' },
      { status: 500 }
    );
  }
}
