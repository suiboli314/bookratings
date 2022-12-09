import express from "express"; // Ge the router instance of Express
import userController from "../controllers/user.js"; // Get all exported functions in the user controller
import bookController from "../controllers/book.js"; // Get all exported functions in the user controller
import reviewController from "../controllers/review.js";
const api = express.Router();

// Map the `signup` request to the signup function
api.post("/signup", userController.signup);
api.post("/login", userController.login);
api.post("/resetpass", userController.reset);
api.post("/deleteuser", userController.delete);
api.post("/insertbook", bookController.insert);
api.post("/getbook", bookController.get);
api.get("/getallbooks", bookController.getAllBooks);
api.post("/insertreview", reviewController.insert);
api.post("/getbookallreview", reviewController.getBookAllReview);
api.post("/getuserallreview", reviewController.getUserAllReview);
api.post("/getuserbookreview", reviewController.getuserbookreview);
api.delete("/deleteuserbookreview", reviewController.deleteuserbookreview);

const router = express.Router();
router.use("/api/", api);
export default router;
