import * as salonReportController from "@/server/controllers/salonReportController";
import base from "@/src/utils/base";
const handler = base().get(salonReportController.getTotalSuccessOrders);

export default handler;
