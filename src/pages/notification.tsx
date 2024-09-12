import Button from '@/components/Button/Button';
import Container from '@/components/Container';
import LoadingModal from '@/components/Modal/LoadingModal';
import { fetcher } from '@/libs';
import { NotificationInterface } from '@/types';
import React, { useEffect, useState } from 'react'
import useSWR from "swr";

export default function NotificationPage() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [notifications, setNotifications] = useState<NotificationInterface[]>(
      []
    );
    const [viewRead, setViewRead] = useState<boolean>(false);
    useEffect(() => {
      const fetchNotifications = async () => {
        try {
          const { data, error } = useSWR(
            `/notification`,
            fetcher
          );

    
          setNotifications(data);
        } catch (error) {
          console.error(error);
          
        } finally {
          setIsLoading(false);
        }
      };
      fetchNotifications();
      console.log("notif",notifications)
    }, [, setNotifications, setViewRead]);


  return (
    <Container>{!notifications ?<LoadingModal/> : 
                  <div className="flex flex-row justify-between">
                  <h1 className="text-2xl font-bold">Notifications</h1>
                  <Button
                  className='w-auto p-3'
              onClick={() => setViewRead(!viewRead)}
              label={viewRead ? "View Unread Message" : "View All Message"}
            />
              

</div>}
    </Container>
  )
}
