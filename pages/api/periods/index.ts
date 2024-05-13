import { NextApiRequest, NextApiResponse } from "next";
import { periodType } from "../../../lib/types/types";
import { createPeriod} from "../../../lib/mongo/periods";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "POST":
        const period = req.body as periodType;
        const { period: createdPeriod, error: postError } = await createPeriod(period);
        if (postError) {
          res.status(500).json({ message: postError });
          return;
        }
        if (createdPeriod) {
          res.status(201).json({ message: "Period created successfully", id: createdPeriod._id });
        } else {
          res.status(500).json({ message: "Failed to create period" });
        }
        break;
      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({ message: `Method ${req.method} is not allowed` });
        break;
    }
  } catch (error) {
    console.error('Error in handling request:', error);
    if (!res.headersSent) {
      res.status(500).json({ message: "An error occurred" });
    }
  }
};



export default handler;
