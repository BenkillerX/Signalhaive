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
        margin: 0;
        padding: 40px 20px;
        background-color: #f8fafc;
        font-family: Arial, Helvetica, sans-serif;
      ">

        <div style="
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
        ">

          <!-- Header -->
          <div style="
            background-color: #0f172a;
            padding: 28px 32px;
          ">
            <div style="
              font-size: 24px;
              font-weight: 700;
              color: #ffffff;
            ">
              SignalHaive
            </div>
          </div>

          <!-- Content -->
          <div style="
            padding: 40px 32px;
          ">

            <p style="
              margin: 0 0 10px 0;
              font-size: 13px;
              font-weight: 600;
              letter-spacing: 1px;
              text-transform: uppercase;
              color: #64748b;
            ">
              Email verification
            </p>

            <h1 style="
              margin: 0;
              font-size: 30px;
              line-height: 1.25;
              font-weight: 700;
              color: #0f172a;
            ">
              Verify your email
            </h1>

            <p style="
              margin: 18px 0 0 0;
              font-size: 15px;
              line-height: 1.7;
              color: #64748b;
            ">
              Thank you for creating a SignalHaive account.
              Please use the verification code below to verify your
              email address.
            </p>

            <!-- Verification Code -->
            <div style="
              margin: 30px 0;
              padding: 24px;
              background-color: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 10px;
              text-align: center;
            ">

              <p style="
                margin: 0 0 10px 0;
                font-size: 12px;
                font-weight: 600;
                letter-spacing: 1px;
                text-transform: uppercase;
                color: #64748b;
              ">
                Verification code
              </p>

              <div style="
                font-size: 34px;
                line-height: 1.2;
                font-weight: 700;
                letter-spacing: 8px;
                color: #0f172a;
              ">
                ${code}
              </div>

            </div>

            <p style="
              margin: 0;
              font-size: 14px;
              line-height: 1.6;
              color: #64748b;
            ">
              This code expires in
              <strong style="color: #334155;">10 minutes</strong>.
            </p>

            <p style="
              margin: 28px 0 0 0;
              padding-top: 24px;
              border-top: 1px solid #e2e8f0;
              font-size: 13px;
              line-height: 1.6;
              color: #94a3b8;
            ">
              If you did not create this account, you can safely
              ignore this email.
            </p>

          </div>

          <!-- Footer -->
          <div style="
            padding: 20px 32px;
            background-color: #f8fafc;
            border-top: 1px solid #e2e8f0;
          ">
            <p style="
              margin: 0;
              font-size: 12px;
              color: #94a3b8;
            ">
              © ${new Date().getFullYear()} SignalHaive
            </p>
          </div>

        </div>

      </div>
    `,
  });

  console.log("Verification email sent:", response.messageId);

  return response;
};

export const sendPasswordResetEmail = async (email, resetUrl) => {
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

    subject: "Reset your SignalHaive password",

    textContent: `We received a request to reset your SignalHaive password.

Click this link to reset your password:
${resetUrl}

This link expires in 10 minutes.

If you did not request a password reset, you can safely ignore this email.`,

    htmlContent: `
      <div style="
        margin: 0;
        padding: 40px 20px;
        background-color: #f8fafc;
        font-family: Arial, Helvetica, sans-serif;
      ">

        <div style="
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
        ">

          <!-- Header -->
          <div style="
            background-color: #0f172a;
            padding: 28px 32px;
          ">
            <div style="
              font-size: 24px;
              font-weight: 700;
              color: #ffffff;
            ">
              SignalHaive
            </div>
          </div>

          <!-- Content -->
          <div style="
            padding: 40px 32px;
          ">

            <p style="
              margin: 0 0 10px 0;
              font-size: 13px;
              font-weight: 600;
              letter-spacing: 1px;
              text-transform: uppercase;
              color: #64748b;
            ">
              Account security
            </p>

            <h1 style="
              margin: 0;
              font-size: 30px;
              line-height: 1.25;
              font-weight: 700;
              color: #0f172a;
            ">
              Reset your password
            </h1>

            <p style="
              margin: 18px 0 0 0;
              font-size: 15px;
              line-height: 1.7;
              color: #64748b;
            ">
              We received a request to reset your SignalHaive
              password. Click the button below to create a new password.
            </p>

            <!-- Button -->
            <div style="
              margin: 30px 0;
            ">
              <a
                href="${resetUrl}"
                style="
                  display: inline-block;
                  padding: 14px 24px;
                  background-color: #0f172a;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 8px;
                  font-size: 14px;
                  font-weight: 600;
                "
              >
                Reset Password
              </a>
            </div>

            <p style="
              margin: 0;
              font-size: 14px;
              line-height: 1.6;
              color: #64748b;
            ">
              This link expires in
              <strong style="color: #334155;">10 minutes</strong>.
            </p>

            <!-- Security Notice -->
            <div style="
              margin-top: 28px;
              padding-top: 24px;
              border-top: 1px solid #e2e8f0;
            ">
              <p style="
                margin: 0;
                font-size: 13px;
                line-height: 1.6;
                color: #94a3b8;
              ">
                If you did not request a password reset, you can
                safely ignore this email. Your password will remain
                unchanged.
              </p>
            </div>

          </div>

          <!-- Footer -->
          <div style="
            padding: 20px 32px;
            background-color: #f8fafc;
            border-top: 1px solid #e2e8f0;
          ">
            <p style="
              margin: 0;
              font-size: 12px;
              color: #94a3b8;
            ">
              © ${new Date().getFullYear()} SignalHaive
            </p>
          </div>

        </div>

      </div>
    `,
  });

  console.log("Password reset email sent:", response.messageId);

  return response;
};