// types/express.d.ts
import express from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: any; // You can replace `any` with a specific type if needed
  }
}
