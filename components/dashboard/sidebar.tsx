"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/lib/context"
import { MOCK_USER } from "@/lib/mock-data"
import {
  LayoutDashboard, Globe, FileText, School, User, Settings, LogOut, Sparkles
} from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/results", label: "Mes recommandations", icon: Globe },
  { href: "/documents", label: "Mes documents", icon: FileText, badge: 3 },
  { href: "/results?tab=plan", label: "Mes candidatures", icon: School },
  { href: "/profile", label: "Mon profil", icon: User },
  { href: "/profile", label: "Parametres", icon: Settings },
]

export function DashboardSidebar({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()

  return (
    <aside className={`flex h-screen flex-col bg-gradient-to-b from-[#3730A3] to-[#581C87] ${collapsed ? "w-16" : "w-[280px]"} shrink-0 transition-all`}>
      {/* Logo */}
      <div className={`flex items-center gap-2 px-5 pt-6 pb-4 ${collapsed ? "justify-center px-2" : ""}`}>
        <Sparkles className="h-6 w-6 shrink-0 text-[#DDD6FE]" />
        {!collapsed && <span className="gradient-text font-serif text-lg font-extrabold">SmartAdmit</span>}
      </div>

      {/* User */}
      {!collapsed && (
        <div className="mx-4 mb-6 flex items-center gap-3 rounded-xl bg-white/10 p-3">
          <div className="gradient-bg flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white">
            M
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">{MOCK_USER.firstName} {MOCK_USER.lastName}</p>
            <p className="text-xs text-[#A78BFA]">Profil a {MOCK_USER.profileCompletion}%</p>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "gradient-bg text-white shadow-md"
                  : "text-[#DDD6FE] hover:bg-white/10"
              } ${collapsed ? "justify-center px-2" : ""}`}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && item.badge && (
                <span className="ml-auto rounded-full bg-[#DB2777] px-2 py-0.5 text-[10px] font-bold text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-3">
        <button
          onClick={() => {
            logout()
            router.push("/")
          }}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-300 hover:bg-red-500/10 ${collapsed ? "justify-center px-2" : ""}`}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Deconnexion</span>}
        </button>
      </div>
    </aside>
  )
}
