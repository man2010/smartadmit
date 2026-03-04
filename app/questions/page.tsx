"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Orbs } from "@/components/shared/orbs"
import { AILoading } from "@/components/shared/ai-loading"
import { ToastContainer } from "@/components/shared/toast-container"
import {
  Monitor, BarChart3, FlaskConical, Cog, Palette, Heart, Scale, Sparkles,
  ChevronLeft, ChevronRight, Plus, Minus, X, Building, TreePine, Globe
} from "lucide-react"

// Step 1: Academic
const domains = [
  { id: "info", label: "Informatique", icon: Monitor, color: "#4F46E5" },
  { id: "business", label: "Business", icon: BarChart3, color: "#9333EA" },
  { id: "sciences", label: "Sciences", icon: FlaskConical, color: "#DB2777" },
  { id: "engineering", label: "Ingenierie", icon: Cog, color: "#3b82f6" },
  { id: "arts", label: "Arts", icon: Palette, color: "#f59e0b" },
  { id: "medicine", label: "Medecine", icon: Heart, color: "#ef4444" },
  { id: "law", label: "Droit", icon: Scale, color: "#22c55e" },
  { id: "other", label: "Autre", icon: Sparkles, color: "#6b7280" },
]

const countries = [
  { id: "fr", label: "France", flag: "\ud83c\uddeb\ud83c\uddf7" },
  { id: "ca", label: "Canada", flag: "\ud83c\udde8\ud83c\udde6" },
  { id: "de", label: "Allemagne", flag: "\ud83c\udde9\ud83c\uddea" },
  { id: "gb", label: "UK", flag: "\ud83c\uddec\ud83c\udde7" },
  { id: "us", label: "USA", flag: "\ud83c\uddfa\ud83c\uddf8" },
  { id: "be", label: "Belgique", flag: "\ud83c\udde7\ud83c\uddea" },
  { id: "ch", label: "Suisse", flag: "\ud83c\udde8\ud83c\udded" },
  { id: "pt", label: "Portugal", flag: "\ud83c\uddf5\ud83c\uddf9" },
  { id: "pl", label: "Pologne", flag: "\ud83c\uddf5\ud83c\uddf1" },
  { id: "nl", label: "Pays-Bas", flag: "\ud83c\uddf3\ud83c\uddf1" },
]

const langOptions = ["Francais", "Anglais", "Allemand", "Espagnol", "Portugais", "Arabe", "Neerlandais"]
const levels = ["A1", "A2", "B1", "B2", "C1", "C2"]

const careerChips = ["Ingenieur IA", "Product Manager", "Data Scientist", "Entrepreneur", "Consultant", "Chercheur", "Designer UX", "Developpeur Full-Stack"]
const interestTags = ["Sport", "Musique", "Tech", "Entrepreneuriat", "Art", "Voyage", "Lecture", "Cuisine", "Cinema", "Photographie", "Gaming", "Mode"]

function getBudgetInfo(v: number) {
  if (v < 400) return { color: "#ef4444", label: "Tres limite", countries: "3 pays accessibles", flags: "\ud83c\uddf5\ud83c\uddf1\ud83c\uddf1\ud83c\uddf9\ud83c\uddf7\ud83c\uddf4" }
  if (v < 700) return { color: "#f59e0b", label: "Moyen", countries: "12 pays accessibles", flags: "\ud83c\udde9\ud83c\uddea\ud83c\uddf5\ud83c\uddf9\ud83c\udde7\ud83c\uddea..." }
  if (v < 1000) return { color: "#22c55e", label: "Confortable", countries: "22 pays accessibles", flags: "\ud83c\udde8\ud83c\udde6\ud83c\uddec\ud83c\udde7\ud83c\udde8\ud83c\udded..." }
  return { color: "#3b82f6", label: "Excellent", countries: "40+ pays accessibles", flags: "" }
}

function getGpaMessage(v: number) {
  if (v < 10) return { text: "Continuez vos efforts !", color: "#ef4444" }
  if (v < 12) return { text: "Correct, des opportunites existent !", color: "#f59e0b" }
  if (v < 16) return { text: "Bon profil academique !", color: "#22c55e" }
  return { text: "Excellent ! Les meilleures universites vous attendent", color: "#3b82f6" }
}

export default function QuestionsPage() {
  const router = useRouter()
  const [step, setStep] = useState(0) // 0,1,2
  const [showLoading, setShowLoading] = useState(false)

  // Step 1
  const [studyLevel, setStudyLevel] = useState("Bac+3")
  const [gpa, setGpa] = useState(13)
  const [domain, setDomain] = useState("")
  const [experience, setExperience] = useState(1)

  // Step 2
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [budget, setBudget] = useState(600)
  const [selectedLangs, setSelectedLangs] = useState<{name:string;level:string}[]>([])
  const [cityPref, setCityPref] = useState("")

  // Step 3
  const [objectives, setObjectives] = useState("")
  const [selectedChips, setSelectedChips] = useState<string[]>([])
  const [interests, setInterests] = useState<string[]>([])
  const [scholarship, setScholarship] = useState("")
  const [extraInfo, setExtraInfo] = useState("")

  const toggleCountry = (id: string) => {
    setSelectedCountries((p) => p.includes(id) ? p.filter((c) => c !== id) : [...p, id])
  }

  const addLang = (name: string) => {
    if (!selectedLangs.find((l) => l.name === name)) {
      setSelectedLangs((p) => [...p, { name, level: "B1" }])
    }
  }

  const removeLang = (name: string) => {
    setSelectedLangs((p) => p.filter((l) => l.name !== name))
  }

  const updateLangLevel = (name: string, level: string) => {
    setSelectedLangs((p) => p.map((l) => l.name === name ? { ...l, level } : l))
  }

  const toggleInterest = (tag: string) => {
    if (interests.includes(tag)) {
      setInterests((p) => p.filter((t) => t !== tag))
    } else if (interests.length < 5) {
      setInterests((p) => [...p, tag])
    }
  }

  const handleComplete = useCallback(() => {
    router.push("/results")
  }, [router])

  const budgetInfo = getBudgetInfo(budget)
  const gpaInfo = getGpaMessage(gpa)

  if (showLoading) {
    return <AILoading onComplete={handleComplete} duration={3500} />
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#3730A3] via-[#581C87] to-[#3730A3] px-4 py-8">
      <Orbs />

      {/* Progress bar */}
      <div className="relative z-10 mb-4 w-full max-w-2xl">
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#DDD6FE]">
            Etape {step + 1} sur 3
          </span>
          <span className="text-xs text-[#A78BFA]">
            {step === 0 ? "Profil Academique" : step === 1 ? "Preferences" : "Ambitions"}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="gradient-bg h-full rounded-full"
            animate={{ width: `${((step + 1) / 3) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
            >
              <h2 className="mb-6 font-serif text-2xl font-extrabold text-white">Profil Academique</h2>

              {/* Q1 study level */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-[#DDD6FE]">{"Niveau d'etudes"}</label>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {["Bac", "Bac+1", "Bac+2", "Bac+3", "Bac+5"].map((l) => (
                    <motion.button
                      key={l}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setStudyLevel(l)}
                      className={`rounded-xl px-3 py-2 text-sm font-medium transition-all ${
                        studyLevel === l
                          ? "gradient-bg text-white shadow-lg"
                          : "bg-white/10 text-[#DDD6FE] hover:bg-white/20"
                      }`}
                    >
                      {l}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Q2 GPA */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-[#DDD6FE]">Moyenne generale (sur 20)</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={0}
                    max={20}
                    step={0.5}
                    value={gpa}
                    onChange={(e) => setGpa(parseFloat(e.target.value))}
                    className="flex-1 accent-[#4F46E5]"
                  />
                  <span className="rounded-lg bg-white/10 px-3 py-1 text-lg font-bold" style={{ color: gpaInfo.color }}>
                    {gpa}
                  </span>
                </div>
                <p className="mt-1 text-xs" style={{ color: gpaInfo.color }}>{gpaInfo.text}</p>
              </div>

              {/* Q3 Domain */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-[#DDD6FE]">{"Domaine d'etudes"}</label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {domains.map((d) => (
                    <motion.button
                      key={d.id}
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ y: -2 }}
                      onClick={() => setDomain(d.id)}
                      className={`relative flex flex-col items-center gap-2 rounded-xl p-4 text-center transition-all ${
                        domain === d.id
                          ? "border-2 bg-white/20 shadow-lg"
                          : "border border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                      style={domain === d.id ? { borderColor: d.color } : {}}
                    >
                      <d.icon className="h-6 w-6" style={{ color: d.color }} />
                      <span className="text-xs font-medium text-white">{d.label}</span>
                      {domain === d.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white"
                        >
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Q4 Experience */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-[#DDD6FE]">Experience pro (annees)</label>
                <div className="flex items-center gap-4">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setExperience(Math.max(0, experience - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20"
                  >
                    <Minus className="h-4 w-4" />
                  </motion.button>
                  <span className="w-12 text-center text-2xl font-bold text-white">{experience}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setExperience(Math.min(20, experience + 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20"
                  >
                    <Plus className="h-4 w-4" />
                  </motion.button>
                  <span className="text-sm text-[#A78BFA]">{experience === 0 ? "Aucune" : experience === 1 ? "1 an" : `${experience} ans`}</span>
                </div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
            >
              <h2 className="mb-6 font-serif text-2xl font-extrabold text-white">Vos Preferences</h2>

              {/* Q5 Countries */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-[#DDD6FE]">Pays cibles</label>
                <div className="flex flex-wrap gap-2">
                  {countries.map((c) => (
                    <motion.button
                      key={c.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleCountry(c.id)}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                        selectedCountries.includes(c.id)
                          ? "gradient-bg text-white shadow-md"
                          : "bg-white/10 text-[#DDD6FE] hover:bg-white/20"
                      }`}
                    >
                      <span>{c.flag}</span>
                      <span>{c.label}</span>
                      {selectedCountries.includes(c.id) && <X className="h-3 w-3" />}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Q6 Budget */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-[#DDD6FE]">Budget mensuel</label>
                <input
                  type="range"
                  min={100}
                  max={1500}
                  step={50}
                  value={budget}
                  onChange={(e) => setBudget(parseInt(e.target.value))}
                  className="w-full accent-[#4F46E5]"
                />
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-bold text-white">{budget} EUR/mois</span>
                  <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: `${budgetInfo.color}30`, color: budgetInfo.color }}>
                    {budgetInfo.label}
                  </span>
                </div>
                <p className="mt-1 text-xs" style={{ color: budgetInfo.color }}>
                  {budgetInfo.countries} {budgetInfo.flags}
                </p>
              </div>

              {/* Q7 Languages */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-[#DDD6FE]">Langues maitrisees</label>
                <div className="mb-3 flex flex-wrap gap-2">
                  {langOptions.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => addLang(lang)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                        selectedLangs.find((l) => l.name === lang)
                          ? "bg-[#4F46E5] text-white"
                          : "bg-white/10 text-[#DDD6FE] hover:bg-white/20"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
                {selectedLangs.length > 0 && (
                  <div className="space-y-2">
                    {selectedLangs.map((l) => (
                      <div key={l.name} className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2">
                        <span className="flex-1 text-sm text-white">{l.name}</span>
                        <select
                          value={l.level}
                          onChange={(e) => updateLangLevel(l.name, e.target.value)}
                          className="rounded-lg bg-white/10 px-2 py-1 text-xs text-white outline-none"
                        >
                          {levels.map((lv) => <option key={lv} value={lv} className="text-[#1e1b4b]">{lv}</option>)}
                        </select>
                        <button onClick={() => removeLang(l.name)} className="text-[#A78BFA] hover:text-white">
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Q8 City pref */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#DDD6FE]">Preference de ville</label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { id: "metro", icon: Building, label: "Grandes metropoles" },
                    { id: "medium", icon: TreePine, label: "Villes moyennes" },
                    { id: "any", icon: Globe, label: "Peu importe" },
                  ].map((opt) => (
                    <motion.button
                      key={opt.id}
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ y: -2 }}
                      onClick={() => setCityPref(opt.id)}
                      className={`flex flex-col items-center gap-2 rounded-xl p-4 transition-all ${
                        cityPref === opt.id
                          ? "gradient-bg text-white shadow-lg"
                          : "bg-white/10 text-[#DDD6FE] hover:bg-white/20"
                      }`}
                    >
                      <opt.icon className="h-6 w-6" />
                      <span className="text-xs font-medium">{opt.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
            >
              <h2 className="mb-6 font-serif text-2xl font-extrabold text-white">Vos Ambitions</h2>

              {/* Q9 Objectives */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-[#DDD6FE]">Objectifs de carriere</label>
                <textarea
                  value={objectives}
                  onChange={(e) => setObjectives(e.target.value)}
                  placeholder="Decrivez vos objectifs..."
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-[#A78BFA]/50 outline-none focus:border-[#4F46E5]"
                  rows={3}
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {careerChips.map((chip) => (
                    <motion.button
                      key={chip}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedChips((p) => p.includes(chip) ? p.filter((c) => c !== chip) : [...p, chip])
                        if (!objectives.includes(chip)) setObjectives((p) => p ? `${p}, ${chip}` : chip)
                      }}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                        selectedChips.includes(chip) ? "bg-[#4F46E5] text-white" : "bg-white/10 text-[#DDD6FE] hover:bg-white/20"
                      }`}
                    >
                      {chip}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Q10 Interests */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-[#DDD6FE]">{"Centres d'interet"} (max 5)</label>
                <div className="flex flex-wrap gap-2">
                  {interestTags.map((tag) => (
                    <motion.button
                      key={tag}
                      whileTap={{ scale: 0.9 }}
                      animate={interests.includes(tag) ? { scale: [1, 1.1, 1] } : {}}
                      onClick={() => toggleInterest(tag)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                        interests.includes(tag)
                          ? "gradient-bg text-white shadow-md"
                          : "bg-white/10 text-[#DDD6FE] hover:bg-white/20"
                      }`}
                    >
                      {tag}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Q11 Scholarship */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-[#DDD6FE]">Besoin de bourse ?</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "essential", label: "Oui, indispensable" },
                    { id: "preferred", label: "Oui, souhaitable" },
                    { id: "no", label: "Non" },
                    { id: "maybe", label: "Peut-etre" },
                  ].map((opt) => (
                    <motion.button
                      key={opt.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setScholarship(opt.id)}
                      className={`rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                        scholarship === opt.id
                          ? "gradient-bg text-white shadow-lg"
                          : "bg-white/10 text-[#DDD6FE] hover:bg-white/20"
                      }`}
                    >
                      {opt.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Q12 Extra */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#DDD6FE]">Autres infos (optionnel)</label>
                <textarea
                  value={extraInfo}
                  onChange={(e) => setExtraInfo(e.target.value.slice(0, 500))}
                  placeholder="Ajoutez des informations supplementaires..."
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-[#A78BFA]/50 outline-none focus:border-[#4F46E5]"
                  rows={2}
                />
                <p className="mt-1 text-right text-xs text-[#A78BFA]">{extraInfo.length}/500</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="relative z-10 mt-6 flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => step > 0 && setStep(step - 1)}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium ${
              step > 0 ? "bg-white/10 text-white hover:bg-white/20" : "invisible"
            }`}
          >
            <ChevronLeft className="h-4 w-4" /> Precedent
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              if (step < 2) setStep(step + 1)
              else setShowLoading(true)
            }}
            className="gradient-bg flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-lg"
          >
            {step < 2 ? "Suivant" : "Lancer l'analyse IA"}
            {step < 2 ? <ChevronRight className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
          </motion.button>
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}
