import { Router } from "express";
import * as messageController from "./message.controller";
import * as messageValidate from "./message.validation";
import { roleAuth } from "../common/middleware/role-auth.middleware";

const router = Router();

router.post("/:id", messageValidate.sendMessage, messageController.sendMessage);
router.get("/:id", roleAuth(["USER", "ADMIN"]), messageController.getMessages);

export default router;
