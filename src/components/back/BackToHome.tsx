'use client'

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const BackToHome: React.FC = () => {
  const pathname = usePathname();
  if (pathname === '/') {
    return null;
  }
  return (
    <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
      <ArrowLeft className="mr-2" />
      返回首页
    </Link>
  )
}

export default BackToHome;
