import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all fields.",
        },
        { status: 400 }
      );
    }

    // ===============================
    // Mail to You
    // ===============================

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: "rathinb745@gmail.com",
      replyTo: email,
      subject: `📩 New Portfolio Inquiry from ${name}`,

      html: `
      <div style="background:#02070B;padding:40px;font-family:Arial,sans-serif;color:white;">
        
        <div style="
            max-width:700px;
            margin:auto;
            background:#071018;
            border:1px solid rgba(82,202,86,.25);
            border-radius:20px;
            overflow:hidden;
        ">

          <div style="
            padding:30px;
            background:linear-gradient(90deg,#52ca56,#2d9130);
            color:#02070B;
          ">
              <h1 style="margin:0;font-size:28px;">
                New Portfolio Contact
              </h1>
          </div>

          <div style="padding:35px">

              <p style="font-size:18px;">
                  You have received a new inquiry through your portfolio website.
              </p>

              <table style="width:100%;margin-top:25px;border-collapse:collapse;">

                <tr>
                  <td style="padding:12px;font-weight:bold;color:#52ca56;">Name</td>
                  <td style="padding:12px;">${name}</td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:bold;color:#52ca56;">Email</td>
                  <td style="padding:12px;">${email}</td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:bold;color:#52ca56;">Message</td>
                  <td style="padding:12px;">
                    ${message}
                  </td>
                </tr>

              </table>

          </div>

        </div>

      </div>
      `,
    });

    // ===============================
    // Mail to Visitor
    // ===============================

    await transporter.sendMail({
      from: `"Rathin Bagchi" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting me!",

      html: `
      <div style="
          background:#02070B;
          padding:40px;
          font-family:Arial,sans-serif;
          color:white;
      ">

        <div style="
            max-width:700px;
            margin:auto;
            background:#071018;
            border-radius:20px;
            overflow:hidden;
            border:1px solid rgba(82,202,86,.25);
        ">

          <div style="
            padding:30px;
            text-align:center;
            background:linear-gradient(90deg,#52ca56,#2d9130);
          ">

            <h1 style="
                margin:0;
                color:#02070B;
                font-size:30px;
            ">
              Thank You!
            </h1>

          </div>

          <div style="padding:40px">

            <h2 style="color:#52ca56">
              Hello ${name},
            </h2>

            <p style="
                color:#d4d4d4;
                line-height:1.8;
                font-size:16px;
            ">
              Thank you for reaching out through my portfolio.
            </p>

            <p style="
                color:#d4d4d4;
                line-height:1.8;
                font-size:16px;
            ">
              I truly appreciate your interest. Your message has been received successfully, and I'll review it as soon as possible.
            </p>

            <p style="
                color:#d4d4d4;
                line-height:1.8;
                font-size:16px;
            ">
              You can expect a response from me shortly.
            </p>

            <div style="
                margin:40px 0;
                padding:20px;
                border-radius:12px;
                background:#0b1b12;
                border-left:4px solid #52ca56;
            ">

              <strong style="color:#52ca56">
                Your Message
              </strong>

              <p style="margin-top:12px;color:#ccc;">
                ${message}
              </p>

            </div>

            <p style="
                margin-top:40px;
                color:#d4d4d4;
            ">
              Best Regards,
            </p>

            <h2 style="
                color:#52ca56;
                margin-bottom:0;
            ">
              Rathin Bagchi
            </h2>

            <p style="color:#888">
              Full Stack Developer
            </p>

          </div>

        </div>

      </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while sending your message.",
      },
      {
        status: 500,
      }
    );
  }
}