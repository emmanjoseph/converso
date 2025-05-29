"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Input } from './ui/input'
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils'

const SearchInput = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const query = searchParams.get("topic") || "";

    const [searchQuery, setSearchQuery] = useState(query);

    useEffect(()=>{

        const delayDebounceFn = setTimeout(()=>{
              if (searchQuery ){
            const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: "topic",
            value: searchQuery,
    })
router.push(newUrl, {scroll:false});
        }  else {
            if (pathname === "/companions") {
                const newUrl = removeKeysFromUrlQuery({
  params: searchParams.toString(),
  keysToRemove: ["your_query_key"],
});

router.push(newUrl, { scroll: false });
            }
        }
        }, 600);

        return () => clearTimeout(delayDebounceFn);
      
    },[searchQuery,router,searchParams,pathname])

  return (
    <div className='relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit'>
        <Image src={"/icons/search.svg" } alt='search icon' width={15} height={15} />
        <Input value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)} placeholder='Search by topic' className='h-8 w-60 focus-visible:ring-0 border-0 shadow-none'/>
    </div>
  )
}

export default SearchInput