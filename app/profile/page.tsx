"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth, useProfile, useToast } from "@/lib/context"
import { MOCK_USER } from "@/lib/mock-data"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { ToastContainer } from "@/components/shared/toast-container"
import { Orbs } from "@/components/shared/orbs"
import {
  Edit3, Save, X, ChevronDown, ChevronUp, RefreshCw, Trash2,
  AlertCircle, LayoutDashboard, Globe, FileText, User, Menu, Sparkles
} from "lucide-react"

const countryFlags: Record<string, string> = {
  France: "\u{1F1EB}\u{1F1F7}",
  Allemagne: "\u{1F1E9}\u{1F1EA}",
  Canada: "\u{1F1E8}\u{1F1E6}",
  UK: "\u{1F1EC}\u{1F1E7}",
  USA: "\u{1F1FA}\u{1F1F8}",
  Belgique: "\u{1F1E7}\u{1F1EA}",
  Suisse: "\u{1F1E8}\u{1F1ED}",
  Portugal: "\u{1F1F5}\u{1F1F9}",
  Pologne: "\u{1F1F5}\u{1F1F1}",
  "Pays-Bas": "\u{1F1F3}\u{1F1F1}",
}

const interestColors: Record<string, string> = {
  Tech: "bg-[#4F46E5]/10 text-[#4F46E5]",
  Entrepreneuriat: "bg-[#9333EA]/10 text-[#9333EA]",
  Sport: "bg-emerald-100 text-emerald-700",
  Voyage: "bg-amber-100 text-amber-700",
  Musique: "bg-[#DB2777]/10 text-[#DB2777]",
  Art: "bg-orange-100 text-orange-700",
  Lecture: "bg-blue-100 text-blue-700",
  Cuisine: "bg-red-100 text-red-700",
}

export default function ProfilePage() {
  const router = useRouter()
  const { isLoggedIn, logout } = useAuth()
  const { profile, updateProfile } = useProfile()
  const { addToast } = useToast()
  const [editing, setEditing] = useState(false)
  const [openSection, setOpenSection] = useState<number | null>(0)
  const [analyzing, setAnalyzing] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Edit form state
  const [formLevel, setFormLevel] = useState(profile.level)
  const [formGpa, setFormGpa] = useState(profile.gpa)
  const [formDomain, setFormDomain] = useState(profile.domain)
  const [formExp, setFormExp] = useState(profile.experience)
  const [formBudget, setFormBudget] = useState(profile.budget)
  const [formCityPref, setFormCityPref] = useState(profile.cityPref)
  const [formObjectives, setFormObjectives] = useState(profile.objectives)

  useEffect(() => {
    if (!isLoggedIn) router.push("/login")
  }, [isLoggedIn, router])

  const handleSave = () => {
    updateProfile({
      level: formLevel,
      gpa: formGpa,
      domain: formDomain,
      experience: formExp,
      budget: formBudget,
      cityPref: formCityPref,
      objectives: formObjectives,
    })
    setEditing(false)
    addToast("success", "Profil sauvegarde avec succes")
  }

  const handleReanalyze = () => {
    setAnalyzing(true)
    setTimeout(() => {
      setAnalyzing(false)
      addToast("success", "Analyse mise a jour !")
    }, 2000)
  }

  if (!isLoggedIn) return null

  const toggleSection = (idx: number) => {
    setOpenSection(openSection === idx ? null : idx)
  }

  const completion = MOCK_USER.profileCompletion
  const circumference = 2 * Math.PI * 36

  return (
    <div className="flex min-h-screen bg-[#F5F3FF]">
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
            <item.icon className={`h-5 w-5 ${item.href === "/profile" ? "text-[#9333EA]" : "text-[#4F46E5]"}`} />
            <span className="text-[10px] font-medium text-[#6b7280]">{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pb-20 lg:pb-0">
        <div className="hidden items-center gap-2 px-6 pt-4 lg:flex">
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="rounded-lg p-2 text-[#1e1b4b]/50 hover:bg-[#4F46E5]/10">
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <div className="mx-auto max-w-3xl px-4 pt-6 lg:px-8">
          {/* Profile header card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#3730A3] to-[#581C87] p-6 text-white"
          >
            <Orbs />
            <div className="relative z-10 flex flex-col items-center gap-4 sm:flex-row">
              {/* Avatar */}
              <div className="relative">
                <div className="gradient-bg flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white shadow-lg">
                  {MOCK_USER.firstName[0]}{MOCK_USER.lastName[0]}
                </div>
                {/* Progress ring around avatar */}
                <svg width={88} height={88} className="absolute -top-1 -left-1 -rotate-90">
                  <circle cx={44} cy={44} r={36} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={3} />
                  <motion.circle
                    cx={44}
                    cy={44}
                    r={36}
                    fill="none"
                    stroke="#DDD6FE"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: circumference * (1 - completion / 100) }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </svg>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h1 className="font-serif text-xl font-extrabold sm:text-2xl">
                  {MOCK_USER.firstName} {MOCK_USER.lastName}
                </h1>
                <p className="text-sm text-[#DDD6FE]">{MOCK_USER.email}</p>
                <div className="mt-1 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs text-[#DDD6FE]">
                    {MOCK_USER.flag} {MOCK_USER.location}
                  </span>
                  <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs text-[#DDD6FE]">
                    Profil complete a {completion}%
                  </span>
                </div>
              </div>

              {/* Edit button */}
              <div className="flex gap-2">
                {!editing ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setEditing(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/30"
                  >
                    <Edit3 className="h-4 w-4" />
                    Modifier
                  </motion.button>
                ) : (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleSave}
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
                    >
                      <Save className="h-4 w-4" />
                      Sauvegarder
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setEditing(false)}
                      className="inline-flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/30"
                    >
                      <X className="h-4 w-4" />
                      Annuler
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Sections accordion */}
          <div className="mt-6 space-y-3">
            {/* Section 1 - Academic */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm"
            >
              <button
                onClick={() => toggleSection(0)}
                className="flex w-full items-center justify-between px-5 py-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{"🎓"}</span>
                  <span className="font-serif text-sm font-bold text-[#1e1b4b]">Profil Academique</span>
                </div>
                {openSection === 0 ? <ChevronUp className="h-5 w-5 text-[#6b7280]" /> : <ChevronDown className="h-5 w-5 text-[#6b7280]" />}
              </button>
              <AnimatePresence>
                {openSection === 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-4 border-t border-[#e5e7eb] px-5 py-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-[#6b7280]">Niveau</label>
                        {editing ? (
                          <select
                            value={formLevel}
                            onChange={(e) => setFormLevel(e.target.value)}
                            className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm text-[#1e1b4b] focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] focus:outline-none"
                          >
                            {["Bac", "Bac+1", "Bac+2", "Bac+3", "Bac+4", "Bac+5"].map((l) => (
                              <option key={l} value={l}>{l}</option>
                            ))}
                          </select>
                        ) : (
                          <p className="rounded-lg bg-[#F5F3FF] px-3 py-2 text-sm font-medium text-[#1e1b4b]">{profile.level}</p>
                        )}
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-[#6b7280]">Moyenne</label>
                        {editing ? (
                          <input
                            type="text"
                            value={formGpa}
                            onChange={(e) => setFormGpa(e.target.value)}
                            className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm text-[#1e1b4b] focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] focus:outline-none"
                          />
                        ) : (
                          <p className="rounded-lg bg-[#F5F3FF] px-3 py-2 text-sm font-medium text-[#1e1b4b]">{profile.gpa}/20</p>
                        )}
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-[#6b7280]">Domaine</label>
                        {editing ? (
                          <input
                            type="text"
                            value={formDomain}
                            onChange={(e) => setFormDomain(e.target.value)}
                            className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm text-[#1e1b4b] focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] focus:outline-none"
                          />
                        ) : (
                          <p className="rounded-lg bg-[#F5F3FF] px-3 py-2 text-sm font-medium text-[#1e1b4b]">{"💻"} {profile.domain}</p>
                        )}
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-[#6b7280]">Experience</label>
                        {editing ? (
                          <input
                            type="text"
                            value={formExp}
                            onChange={(e) => setFormExp(e.target.value)}
                            className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm text-[#1e1b4b] focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] focus:outline-none"
                          />
                        ) : (
                          <p className="rounded-lg bg-[#F5F3FF] px-3 py-2 text-sm font-medium text-[#1e1b4b]">{profile.experience} an(s)</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Section 2 - Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm"
            >
              <button
                onClick={() => toggleSection(1)}
                className="flex w-full items-center justify-between px-5 py-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{"🌍"}</span>
                  <span className="font-serif text-sm font-bold text-[#1e1b4b]">Vos Preferences</span>
                </div>
                {openSection === 1 ? <ChevronUp className="h-5 w-5 text-[#6b7280]" /> : <ChevronDown className="h-5 w-5 text-[#6b7280]" />}
              </button>
              <AnimatePresence>
                {openSection === 1 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4 border-t border-[#e5e7eb] px-5 py-4">
                      <div>
                        <label className="mb-2 block text-xs font-medium text-[#6b7280]">Pays cibles</label>
                        <div className="flex flex-wrap gap-2">
                          {profile.countries.map((c) => (
                            <span key={c} className="rounded-full bg-[#4F46E5]/10 px-3 py-1 text-xs font-semibold text-[#4F46E5]">
                              {countryFlags[c] || ""} {c}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-xs font-medium text-[#6b7280]">Budget mensuel</label>
                          {editing ? (
                            <input
                              type="text"
                              value={formBudget}
                              onChange={(e) => setFormBudget(e.target.value)}
                              className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm text-[#1e1b4b] focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] focus:outline-none"
                            />
                          ) : (
                            <p className="rounded-lg bg-[#F5F3FF] px-3 py-2 text-sm font-medium text-[#1e1b4b]">{profile.budget}{"\u20AC"}/mois</p>
                          )}
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-medium text-[#6b7280]">Preference de ville</label>
                          {editing ? (
                            <select
                              value={formCityPref}
                              onChange={(e) => setFormCityPref(e.target.value)}
                              className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm text-[#1e1b4b] focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] focus:outline-none"
                            >
                              <option value="Grandes villes">Grandes metropoles</option>
                              <option value="Villes moyennes">Villes moyennes</option>
                              <option value="Peu importe">Peu importe</option>
                            </select>
                          ) : (
                            <p className="rounded-lg bg-[#F5F3FF] px-3 py-2 text-sm font-medium text-[#1e1b4b]">{profile.cityPref}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="mb-2 block text-xs font-medium text-[#6b7280]">Langues</label>
                        <div className="flex flex-wrap gap-2">
                          {profile.languages.map((lang) => (
                            <span key={lang.name} className="rounded-full bg-[#9333EA]/10 px-3 py-1 text-xs font-semibold text-[#9333EA]">
                              {lang.name} ({lang.level})
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Section 3 - Ambitions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm"
            >
              <button
                onClick={() => toggleSection(2)}
                className="flex w-full items-center justify-between px-5 py-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{"🎯"}</span>
                  <span className="font-serif text-sm font-bold text-[#1e1b4b]">Vos Ambitions</span>
                </div>
                {openSection === 2 ? <ChevronUp className="h-5 w-5 text-[#6b7280]" /> : <ChevronDown className="h-5 w-5 text-[#6b7280]" />}
              </button>
              <AnimatePresence>
                {openSection === 2 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4 border-t border-[#e5e7eb] px-5 py-4">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-[#6b7280]">Objectifs de carriere</label>
                        {editing ? (
                          <textarea
                            value={formObjectives}
                            onChange={(e) => setFormObjectives(e.target.value)}
                            rows={3}
                            className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm text-[#1e1b4b] focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] focus:outline-none"
                          />
                        ) : (
                          <p className="rounded-lg bg-[#F5F3FF] px-3 py-2 text-sm leading-relaxed text-[#1e1b4b]">
                            {profile.objectives}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="mb-2 block text-xs font-medium text-[#6b7280]">Centres d{"'"}interet</label>
                        <div className="flex flex-wrap gap-2">
                          {profile.interests.map((interest) => (
                            <span
                              key={interest}
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                interestColors[interest] || "bg-[#F5F3FF] text-[#1e1b4b]"
                              }`}
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-[#6b7280]">Bourse</label>
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                          {profile.scholarship}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Actions */}
          <div className="mt-6 mb-8 flex flex-col gap-3 sm:flex-row">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleReanalyze}
              disabled={analyzing}
              className="gradient-bg inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-60"
            >
              {analyzing ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                  <RefreshCw className="h-4 w-4" />
                </motion.div>
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              {analyzing ? "Analyse en cours..." : "Relancer l'analyse IA"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setDeleteModal(true)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-300 px-5 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              Supprimer mon profil
            </motion.button>
          </div>
        </div>
      </div>

      {/* Delete modal */}
      <AnimatePresence>
        {deleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
            >
              <div className="mb-2 flex items-center gap-2 text-red-500">
                <AlertCircle className="h-6 w-6" />
                <h3 className="font-serif text-lg font-bold text-[#1e1b4b]">Supprimer votre profil ?</h3>
              </div>
              <p className="mb-4 text-sm text-[#6b7280]">
                Toutes vos donnees seront definitivement supprimees. Cette action est irreversible.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModal(false)}
                  className="flex-1 rounded-xl border border-[#e5e7eb] px-4 py-2.5 text-sm font-medium text-[#1e1b4b] hover:bg-[#F5F3FF]"
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    logout()
                    router.push("/")
                    addToast("success", "Profil supprime")
                  }}
                  className="flex-1 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-600"
                >
                  Confirmer la suppression
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI analyzing overlay */}
      <AnimatePresence>
        {analyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1e1b4b]/80 backdrop-blur-sm"
          >
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mx-auto mb-4"
              >
                <Sparkles className="h-12 w-12 text-[#DDD6FE]" />
              </motion.div>
              <p className="font-serif text-lg font-bold text-white">Analyse en cours...</p>
              <p className="mt-1 text-sm text-[#A78BFA]">Mise a jour de vos recommandations</p>
              <div className="mx-auto mt-4 h-2 w-48 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full shimmer"
                  style={{ background: "linear-gradient(135deg, #4F46E5, #9333EA, #DB2777)" }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer />
    </div>
  )
}
