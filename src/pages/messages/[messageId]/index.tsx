import Container from "@/components/Container";
import EmptyConversation from "@/components/Conversation/EmptyConversation";
import MessageBody from "@/components/Conversation/MessageBody";
import MessageForm from "@/components/Conversation/MessageForm";
import MessageHeader from "@/components/Conversation/MessageHeader";
// import MessageForm from "@/components/Conversation/MessageForm";
import UserList from "@/components/Conversation/UserList";
import { fetcher } from "@/libs";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

export default function MessageID() {
  const router = useRouter();

  const id = router.query.messageId! as string;

  const { data: conversation, error } = useSWR(`/conversation/${id}`, fetcher);
  console.log("tff",id)
  const { data: messages } = useSWR(`/messages?messageId=${id}`, fetcher);
  console.log("msg",messages)

  console.log("p", conversation);
  

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyConversation />
        </div>
      </div>
    )
  }

  return (
    <div className="flex max-w-[1280px] mx-auto   px-0  h-full">
      <UserList />
      <div className=" h-full w-full flex">
        <div className=" w-full flex flex-col">
          <MessageHeader conversation={conversation} />
          <MessageBody initialMessages={messages} />
          <MessageForm />
        </div>
      </div>
      </div>
  );
}
