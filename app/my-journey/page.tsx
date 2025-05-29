import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import { getUserCompanions, getUserSessions } from '@/lib/actions/companion.action';
import Image from 'next/image';
import CompanionList from '@/components/CompanionList';


const MyJourney = async () => {
  const user = await currentUser();
  if(!user) redirect("/sign-in");

  const companions = await getUserCompanions(user.id); 
  const sessionHistory = await getUserSessions(user.id);


  return (
    <main className='min-lg:w-3/4'>
      <section className='flex justify-between gap-4 max-sm:flex-col items-center'>

        <div className="flex items-center gap-4">
            <Image src={user.imageUrl} alt='userImg' width={110} height={110} className='rounded-3xl object-cover shadow-2xl'/>

        <div className="flex flex-col gap-2">
           <h1 className='text-lg'>
             {user.firstName} {user.lastName}
           </h1>

           <p className='text-muted-foreground text-sm font-medium'>{user.emailAddresses[0].emailAddress}</p>
        </div>
        </div>

        <div className="flex gap-4">
           <div className="flex flex-col border rounded-lg p-4 gap-2 h-fit">
              <div className="flex gap-2 items-center">
                <Image src="/icons/check.svg" alt='tick' width={22} height={22}/>
                <p className="text-3xl font-bold">
                   {sessionHistory.length}
                </p>
              </div>

              <div className="text-sm">
                Lessons Completed
              </div>
           </div>

           {/* companions created */}
           <div className="flex flex-col border rounded-lg p-4 gap-2 h-fit">
              <div className="flex gap-2 items-center">
                <Image src="/icons/cap.svg" alt='cap' width={22} height={22}/>
                <p className="text-3xl font-bold">
                   {companions.length}
                </p>
              </div>

              <div className="text-sm">
                Companions Created
              </div>
           </div>
        </div>
      </section>

      <Accordion type="multiple" className='mt-3'>
  <AccordionItem value="recent">
    <AccordionTrigger className='text-2xl font-bold'>Recent Sessions</AccordionTrigger>
    <AccordionContent>
       <CompanionList 
          title='Recent Sessions'
          companions={sessionHistory}
        />
    </AccordionContent>
  </AccordionItem>


  <AccordionItem value='companions'>
    <AccordionTrigger className='text-2xl font-bold'>
      My companions {`(${companions.length})`}
    </AccordionTrigger>
    <AccordionContent>
       <CompanionList 
          title='Created Companions'
          companions={companions}
        />
    </AccordionContent>
  </AccordionItem>
</Accordion>

    </main>
  )
}

export default MyJourney
