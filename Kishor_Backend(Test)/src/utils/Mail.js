const nodemailer = require("nodemailer");
const contactMail = async (Form) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS,
    },
  });

  
  const mailOptions1 = {
    from: process.env.MAIL_ID,
    to: ["kishorkumar6091@gmail.com"],
    subject: "Contact Notification",
    html: `<p style="margin=0"><strong>Name: ${Form.name},</strong></p>
  <p style="margin=0">Phone Number: ${Form.phone}</p>
  <p style="margin=0">Email-ID: ${Form.email}</p>
  <p style="margin=0">Address: ${Form.address}</p>`,
  };

  
  const mailOptions2 = {
    from: process.env.MAIL_ID,
    to: Form.email,
    subject: "Contact Notification",
    html: `<p style="margin=0"><strong>Dear ${Form.name},</strong></p>
  <br>
  <p style="margin=0">Greetings from us!!</p>
  <p style="margin=0">Thanks for reaching us. We will contact you soon.</p>
  <p style="margin=0">Have a Good Day!!</p>`,
  };

  try {
    await transporter.sendMail(mailOptions1);
    await transporter.sendMail(mailOptions2);
    console.log("Emails sent successfully");
  } catch (err) {
    console.log("Error in sending Email", err);
  }
};

module.exports = { contactMail };