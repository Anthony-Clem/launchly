export const verificationCodeTemplate = (code: string) => ({
  subject: "Your Launchly Verification Code",
  text: `Your verification code is: ${code}`,
  html: `
    <html><head><style>
      body, html {
        margin: 0; padding: 0; font-family: Arial, sans-serif;
        background-color: #f4f4f4; color: #000000;
      }
      .container {
        max-width: 600px; margin: 0 auto; padding: 20px;
        background-color: #ffffff; border-radius: 8px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #f97316; font-size: 24px;
        font-weight: bold; color: #ffffff; padding: 20px;
        text-align: center; border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
      .content {
        padding: 20px; text-align: center;
      }
      .content h1 {
        font-size: 24px; color: #000000;
      }
      .content p {
        font-size: 16px; color: #555555; margin: 10px 0 20px;
      }
      .code-box {
        display: inline-block; padding: 12px 24px;
        font-size: 20px; font-weight: bold;
        background-color: #f97316; color: #ffffff;
        border-radius: 6px; margin-top: 20px; letter-spacing: 2px;
      }
      .footer {
        font-size: 14px; color: #999999;
        text-align: center; padding: 20px;
      }
    </style></head><body>
      <div class="container">
        <div class="header">launchly</div>
        <div class="content">
          <h1>Verify Your Email</h1>
          <p>Please use the following code to verify your email address:</p>
          <div class="code-box">${code}</div>
          <p>This code will expire shortly. If you did not request this, you can safely ignore this email.</p>
        </div>
        <div class="footer">
          <p>If you need help, reply to this email or contact our support team.</p>
        </div>
      </div>
    </body></html>
  `,
});
