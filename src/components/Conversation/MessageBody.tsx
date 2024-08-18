'use client';

import useConversation from "@/hooks/useConversation";
import { pusherClient } from "@/libs/pusher";
import { FullMessageType } from "@/types";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { find } from "lodash";
import MessageBox from "./MessageBox";



interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages = [] }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);
  
  const { messageId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${messageId}/seen`);
  }, [messageId]);

  useEffect(() => {
    pusherClient.subscribe(messageId)

    //scroll to the latest msg
    bottomRef?.current?.scrollIntoView();

    //receieve new msg from user 
    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${messageId}/seen`);

      setMessages((current) => {
        //search any msg that has already has the same id of the new coming in
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message]
      });
      
      bottomRef?.current?.scrollIntoView();
    };

    // update the seen
    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) => current.map((currentMessage) => {
        if (currentMessage.id === newMessage.id) {
          return newMessage;
        }
  
        return currentMessage;
      }))
    };
  

    pusherClient.bind('messages:new', messageHandler)
    pusherClient.bind('message:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(messageId)
      pusherClient.unbind('messages:new', messageHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }
  }, [messageId]);

  return ( 
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox 
          isLast={i === messages.length - 1} 
          key={message.id} 
          data={message}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
}
 
export default Body;