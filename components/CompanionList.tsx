import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn, getSubjectColor } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

interface CompanionsList {
    title:string,
    companions:Companion[],
    classNames?:string
}
const CompanionList = ({title,companions,classNames}: CompanionsList) => {
  return (
    <article className={cn("companion-list", classNames)}>

        <h2 className="font-bold text-2xl">{title}</h2>

        <Table className='mt-4'>
       <TableHeader>
    <TableRow>
      <TableHead className="text-[15px] font-normal w-2/3">Lesson</TableHead>
      <TableHead className='text-[15px] font-normal'>Subject</TableHead>
      <TableHead className='text-[15px] font-normal text-right'>Duration</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>

    {companions?.map(({id,name,subject,topic,duration})=> (
        <TableRow key={id}>
            <TableCell className="">
                <Link href={`/companions/${id}`}>
                 <div className="flex items-center gap-3.5">
                    <div className="size-[60px] flex items-center justify-center rounded-lg max-md:hidden" style={{backgroundColor:getSubjectColor(subject)}}>
                        <Image src={`/icons/${subject}.svg`} alt='subject icon' width={20} height={20}/>
                    </div>

                    <div className="flex flex-col gap-1 5">
                        <h3 className='font-semibold text-base '>{name}</h3>
                        <p className='text-sm text-gray-700'>{topic}</p>
                    </div>

                 </div>
                </Link>
            </TableCell>



            <TableCell>
                <div className="subject-badge w-fit max-md:hidden">
                    {subject}
                </div>

                 <div className="flex items-center justify-center rounded-lg md:hidden p-2" style={{backgroundColor:getSubjectColor(subject)}}>
                        <Image src={`/icons/${subject}.svg`} alt='subject icon' width={18} height={18}/>
                    </div>
            </TableCell>
            <TableCell className='text-right'>

                <h4 className=''>{duration} {""}
                <span className="max-md:hidden">min</span>
                 </h4>

                 <Image src={"/icons/clock.svg"} alt='clock' width={12} height={12} className="md:hidden"/>
                  
            </TableCell>
        </TableRow>
    ))}
   
  </TableBody>
</Table>

    </article>
  )
}

export default CompanionList