import { ToolCard } from "@/components/tool-card"
import { icons } from "lucide-react"

type Tool = {
  category: string
  items: {
    name: string
    icon: keyof typeof icons
    href: string
  }[]
}

const tools: Tool[] = [
  {
    category: "加解密",
    items: [
      { name: "AES", icon: "Lock", href: "/encryption-and-decryption/aes" },
    ]
  },
  {
    category: "号码生成",
    items: [
      { name: "身份证号码", icon: "CreditCard", href: "/num-gen/cnid" },
      { name: "组织机构代码", icon: "Building", href: "/num-gen/org-code" },
      { name: "统一社会信用代码", icon: "Building2", href: "/num-gen/org-code" }
    ]
  },
  {
    category: "网络工具",
    items: [
      { name: "IP检测", icon: "Wifi", href: "/network/ip" },
    ]
  }
]

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <div className="text-center mb-8 relative z-10">
        <h1 className="text-4xl font-bold py-2 px-4 bg-background/50 rounded-lg inline-block">工具箱</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-10">
        {tools.map((category) => (
          <div key={category.category} className="space-y-4">
            <h2 className="text-2xl font-semibold">{category.category}</h2>
            {category.items.map((tool) => (
              <ToolCard key={tool.name} name={tool.name} icon={tool.icon} href={tool.href} />
            ))}
          </div>
        ))}
      </div>
    </main>
  )
}

