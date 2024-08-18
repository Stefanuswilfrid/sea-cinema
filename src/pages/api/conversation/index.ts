import { requestHandler } from "@/libs/utils/request-handler";
import { NextApiRequest, NextApiResponse } from "next";

export async function handler(req: Request, res: NextApiResponse) {
  try {
    await requestHandler(req, res, {
      allowedRoles: {
        GET: ["USER", "PUBLIC"],
      },
      POST: async (session) => {
        const body = await req.json();
        const { userId, isGroup, members, name ,id } = body;
      },
    });
  } catch (error) {}
}
