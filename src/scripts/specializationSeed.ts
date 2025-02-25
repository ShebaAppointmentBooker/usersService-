import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import Specialization from '../models/specializationModel'; // Assuming you have a Specialization model

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

// Seed data for specializations
const specializationData = [
  { name: 'Cardiology' },
  { name: 'Neurology' },
  { name: 'Dermatology' },
  { name: 'Orthopedics' },
  { name: 'Pediatrics' },
  { name: 'Gastroenterology' },
];

// Seed the specialization collection
const seedSpecializations = async () => {
  try {
    await connectDB();
    
    // Remove existing documents in Specialization collection (Optional, if you want to reset)
    await Specialization.deleteMany({});
    console.log('Specializations collection cleared.');

    // Insert the new specialization types
    const result = await Specialization.insertMany(specializationData);
    console.log('Specializations seeded:', result);
    process.exit();
  } catch (error) {
    console.error('Error seeding specializations:', error);
    process.exit(1);
  }
};

seedSpecializations();
