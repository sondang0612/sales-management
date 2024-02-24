import base from "../../../utils/base";
import * as userController from "../../../../server/controllers/userController";
const handler = base().post(userController.login);

export default handler;
