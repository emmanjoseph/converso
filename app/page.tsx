import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import CTA from '@/components/CTA'
import { recentSessions } from '@/constants'
import React from 'react'

const Page = () => {
  return (
   <main>
         <h1>Popular Companions</h1>

      <section className="home-section">
            <CompanionCard
               id="1234"
               name="Neaura Brain Explorer"
               topic="Neural network of the human brain"
               subject="science"
               duration = {45}
               color="#ffda6e"
            />
            <CompanionCard
               id="5678"
               name="Galactic History Guide"
               topic="Major events in the Milky Way"
               subject="history"
               duration={35}
               color="#a0e7e5"
            />
            <CompanionCard
               id="9101"
               name="Eco Earth Mentor"
               topic="Sustainable living practices"
               subject="environment"
               duration={23}
               color="#b4f8c1"
            />     
      </section>

      <section className="home-section">
        <CompanionList
        title="Recent completed sessions"
        companions={recentSessions}
        classNames="w-2/3 max-lg:w-full "
        />
        <CTA/>
      </section>
    </main>
  )
}

export default Page