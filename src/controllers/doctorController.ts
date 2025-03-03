// /controllers/doctorController.ts
import Doctor from "../models/doctorModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { refreshTokenHandler } from "../handlers/refreshTokenHandler";
import { loginWithOtpHandler, requestOtpHandler } from "../handlers/otpHandler";
import Specialization from "../models/specializationModel";
import { checkValid } from "../handlers/validTokenHandler";
import { updateUserHandler } from "../handlers/updateUserHandler";

export const registerDoctor = async (
  name: string,
  email: string,
  nationalId: string,
  specializationNames: string[]
) => {
  try {
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      console.log("Doctor with this email already exists");
      return;
    }

    const specializationRefs = await Specialization.find({
      name: { $in: specializationNames },
    });

    if (specializationRefs.length !== specializationNames.length) {
      const foundNames = specializationRefs.map((spec) => spec.name);
      const missingNames = specializationNames.filter(
        (name) => !foundNames.includes(name)
      );
      throw new Error(`Specializations not found: ${missingNames.join(", ")}`);
    }

    const newDoctor = new Doctor({
      name,
      email,
      nationalId,
      specializations: specializationRefs.map((spec) => spec._id),
      phone: "N/A",
    });

    await newDoctor.save();
    console.log(`Doctor ${name} registered successfully`);
  } catch (error) {
    console.error("Error registering doctor:", error);
  }
};
export const requestOtpDoctor = async (
  req: Request,
  res: Response
): Promise<any> => {
  requestOtpHandler(Doctor, req, res);
};
export const loginDoctorOtp = async (
  req: Request,
  res: Response
): Promise<any> => {
  loginWithOtpHandler(Doctor, req, res);
};
export const updateDoctor = async (
  req: Request,
  res: Response
): Promise<any> => {
  updateUserHandler(Doctor, req, res);
};
export const refreshDoctorToken = (req: Request, res: Response) => {
  refreshTokenHandler(Doctor, req, res);
};
export const checkValidDoctor = async (
  req: Request,
  res: Response
): Promise<any> => {
  checkValid(Doctor, req, res);
};
// Doctor Logout
export const logoutDoctor = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { refreshToken } = req.body;

  try {
    const doctor = await Doctor.findOne({ refreshToken });
    if (!doctor) return res.status(400).json({ message: "Invalid token" });

    doctor.refreshToken = "";
    await doctor.save();

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error during logout" });
  }
};
