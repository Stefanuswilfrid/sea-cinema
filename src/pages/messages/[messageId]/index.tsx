import Container from "@/components/Container";
import MessageForm from "@/components/Conversation/MessageForm";
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
    // <Container>
    <div className="flex max-w-[1320px] ml-auto   px-0  h-full">
      <UserList />
      {/* <UserList/> */}
      <div className=" h-full w-full">
        <div className=" w-full flex flex-col">
          {/* <MessageHeader conversation={conversation} /> */}

          <MessageForm />
        </div>
      </div>
      </div>
    // </Container>
  );
}
