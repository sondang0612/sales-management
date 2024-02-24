import base from "@/src/utils/base";
import * as adminController from "@/server/controllers/adminController";
const handler = base().post(adminController.login);

export default handler;
