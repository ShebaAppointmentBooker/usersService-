import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";





const checkTokenValidity = (token: string): boolean => {
    try {
      
      jwt.verify(token, JWT_SECRET);
      return true; // Token is valid
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        console.log("Token has expired");
      } else if (error instanceof jwt.JsonWebTokenError) {
        console.log("Invalid token");
      } else {
        console.log("Token verification failed");
      }
      return false; // Token is not valid
    }
  };



export const checkValid = async (
  req: Request,
  res: Response
): Promise<any> => {
  
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }
    const isValid=checkTokenValidity(token);
    if (isValid) {
      return res.status(200).json({ message: 'Token is valid' });
    } else {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
