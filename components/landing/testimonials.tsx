"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { MOCK_TESTIMONIALS } from "@/lib/mock-data"

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#F5F3FF] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 font-serif text-3xl font-extrabold text-[#1e1b4b] sm:text-4xl">
            Ils ont change leur avenir
          </h2>
          <p className="mx-auto max-w-2xl text-[#6b7280]">
            Decouvrez les temoignages de nos etudiants
          </p>
        </motion.div>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          {MOCK_TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="w-[320px] flex-shrink-0 snap-center rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="gradient-bg flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1e1b4b]">{t.name}</p>
                  <p className="text-xs text-[#A78BFA]">{t.country}</p>
                </div>
              </div>
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-[#6b7280]">{t.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
