"use client";
import React, { useEffect } from 'react'
import Image from 'next/image'
import { LayoutGrid, PiggyBank, ReceiptText } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link';

function SideNav() {
    const menuList = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutGrid,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Upgrade',
            icon: PiggyBank,
            path: '/dashboard/upgrade'
        },
        {
            id: 3,
            name: 'How does it work',
            icon: ReceiptText,
            path: '/dashboard/how'
        },
      
      
    ]
    const path = usePathname();

    useEffect(() => {
        console.log(path)
    }, [path])

    return (
      <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
          <Image
              src={'/Logo.svg'}
              alt='logo'
              width={160}
              height={100}
          />

<div className='flex items-center space-x-8'>
                {menuList.map((menu) => (
                    <Link href={menu.path} key={menu.id}>
                        <div className={`flex gap-8 text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:text-primary ${path === menu.path && 'text-primary'}`}>
                            <menu.icon />
                            {menu.name}
                            </div>
                      
                  </Link>
              ))}
          </div>

          <div className='flex items-center gap-2'>
              <UserButton />
              <span>Profile</span>
          </div>
      </div>
  );
}

export default SideNav






/*
"use client"
import React , {useEffect} from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

function Header() {

  const path = usePathname();

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
    <Image src={'/Logo.svg'} width={160} height={100} alt="logo" />
    <ul className='hidden md:flex gap-6'>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
        ${path=='/dashboard' && 'text-primary font-bold'}
        `}>Dashboard</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
        ${path=='/dashboard/questions' && 'text-primary font-bold'}
        `}>Questions</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
        ${path=='/dashboard/how' && 'text-primary font-bold'}
        `}>How does it work</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
        ${path=='/dashboard/upgrade' && 'text-primary font-bold'}
        `}>Upgrade</li>
    </ul>
    <UserButton/>
</div>
  )
}

export default Header
*/