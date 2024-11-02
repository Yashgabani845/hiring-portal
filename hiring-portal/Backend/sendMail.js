const nodemailer = require('nodemailer');
require('dotenv').config()

const sendMailToAdmin = (userdata) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_ID, // by this email id you will get mail 
            pass: process.env.PASS_KEY, // passkey 
        },
    });
    // console.log(process.env.EMAIL_ID + " ")

    async function main() {
        await transporter.sendMail({
            from: {
                name: `Hiring Portal - ${new Date().toLocaleString()}`,
                address: process.env.EMAIL_ID,
            }, // sender address
            to: process.env.ADMIN_EMAIL_ID, // list of receivers
            subject: "New Contact Form Submission from Hiring Portal ✔", // Subject line
            text: "Hiring Portal Contact Form", // plain text body
            html: `<div style="background: black; color: white; height: 100vh; padding: 20px;">
                        <div class="heading" style="font-size: 2rem; text-align: center; margin-bottom: 20px;">
                            Hiring Portal Contact Form Details
                        </div>
                        <table style="width: 50%; border-collapse: collapse; margin: 0 auto;">
                            <thead>
                                <tr>
                                    <th style="border: 1px solid white; padding: 10px; text-align:center; background-color: #0076b4;">
                                        Field
                                    </th>
                                    <th style="border: 1px solid white; padding: 10px; text-align:center; background-color: #0076b4;">
                                        Value
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">First Name</td>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">${userdata.firstName}</td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">Last Name</td>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">${userdata.lastName}</td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">Email</td>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">${userdata.email}</td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">Phone Number</td>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">${userdata.phoneNumber}</td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">Query</td>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">${userdata.query}</td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">Submitted At</td>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">${new Date(userdata.submittedAt).toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>`, // html body
        });
    }

    main().catch(console.error);
}

module.exports = { sendMailToAdmin };
