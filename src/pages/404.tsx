import SEO from '@/components/SEO'
import { AlarmCheck, AlarmClock, AlarmSmoke } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function NotFoundPage() {
  return (
    <>
    {/* <SEO title='Not Found' desc='Not Found Page'/> */}
    <main>
        <section>
          <div className='layout flex min-h-[80vh] flex-col items-center justify-center text-center'>
            <AlarmClock
              size={60}
              className='drop-shadow-glow animate-flicker '
            />
            <h1 className='mt-8 text-3xl md:text-5xl font-bold'>Page Not Found</h1>
            <Link className='mt-4 text-font md:text-lg' href='/'>
              Back to Home
            </Link>

          </div>
        </section>
      </main>
    </>
  )
}
