const Contact = require("../models/Contact"); // Import the Contact model
const nodemailer = require("nodemailer");

exports.postContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, query } = req.body;
    console.log("Received data = ", req.body);

    if (!firstName || !lastName || !email || !phoneNumber || !query) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phoneNumber,
      query,
    });

    const result = await newContact.save();
    console.log("Contact saved:", result);

    res.status(201).json({
      message: "Contact form submitted successfully",
      contact: result,
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ message: "Error submitting contact form", error });
  }
};

exports.getContact = async (req, res) => {
  res.status(201).json({ message: "Contact Form handling", details: req.body });
};

exports.sendEmail = async (req, resp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your email id",
      pass: "your password",
    },
  });

  const mailOptions = {
    from: req.body.Email,
    to: "taskmaster991@gmail.com",
    subject: "Hiring Portal",
    text: `
          Name: ${req.body.formData.firstName} ${req.body.formData.lastName}
          Email: ${req.body.formData.email}
          Number:${req.body.formData.phoneNumber}
          Message: ${req.body.formData.query}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email: " + error);
      resp.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      resp.status(200).send("Form data sent successfully");
    }
  });
};
