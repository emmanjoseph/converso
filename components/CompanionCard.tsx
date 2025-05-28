import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

interface CompanionCardProps {
    id:string,
    name:string,
    topic:string,
    subject:string, 
    duration:number,
    color:string
}

const CompanionCard = ({id,name,topic,subject,duration,color}:CompanionCardProps) => {
  return (
    <div className='companion-card' style={{ backgroundColor:color}}>
        {/* top */}
        <div className="flex justify-between items-center">
            <div className="subject-badge">
                {subject}
            </div>
            <button className="companion-bookmark">
                <Image src={"/icons/bookmark.svg" } alt="bookmark" width={12} height={12}/>
            </button>
        </div>

        {/* middle */}
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-sm"><span className="font-medium">Topic: </span>{topic}</p>

        <div className="flex items-center gap-2">
            <Image src={"/icons/clock.svg"} alt='clock' width={12} height={12}/>
            <span className='text-[14px]'>{duration} min</span>
        </div>

        <Link href={`/companions/${id}`} className='w-full'>
           <Button className='w-full btn-primary bg-[#FE5933] rounded-xl h-12'>
             Launch Lesson
           </Button>
        </Link>
    </div>
  )
}

export default CompanionCard