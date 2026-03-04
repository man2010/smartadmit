"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/lib/context"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X, Bell, ChevronDown, LayoutDashboard, User, LogOut, Sparkles } from "lucide-react"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { isLoggedIn, user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const navLinks = [
    { label: "Fonctionnalites", href: "/#features" },
    { label: "Comment ca marche", href: "/#how-it-works" },
    { label: "Tarifs", href: "/#pricing" },
  ]

  const isPublicPage = pathname === "/" || pathname === "/login" || pathname === "/register"

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass-light shadow-lg"
            : isPublicPage
            ? "bg-transparent"
            : "glass-light shadow-lg"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-[#4F46E5]" />
            <span className="gradient-text font-serif text-xl font-extrabold">SmartAdmit</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {isPublicPage &&
              navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[#1e1b4b]/70 transition-colors hover:text-[#4F46E5]"
                >
                  {link.label}
                </Link>
              ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-[#4F46E5] transition-colors hover:bg-[#4F46E5]/10"
                >
                  Connexion
                </Link>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/register"
                    className="gradient-bg inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-lg"
                  >
                    Commencer gratuitement
                  </Link>
                </motion.div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <button className="relative rounded-lg p-2 text-[#1e1b4b]/60 transition-colors hover:bg-[#4F46E5]/10 hover:text-[#4F46E5]">
                  <Bell className="h-5 w-5" />
                  {user && user.notifications > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#DB2777] text-[10px] font-bold text-white">
                      {user.notifications}
                    </span>
                  )}
                </button>
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 rounded-xl bg-[#4F46E5]/10 px-3 py-2 transition-colors hover:bg-[#4F46E5]/20"
                  >
                    <div className="gradient-bg flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white">
                      {user?.firstName?.[0]}
                    </div>
                    <span className="text-sm font-medium text-[#1e1b4b]">{user?.firstName}</span>
                    <ChevronDown className="h-4 w-4 text-[#1e1b4b]/50" />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-xl"
                      >
                        <Link
                          href="/dashboard"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#1e1b4b] transition-colors hover:bg-[#F5F3FF]"
                        >
                          <LayoutDashboard className="h-4 w-4 text-[#4F46E5]" />
                          Dashboard
                        </Link>
                        <Link
                          href="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#1e1b4b] transition-colors hover:bg-[#F5F3FF]"
                        >
                          <User className="h-4 w-4 text-[#9333EA]" />
                          Mon profil
                        </Link>
                        <button
                          onClick={() => {
                            logout()
                            setDropdownOpen(false)
                            router.push("/")
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-500 transition-colors hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4" />
                          Deconnexion
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-[#1e1b4b] md:hidden"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-light fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 pt-20 md:hidden"
          >
            {isPublicPage &&
              navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-[#1e1b4b]"
                >
                  {link.label}
                </Link>
              ))}
            {isLoggedIn && (
              <>
                <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="text-lg font-medium text-[#1e1b4b]">
                  Dashboard
                </Link>
                <Link href="/profile" onClick={() => setMobileOpen(false)} className="text-lg font-medium text-[#1e1b4b]">
                  Mon profil
                </Link>
              </>
            )}
            <div className="flex flex-col items-center gap-3 pt-4">
              {!isLoggedIn ? (
                <>
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="text-[#4F46E5] font-medium">
                    Connexion
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                    className="gradient-bg rounded-xl px-6 py-3 font-semibold text-white"
                  >
                    Commencer gratuitement
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    logout()
                    setMobileOpen(false)
                    router.push("/")
                  }}
                  className="text-red-500 font-medium"
                >
                  Deconnexion
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
