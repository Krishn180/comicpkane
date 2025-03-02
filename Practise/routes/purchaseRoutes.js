const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const Purchase = require("../models/purchase"); // Import Mongoose Model

router.post("/confirm-purchase", async (req, res) => {
  const { userId, userEmail, userName, productTitle, productPrice } = req.body;

  try {
    // Save purchase in database
    const newPurchase = new Purchase({ productTitle, productPrice });
    await newPurchase.save();

    // Set up email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: "otscznwlkunodhty",
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: `${userEmail}, `, // Send to user & admin
      subject: "Purchase Confirmation",
      text: `Hello ${userName},\n\nYour purchase of ${productTitle} (₹${productPrice}) has been confirmed.\n\nThank you!`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Purchase successful, email sent!" });
  } catch (error) {
    res.status(500).json({ message: "Error processing purchase", error });
  }
});

module.exports = router;
