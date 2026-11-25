import CallList from '@/components/common/CallList'
import React from 'react'

const Recordings = () => {
  return (
    <section className='flex size-full flex-col gap-10 text-foreground'>
      <h1 className='text-3xl font-bold'>Recorded Meetings:</h1>
      <CallList type='recordings' />
    </section>
  )
}

export default Recordings