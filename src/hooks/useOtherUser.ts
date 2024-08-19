import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";
import { useUser } from "./useUser";

const useOtherUser = (conversation: FullConversationType | { users: User[] }) => {
    const { user: currentUser } = useUser();

  const otherUser = useMemo(() => {
    const currentUserUsername = currentUser?.username;

    

    const otherUser = conversation?.users.filter((user) => user.username !== currentUserUsername);

    return otherUser[0];
  }, [currentUser?.username, conversation?.users]);

  return otherUser;
};

export default useOtherUser;
