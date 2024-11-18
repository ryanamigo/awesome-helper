'use client'
import { PropsWithChildren, useState } from "react";
import dynamic from 'next/dynamic'

const SettingProvider = dynamic(() => import('@/contexts/setting'), { ssr: false })
const Setting = dynamic(() => import('@/components/setting'), { ssr: false })

const Main: React.FC<PropsWithChildren> = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);

  const hanelToggle = (value: boolean) => {
    setIsOpen(value);
  }
  return (
    <SettingProvider>
      <main className="container mx-auto px-4 mt-4 flex gap-x-4 relative">
        <div className={`relative transition-all overflow-x-hidden w-full`}>
          {children}
        </div>
        <Setting isOpen={isOpen} onToggle={hanelToggle} />
      </main>
    </SettingProvider>
  )
}

export default Main