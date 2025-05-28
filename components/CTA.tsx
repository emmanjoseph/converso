import React from 'react'
import Image from 'next/image'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

const CTA = () => {
  return (
    <section className='cta-section'>
         <div className="cta-badge">
            Start your learning your way
         </div>

         <h2 className="text-lg font-bold capitalize">
           Build and personalize a learning companion
         </h2>

         <p>Pick a name, subject, voice, & personality — and start learning through voice conversations that feel natural and fun</p>
        
         <Image src="/images/cta.svg" alt='cta' width={362} height={232}/>

          <Link href={"/companions/new"}>
            <Button className='w-full btn-primary bg-[#FE5933] rounded-xl h-12'>
            <Plus/> Build a new companion
           </Button>
         </Link>
          
    </section>
  )
}

export default CTA