
import Avatar from "@/components/Avatar";
import Container from "@/components/Container";
import ConversationList from "@/components/Conversation/ConversationList";
import EmptyConversation from "@/components/Conversation/EmptyConversation";
import UserList from "@/components/Conversation/UserList";
import useConversation from "@/hooks/useConversation";

import { cn } from "@/utils/cn";


import React, { useEffect, useState } from "react";


export default function MessageHome() {
  const { isOpen } = useConversation();

  return (
    <div  className="flex max-w-[1320px] ml-auto   px-0  h-full">
      <UserList />

      <div className={cn("w-full h-full lg:block", "block")}>
        <EmptyConversation />
      </div>
    </div>
  );
}
