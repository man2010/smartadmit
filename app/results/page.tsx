"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/shared/navbar"
import { Orbs } from "@/components/shared/orbs"
import { ScoreRing } from "@/components/shared/score-ring"
import { Confetti } from "@/components/shared/confetti"
import { ToastContainer } from "@/components/shared/toast-container"
import { useProfile, useToast } from "@/lib/context"
import { MOCK_RESULTS, MOCK_UNIVERSITIES } from "@/lib/mock-data"
import Link from "next/link"
import {
  AlertTriangle, CheckCircle, XCircle, ChevronRight, Heart, ExternalLink,
  Globe, School, ClipboardList, Upload, Clock, ArrowRight, Sparkles,
  DollarSign, Trophy, BarChart3, Languages
} from "lucide-react"

const tabs = [
  { id: "countries", label: "Pays & Villes", icon: Globe },
  { id: "universities", label: "Universites", icon: School },
  { id: "plan", label: "Mon Plan", icon: ClipboardList },
]

const colorMap: Record<string, string> = {
  indigo: "#4F46E5",
  purple: "#9333EA",
  pink: "#DB2777",
}

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState("countries")
  const [showConfetti, setShowConfetti] = useState(false)
  const { favorites, toggleFavorite } = useProfile()
  const { addToast } = useToast()

  useEffect(() => {
    setShowConfetti(true)
    const t = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(t)
  }, [])

  const handleFav = (id: number, name: string) => {
    toggleFavorite(id)
    if (!favorites.includes(id)) {
      addToast("info", `${name} ajoute a vos favoris`)
    }
  }

  return (
    <>
      <Navbar />
      <Confetti trigger={showConfetti} />

      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#3730A3] via-[#581C87] to-[#3730A3] pt-24 pb-16">
        <Orbs />
        <div className="relative mx-auto max-w-5xl px-4 text-center lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="mb-4 font-serif text-3xl font-extrabold text-white sm:text-4xl">
              Votre analyse est prete, Moussa !
            </h1>
            <div className="mx-auto mb-6 w-fit">
              <ScoreRing score={MOCK_RESULTS.globalScore} size={140} strokeWidth={10} />
            </div>
            <p className="text-sm text-[#DDD6FE]">
              SmartAdmit a analyse <span className="font-bold text-white">{MOCK_RESULTS.universities} universites</span> dans{" "}
              <span className="font-bold text-white">{MOCK_RESULTS.countries} pays</span> pour vous en{" "}
              <span className="font-bold text-white">{MOCK_RESULTS.processingTime}</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Alert */}
      <section className="mx-auto -mt-8 max-w-5xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: [0, -3, 3, -2, 2, 0] }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-2xl border border-amber-300/30 bg-gradient-to-r from-amber-50 to-rose-50 p-6 shadow-lg"
        >
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <h3 className="font-serif text-base font-bold text-[#1e1b4b]">SmartAdmit a detecte un potentiel probleme avec votre choix initial</h3>
          </div>
          <p className="mb-4 text-sm text-[#6b7280]">
            Vous aviez mentionne la France (Paris) &mdash; voici notre analyse :
          </p>
          <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              "Budget : Paris coute ~1 200EUR/mois > votre budget de 600EUR/mois",
              "Visa : Taux de refus de 58% pour votre profil etudiant",
              "Academique : Niveau requis 14.5/20 > votre moyenne 13.2/20",
              "Culturel : Fort taux d'isolement documente (68%)",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-red-600">
                <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="text-sm font-medium text-[#4F46E5]">
            SmartAdmit vous recommande 3 destinations mieux adaptees
          </p>
        </motion.div>
      </section>

      {/* Tabs */}
      <section className="mx-auto max-w-5xl px-4 pt-8 lg:px-8">
        <div className="mb-8 flex gap-2 rounded-xl bg-[#F5F3FF] p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${
                activeTab === tab.id ? "gradient-bg text-white shadow-md" : "text-[#6b7280] hover:text-[#4F46E5]"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* TAB 1: Countries */}
          {activeTab === "countries" && (
            <motion.div key="countries" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="space-y-6">
                {MOCK_RESULTS.topCountries.map((country, i) => (
                  <motion.div
                    key={country.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="overflow-hidden rounded-2xl border border-white/50 bg-gradient-to-br from-[#3730A3] to-[#581C87] p-6 shadow-xl"
                  >
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <span className="text-2xl">{country.medal}</span>
                      <span className="text-3xl">{country.flag}</span>
                      <div>
                        <h3 className="font-serif text-xl font-extrabold text-white">{country.name} &middot; {country.city}</h3>
                        <span className="rounded-full bg-white/10 px-3 py-0.5 text-xs font-medium text-[#DDD6FE]">
                          {country.badge}
                        </span>
                      </div>
                      <div className="ml-auto">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[#A78BFA]">Score</span>
                          <span className="font-serif text-2xl font-extrabold text-white">{country.score}%</span>
                        </div>
                        <div className="mt-1 h-2 w-32 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            className="gradient-bg h-full rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${country.score}%` }}
                            transition={{ duration: 1.2, delay: 0.3 + i * 0.2 }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {country.pros.map((pro) => (
                        <div key={pro} className="flex items-start gap-2 text-sm text-emerald-300">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>{pro}</span>
                        </div>
                      ))}
                      {country.cons.map((con) => (
                        <div key={con} className="flex items-start gap-2 text-sm text-amber-300">
                          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>{con}</span>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setActiveTab("universities")}
                      className="inline-flex items-center gap-2 rounded-xl bg-white/20 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/30"
                    >
                      Voir les universites a {country.city}
                      <ChevronRight className="h-4 w-4" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 2: Universities */}
          {activeTab === "universities" && (
            <motion.div key="universities" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {MOCK_UNIVERSITIES.map((uni, i) => {
                  const isFav = favorites.includes(uni.id)
                  return (
                    <motion.div
                      key={uni.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -4, boxShadow: `0 20px 40px ${colorMap[uni.color]}30` }}
                      className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm transition-all"
                    >
                      <div className="h-2" style={{ background: `linear-gradient(90deg, ${colorMap[uni.color]}, ${colorMap[uni.color]}aa)` }} />
                      <div className="p-5">
                        <div className="mb-3 flex items-start justify-between">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: colorMap[uni.color] }}>
                            {uni.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                          </div>
                          <span
                            className="rounded-full px-2.5 py-0.5 text-xs font-bold text-white"
                            style={{
                              backgroundColor: uni.score >= 90 ? "#22c55e" : uni.score >= 80 ? "#3b82f6" : "#f59e0b",
                            }}
                          >
                            Match {uni.score}%
                          </span>
                        </div>
                        <h3 className="mb-1 font-serif text-sm font-bold text-[#1e1b4b]">{uni.name}</h3>
                        <p className="mb-3 text-xs text-[#6b7280]">
                          {uni.flag} {uni.city}, {uni.country}
                        </p>
                        <div className="mb-3 flex flex-wrap gap-1.5">
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#F5F3FF] px-2 py-0.5 text-[10px] font-medium text-[#4F46E5]">
                            <DollarSign className="h-3 w-3" />{uni.budget}EUR
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#F5F3FF] px-2 py-0.5 text-[10px] font-medium text-[#9333EA]">
                            <Trophy className="h-3 w-3" />{uni.ranking}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#F5F3FF] px-2 py-0.5 text-[10px] font-medium text-[#DB2777]">
                            <BarChart3 className="h-3 w-3" />Rang {uni.rank}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#F5F3FF] px-2 py-0.5 text-[10px] font-medium text-[#6b7280]">
                            <Languages className="h-3 w-3" />{uni.lang}
                          </span>
                        </div>
                        {uni.deadline <= 30 && (
                          <p className="mb-3 text-xs font-medium text-amber-500">
                            Ferme dans {uni.deadline} jours
                          </p>
                        )}
                        <div className="flex gap-2">
                          <button className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-[#F5F3FF] py-2 text-xs font-medium text-[#4F46E5] hover:bg-[#ede9fe]">
                            En savoir plus <ExternalLink className="h-3 w-3" />
                          </button>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleFav(uni.id, uni.name)}
                            className={`flex items-center justify-center rounded-xl px-3 py-2 transition-all ${
                              isFav ? "bg-[#DB2777]/10 text-[#DB2777]" : "bg-[#F5F3FF] text-[#6b7280] hover:text-[#DB2777]"
                            }`}
                          >
                            <Heart className={`h-4 w-4 ${isFav ? "fill-[#DB2777]" : ""}`} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* TAB 3: Plan */}
          {activeTab === "plan" && (
            <motion.div key="plan" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="space-y-0">
                {[
                  { step: 1, label: "Profil complete", status: "done", icon: CheckCircle },
                  { step: 2, label: "Documents a uploader", status: "current", icon: Upload, subs: ["CV \u2014 Manquant", "Releves de notes \u2014 Manquant", "Passeport \u2014 Manquant"] },
                  { step: 3, label: "CV optimise par l'IA", status: "pending", icon: Sparkles },
                  { step: 4, label: "Lettres de motivation", status: "pending", icon: ClipboardList },
                  { step: 5, label: "Soumission des candidatures", status: "pending", icon: ArrowRight },
                  { step: 6, label: "Suivi des reponses", status: "pending", icon: Clock },
                ].map((item, i) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative flex gap-4 pb-8"
                  >
                    {/* Line */}
                    {i < 5 && (
                      <div className="absolute top-10 left-5 h-full w-0.5 bg-[#e5e7eb]" />
                    )}
                    {/* Icon */}
                    <div
                      className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        item.status === "done"
                          ? "bg-emerald-500 text-white"
                          : item.status === "current"
                          ? "gradient-bg text-white"
                          : "bg-[#e5e7eb] text-[#6b7280]"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-sm font-bold text-[#1e1b4b]">Etape {item.step} &mdash; {item.label}</h3>
                        {item.status === "done" && (
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-600">FAIT</span>
                        )}
                        {item.status === "current" && (
                          <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-600"
                          >
                            EN COURS
                          </motion.span>
                        )}
                        {item.status === "pending" && (
                          <span className="rounded-full bg-[#F5F3FF] px-2 py-0.5 text-[10px] font-bold text-[#A78BFA]">EN ATTENTE</span>
                        )}
                      </div>
                      {item.subs && (
                        <div className="mt-2 space-y-2">
                          {item.subs.map((sub) => (
                            <div key={sub} className="flex items-center gap-2 rounded-lg bg-[#F5F3FF] px-3 py-2">
                              <XCircle className="h-4 w-4 text-red-400" />
                              <span className="flex-1 text-xs text-[#6b7280]">{sub}</span>
                              <Link href="/documents" className="text-xs font-medium text-[#4F46E5] hover:underline">Uploader</Link>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-4">
                <Link
                  href="/documents"
                  className="gradient-bg flex items-center justify-center gap-2 rounded-xl py-4 text-base font-semibold text-white shadow-lg"
                >
                  Commencer mes candidatures &mdash; Uploader mes documents
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <div className="h-20" />
      <ToastContainer />
    </>
  )
}
