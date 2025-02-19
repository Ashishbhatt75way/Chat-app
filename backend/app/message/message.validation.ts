import { body } from "express-validator";

export const sendMessage = [
  body("content").isString().withMessage("content is required"),
  body("sender").isString().withMessage("senderId is required"),
];
