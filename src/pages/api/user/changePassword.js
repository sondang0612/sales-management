import base from "@/src/utils/base";
import * as userController from "@/server/controllers/userController";
import { protect } from "@/server/middlewares/authMiddleware";
const handler = base().use(protect).post(userController.changePassword);

export default handler;
