import { FullConversationType } from "@/types";
import { cn } from "@/utils/cn";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Avatar from "../Avatar";


interface ConversationBoxProps {
    data: any,
    selected?: boolean;
  }
  
  const ConversationBox: React.FC<ConversationBoxProps> = ({ 
    data, 
    selected 
  }) => {
    // const otherUser = useOtherUser(data);
    const session = useSession();
    const router = useRouter();
  
    const handleClick = useCallback(() => {
      router.push(`/conversations/${data.id}`);
    }, [data, router]);
  
    const lastMessage = useMemo(() => {
      const messages = data.messages || [];
  
      return messages[messages.length - 1];
    }, [data.messages]);
  
    const userEmail = useMemo(() => session.data?.user?.email,
    [session.data?.user?.email]);
    
    // const hasSeen = useMemo(() => {
    //   if (!lastMessage) {
    //     return false;
    //   }
  
    //   const seenArray = lastMessage.seen || [];
  
    //   if (!userEmail) {
    //     return false;
    //   }
  
    //   return seenArray
    //     .filter((user) => user.email === userEmail).length !== 0;
    // }, [userEmail, lastMessage]);
  
    const lastMessageText = useMemo(() => {
      if (lastMessage?.image) {
        return 'Sent an image';
      }
  
      if (lastMessage?.body) {
        return lastMessage?.body
      }
  
      return 'Started a conversation';
    }, [lastMessage]);
  
    return ( 
      <div
        onClick={handleClick}
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
          selected ? 'bg-neutral-100' : 'bg-white'
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
              {lastMessage?.createdAt && (
                <p 
                  className="
                    text-xs 
                    text-gray-400 
                    font-light
                  "
                >
                  {format(new Date(lastMessage.createdAt), 'p')}
                </p>
              )}
            </div>
            <p 
              className={cn(`
                truncate 
                text-sm
                `,
              )}>
                {lastMessageText}
              </p>
          </div>
        </div>
      </div>
    );
  }
   
  export default ConversationBox;
  