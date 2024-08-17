// import { getServerSession } from "next-auth";
// import prisma from "../libs/prismadb";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";
// import { CurrentUser } from "@/types";

// // import getSession from "./getSession";

// export async function getSession() {
//     return await getServerSession(authOptions)
//   }

// const getCurrentUser = async () => {
//   try {
//     console.log("sess")

//     const session = await getSession();
//     const sessionUser = session?.user as CurrentUser;
//     // if (!session?.user?.username) {
//     //   return null;
//     // }

//     const currentUser = await prisma.user.findUnique({
//       where: {
//         username: sessionUser.username as string| undefined
//       }
//     });

//     if (!currentUser) {
//       return null;
//     }

//     return currentUser;
//   } catch (error: any) {
//     console.log("what err",error)
//     return null;
//   }
// };

// export default getCurrentUser;
