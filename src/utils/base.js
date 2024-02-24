import morgan from "morgan";
import nc from "next-connect";
import connectDB from "../../lib/connectDB";
export default function base() {
  return nc()
    .use(async (req, res, next) => {
      //await connectDB();
      next();
    })
    .use(morgan("dev"));
}
