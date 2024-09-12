import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    console.log("is called?")
    const session = await getServerSession({ req, ...authOptions });
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
}