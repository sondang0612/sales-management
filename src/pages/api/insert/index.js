import base from "@/src/utils/base";
import * as insertController from "@/server/controllers/insertController";
const handler = base().get(insertController.insert);

export default handler;
