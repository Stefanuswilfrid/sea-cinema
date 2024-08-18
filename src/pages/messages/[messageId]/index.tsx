import Container from "@/components/Container";
import EmptyConversation from "@/components/Conversation/EmptyConversation";
import MessageBody from "@/components/Conversation/MessageBody";
import MessageForm from "@/components/Conversation/MessageForm";
import MessageHeader from "@/components/Conversation/MessageHeader";
// import MessageForm from "@/components/Conversation/MessageForm";
import UserList from "@/components/Conversation/UserList";
import LoadingModal from "@/components/Modal/LoadingModal";
import { fetcher } from "@/libs";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

export default function MessageID() {
  const router = useRouter();

  const id = router.query.messageId as string | undefined;
  if (!id) {
    return <LoadingModal/>;
  }

  const { data: conversation, error: conversationError } = useSWR(`/conversation/${id}`, fetcher);
  console.log("tff",id)
  const { data: messages, error: messagesError  } = useSWR(`/messages?messageId=${id}`, fetcher);
  
  if (conversationError || messagesError) {
    return <div>Error: {conversationError?.message || messagesError?.message}</div>;
  }
  
  console.log("msg",messages)

  console.log("p", conversation);
  

  if (!conversation || !messages) {
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
