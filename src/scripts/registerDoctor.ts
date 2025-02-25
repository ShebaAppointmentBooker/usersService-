require("dotenv").config()
import path from 'path';
import mongoose from "mongoose";
import { registerDoctor } from "../controllers/doctorController";

// dotenv.config({ path: path.resolve(__dirname, '../../.env') });
// console.log(process.env)
// Connect to MongoDB
const connectDB = async () => {
  try {
    console.log(process.env.MONGODB_URI, "lol");
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// Run the registration
const register = async (name: string, email: string, nationalId: string, specialization: string) => {
 
  await registerDoctor(name, email, nationalId, specialization);
  console.log(`${name} registered successfully!`);
};
const registerMultipleDoctors = async () => {
  await connectDB();
  const doctors = [
    // { name: 'Dr. John Doe', email: 'john.doe@example.com', nationalId: '065165482', specialization: 'Cardiology' },
    { name: 'Dr. Jane Smith', email: 'jane.smith@example.com', nationalId: '065165483', specialization: 'Neurology' },
    { name: 'Dr. Alan Black', email: 'alan.black@example.com', nationalId: '065165484', specialization: 'Dermatology' },
    { name: 'Dr. Sarah White', email: 'sarah.white@example.com', nationalId: '065165485', specialization: 'Orthopedics' },
    { name: 'Dr. Mike Green', email: 'mike.green@example.com', nationalId: '065165486', specialization: 'Pediatrics' },
    { name: 'Dr. Lisa Blue', email: 'lisa.blue@example.com', nationalId: '065165487', specialization: 'Gastroenterology' },
    { name: 'Dr. Rachel Pink', email: 'rachel.pink@example.com', nationalId: '065165488', specialization: 'Cardiology' },
  ];

  // Loop through the doctors array and call the register function for each
  for (const doctor of doctors) {
    await register(doctor.name, doctor.email, doctor.nationalId, doctor.specialization);
  }
  console.log('All doctors registered successfully!');
};
registerMultipleDoctors().then(() => {
  console.log('Doctor registration complete');
  process.exit();
}).catch((err) => {
  console.error('Error in doctor registration:', err);
  process.exit(1);
});