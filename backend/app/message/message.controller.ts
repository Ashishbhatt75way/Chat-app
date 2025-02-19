import { type Request, type Response } from "express";
import asyncHandler from "express-async-handler";
import { createResponse } from "../common/helper/response.hepler";
import * as messageServices from "./message.services";

export const sendMessage = asyncHandler(async (req: Request, res: Response) => {
  const result = await messageServices.createMessage(req.body, req.params.id);
  res.send(createResponse(result, "message sent successfully"));
});

export const getMessages = asyncHandler(async (req: Request, res: Response) => {
  const result = await messageServices.getMessages(req.params.id);
  res.send(createResponse(result));
});
