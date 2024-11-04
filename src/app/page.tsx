'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/encryption-and-decryption/aes')
  }, [router])
  return null
}
