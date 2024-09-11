import db from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import { generateEmailHtml } from '@/components/email-template';
import base64url from 'base64url';

export async function POST(request) {
  try {
    const { name, email, password, role } = await request.json();

    // Check if the user already exists
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: 'User already exists',
        },
        { status: 409 },
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a verification token
    const rawToken = uuidv4();
    const token = base64url.encode(rawToken);

    // Create the new user in the database
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        verificationToken: token,
      },
    });
    if (role === 'FARMER') {
      const userId = newUser.id;
      const subject = 'Complete Your Onboarding';
      const description =
        'Thank you for creating an account with us. Please click the link below to complete your onboarding process.';
      const linkText = 'Verify Your Account';
      const redirectUrl = `onboarding/${userId}?token=${token}`;

      // Set up the transporter for Nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail', // or any other service,
        host: 'smtp.gmail.com',
        secure: false,
        port: 587,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: 'ammarahmed10000@gmail.com',
          pass: 'qvly wxkb bnri nabl',
        },
      });

      try {
        // Send the email
        const emailHtml = generateEmailHtml({
          name,
          redirectUrl,
          linkText,
          description,
          subject,
        });
        const sendMailResponse = await transporter.sendMail({
          from: '<ammarahmed10000@gmail.com>', // Sender address
          to: email, // List of receivers
          subject: subject, // Subject line
          html: emailHtml,
        });

        console.log('Email sent successfully:', sendMailResponse);
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
      }
    }

    return NextResponse.json(
      {
        data: newUser,
        message: 'User created successfully',
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json(
      {
        error,
        message: 'Server error: Something went wrong',
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const users = await db.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error('Failed to get users:', error);
    return NextResponse.json(
      { message: 'Failed to get users', error },
      { status: 500 },
    );
  }
}
