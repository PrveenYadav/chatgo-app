import express from "express";
import { getConversationsForSidebar, getMessages, getUsersForSidebar, sendMessages } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

// instead of writing in every route, we can use this middleware to protect all routes
router.use(protectRoute);

router.get("/users", getUsersForSidebar);
router.get("/conversations", getConversationsForSidebar);
router.get("/:id", getMessages);
router.post("/send/:id", upload.single("media"), sendMessages);

export default router;