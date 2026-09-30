import { BrevoClient } from "@getbrevo/brevo";

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

export const sendVerificationEmail = async (email, code) => {
  const response = await brevo.transactionalEmails.sendTransacEmail({
    sender: {
      name: "SignalHaive",
      email: process.env.BREVO_SENDER_EMAIL,
    },

    to: [
      {
        email,
      },
    ],

    subject: "Verify your SignalHaive email",

    textContent: `Your SignalHaive verification code is ${code}. This code expires in 10 minutes.`,

    htmlContent: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        padding: 40px 20px;
        color: #1f2937;
      ">

        <h2 style="
          color: #15803d;
          margin-bottom: 24px;
        ">
          Verify your SignalHaive email
        </h2>

        <p>
          Thank you for creating an account with SignalHaive.
        </p>

        <p>
          Please use the verification code below to verify your email address:
        </p>

        <div style="
          margin: 30px 0;
          padding: 20px;
          background: #f0fdf4;
          border-radius: 12px;
          text-align: center;
        ">
          <h1 style="
            letter-spacing: 8px;
            font-size: 32px;
            margin: 0;
            color: #15803d;
          ">
            ${code}
          </h1>
        </div>

        <p>
          This code expires in <strong>10 minutes</strong>.
        </p>

        <p style="
          margin-top: 30px;
          color: #6b7280;
          font-size: 14px;
        ">
          If you did not create this account, you can safely ignore this email.
        </p>

        <p style="
          margin-top: 30px;
          color: #9ca3af;
          font-size: 12px;
        ">
          © ${new Date().getFullYear()} SignalHaive
        </p>

      </div>
    `,
  });

  console.log("Verification email sent:", response.messageId);

  return response;
};

export const sendPasswordResetEmail = async (email, resetUrl) => {
  const response =
    await brevo.transactionalEmails.sendTransacEmail({
      sender: {
        name: "SignalHaive",
        email: process.env.BREVO_SENDER_EMAIL,
      },

      to: [
        {
          email,
        },
      ],

      subject: "Reset your SignalHaive password",

      textContent: `We received a request to reset your SignalHaive password.

Click this link to reset your password:
${resetUrl}

This link expires in 10 minutes.

If you did not request a password reset, you can safely ignore this email.`,

      htmlContent: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 40px 20px;
          color: #1f2937;
        ">

          <h2 style="
            color: #15803d;
            margin-bottom: 24px;
          ">
            Reset your SignalHaive password
          </h2>

          <p>
            We received a request to reset your SignalHaive password.
          </p>

          <p>
            Click the button below to create a new password:
          </p>

          <div style="margin: 30px 0;">
            <a
              href="${resetUrl}"
              style="
                display: inline-block;
                padding: 14px 24px;
                background: #15803d;
                color: white;
                text-decoration: none;
                border-radius: 8px;
                font-weight: bold;
              "
            >
              Reset Password
            </a>
          </div>

          <p>
            This link expires in <strong>10 minutes</strong>.
          </p>

          <p style="
            margin-top: 30px;
            color: #6b7280;
            font-size: 14px;
          ">
            If you did not request a password reset,
            you can safely ignore this email.
          </p>

          <p style="
            margin-top: 30px;
            color: #9ca3af;
            font-size: 12px;
          ">
            © ${new Date().getFullYear()} SignalHaive
          </p>

        </div>
      `,
    });

  console.log("Password reset email sent:", response.messageId);

  return response;
};