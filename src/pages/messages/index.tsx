
import Avatar from "@/components/Avatar"
import ConversationList from "@/components/Conversation/ConversationList"
import { useDelayedSWR } from "@/hooks/useDelayedSWR"
import { getTimeAgo } from "@/libs/utils/time"
import Head from "next/head"
import Link from "next/link"

import React from 'react'

export default function MessageHome() {
  return (
    
    <ConversationList/>
  )
}



