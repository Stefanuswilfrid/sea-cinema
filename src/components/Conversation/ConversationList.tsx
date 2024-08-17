import { FullConversationType } from "@/types";
import { cn } from "@/utils/cn";
import { User } from "@prisma/client";
import { Search } from "lucide-react";
import { useState } from "react";

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
              {/* <MdOutlineGroupAdd size={20} /> */}
              <Search className="w-4 h-4"/>
            </div>
        </div>
        {/* {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))} */}
      </div>
    </aside>
  );
};



