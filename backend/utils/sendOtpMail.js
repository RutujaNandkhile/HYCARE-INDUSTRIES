const { Resend } = require("resend");

if (!process.env.RESEND_API_KEY) {
  console.error("❌ RESEND_API_KEY is missing");
}

if (!process.env.RESEND_FROM_EMAIL) {
  console.error("❌ RESEND_FROM_EMAIL is missing");
}

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const sendOtpMail = async (email, otp) => {
  try {
    console.log("---------------------------------");
    console.log("Sending OTP email");
    console.log("To:", email);
    console.log("OTP:", otp);
    console.log(
      "From:",
      process.env.RESEND_FROM_EMAIL
    );
    console.log("---------------------------------");

    const { data, error } =
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,

        to: [email],

        subject:
          "HyCare Industries - OTP Verification",

        html: `
          <!DOCTYPE html>

          <html>
            <head>
              <meta charset="UTF-8" />

              <title>
                HyCare Industries OTP
              </title>
            </head>

            <body
              style="
                margin:0;
                padding:30px;
                background:#f5f7fa;
                font-family:Arial,sans-serif;
              "
            >

              <div
                style="
                  max-width:500px;
                  margin:auto;
                  background:white;
                  padding:30px;
                  border-radius:12px;
                  text-align:center;
                "
              >

                <h2>
                  HyCare Industries
                </h2>

                <p>
                  Your verification OTP is:
                </p>

                <div
                  style="
                    font-size:32px;
                    font-weight:bold;
                    letter-spacing:8px;
                    margin:25px 0;
                  "
                >
                  ${otp}
                </div>

                <p>
                  This OTP is valid for 10 minutes.
                </p>

                <p
                  style="
                    color:#777;
                    font-size:13px;
                  "
                >
                  If you did not request this OTP,
                  please ignore this email.
                </p>

              </div>

            </body>
          </html>
        `,
      });

    if (error) {
      console.error(
        "❌ Resend API Error:",
        error
      );

      throw new Error(
        error.message ||
          "Failed to send email"
      );
    }

    console.log(
      "✅ Email accepted by Resend"
    );

    console.log(
      "Email ID:",
      data?.id
    );

    return data;

  } catch (error) {
    console.error(
      "❌ OTP email failed:",
      error.message
    );

    throw error;
  }
};

module.exports = sendOtpMail;