"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Sparkles } from "lucide-react"
import { Orbs } from "./orbs"

const steps = [
  { text: "Analyse de votre profil academique...", pct: 0 },
  { text: "Comparaison avec 150 universites...", pct: 25 },
  { text: "Calcul de la compatibilite culturelle...", pct: 50 },
  { text: "Verification des budgets pays par pays...", pct: 75 },
  { text: "Votre analyse est prete !", pct: 100 },
]

interface AILoadingProps {
  onComplete: () => void
  duration?: number
}

export function AILoading({ onComplete, duration = 3000 }: AILoadingProps) {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const stepDuration = duration / steps.length
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval)
          setTimeout(onComplete, 600)
          return prev
        }
        return prev + 1
      })
    }, stepDuration)
    return () => clearInterval(interval)
  }, [duration, onComplete])

  const step = steps[currentStep]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[#3730A3] via-[#581C87] to-[#3730A3]"
    >
      <Orbs />
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mb-8"
      >
        <Sparkles className="h-12 w-12 text-[#DDD6FE]" />
      </motion.div>

      <h2 className="gradient-text mb-8 font-serif text-2xl font-extrabold">SmartAdmit</h2>

      <div className="relative mb-6 h-2 w-64 overflow-hidden rounded-full bg-white/10 sm:w-80">
        <motion.div
          className="gradient-bg absolute inset-y-0 left-0 rounded-full"
          animate={{ width: `${step.pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <div className="shimmer absolute inset-0" />
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-center text-sm font-medium text-[#DDD6FE]"
        >
          {step.text}
        </motion.p>
      </AnimatePresence>

      <div className="mt-6 flex gap-2">
        {steps.map((_, i) => (
          <motion.div
            key={i}
            className={`h-2 w-2 rounded-full ${i <= currentStep ? "bg-[#DDD6FE]" : "bg-white/20"}`}
            animate={i === currentStep ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        ))}
      </div>
    </motion.div>
  )
}
