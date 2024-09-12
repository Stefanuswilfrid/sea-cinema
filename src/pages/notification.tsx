import Button from "@/components/Button/Button";
import Container from "@/components/Container";
import LoadingModal from "@/components/Modal/LoadingModal";
import { fetcher } from "@/libs";
import { NotificationInterface } from "@/types";
import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";

export default function NotificationPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [viewRead, setViewRead] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationInterface[]>(
    []
  );

  // Fetch notifications using useSWR
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`/api/notification`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        setNotifications(data.data);
      } catch (error) {
        console.error(error);
        
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotifications();
  }, [ setNotifications, setViewRead]);



  // Trigger data refetch using SWR's `mutate` function whenever `setViewRead` is called
  const handleToggleViewRead = () => {
    setViewRead(!viewRead);
    mutate(`/notification`); // Re-fetch the data
  };



  // if (isValidating || !notifications) {
  //   return <LoadingModal />;
  // }

  // const { data, isLoading } = useSWR<{ data: Array<NotificationInterface> }>(`/dokumen/pemilik/${id}`);


  return (
    <Container>
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <Button
          className="w-auto p-3"
          onClick={handleToggleViewRead} // Call the function that triggers re-fetch
          label={viewRead ? "View Unread Messages" : "View All Messages"}
        />
      </div>
      {notifications.length > 0? <></>:<p className="text-lg font-semibold">No notifications found</p>}

      
    </Container>
  );
}
