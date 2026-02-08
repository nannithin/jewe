import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCTBuSI-ySyCs3tZ9_xesjNhqzJXZlnpxA",
  authDomain: "otp-arpit.firebaseapp.com",
  projectId: "otp-arpit",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
