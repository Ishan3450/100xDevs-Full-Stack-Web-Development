import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

// A logging middleware to know the request information
// app.use((req, res, next) => {
//   const { email } = req.body;
//   console.log(
//     `Request came for ${email} at ${new Date().toLocaleTimeString()}`
//   );
//   next();
// });

// Store OTPs in a simple in-memory object
const otpStore: Record<string, string> = {};

// Endpoint to generate and log OTP
app.post("/generate-otp", (req: Request, res: Response) => {
  const email = req.body.email;
  if (!email) {
    res.status(400).json({ message: "Email is required", success: false });
    return;
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // generates a 6-digit OTP
  otpStore[email] = otp;

  console.log(`OTP for ${email}: ${otp}`); // Log the OTP to the console
  res.status(200).json({ message: "OTP generated and logged", success: true });
});

// Endpoint to reset password
app.post("/reset-password", (req: Request, res: Response) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    res.status(400).json({
      message: "Email, OTP, and new password are required",
      success: false,
    });
    return;
  }
  if (otpStore[email] === otp) {
    console.log(`Password for ${email} has been reset to: ${newPassword}`);
    delete otpStore[email]; // Clear the OTP after use
    res
      .status(200)
      .json({ message: "Password has been reset successfully", success: true });
  } else {
    res.status(401).json({ message: "Invalid OTP", success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
