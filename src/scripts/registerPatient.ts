import * as dotenv from 'dotenv'
import mongoose from 'mongoose';
import { registerPatient } from '../controllers/patientController';

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// Run the registration
const register = async () => {
  await connectDB();

  // Static data for patient registration
  const name = 'Jane Smith';
  const email = 'jane.smith@example.com';
  const password = 'password123';
  const medicalHistory = 'No known allergies or conditions';

  await registerPatient(name, email, password, medicalHistory);
};

register().then(() => {
  console.log('Patient registration complete');
  process.exit();
});
