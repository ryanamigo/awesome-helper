"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { icons } from "lucide-react"
import Link from "next/link"

interface ToolCardProps {
  name: string
  icon: keyof typeof icons
  href: string
}

export function ToolCard({ name, icon, href }: ToolCardProps) {
  const Icon = icons[icon]

  return (
    <Link href={href} className="block">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Card className="bg-card hover:bg-card/80 transition-colors cursor-pointer border border-muted">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-card-foreground">
              <Icon className="h-6 w-6 text-primary" />
              <span>{name}</span>
            </CardTitle>
          </CardHeader>
        </Card>
      </motion.div>
    </Link>
  )
}

