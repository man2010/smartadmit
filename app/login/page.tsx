"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth, useToast } from "@/lib/context"
import { Navbar } from "@/components/shared/navbar"
import { ToastContainer } from "@/components/shared/toast-container"
import { Mail, Lock, Eye, EyeOff, Sparkles, Loader2, GraduationCap, Brain, Target, FileText } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const { addToast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    const success = await login(email, password)
    if (success) {
      addToast("success", "Connexion reussie !")
      router.push("/dashboard")
    } else {
      setError("Email ou mot de passe incorrect")
      addToast("error", "Identifiants invalides")
    }
    setLoading(false)
  }

  const featureCards = [
    { icon: Brain, label: "Analyse IA", desc: "Profil academique evalue" },
    { icon: GraduationCap, label: "150+ Universites", desc: "Dans 28 pays" },
    { icon: Target, label: "Matching 94%", desc: "Precision algorithmique" },
    { icon: FileText, label: "CV Optimise", desc: "Par intelligence artificielle" },
  ]

  return (
    <>
      <Navbar />
      <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-[#F5F3FF] via-[#ede9fe] to-[#fce7f3] px-4 pt-20">
        {/* Orbs */}
        <motion.div
          className="absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#4F46E5]/15 blur-[120px]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 right-0 h-[350px] w-[350px] rounded-full bg-[#DB2777]/15 blur-[120px]"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        />

        <div className="relative z-10 flex w-full max-w-5xl items-center gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="rounded-2xl border border-white/50 bg-white/80 p-8 shadow-2xl backdrop-blur-xl">
              <div className="mb-6 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-[#4F46E5]" />
                <span className="gradient-text font-serif text-xl font-extrabold">SmartAdmit</span>
              </div>
              <h1 className="mb-2 font-serif text-2xl font-extrabold text-[#1e1b4b]">Connexion</h1>
              <p className="mb-6 text-sm text-[#6b7280]">Accedez a votre espace SmartAdmit</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#1e1b4b]">Email</label>
                  <div className="flex items-center gap-2 rounded-xl border border-[#e5e7eb] bg-white px-3 py-2.5 focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-[#4F46E5]/20">
                    <Mail className="h-4 w-4 text-[#A78BFA]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="demo@smartadmit.com"
                      className="flex-1 bg-transparent text-sm text-[#1e1b4b] outline-none placeholder:text-[#A78BFA]/50"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#1e1b4b]">Mot de passe</label>
                  <div className="flex items-center gap-2 rounded-xl border border-[#e5e7eb] bg-white px-3 py-2.5 focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-[#4F46E5]/20">
                    <Lock className="h-4 w-4 text-[#A78BFA]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="demo123"
                      className="flex-1 bg-transparent text-sm text-[#1e1b4b] outline-none placeholder:text-[#A78BFA]/50"
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[#A78BFA] hover:text-[#4F46E5]">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-500">
                    {error}
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="gradient-bg flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-70"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {loading ? "Connexion..." : "Se connecter"}
                </motion.button>
              </form>

              <div className="mt-4 flex items-center justify-between text-sm">
                <button className="text-[#9333EA] hover:underline">Mot de passe oublie ?</button>
                <Link href="/register" className="text-[#4F46E5] hover:underline">
                  Creer un compte
                </Link>
              </div>

              <div className="mt-6 rounded-xl bg-[#F5F3FF] p-3 text-center">
                <p className="text-xs text-[#6b7280]">
                  Demo : <span className="font-semibold text-[#4F46E5]">demo@smartadmit.com</span> / <span className="font-semibold text-[#4F46E5]">demo123</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden flex-1 lg:block"
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -top-10 right-10 h-40 w-40 rounded-full bg-[#4F46E5]/20 blur-[60px]"
              />
              <div className="grid grid-cols-2 gap-4">
                {featureCards.map((card, i) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.15 }}
                    className="rounded-2xl border border-white/50 bg-white/70 p-5 shadow-lg backdrop-blur-lg"
                  >
                    <card.icon className="mb-3 h-8 w-8 text-[#4F46E5]" />
                    <h3 className="mb-1 font-serif text-sm font-bold text-[#1e1b4b]">{card.label}</h3>
                    <p className="text-xs text-[#6b7280]">{card.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
