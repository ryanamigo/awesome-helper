'use client'
import { PropsWithChildren, useState } from "react";
import Setting from "@/components/setting";
import { SettingProvider } from "@/contexts/setting";
const Main: React.FC<PropsWithChildren> = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);

  const hanelToggle = (value: boolean) => {
    setIsOpen(value);
  }
  return (
    <SettingProvider>
      <main className="container mx-auto px-4 flex gap-x-4 relative">
        <div className={`relative transition-all overflow-x-hidden w-full`}>
          {children}
        </div>
        <Setting isOpen={isOpen} onToggle={hanelToggle} />
      </main>
    </SettingProvider>
  )
}

export default Main