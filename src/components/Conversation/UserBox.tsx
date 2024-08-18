import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

import Avatar from "../Avatar";
import { cn } from "@/utils/cn";
import useConversation from "@/hooks/useConversation";
import LoadingModal from "../Modal/LoadingModal";
import { useMutation } from "@/hooks/useMutation";
import { apiClient } from "@/libs/utils/api-client";

interface UserBoxProps {
  data: User;
  selected: boolean;
}

const UserBox: React.FC<UserBoxProps> = ({ data, selected }) => {
  const { messageId, isOpen } = useConversation();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { trigger, status, data: responseData, error, isMutating, reset } = useMutation(
    '/api/conversations',
    async (url, payload) => apiClient.post(url, payload)
  );

  const handleClick = useCallback(() => {
    setIsLoading(true);

    trigger({ userId: data.id })
    .then((data) => {
      router.push(`/conversations/${data.data.id}`);
    })
    .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>
      {isLoading && (
        <LoadingModal />
      )}
      <div
        onClick={handleClick}
        className={cn(
          `
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
          selected ? "bg-gray-100" : "bg-white"
        )}
      >
        <Avatar src={data.avatarUrl} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">
                {data.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
