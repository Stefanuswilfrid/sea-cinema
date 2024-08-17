import { useRouter } from "next/router";
import { useMemo } from "react";

const useConversation = () => {
  const router = useRouter();

  const id = router.query.messageId! as string;

  const messageId = useMemo(() => {
    if (!id) {
      return '';
    }

    return id as string;
  }, [id]);

  const isOpen = useMemo(() => !!messageId, [messageId]);

  return useMemo(() => ({
    isOpen,
    messageId
  }), [isOpen, messageId]);
};

export default useConversation;
