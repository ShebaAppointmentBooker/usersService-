import mongoose, { Schema, Document } from "mongoose";

export interface IDoctor extends Document {
  name: string;
  email: string;
  nationalId: string;
  specialization: Schema.Types.ObjectId;
  phone?: string;
  refreshToken?: string;
  createdAt: Date;
}

const doctorSchema = new Schema<IDoctor>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  nationalId: { type: String, required: true, unique: true },
  specialization: { type: Schema.Types.ObjectId, ref: "Specialization", required: true },
  phone: { type: String },
  refreshToken: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const Doctor = mongoose.model<IDoctor>("Doctor", doctorSchema);

export default Doctor;
