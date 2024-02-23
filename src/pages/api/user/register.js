import base from "@/src/utils/base";
import * as userController from "@/server/controllers/userController";
const handler = base().post(userController.register);

export default handler;
