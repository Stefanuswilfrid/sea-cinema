import { cn } from "@/utils/cn";

export default function  ConversationList(){
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



