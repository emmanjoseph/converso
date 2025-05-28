import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import NavItems from './NavItems'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from './ui/button'




const Navbar = () => {
    
  return (
    <nav className='navbar mx-auto max-w-[1440px]'>
       <Link href={"/"}>
          <div className="flex items-center gap-2.5 cursor-pointer">
             <Image src="/images/logo.svg" alt='logo' width={1000} height={1000} className='size-14'/>
          </div>
       </Link>

       <div className="flex space-x-10">
       <NavItems/>
       {/* signed out */}
        <SignedOut>
           <SignInButton>
              <Button>Sign in</Button>
           </SignInButton>
        </SignedOut>

        {/* signed in */}
        <SignedIn>
           <UserButton/>  
        </SignedIn>

       </div>
             
    </nav>
  )
}

export default Navbar
