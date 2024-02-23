import base from "@/src/utils/base";
import * as salonController from "@/server/controllers/salonReportController";
import { protect } from "@/server/middlewares/authMiddleware";
const handler = base()
  .use(protect)
  .get(salonController.findAllSalonReport)
  .post(salonController.create);

export default handler;
