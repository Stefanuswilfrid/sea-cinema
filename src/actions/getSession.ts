
import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { CurrentUser } from "@/types";

interface Session {
  user?: CurrentUser;
}



export default async function getSession() : Promise<Session | null> {
  console.log("aduh apaa si")
  return await getServerSession(authOptions);
}
