"use client"

import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Play, Sparkles, Zap } from "lucide-react"
import { useRef } from "react"

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
      >
        {isInView ? value.toLocaleString() : 0}
      </motion.span>
      {suffix}
    </motion.span>
  )
}

export function Hero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#F5F3FF] via-[#ede9fe] to-[#fce7f3]">
      {/* Animated orbs */}
      <motion.div
        className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#4F46E5]/20 blur-[120px]"
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-20 right-0 h-[400px] w-[400px] rounded-full bg-[#9333EA]/20 blur-[120px]"
        animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute -bottom-20 left-1/3 h-[350px] w-[350px] rounded-full bg-[#DB2777]/20 blur-[120px]"
        animate={{ x: [0, 20, 0], y: [0, -15, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 pt-32 pb-20 lg:flex-row lg:items-center lg:gap-16 lg:px-8 lg:pt-40">
        {/* Left: content */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center lg:text-left"
        >
          {/* Badge pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#4F46E5]/20 bg-white/60 px-4 py-2 text-sm font-medium text-[#4F46E5] shadow-sm backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4" />
            Plateforme 100% automatisee avec IA
          </motion.div>

          <h1 className="mb-6 font-serif text-4xl font-extrabold leading-tight text-[#1e1b4b] sm:text-5xl lg:text-6xl">
            Votre avenir{" "}
            <span className="gradient-text">universitaire</span>
            <br />
            en pilote automatique
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-[#6b7280] lg:mx-0 lg:text-lg">
            {"L'IA analyse vos documents, suggere les meilleures filieres, selectionne les universites parfaites, optimise votre CV et prepare vos candidatures. Tout automatiquement."}
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/register"
                className="gradient-bg group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-base font-semibold text-white shadow-lg"
              >
                Commencer maintenant
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="glass-light inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-[#4F46E5]"
            >
              <Play className="h-5 w-5" />
              Voir la demo
            </motion.button>
          </div>
        </motion.div>

        {/* Right: AI Widget */}
        <motion.div
          initial={{ opacity: 0, x: 40, rotateY: -5 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full max-w-md flex-shrink-0"
        >
          <div className="glass rounded-2xl p-6 shadow-2xl" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(24px)" }}>
            <div className="mb-5 flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="gradient-bg flex h-10 w-10 items-center justify-center rounded-full"
              >
                <Sparkles className="h-5 w-5 text-white" />
              </motion.div>
              <div>
                <p className="text-sm font-semibold text-[#1e1b4b]">Analyse en cours...</p>
                <p className="text-xs text-[#A78BFA]">IA en action</p>
              </div>
              <Zap className="ml-auto h-5 w-5 text-amber-400" />
            </div>

            {[
              { label: "Analyse notes", value: 95, color: "#4F46E5" },
              { label: "Matching universites", value: 87, color: "#9333EA" },
              { label: "CV optimise", value: 92, color: "#DB2777" },
            ].map((bar, i) => (
              <div key={bar.label} className="mb-4">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-medium text-[#6b7280]">{bar.label}</span>
                  <span className="text-xs font-bold" style={{ color: bar.color }}>
                    {bar.value}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#F5F3FF]">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: bar.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${bar.value}%` }}
                    transition={{ duration: 1.2, delay: 0.5 + i * 0.2, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}

            <div className="mt-4 flex items-center justify-between rounded-xl bg-[#F5F3FF] px-4 py-3">
              <span className="text-xs font-medium text-[#6b7280]">Universites suggerees</span>
              <span className="font-serif text-lg font-extrabold text-[#4F46E5]">12</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="relative mx-auto max-w-5xl px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-4 rounded-2xl border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur-lg sm:grid-cols-4 sm:gap-8 sm:p-8"
        >
          {[
            { value: 5000, label: "Etudiants", suffix: "+" },
            { value: 98, label: "Taux acceptation", suffix: "%" },
            { value: 150, label: "Universites", suffix: "+" },
            { value: 10, label: "Minutes traitement", suffix: "min" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-serif text-2xl font-extrabold text-[#4F46E5] sm:text-3xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-1 text-xs font-medium text-[#6b7280] sm:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
