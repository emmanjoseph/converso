"use client"
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { subjects } from '@/constants'
import { useSearchParams,useRouter } from 'next/navigation'
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils'

const SubjectFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("subject") || "" ;

    const [subject, setSubject] = useState(query);

    useEffect(() => {
        let newUrl = "";
        if (subject === "all") {
            newUrl = removeKeysFromUrlQuery({
                params:searchParams.toString(),
                keysToRemove:["subject"]
            });
        } else {
            newUrl = formUrlQuery({
                params:searchParams.toString(),
                key:"subject",
                value:subject
            })
        }

       router.push(newUrl);
    },[subject,searchParams,router]);
  return (
    <div className="border border-black p-0.5 rounded-lg">
         <Select onValueChange={setSubject} value={subject} >
  <SelectTrigger className="w-[180px] shadow-none border-none focus-visible:ring-0">
    <SelectValue placeholder="Select Subject" />
  </SelectTrigger>
  <SelectContent>
    {subjects.map((subject) => (
      <SelectItem key={subject} value={subject}>
        {subject}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
    </div>
   

  )
}

export default SubjectFilter