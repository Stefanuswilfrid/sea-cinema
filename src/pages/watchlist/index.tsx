import Container from '@/components/Container'
import SEO from '@/components/SEO'
import React from 'react'

export default function index() {
  return (
    <>
    <SEO title='Your Watchlists' desc='SEA Cinema - Watchlist'/>
    <Container>
        <div className='h-screen mt-12 mx-8'>
        <h1 className='text-4xl font-extrabold'>Watchlists</h1>
        <div className='grid grid-cols-4 mt-8'>
        {/* <div className='bg-red-100 h-48 gap-1 grid grid-cols-2 rounded-xl'>
            <div className='bg-white h-5'></div>
            </div> */}


<div className="grid grid-cols-2 gap-1 shadow-custom p-1 rounded-xl">
        <div>
            <img className="h-auto max-w-full rounded-ss-xl" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt=""/>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-se-xl" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt=""/>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-es-xl" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt=""/>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-ee-xl" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt=""/>
        </div>
    </div>


        </div>
        </div>
    </Container>
    </>
  )
}
