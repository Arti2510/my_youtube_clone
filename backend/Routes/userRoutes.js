
import { getUserProfile } from "../Controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

export function userRoutes(app) {
    app.get('/api/profile', protect, getUserProfile);
}