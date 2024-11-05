const Contact = require("../models/Contact"); // Import the Contact model
const { sendMailToAdmin } = require("../sendMail");

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

    sendMailToAdmin(newContact) // this call method , to send the mail on admin mail

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

