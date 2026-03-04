"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth, useProfile, useToast } from "@/lib/context"
import { MOCK_USER } from "@/lib/mock-data"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { ScoreRing } from "@/components/shared/score-ring"
import { Confetti } from "@/components/shared/confetti"
import { ToastContainer } from "@/components/shared/toast-container"
import { Orbs } from "@/components/shared/orbs"
import {
  Sparkles, Zap, FileText, ArrowRight, X, Upload, ChevronRight,
  CheckCircle2, Clock, Circle, School, Heart, CalendarDays,
  LayoutDashboard, Globe, User, Menu
} from "lucide-react"

const statusMap: Record<string, { label: string; color: string; icon: string }> = {
  submitted: { label: "Soumis - En attente", color: "bg-blue-100 text-blue-700", icon: "mail" },
  in_progress: { label: "En preparation", color: "bg-amber-100 text-amber-700", icon: "clock" },
  accepted: { label: "ACCEPTE !", color: "bg-emerald-100 text-emerald-700", icon: "party" },
}

const activity = [
  { icon: Sparkles, text: "Analyse IA - 12 universites recommandees", time: "Aujourd'hui" },
  { icon: FileText, text: "CV uploade - Traitement reussi", time: "Hier" },
  { icon: CheckCircle2, text: "Profil cree", time: "Il y a 2j" },
]

const steps = [
  { label: "Profil complete", done: true },
  { label: "Analyse IA terminee", done: true },
  { label: "Uploader tous les documents", done: false, active: true },
  { label: "Generer CV optimise", done: false },
  { label: "Soumettre candidatures", done: false },
]

export default function DashboardPage() {
  const router = useRouter()
  const { isLoggedIn } = useAuth()
  const { results, applications, documents, favorites } = useProfile()
  const { addToast } = useToast()
  const [bannerOpen, setBannerOpen] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  useEffect(() => {
    if (applications.some((a) => a.status === "accepted")) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }, [applications])

  if (!isLoggedIn) return null

  const uploadedDocs = documents.filter((d) => d.status === "uploaded" || d.status === "processing").length
  const totalDocs = documents.length

  const today = new Date()
  const formatted = today.toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })

  return (
    <div className="flex min-h-screen bg-[#F5F3FF]">
      {showConfetti && <Confetti />}

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar collapsed={sidebarCollapsed} />
      </div>

      {/* Mobile bottom nav */}
      <div className="fixed right-0 bottom-0 left-0 z-50 flex items-center justify-around border-t border-[#e5e7eb] bg-white/90 py-2 backdrop-blur-lg lg:hidden">
        {[
          { href: "/dashboard", icon: LayoutDashboard, label: "Accueil" },
          { href: "/results", icon: Globe, label: "Resultats" },
          { href: "/documents", icon: FileText, label: "Docs" },
          { href: "/profile", icon: User, label: "Profil" },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="flex flex-col items-center gap-0.5">
            <item.icon className="h-5 w-5 text-[#4F46E5]" />
            <span className="text-[10px] font-medium text-[#6b7280]">{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto pb-20 lg:pb-0">
        {/* Toggle sidebar on desktop */}
        <div className="hidden items-center gap-2 px-6 pt-4 lg:flex">
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="rounded-lg p-2 text-[#1e1b4b]/50 hover:bg-[#4F46E5]/10">
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <div className="mx-auto max-w-6xl px-4 pt-6 lg:px-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-serif text-2xl font-extrabold text-[#1e1b4b] sm:text-3xl">
              Bonjour, {MOCK_USER.firstName} <span className="inline-block origin-bottom-right animate-[wave_0.5s_ease-in-out]">{"👋"}</span>
            </h1>
            <p className="mt-1 text-sm capitalize text-[#6b7280]">{formatted}</p>
          </motion.div>

          {/* Alert banner */}
          <AnimatePresence>
            {bannerOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="mt-4 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3"
              >
                <Zap className="h-5 w-5 shrink-0 text-amber-500" />
                <p className="flex-1 text-sm text-amber-800">
                  Completez votre profil a 100% — Il manque votre passeport
                </p>
                <Link href="/documents" className="shrink-0 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-600">
                  Uploader
                </Link>
                <button onClick={() => setBannerOpen(false)} className="shrink-0 text-amber-400 hover:text-amber-600">
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Widgets grid */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Score IA widget - spans 2 cols on lg */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#3730A3] to-[#581C87] p-6 text-white sm:col-span-2 lg:col-span-1 lg:row-span-2"
            >
              <Orbs />
              <div className="relative z-10 flex flex-col items-center text-center">
                <ScoreRing score={results.globalScore} size={140} strokeWidth={10} />
                <p className="mt-4 font-serif text-lg font-extrabold">
                  Votre profil est tres competitif
                </p>
                <p className="mt-1 text-xs text-[#DDD6FE]">
                  Base sur {results.universities} universites analysees dans {results.countries} pays
                </p>
                <Link
                  href="/results"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                >
                  Voir mes recommandations
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Favoris widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-2">
                <Heart className="h-5 w-5 text-[#DB2777]" />
                <h3 className="font-serif text-sm font-bold text-[#1e1b4b]">Favoris</h3>
              </div>
              <div className="space-y-2">
                {results.topCountries.slice(0, 3).map((c, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-[#F5F3FF] px-3 py-2">
                    <span className="text-sm font-medium text-[#1e1b4b]">
                      {c.flag} {c.city}
                    </span>
                    <span className="text-xs font-bold text-[#4F46E5]">{c.score}%</span>
                  </div>
                ))}
              </div>
              <Link href="/results?tab=universities" className="mt-3 flex items-center gap-1 text-xs font-medium text-[#4F46E5] hover:underline">
                Voir tout ({favorites.length} universites)
                <ChevronRight className="h-3 w-3" />
              </Link>
            </motion.div>

            {/* Documents widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#9333EA]" />
                <h3 className="font-serif text-sm font-bold text-[#1e1b4b]">Documents</h3>
                <span className="ml-auto text-xs font-bold text-[#9333EA]">{uploadedDocs}/{totalDocs}</span>
              </div>
              <div className="space-y-1.5">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-2 text-sm">
                    {doc.status === "uploaded" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : doc.status === "processing" ? (
                      <Clock className="h-4 w-4 text-amber-500" />
                    ) : (
                      <Circle className="h-4 w-4 text-[#e5e7eb]" />
                    )}
                    <span className={doc.status === "pending" ? "text-[#6b7280]" : "text-[#1e1b4b]"}>
                      {doc.name}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/documents"
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#9333EA] hover:underline"
              >
                <Upload className="h-3 w-3" />
                Uploader maintenant
              </Link>
            </motion.div>

            {/* Candidatures widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-2">
                <School className="h-5 w-5 text-[#4F46E5]" />
                <h3 className="font-serif text-sm font-bold text-[#1e1b4b]">Candidatures</h3>
              </div>
              <div className="space-y-2">
                {applications.map((app) => {
                  const st = statusMap[app.status]
                  return (
                    <div key={app.id} className="flex items-center justify-between rounded-lg bg-[#F5F3FF] px-3 py-2">
                      <span className="text-sm font-medium text-[#1e1b4b]">
                        {app.country} {app.univ}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${st.color}`}>
                        {st.label}
                      </span>
                    </div>
                  )
                })}
              </div>
              <Link href="/results?tab=plan" className="mt-3 flex items-center gap-1 text-xs font-medium text-[#4F46E5] hover:underline">
                Gerer mes candidatures
                <ChevronRight className="h-3 w-3" />
              </Link>
            </motion.div>

            {/* Activite widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-[#DB2777]" />
                <h3 className="font-serif text-sm font-bold text-[#1e1b4b]">Activite recente</h3>
              </div>
              <div className="space-y-3">
                {activity.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg bg-[#F5F3FF] p-1.5">
                      <a.icon className="h-3.5 w-3.5 text-[#4F46E5]" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#1e1b4b]">{a.text}</p>
                      <p className="text-[10px] text-[#6b7280]">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Prochaines etapes widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <h3 className="font-serif text-sm font-bold text-[#1e1b4b]">Prochaines etapes</h3>
              </div>
              <div className="space-y-2">
                {steps.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {s.done ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                    ) : s.active ? (
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <Clock className="h-4 w-4 shrink-0 text-amber-500" />
                      </motion.div>
                    ) : (
                      <Circle className="h-4 w-4 shrink-0 text-[#e5e7eb]" />
                    )}
                    <span className={`text-xs ${s.done ? "font-medium text-[#1e1b4b] line-through opacity-60" : s.active ? "font-semibold text-amber-700" : "text-[#6b7280]"}`}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recommandation prioritaire */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 mb-8 overflow-hidden rounded-2xl border border-[#4F46E5]/20 bg-gradient-to-r from-[#F5F3FF] to-white p-6 shadow-md"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">{"🇩🇪"}</span>
                  <h3 className="font-serif text-lg font-extrabold text-[#1e1b4b]">TU Berlin</h3>
                  <span className="rounded-full bg-[#4F46E5]/10 px-2.5 py-0.5 text-xs font-bold text-[#4F46E5]">
                    Match 94%
                  </span>
                </div>
                <p className="text-sm text-[#6b7280]">Votre meilleure opportunite</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Budget OK", "Visa 89%", "Top 100 mondial"].map((pill) => (
                    <span key={pill} className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/results"
                  className="gradient-bg inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg"
                >
                  Commencer ma candidature
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}
