import EmptyConversation from "@/components/Conversation/EmptyConversation";
import UserList from "@/components/Conversation/UserList";
import useConversation from "@/hooks/useConversation";

import { cn } from "@/utils/cn";


import React, { useEffect, useState } from "react";


export default function MessageHome() {
  const { isOpen } = useConversation();

  return (
    <div  className="flex max-w-[1280px] mx-auto   px-0  h-full">
      <UserList />

      <div className={cn("w-full h-full lg:block", isOpen ? 'block' : 'hidden')}>
        <EmptyConversation />
      </div>
    </div>
  );
}
