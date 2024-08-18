import { User } from "@prisma/client";
import UserBox from "./UserBox";
import { useUser } from "@/hooks/useUser";
import useSWR from "swr";
import { fetcher } from "@/libs";
import useConversation from "@/hooks/useConversation";
import clsx from "clsx";

const UserList = () => {
  const { messageId, isOpen } = useConversation();

  const { user: currentUser } = useUser();

  const { data: users, error } = useSWR(
    `/users?username=${currentUser?.username}`,
    fetcher
  );
console.log("u",users)

  if (error) return <div>Error loading users.</div>;
  if (!users) return <div>Loading...</div>;

  return (
    <aside
      className={clsx(`
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200 
      `, isOpen ? 'hidden' : 'block w-full left-0')}

    >
      <div className="px-5">
        <div className="flex-col">
          <div
            className="
              text-2xl 
              font-bold 
              text-neutral-800 
              py-4
            "
          >
            Messages
          </div>
        </div>
        {
          users.map((user: any) => (
            <UserBox key={user.id} data={user} selected={messageId===user.id} currentUserId={currentUser.id} />
          ))
        }
      </div>
    </aside>
  );
};

export default UserList;
