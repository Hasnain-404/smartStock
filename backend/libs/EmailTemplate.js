//verification email template
export const Verification_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
          body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f8fafc;
              color: #1e293b;
          }
          .container {
              max-width: 600px;
              margin: 40px auto;
              background: #ffffff;
              border-radius: 10px;
              box-shadow: 0 6px 20px rgba(0,0,0,0.08);
              overflow: hidden;
              border: 1px solid #e2e8f0;
          }
          .header {
              background: linear-gradient(135deg, #10b981, #06b6d4);
              color: #fff;
              padding: 20px;
              text-align: center;
              font-size: 24px;
              font-weight: bold;
              letter-spacing: 1px;
          }
          .content {
              padding: 25px;
              font-size: 15px;
              line-height: 1.7;
          }
          .verification-code {
              display: block;
              margin: 25px auto;
              font-size: 24px;
              color: #10b981;
              background: #ecfdf5;
              border: 1px dashed #10b981;
              padding: 14px;
              text-align: center;
              border-radius: 8px;
              font-weight: bold;
              letter-spacing: 3px;
              max-width: 220px;
          }
          .footer {
              background-color: #f8fafc;
              padding: 15px;
              text-align: center;
              color: #64748b;
              font-size: 12px;
              border-top: 1px solid #e2e8f0;
          }
          p {
              margin: 0 0 15px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">Smart Stock</div>
          <div class="content">
              <p>Hi Trader,</p>
              <p>We just need to verify your email before giving you access to the dashboard. Enter the code below:</p>
              <span class="verification-code">{verificationCode}</span>
              <p>If this wasn’t you, ignore this email. Stay safe and keep trading smart</p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Smart Stock. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
`;

//welcome email template
export const Welcome_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Forex Trading Dashboard</title>
      <style>
          body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f9fafb;
              color: #1f2937;
          }
          .container {
              max-width: 600px;
              margin: 40px auto;
              background: #ffffff;
              border-radius: 12px;
              box-shadow: 0 6px 20px rgba(0,0,0,0.1);
              overflow: hidden;
              border: 1px solid #e5e7eb;
          }
          .header {
              background: linear-gradient(135deg, #0ea5e9, #10b981);
              color: white;
              padding: 25px;
              text-align: center;
              font-size: 26px;
              font-weight: bold;
              letter-spacing: 1px;
          }
          .content {
              padding: 30px;
              line-height: 1.7;
              font-size: 15px;
          }
          .welcome-message {
              font-size: 18px;
              font-weight: bold;
              color: #111827;
              margin: 15px 0;
          }
          ul {
              padding-left: 18px;
              margin: 15px 0;
          }
          ul li {
              margin: 10px 0;
              font-size: 15px;
          }
          .button {
              display: inline-block;
              padding: 14px 30px;
              margin: 25px 0;
              background-color: #0ea5e9;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              text-align: center;
              font-size: 16px;
              font-weight: 600;
              transition: background-color 0.3s;
          }
          .button:hover {
              background-color: #0284c7;
          }
          .footer {
              background-color: #f9fafb;
              padding: 18px;
              text-align: center;
              color: #6b7280;
              font-size: 12px;
              border-top: 1px solid #e5e7eb;
          }
          p {
              margin: 0 0 15px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">📈 Welcome to Smart Stock!</div>
          <div class="content">
              <p class="welcome-message">Hello {name},</p>
              <p>We’re excited to have you on board! Your registration was successful 🎉</p>
              <p>Here’s what you can do with our platform:</p>
              <ul>
                  <li>💹 Take trades in the <b>live Forex market</b>.</li>
                  <li>📊 Track performance with <b>weekly, monthly & yearly reports</b>.</li>
                  <li>💱 Stay updated with <b>real-time forex prices</b>.</li>
                  <li>⚡ Get a personalized trading dashboard for smart decisions.</li>
              </ul>
              <a href="http://localhost:5173/Dashboard" class="button">Get Started</a>
              <p>Let’s grow your trading journey together 🚀 Stay consistent and trade smart!</p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Smart Stock. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
`;
