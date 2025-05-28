import { PricingTable } from '@clerk/nextjs'
import React from 'react'

const Subscription = () => {
  return (
    <main>
      <div className="flex flex-col items-center space-y-7">
        <h1 className='text-3xl font-bold'>Choose Your Learning Journey</h1>
        <p className='max-w-lg text-center'>Start free, upgrade anytime. Unlock smarter Conversations, deeper insights, and unlimited potential with a plan that fits your goals.</p>
      </div>
      <PricingTable/>
    </main>
  )
}

export default Subscription
