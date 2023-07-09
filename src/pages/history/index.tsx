import Container from '@/components/Container'
import React from 'react'


export default function index() {
  return (
    <main>
        <Container>
            <h1 className='mt-12 text-3xl font-extrabold '>Transactions History</h1>
            <div className="grid grid-cols-4 grid-flow-col gap-4 mt-12">
                <h1></h1>
                <h1 className='font-black text-gray-500 ' >Date</h1>
                <h1 className='font-black text-gray-500' >Price</h1>
                <h1></h1>

            </div>

            <div className="border border-t-slate-300 grid grid-cols-4 grid-flow-col gap-4 mt-12">
                <h1></h1>
                <h1 className='font-black text-gray-500 ' >Date</h1>
                <h1 className='font-black text-gray-500' >Price</h1>
                <h1></h1>

            </div>
        </Container>
    </main>
  )
}
