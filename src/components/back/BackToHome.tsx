'use client'

import { ArrowLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const BackToHome: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const hanelClick = () => {
    const isRootPage =  window.history.length === 1;
    if (isRootPage) {
      router.push('/');
    } else {
      router.back();
    }
  }
  if (pathname === '/') {
    return null;
  }
  return (
    <div onClick={hanelClick} className="cursor-pointer text-sm inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
      <ArrowLeft className="mr-2" />
      返回首页
    </div>
  )
}

export default BackToHome;
