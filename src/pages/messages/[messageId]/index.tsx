import Container from "@/components/Container";
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
  console.log("p", conversation);

  return (
    <div className="flex max-w-[1280px] mx-auto   px-0  h-full">
      <UserList />
      <div className=" h-full w-full">
        <div className=" w-full flex flex-col">
          {/* <MessageHeader conversation={conversation} /> */}

          <MessageForm />
        </div>
      </div>
      </div>
  );
}
