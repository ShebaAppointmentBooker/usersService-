import { Request, Response } from "express";
export const updateUserHandler = async (
  model: any,
  req: Request,
  res: Response
) => {
  const userId = typeof req.user === "string" ? req.user : undefined;
  const { email, medicalHistory, phone } = req.body;
 
  try {
    if (!email && !medicalHistory && !phone) {
      console.error("cant accept empty body");
      return res.status(400).json({ message: "cant accept empty body" });
    }
    
    const fields: any = {};
    if (email) fields.email = email;
    if (medicalHistory) fields.medicalHistory = medicalHistory;
    if (phone) fields.phone = phone;
   
    await model.findByIdAndUpdate(userId, fields,{ new: true });
    const payload: any = {
      message: "Logged in successfully",
    };
    const patient=await model.findOne({_id:userId})
  
    return res.json(payload);
  } catch (error) {
    if (error) {
      console.error("Token expired:", error);
      return res.status(500).json({ message: error });
    }
  }
};
