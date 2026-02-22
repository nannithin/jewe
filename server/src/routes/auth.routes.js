import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import User from "../models/User.model.js";
import { protect } from "../middleware.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);

router.get("/me", protect, async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            user,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",     // use "lax" if frontend + backend same domain
    });

    res.json({ message: "Logged out successfully" });
});


export default router;
