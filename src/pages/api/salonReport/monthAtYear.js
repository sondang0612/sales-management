import base from "@/src/utils/base";
import * as salonReportController from "@/server/controllers/salonReportController";
import { protect } from "@/server/middlewares/authMiddleware";
const handler = base()
  .use(protect)
  .get(salonReportController.getAnalysisByNameAndMonthAtYear);

export default handler;
