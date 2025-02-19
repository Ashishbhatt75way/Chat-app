import express from "express";
import userRoutes from "./user/user.route";
import groupRoutes from "./group/group.route";
import messageRoutes from "./message/message.route";

// routes
const router = express.Router();

router.use("/users", userRoutes);
router.use("/group", groupRoutes);
router.use("/message", messageRoutes);

// export const getAnalytics = async (req: Request, res: Response) => {
//     const totalGroups = await Group.countDocuments();
//     const totalUsers = await User.countDocuments();
//     const totalMessages = await Message.countDocuments();
//     res.status(200).json({
//       totalGroups,
//       totalUsers,
//       totalMessages,
//     });
//   };

export default router;
