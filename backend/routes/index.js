import express from "express"; // Ge the router instance of Express
import userController from "../controllers/user.js"; // Get all exported functions in the user controller

const router = express.Router();

// Map the `signup` request to the signup function
router.post("/signup", userController.signup);
router.post("/login", userController.login);

export default router;
