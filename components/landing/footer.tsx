"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Orbs } from "@/components/shared/orbs"

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#3730A3] to-[#581C87] py-20 lg:py-28">
      <Orbs />
      <div className="relative mx-auto max-w-3xl px-4 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Sparkles className="mx-auto mb-6 h-10 w-10 text-[#DDD6FE]" />
          <h2 className="mb-4 font-serif text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Pret a changer votre avenir ?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-[#DDD6FE]">
            Rejoignez plus de 5 000 etudiants qui ont trouve leur universite ideale grace a SmartAdmit.
          </p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#4F46E5] shadow-xl transition-shadow hover:shadow-2xl"
            >
              Commencer gratuitement
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-[#e5e7eb] bg-white py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center lg:flex-row lg:justify-between lg:px-8 lg:text-left">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#4F46E5]" />
          <span className="gradient-text font-serif text-lg font-extrabold">SmartAdmit</span>
          <span className="text-xs text-[#6b7280]">par Eazy-Visa</span>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-[#6b7280]">
          <span>Dakar, Senegal</span>
          <span>Cotonou, Benin</span>
          <a href="https://eazy-visa.com" className="text-[#4F46E5] hover:underline" target="_blank" rel="noreferrer">
            eazy-visa.com
          </a>
        </div>
        <p className="text-xs text-[#6b7280]">
          2024 SmartAdmit. Tous droits reserves.
        </p>
      </div>
    </footer>
  )
}
