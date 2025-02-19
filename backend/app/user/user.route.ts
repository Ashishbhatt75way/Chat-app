import { Router } from "express";
import passport from "passport";
import { catchError } from "../common/middleware/cath-error.middleware";
import { roleAuth } from "../common/middleware/role-auth.middleware";
import * as userController from "./user.controller";
import * as userValidator from "./user.validation";

const router = Router();

router
  .post(
    "/register",
    userValidator.createUser,
    catchError,
    userController.createUser
  )
  .post(
    "/login",
    userValidator.login,
    catchError,
    passport.authenticate("login", { session: false }),
    userController.login
  )
  .get("/me", roleAuth(["USER", "ADMIN"]), userController.getUserInfo)
  .post("/logout", roleAuth(["USER", "ADMIN"]), userController.logout)
  .delete("/:id", roleAuth(["USER", "ADMIN"]), userController.deleteUser)
  .patch(
    "/:id",
    roleAuth(["ADMIN", "USER"]),
    userValidator.editUser,
    catchError,
    userController.editUser
  ).get('/get-analytics', roleAuth(["ADMIN"]), userController.getAnalytics)

export default router;
