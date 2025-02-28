import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "yourRefreshSecret";

const checkRefreshTokenValidity = (refreshToken: string): string => {
  try {
    
    const decodedtry = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as {
      userId: string;
    };
   
    console.log("valid");
    return decodedtry.userId; // Token is valid
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.log("Token has expired");
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.log("Invalid token");
    } else {
      console.log("Token verification failed");
    }
    return ""; // Token is not valid
  }
};

export const checkValid = async (
  model: any,
  req: Request,
  res: Response
): Promise<any> => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: "Token is required" });
  }
  const userId = checkRefreshTokenValidity(refreshToken);
  if (userId) {
    const user = await model.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Token is valid" });
  } else {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
