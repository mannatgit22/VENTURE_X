import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { auth,signIn,signOut } from '@/auth';
import { BadgePlus, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';



const Navbar = async() => {
  const session = await auth();
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className= "flex justify-between items-center">
        <Link href = "/">
        <Image src = "/logo.png" alt = "Venture X" width={120} height={40}/> 
        </Link>

        <div className="flex items-center gap-5 text-black">
        {session && session?.user ? (
          <>
          <Link  className="bg-[#EE2B69] text-white px-5 py-2 rounded-xl border-4 border-black font-bold shadow-[4px_4px_0px_black] transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_black] flex items-center gap-2" href="/startup/create">
          <span className="max-sm:hidden">Create</span>
          <BadgePlus className="size-6 sm:hidden text-blue-500"/>
          
          </Link> 

          <form action={async () =>{
            "use server";
            await signOut({ redirectTo: "/" })
          }}>
            <button  className="bg-[#EE2B69] text-white px-5 py-2 rounded-xl border-4 border-black font-bold shadow-[4px_4px_0px_black] transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_black] flex items-center gap-2" type="submit">
              <span className="max-sm:hidden">Logout</span>
              <LogOut className="size-6 sm:hidden text-red-500"/>
            </button>
            </form > 

            <Link className="border-4 border-black rounded-full font-bold shadow-[2px_2px_0px_black]" href={`/user/${session?.id}`}>
            <Avatar className="size-14">
              <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
              <AvatarFallback>
                AV
              </AvatarFallback>
            </Avatar>
            </Link>
          
          </> 
        ) : (
          <form action={async ()=>{
            "use server";
            await signIn('github')
          }}>
          
            <button className="bg-[#EE2B69] text-white px-5 py-2 rounded-xl border-4 border-black font-bold shadow-[4px_4px_0px_black] transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_black]" type="submit">Login</button>
          </form>
        )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar