import getConversations from "@/actions/getConversations";
// import getConversations from "@/actions/getConversations"
import getSession from "@/actions/getSession"
import getUsers from "@/actions/getUsers"
import Avatar from "@/components/Avatar"
import ConversationList from "@/components/Conversation/ConversationList"
import EmptyConversation from "@/components/Conversation/EmptyConversation"
import UserList from "@/components/Conversation/UserList";
import useConversation from "@/hooks/useConversation"
import { useDelayedSWR } from "@/hooks/useDelayedSWR"
import { useUser } from "@/hooks/useUser";
import { fetcher } from "@/libs"
import { getTimeAgo } from "@/libs/utils/time"
import { CurrentUser } from "@/types"
import { cn } from "@/utils/cn"
import axios from "axios";
import Head from "next/head"
import Link from "next/link"

import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";
import useSWR from "swr"

export default  function MessageHome() {


  const { isOpen } = useConversation();

  return (
    <>
           <UserList/>

    <div className={cn(
      'lg:pl-80 h-full lg:block', 
      'block' 
    )}>
      <EmptyConversation />
    </div>
    </>
  )
}



