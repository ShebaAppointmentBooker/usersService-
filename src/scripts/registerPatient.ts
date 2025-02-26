require("dotenv").config();
import mongoose from "mongoose";
import { registerPatient } from "../controllers/patientController";

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

// Array of patients to register
const patients = [
  { name: "Lior Aviv", email: "lioraviv1312@gmail.com", nationalId: "323104059", medicalHistory: "None" },
  { name: "Bob Smith", email: "bob.smith@example.com", nationalId: "123456789", medicalHistory: "Asthma" },
  { name: "Carol Williams", email: "carol.williams@example.com", nationalId: "1011", medicalHistory: "Diabetes" },
  { name: "David Brown", email: "david.brown@example.com", nationalId: "004", medicalHistory: "Hypertension" },
  { name: "Eva Green", email: "eva.green@example.com", nationalId: "005", medicalHistory: "None" },
  { name: "Frank White", email: "frank.white@example.com", nationalId: "006", medicalHistory: "Allergies" },
  { name: "Grace Lee", email: "grace.lee@example.com", nationalId: "007", medicalHistory: "None" },
];

// Register multiple patients
const registerMultiplePatients = async () => {
  await connectDB();

  for (const patient of patients) {
    await registerPatient(
      patient.name,
      patient.email,
      patient.nationalId,
      patient.medicalHistory
    );
    console.log(`Registered ${patient.name} successfully!`);
  }

  console.log("All patients registered successfully!");
  process.exit();
};

// Execute the script
registerMultiplePatients().catch((err) => {
  console.error("Error in patient registration:", err);
  process.exit(1);
});
