"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { cn } from '@/lib/utils'

const links = [
    {
        name:"Home",
        href:"/"
    },
    {
        name:"Learning companions",
        href:"/companions"
    },
    {
        name:"My journey",
        href:"/my-journey"
    },
   
]

const NavItems = () => {

    const pathname = usePathname();
  return (
    <div>
       <div className="flex space-x-9">
         {links.map(({name,href})=> (
            <Link 
            key={name} 
            href={href}
            className={cn( pathname === href && "text-[#FE5933] font-semibold") + "text-[15px]" }
            >
                {name}
            </Link>
         ))}
       </div>
    </div>
  )
}

export default NavItems
