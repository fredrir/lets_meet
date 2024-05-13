import { NextApiRequest, NextApiResponse } from "next";
import { getPeriodById } from "../../../../lib/mongo/periods";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid format: id must be a string" });
  }

  try {
    if (req.method === "GET") {
      const { period, exists, error } = await getPeriodById(id);
      if (error) {
        return res.status(500).json({ error });
      }
      return res.status(200).json({ exists, period });
    } else {
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} is not allowed.`);
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json("Unexpected error occurred");
  }
};

export default handler;
