import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import base64url from 'base64url';
import nodemailer from 'nodemailer';

import { generateEmailHtml } from '@/components/email-template';
export async function PUT(request) {
  try {
    //extract the data
    const { email } = await request.json();
    //Check if the user Already exists in the db
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: `User Not Found`,
        },
        { status: 404 },
      );
    }
    //Generate Token
    // Generate a random UUID (version 4)
    const rawToken = uuidv4();
    console.log(rawToken);
    // Encode the token using Base64 URL-safe format
    const token = base64url.encode(rawToken);
    const linkText = 'Reset Password';
    const userId = existingUser.id;
    const name = existingUser.name;
    const redirectUrl = `reset-password?token=${token}&id=${userId}`;
    const description =
      'Click on the following link in order to reset your password. Thank you';
    const subject = 'Password Reset - Bazar Ecommerce';

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
      return NextResponse.json(
        {
          data: sendMailResponse,
          message: 'Email Sent Successfully',
        },
        { status: 201 },
      );
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      return NextResponse.json(
        {
          emailError,
          message: 'Failed To sent email',
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: 'Server Error: Something went wrong',
      },
      { status: 500 },
    );
  }
}
