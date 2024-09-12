import Container from '@/components/Container';
import React, { useState } from 'react'

export default function NotificationPage() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [viewRead, setViewRead] = useState<boolean>(false);


  return (
    <Container>
                  <div className="flex flex-row justify-between">
                  <h1 className="text-2xl font-bold">Notifications</h1>
                  <button
              onClick={() => setViewRead(!viewRead)}
              className="bg-primary text-black px-5 py-2 rounded-md transition hover:opacity-65 font-nunito font-bold"
            >
              {viewRead ? "View Unread Message" : "View All Message"}
            </button>

</div>
    </Container>
  )
}
