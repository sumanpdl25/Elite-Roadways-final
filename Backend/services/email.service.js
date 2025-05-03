import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

// Create a transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD.replace(/"/g, '') // Remove any quotes accidentally added in .env
  }
});

/**
 * Sends a booking confirmation email to the user.
 *
 * @param {string} userEmail - The recipient's email address.
 * @param {object} bookingDetails - An object containing busNumber, seatNumber, route, departureTime, fare.
 * @returns {Promise<boolean>} True if sent successfully, false otherwise.
 */
export const sendBookingConfirmationEmail = async (userEmail, bookingDetails) => {
  try {
    const { busNumber, seatNumber, route, departureTime, fare } = bookingDetails;

    const mailOptions = {
      from: `"Elite Roadways" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: 'Booking Confirmation - Elite Roadways',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Booking Confirmation</h2>
          <p>Dear Valued Customer,</p>
          <p>Your booking has been confirmed with <strong>Elite Roadways</strong>. Here are your booking details:</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Bus Number:</strong> ${busNumber}</p>
            <p><strong>Seat Number:</strong> ${seatNumber}</p>
            <p><strong>Route:</strong> ${route}</p>
            <p><strong>Departure Time:</strong> ${new Date(departureTime).toLocaleString()}</p>
            <p><strong>Fare:</strong> NRS ${fare}</p>
          </div>

          <p>Thank you for choosing Elite Roadways. We wish you a pleasant journey!</p>
          
          <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
            This is an automated email. Please do not reply to this message.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Booking confirmation email sent to ${userEmail}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
