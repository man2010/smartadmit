"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, XCircle } from "lucide-react"
import { Orbs } from "@/components/shared/orbs"

const errors = [
  { title: "Mauvais pays", desc: "Budget incompatible avec le cout de vie reel" },
  { title: "Mauvaise ville", desc: "Isolement culturel et difficulte d'integration" },
  { title: "Mauvaise universite", desc: "Niveau academique ou visa inadapte" },
]

export function Impact() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#3730A3] to-[#581C87] py-20 lg:py-28">
      <Orbs />
      <div className="relative mx-auto max-w-5xl px-4 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <span className="mb-4 inline-block font-serif text-sm font-bold uppercase tracking-wider text-[#DB2777]">
            Le probleme cache
          </span>
          <h2 className="mb-4 font-serif text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            <span className="text-[#DB2777]">68%</span> des etudiants africains
            <br />abandonnent dans les 18 premiers mois
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#DDD6FE]">
            La raison ? Un mauvais pays, une mauvaise ville, une mauvaise universite.
          </p>
        </motion.div>

        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {errors.map((err, i) => (
            <motion.div
              key={err.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-[#DB2777]/30 bg-[#DB2777]/10 p-6 backdrop-blur-sm"
            >
              <XCircle className="mx-auto mb-3 h-8 w-8 text-[#DB2777]" />
              <h3 className="mb-2 font-serif text-lg font-bold text-white">{err.title}</h3>
              <p className="text-sm text-[#DDD6FE]">{err.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link
            href="/register"
            className="gradient-bg group inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white shadow-xl"
          >
            SmartAdmit change ca
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
