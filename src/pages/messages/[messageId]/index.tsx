import MessageForm from '@/components/Conversation/MessageForm';
import UserList from '@/components/Conversation/UserList'
import { fetcher } from '@/libs';
import { useRouter } from 'next/router';
import React from 'react'
import useSWR from 'swr';


export default function MessageID() {
    const router = useRouter();

    const id = router.query.messageId! as string;

    const { data: conversation, error } = useSWR(
        `/conversation/${id}`,
        fetcher
      );
    console.log("p",conversation)
    
  return (
    <div>
        <UserList/>
        {/* <UserList/> */}
        <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
        <MessageForm />

</div>
</div>
    </div>
  )
}
