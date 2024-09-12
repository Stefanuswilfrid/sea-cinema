import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb"

export const GET = async (req: Request) => {
    console.log("is called?")
    const session = await getServerSession({ req, ...authOptions });
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    try {
      const notifications = await prisma.notification.findMany({
        where: {
          userId: session?.user?.id,
        },
      });
  

  
      return NextResponse.json({ message: "Success", data: notifications }, { status: 200 });
      
    } catch (error) {
      console.error("Error in GET /api/notification", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}