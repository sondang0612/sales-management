import base from "@/src/utils/base";
import * as userController from "@/server/controllers/userController";
import { protect, restrictAdmin } from "@/server/middlewares/authMiddleware";
const handler = base()
  .use(protect)
  .use(restrictAdmin)
  .get(userController.getById);

export default handler;
