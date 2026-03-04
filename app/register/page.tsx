"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth, useToast } from "@/lib/context"
import { Navbar } from "@/components/shared/navbar"
import { ToastContainer } from "@/components/shared/toast-container"
import { User, Mail, Lock, Eye, EyeOff, Sparkles, Loader2, Check } from "lucide-react"

function getStrength(p: string) {
  let s = 0
  if (p.length >= 6) s++
  if (/[A-Z]/.test(p)) s++
  if (/[0-9]/.test(p)) s++
  if (/[^A-Za-z0-9]/.test(p)) s++
  return s
}

const strengthLabels = ["Tres faible", "Faible", "Moyen", "Fort"]
const strengthColors = ["#ef4444", "#f59e0b", "#eab308", "#22c55e"]

export default function RegisterPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const { addToast } = useToast()
  const router = useRouter()

  const strength = useMemo(() => getStrength(password), [password])
  const usernameValid = username.length >= 3

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    await login("demo@smartadmit.com", "demo123")
    addToast("success", "Compte cree avec succes !")
    router.push("/questions")
    setLoading(false)
  }

  return (
    <>
      <Navbar />
      <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-[#F5F3FF] via-[#ede9fe] to-[#fce7f3] px-4 pt-20">
        <motion.div
          className="absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#9333EA]/15 blur-[120px]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 right-0 h-[350px] w-[350px] rounded-full bg-[#4F46E5]/15 blur-[120px]"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="rounded-2xl border border-white/50 bg-white/80 p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-[#4F46E5]" />
              <span className="gradient-text font-serif text-xl font-extrabold">SmartAdmit</span>
            </div>
            <h1 className="mb-2 font-serif text-2xl font-extrabold text-[#1e1b4b]">Creer un compte</h1>
            <p className="mb-6 text-sm text-[#6b7280]">Commencez votre parcours universitaire</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#1e1b4b]">{"Nom d'utilisateur"}</label>
                <div className="flex items-center gap-2 rounded-xl border border-[#e5e7eb] bg-white px-3 py-2.5 focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-[#4F46E5]/20">
                  <User className="h-4 w-4 text-[#A78BFA]" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Moussa_Diallo"
                    className="flex-1 bg-transparent text-sm text-[#1e1b4b] outline-none placeholder:text-[#A78BFA]/50"
                    required
                  />
                  {usernameValid && <Check className="h-4 w-4 text-emerald-500" />}
                </div>
                {username.length > 0 && !usernameValid && (
                  <p className="mt-1 text-xs text-amber-500">Minimum 3 caracteres</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#1e1b4b]">Email</label>
                <div className="flex items-center gap-2 rounded-xl border border-[#e5e7eb] bg-white px-3 py-2.5 focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-[#4F46E5]/20">
                  <Mail className="h-4 w-4 text-[#A78BFA]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
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
                    placeholder="Mot de passe securise"
                    className="flex-1 bg-transparent text-sm text-[#1e1b4b] outline-none placeholder:text-[#A78BFA]/50"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[#A78BFA] hover:text-[#4F46E5]">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {password.length > 0 && (
                  <div className="mt-2">
                    <div className="mb-1 flex gap-1">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="h-1.5 flex-1 rounded-full"
                          initial={{ scaleX: 0 }}
                          animate={{
                            scaleX: i < strength ? 1 : 0.3,
                            backgroundColor: i < strength ? strengthColors[strength - 1] : "#e5e7eb",
                          }}
                          style={{ originX: 0 }}
                        />
                      ))}
                    </div>
                    <p className="text-xs" style={{ color: strengthColors[Math.max(0, strength - 1)] }}>
                      {strengthLabels[Math.max(0, strength - 1)]}
                    </p>
                  </div>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="gradient-bg flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-70"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {loading ? "Creation en cours..." : "Creer mon compte"}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-sm text-[#6b7280]">
              {"Deja un compte ?"}{" "}
              <Link href="/login" className="text-[#4F46E5] hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
      <ToastContainer />
    </>
  )
}
