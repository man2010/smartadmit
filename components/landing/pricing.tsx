"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Check, X } from "lucide-react"
import { PRICING_PLANS } from "@/lib/mock-data"
import Link from "next/link"

export function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 font-serif text-3xl font-extrabold text-[#1e1b4b] sm:text-4xl">
            Tarifs simples et transparents
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-[#6b7280]">
            Choisissez le plan adapte a vos besoins. Commencez gratuitement.
          </p>

          {/* Switch */}
          <div className="inline-flex items-center gap-3 rounded-full border border-[#e5e7eb] bg-[#F5F3FF] p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                !annual ? "gradient-bg text-white shadow-md" : "text-[#6b7280]"
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                annual ? "gradient-bg text-white shadow-md" : "text-[#6b7280]"
              }`}
            >
              Annuel (-20%)
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border p-8 ${
                plan.popular
                  ? "border-[#4F46E5]/30 bg-white shadow-2xl ring-2 ring-[#4F46E5]/20 scale-105"
                  : "border-[#e5e7eb] bg-white"
              }`}
            >
              {plan.popular && (
                <span className="gradient-bg absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white">
                  Populaire
                </span>
              )}
              <h3 className="mb-2 font-serif text-xl font-bold text-[#1e1b4b]">{plan.name}</h3>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="font-serif text-4xl font-extrabold text-[#4F46E5]">
                  {annual ? plan.annual : plan.price}
                </span>
                <span className="text-[#6b7280]">{"EUR"}</span>
              </div>
              <ul className="mb-8 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#1e1b4b]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#4F46E5]" />
                    {f}
                  </li>
                ))}
                {plan.notIncluded.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#6b7280]/60">
                    <X className="mt-0.5 h-4 w-4 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/register"
                  className={`block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all ${
                    plan.popular
                      ? "gradient-bg text-white shadow-lg"
                      : "border border-[#4F46E5]/20 text-[#4F46E5] hover:bg-[#4F46E5]/5"
                  }`}
                >
                  Choisir {plan.name}
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
