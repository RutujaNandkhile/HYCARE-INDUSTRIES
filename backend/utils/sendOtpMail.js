const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// NOTE: Replace "onboarding@resend.dev" with your own verified sender
// once you've added and verified a domain in your Resend dashboard.
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "HyCare <onboarding@resend.dev>";

const sendOtpMail = async (toEmail, otp) => {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: toEmail,
    subject: "Your OTP Code",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Email Verification</h2>
        <p>Your OTP is:</p>
        <h1 style="letter-spacing: 4px;">${otp}</h1>
        <p>This OTP will expire in 5 minutes.</p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend send error:", error);
    throw new Error("Failed to send OTP email");
  }

  return data;
};

module.exports = sendOtpMail;