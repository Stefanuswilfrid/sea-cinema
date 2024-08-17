import { useMutation } from '@/hooks/useMutation'
import { uploadImage } from '@/libs/cloudinary/upload-image'
import { apiClient } from '@/libs/utils/api-client'
import React from 'react'
import Avatar from '../Avatar'
import { TabLoader } from '../Loader/TabLoader'
import { useSession } from 'next-auth/react'
import { CurrentUser } from '@/types'

export default function AddPhoto({id}:{id:string}) {
  const { data: session,update } = useSession();
  const currentUser = session?.user as CurrentUser;
  
  const { trigger, status } = useMutation<{
    file: File
  }>('/profile/change-avatar', async (url, args) => {
    const formData = new FormData()
    formData.append('file', args.file)
    formData.append('type', 'image')
    const { source } = await uploadImage({
      formData,
      userId: id,
    })
    
    const avatarUrl = source
    
    
    const { data } = await apiClient.put(url, {
      avatarUrl,
    })

    await update({
      user:{
        avatarUrl: avatarUrl,
      }
    });

    return data
  })

  const isLoading = status.state === 'loading'

  return (
    <div className='sticky top-11'>
            <div className="w-52 h-52 rounded-full border border-divider flex items-center justify-center relative overflow-hidden">

      <Avatar src={currentUser?.avatarUrl} height={208} width={208} isLoading={isLoading}/>
      <div className="absolute scale-125">
          <TabLoader offset={-8} visible={isLoading} />
        </div>
      </div>
    {/* <span className='inline-block h-52 w-52 overflow-hidden rounded-full bg-gray-100'>
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-full w-full text-gray-300">
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </span> */}
    <label className="absolute bottom-[-5px] cursor-pointer  left-1/2 transform -translate-x-1/2 block p-[0.375rem] px-4 rounded-full bg-white shadow-custom transition-transform duration-300 ease-in-out active:scale-90">
    <span className="flex items-center gap-2 cursor-pointer">
  <span className="cursor-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" className="block h-4 w-4 fill-current">
      <path d="M17.59 2a2.01 2.01 0 0 1 1.41.59L21.41 5H25a5 5 0 0 1 5 5v14a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V10a5 5 0 0 1 5-5h3.62L13 2.6a2.01 2.01 0 0 1 1.42-.6zM16 8.5a8.51 8.51 0 0 0 0 17 8.51 8.51 0 0 0 0-17zm0 3a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm-10-3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
    </svg>
  </span>
  <span className="cursor-pointer">Add</span>
</span>

  <input
    title="Change profile picture"
    onChange={async (e) => {
      if (e.target.files) {
        const file = e.target.files[0];
        await trigger({ file });
      }
    }}
    className="absolute inset-0 opacity-0 cursor-pointer"
    type="file"
    accept="image/jpeg, image/png, image/gif"
  />
</label>

    

  </div>  )
}
