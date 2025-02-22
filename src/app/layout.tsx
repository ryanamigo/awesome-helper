"use client"

import { AnimatedBackground } from '@/components/animated-background'
import "./globals.css";
import "./fonts.css";
import { Toaster } from '@/components/ui/toaster'
import { AnimatePresence, motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { ReactNode, useState } from 'react'
import ThemeSwitch from '@/components/theme-toggle/switch';
import BackToHome from '@/components/back/BackToHome';


const SettingProvider = dynamic(() => import('@/contexts/setting'), { ssr: false })
const Setting = dynamic(() => import('@/components/setting'), { ssr: false })
const ThemeProvider = dynamic(() => import('@/components/theme-provider'), { ssr: false })

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [isSettingOpen, setIsSettingOpen] = useState(false);

    const hanelSettingToggle = (value: boolean) => {
      setIsSettingOpen(value);
  }

  return (
    <html lang="zh">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <div className="min-h-screen bg-gradient-to-br from-background to-background/80 text-foreground">
            <AnimatedBackground />
            <header className="fixed top-0 right-0 m-4 z-50">
              <ThemeSwitch />
            </header>
            <SettingProvider>
              <AnimatePresence mode="wait">
                <main className="container mx-auto px-4 mt-8 flex gap-x-4 relative z-10">
                  <div className={`relative transition-all overflow-x-hidden w-full`}>
                    <BackToHome />
                    <motion.div
                      key={pathname}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {children}
                    </motion.div>
                  </div>
                  <Setting isOpen={isSettingOpen} onToggle={hanelSettingToggle} />
                  <Toaster />
                </main>
              </AnimatePresence>
            </SettingProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

