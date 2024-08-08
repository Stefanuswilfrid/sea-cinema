
import { useDelayedSWR } from "@/hooks/useDelayedSWR"
import { getTimeAgo } from "@/libs/utils/time"
import Head from "next/head"
import Link from "next/link"

function RoomItem({
    room,
    lastMessage,
    me,
  }: {
    room: any
    lastMessage: any
    me: {
      username: string
    }
  }) {
    const isSender = me.username === room.sender.username
  
    const receiverUsername = isSender
      ? room.receiver.username
      : room.sender.username
  
    const isLastSender = lastMessage.sender.username === me.username
  
    const senderUsername = isLastSender && 'You:'
  
    const avatarUrl = isSender ? room.receiver.avatarUrl : room.sender.avatarUrl
  
    return (
      <li>
        <Link
          href={`/replies/${room.identifier}`}
          className="flex gap-3 px-6 py-3 items-center hover:bg-soft-black"
        >
          {/* <ThreadUserAvatar
            threadUser={{
              avatarUrl: avatarUrl,
              username: receiverUsername,
            }}
          /> */}
          <div className="flex-1">
            <p className="text-sm leading-4">{receiverUsername}</p>
            <span className="text-sm font-light text-span overflow-hidden flex gap-1">
              {senderUsername}
              <span className="line-clamp-1">{lastMessage.content}</span>
            </span>
          </div>
          <span className="text-span text-xs self-start mt-2 font-light tracking-wide">
            {getTimeAgo(lastMessage.createdAt)}
          </span>
        </Link>
      </li>
    )
  }

export function EmptyPlaceholder({ visible }: { visible: boolean }) {
    if (!visible) return null
  
    return (
      <div className="h-52 grid place-items-center">
        <p className="text-black">No replies yet 🍃</p>
      </div>
    )
}

// function RoomItems({ data }: { data?: GetMessagesResponse }) {
//     const { user } = useUser()
  
//     if (!data) return null
  
//     return (
//       <ul>
//         {data.rooms.map((room, index) => {
//           const lastMessage = data.lastMessages[index]
//           return (
//             <RoomItem
//               key={room.identifier}
//               me={user}
//               room={room}
//               lastMessage={lastMessage}
//             />
//           )
//         })}
//       </ul>
//     )
// }

export default function Replies() {
  const { data, isLoading } = useDelayedSWR<any>('/message', {
    duration: 300,
    once: true,
  })

  const isEmpty = data?.rooms.length === 0

  return (
    <>
      {/* <Head>
        <title>Replies</title>
      </Head> */}
      {/* <Header /> */}

      <div className="relative">
        {/* <TabLoader visible={isLoading} /> */}
        {/* <RoomItems data={data} /> */}
        <EmptyPlaceholder visible={true} />
      </div>
    </>
  )
}
