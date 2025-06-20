const nodemailer = require('nodemailer');

// Configure a dummy SMTP server (Ethereal for testing)
async function sendDummyEmail(to, subject, text) {
  // Create test account on Ethereal (disposable)
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure, // true for 465, false for other ports
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });

  const mailOptions = {
    from: '"Scheduler Service" <noreply@example.com>',
    to,
    subject,
    text
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('✅ Email sent:', info.messageId);
  console.log('📬 Preview URL:', nodemailer.getTestMessageUrl(info));
}

module.exports = { sendDummyEmail };
