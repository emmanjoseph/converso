import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import CTA from '@/components/CTA'
import { recentSessions } from '@/constants'
import { getAllCompanions, getRecentSessions } from '@/lib/actions/companion.action'
import { getSubjectColor } from '@/lib/utils'
import React from 'react'

const Page = async () => {
   const companions = await getAllCompanions({limit:3});
   const recentSessionsCompanions = await getRecentSessions(10)

   // console.log(recentSessionsCompanions);
   
  return (
   <main>
         <h1>Popular Companions</h1>

      <section className="home-section">

         {companions.map((companion)=> (
             <CompanionCard
             key={companion.id}
               id="1234"
              {...companion}
              color={getSubjectColor(companion.subject)}
            />
         ))}
           
               
      </section>

      <section className="home-section">
        <CompanionList
        title="Recent completed sessions"
        companions={recentSessionsCompanions}
        classNames="w-2/3 max-lg:w-full "
        />
        <CTA/>
      </section>
    </main>
  )
}

export default Page