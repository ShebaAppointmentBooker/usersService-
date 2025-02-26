require("dotenv").config();
import mongoose from "mongoose";
import { registerDoctor } from "../controllers/doctorController";
import Doctor from "../models/doctorModel";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
const getDoctors= async ()=>{
  await connectDB();
  console.log("getting doctors...")
  const doctors = await Doctor.find().populate("specializations");
  console.log("fetched doctors succsessfully",doctors)
 
}
// Run the registration
const register = async (
  name: string,
  email: string,
  nationalId: string,
  specializations: string[] // Now accepting an array of specialization names
) => {
  await registerDoctor(name, email, nationalId, specializations);
  console.log(`${name} registered successfully!`);
};

const registerMultipleDoctors = async () => {
  await connectDB();

  const doctors = [
    { name: 'Dr. Jane Smith', email: 'jane.smith@example.com', nationalId: '065165483', specializations: ['Neurology'] },
    { name: 'Dr. Alan Black', email: 'alan.black@example.com', nationalId: '065165484', specializations: ['Dermatology', 'Orthopedics'] },
    { name: 'Dr. Sarah White', email: 'sarah.white@example.com', nationalId: '065165485', specializations: ['Orthopedics'] },
    { name: 'Dr. Mike Green', email: 'mike.green@example.com', nationalId: '065165486', specializations: ['Pediatrics', 'Cardiology'] },
    { name: 'Dr. Lisa Blue', email: 'lisa.blue@example.com', nationalId: '065165487', specializations: ['Gastroenterology'] },
    { name: 'Dr. Rachel Pink', email: 'rachel.pink@example.com', nationalId: '065165488', specializations: ['Cardiology', 'Dermatology'] },
    { name: 'Dr. John Doe', email: 'john.doe@example.com', nationalId: '065165482', specializations: ['Cardiology', 'Neurology', 'Pediatrics'] },
  ];

  for (const doctor of doctors) {
    await register(doctor.name, doctor.email, doctor.nationalId, doctor.specializations);
  }
  console.log('All doctors registered successfully!');
};

// registerMultipleDoctors().then(() => {
//   console.log('Doctor registration complete');
//   process.exit();
// }).catch((err) => {
//   console.error('Error in doctor registration:', err);
//   process.exit(1);
// });
getDoctors()