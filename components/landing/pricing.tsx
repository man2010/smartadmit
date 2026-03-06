"use client"

import { motion } from "framer-motion"
import { Check, X, Sparkles, Zap, Crown } from "lucide-react"
import Link from "next/link"

const PRICING_PLANS = [
  {
    name: "Gratuit",
    price: "0",
    subtitle: "Pour explorer",
    icon: Sparkles,
    color: "#6b7280",
    accentColor: "#e5e7eb",
    popular: false,
    features: [
      "Analyse des notes",
      "5 filières suggérées",
      "10 universités sélectionnées",
      "Recommandation pays/ville IA",
      "CV optimisé",
      "Support email",
    ],
    notIncluded: [
      "Lettres de motivation IA",
      "Préparation aux entretiens",
      "Coach personnel dédié",
    ],
    cta: "Commencer gratuitement",
  },
  {
    name: "Premium",
    price: "99",
    subtitle: "Par candidature",
    icon: Zap,
    color: "#4F46E5",
    accentColor: "#4F46E5",
    popular: true,
    features: [
      "Tout de l'offre Gratuit",
      "Filières & universités illimitées",
      "Lettres de motivation IA",
      "Préparation aux entretiens",
      "Check complet du dossier",
      "Support prioritaire 24/7",
      "Analyse culturelle approfondie",
    ],
    notIncluded: [
      "Coach personnel dédié",
    ],
    cta: "Choisir Premium",
  },
  {
    name: "Excellence",
    price: "199",
    subtitle: "Par candidature",
    icon: Crown,
    color: "#7C3AED",
    accentColor: "#7C3AED",
    popular: false,
    features: [
      "Tout du Premium",
      "Coach personnel dédié",
      "Revue personnalisée du dossier",
      "Stratégie de bourses",
      "Assistance visa & logement",
    ],
    notIncluded: [],
    cta: "Choisir Excellence",
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="relative bg-white py-20 lg:py-28 overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-[#F5F3FF] opacity-60 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#F5F3FF] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#4F46E5]">
            Modèle économique
          </span>
          <h2 className="mb-4 font-serif text-3xl font-extrabold text-[#1e1b4b] sm:text-4xl">
            Des tarifs ultra-réduits
          </h2>
          <p className="mx-auto mb-2 max-w-xl text-[#6b7280]">
            Jusqu'à <span className="font-bold text-[#4F46E5]">4× à 10× moins cher</span> qu'une agence traditionnelle.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 items-center">
          {PRICING_PLANS.map((plan, i) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className={`relative rounded-2xl border p-8 flex flex-col ${
                  plan.popular
                    ? "border-[#4F46E5]/30 bg-white shadow-2xl ring-2 ring-[#4F46E5]/20 scale-105 z-10"
                    : "border-[#e5e7eb] bg-white"
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <span
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white shadow"
                    style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)" }}
                  >
                    ✦ Populaire
                  </span>
                )}

                {/* Icon + name */}
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{ background: `${plan.accentColor}18` }}
                  >
                    <Icon className="h-4 w-4" style={{ color: plan.accentColor }} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#1e1b4b]">{plan.name}</h3>
                    <p className="text-xs text-[#6b7280]">{plan.subtitle}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6 flex items-end gap-1">
                  {plan.price === "0" ? (
                    <span className="font-serif text-4xl font-extrabold text-[#1e1b4b]">Gratuit</span>
                  ) : (
                    <>
                      <span
                        className="font-serif text-4xl font-extrabold"
                        style={{ color: plan.accentColor }}
                      >
                        {plan.price}€
                      </span>
                      <span className="mb-1 text-sm text-[#6b7280]">/candidature</span>
                    </>
                  )}
                </div>

                {/* Features */}
                <ul className="mb-8 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#1e1b4b]">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: plan.accentColor }}
                      />
                      {f}
                    </li>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#9ca3af]">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-[#d1d5db]" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/register"
                    className={`block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all ${
                      plan.popular
                        ? "text-white shadow-lg"
                        : "border text-[#4F46E5] hover:bg-[#4F46E5]/5"
                    }`}
                    style={
                      plan.popular
                        ? { background: "linear-gradient(135deg, #4F46E5, #7C3AED)" }
                        : { borderColor: `${plan.accentColor}33` }
                    }
                  >
                    {plan.cta}
                  </Link>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center text-sm text-[#9ca3af]"
        >
          Aucun abonnement. Payez uniquement quand vous candidatez. 🎓
        </motion.p>
      </div>
    </section>
  )
}