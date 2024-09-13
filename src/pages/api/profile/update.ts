import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../libs/prismadb"
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
      return new NextResponse(`Method ${req.method} Not Allowed`, {
        status: 405,
      });
    }
  
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
        });

        if (!user) {
          return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const { intro, interests } = req.body;
        console.log("test",intro)

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                bio: intro ? intro : user.bio, // Update intro if provided
                interests: interests ? interests : user.interests, // Update interests if provided
            },
        });
        return res.status(200).json({ message: "Success", data: updatedUser });
        
    } catch (error) {
        console.error("Error in PATCH /api/profile/update:", error);
        return res.status(500).json({ message: "Internal Server Error" });
        
    }
}