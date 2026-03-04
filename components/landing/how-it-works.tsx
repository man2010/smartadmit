"use client"

import { motion } from "framer-motion"
import { Upload, Sparkles, GraduationCap } from "lucide-react"

const steps = [
  { icon: Upload, label: "Uploadez vos docs", desc: "Telechargez vos releves, CV et documents d'identite", color: "#4F46E5" },
  { icon: Sparkles, label: "L'IA analyse", desc: "Notre IA evalue votre profil et trouve les meilleurs matches", color: "#9333EA" },
  { icon: GraduationCap, label: "Recevez vos candidatures", desc: "Obtenez vos recommandations et soumettez vos dossiers", color: "#DB2777" },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-[#F5F3FF] py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-serif text-3xl font-extrabold text-[#1e1b4b] sm:text-4xl">
            Comment ca marche
          </h2>
          <p className="mx-auto max-w-2xl text-[#6b7280]">
            3 etapes simples pour transformer votre avenir universitaire
          </p>
        </motion.div>

        <div className="relative flex flex-col items-center gap-12 lg:flex-row lg:gap-0">
          {/* Connection line */}
          <div className="absolute top-1/2 right-0 left-0 hidden h-0.5 bg-gradient-to-r from-[#4F46E5] via-[#9333EA] to-[#DB2777] lg:block" />

          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative z-10 flex flex-1 flex-col items-center text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-xl"
                style={{ boxShadow: `0 10px 30px ${step.color}25` }}
              >
                <step.icon className="h-9 w-9" style={{ color: step.color }} />
              </motion.div>
              <span className="gradient-bg mb-3 inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mb-2 font-serif text-lg font-bold text-[#1e1b4b]">{step.label}</h3>
              <p className="max-w-xs text-sm text-[#6b7280]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
