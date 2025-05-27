import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import NavItems from './NavItems'



const Navbar = () => {
    
  return (
    <nav className='navbar '>
       <Link href={"/"}>
          <div className="flex items-center gap-2.5 cursor-pointer">
             <Image src="/images/logo.svg" alt='logo' width={46} height={40}/>
          </div>
       </Link>

       <div className="flex space-x-4">
       <NavItems/>
       <p>sign in</p>
       </div>
             
    </nav>
  )
}

export default Navbar
