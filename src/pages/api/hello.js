import base from "@/src/utils/base";

const handler = base().get((req, res) => {
  res.json({ message: "Hello" });
});

export default handler;
