'use client'

import React from 'react';
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { usePathname } from 'next/navigation';


const navList = [
  {
    name: '加解密',
    href: '/encryption-and-decryption/aes',
    children: [
      {
        name: 'AES',
        href: '/encryption-and-decryption/aes'
      },
    ]
  },
  {
    name: '号码模拟',
    href: '/num-gen/cnid',
    children: [
      {
        name: '中国身份证',
        href: '/num-gen/cnid'
      },
    ]
  }
]
const TopNav: React.FC = () => {
  const pathname = usePathname();
  return (
    <div className='w-full md:w-[700px] lg:w-[1000px] 2xl:w-[1200px] mx-auto '>
      <div className='border shadow  rounded-lg p-1'>
        <NavigationMenu>
          <NavigationMenuList>
            {
              navList.map((item) => {
                if (item.children) {
                  return (
                    <NavigationMenuItem key={item.name}>
                      <NavigationMenuTrigger className={item.href === pathname ? 'bg-[hsl(var(--accent))]' : ''}>
                        <NavigationMenuLink>
                          {item.name}
                        </NavigationMenuLink>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className='md:w-[600px] lg:w-[900px] 2xl:w-[1100px] flex gap-2'>
                          {
                            item.children.map(child => (
                              <Link href={child.href} legacyBehavior passHref key={child.name}>
                                <NavigationMenuLink active={pathname === child.href} className={navigationMenuTriggerStyle()}>
                                  {child.name}
                                </NavigationMenuLink>
                              </Link>
                            ))
                          }
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  )
                } else {
                  return (
                    <NavigationMenuItem key={item.name}>
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink active={pathname === item.href} className={navigationMenuTriggerStyle()}>
                          {item.name}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  )
                }
              })
            }
          </NavigationMenuList>
        </NavigationMenu> 
      </div>
    </div>
  )
}

export default TopNav;
