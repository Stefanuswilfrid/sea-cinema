import { FullConversationType } from "@/types";
import { cn } from "@/utils/cn";
import { User } from "@prisma/client";
import { Search } from "lucide-react";
import { useState } from "react";
import ConversationBox from "./ConversationBox";
import Avatar from "../Avatar";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
}


export default function  ConversationList({initialItems,users}: ConversationListProps) {
  const [items, setItems] = useState(initialItems);

  return (
    <aside
      className="
            fixed 
            inset-y-0 
            lg:pb-0
            lg:left-20 
            lg:w-80 
            lg:block
            overflow-y-auto 
            border-r 
            border-gray-200 
          block w-full left-0"
    >
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4">
          <div className="text-2xl font-bold text-neutral-800">Messages</div>
          <div 
              className="
                rounded-full 
                p-2 
                bg-gray-100 
                text-gray-600 
                cursor-pointer 
                hover:opacity-75 
                transition
              "
            >
              <Search className="w-4 h-4"/>
            </div>
        </div>
        <div
        className={cn(`
          w-full 
          relative 
          flex 
          items-center 
          space-x-3 
          p-3 
          hover:bg-neutral-100
          rounded-lg
          transition
          cursor-pointer
          `,
           'bg-white'
        )}
      >
        <Avatar src={null}/>
        {/* {data.isGroup ? (
          <AvatarGroup users={data.users} />
        ) : (
          <Avatar user={otherUser} />
        )} */}
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <div className="flex justify-between items-center mb-1">
              <p className="text-md font-medium text-gray-900">
                name
              </p>
             
            </div>
            <p 
              className={cn(`
                truncate 
                text-sm
                `,
              )}>
s              </p>
          </div>
        </div>
      </div>

        {users.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              // selected={conversationId === item.id}
            />
          ))}
      </div>
    </aside>
  );
};



