"use client"

import { motion } from "framer-motion"
import { Brain, Globe, School, MapPin, FileText, Mail, Target, CheckCircle } from "lucide-react"

const features = [
  { icon: Brain, label: "Analyse notes", desc: "L'IA evalue vos performances academiques en detail", color: "#4F46E5" },
  { icon: Globe, label: "Reco pays & ville", desc: "Decouvrez les destinations ideales pour votre profil", color: "#9333EA" },
  { icon: School, label: "Matching univ", desc: "Trouvez les universites les plus compatibles", color: "#DB2777" },
  { icon: MapPin, label: "Villes adaptees", desc: "Analyse du cout de vie et de la qualite de vie", color: "#4F46E5" },
  { icon: FileText, label: "CV optimise", desc: "Generez un CV adapte a chaque candidature", color: "#9333EA" },
  { icon: Mail, label: "Lettre IA", desc: "Lettres de motivation personnalisees par l'IA", color: "#DB2777" },
  { icon: Target, label: "Entretiens", desc: "Preparation aux entretiens avec simulation IA", color: "#4F46E5" },
  { icon: CheckCircle, label: "Check dossier", desc: "Verification complete de votre dossier", color: "#9333EA" },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function Features() {
  return (
    <section id="features" className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <h2 className="mb-4 font-serif text-3xl font-extrabold text-[#1e1b4b] sm:text-4xl">
            Tout ce dont vous avez besoin
          </h2>
          <p className="mx-auto max-w-2xl text-[#6b7280]">
            SmartAdmit automatise chaque etape de votre candidature universitaire grace a l{"'"}intelligence artificielle.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((f) => (
            <motion.div
              key={f.label}
              variants={item}
              whileHover={{ y: -4, boxShadow: `0 20px 40px ${f.color}20` }}
              className="group cursor-pointer rounded-2xl border border-[#e5e7eb] bg-white p-6 transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${f.color}15` }}
              >
                <f.icon className="h-6 w-6" style={{ color: f.color }} />
              </motion.div>
              <h3 className="mb-2 font-serif text-base font-bold text-[#1e1b4b]">{f.label}</h3>
              <p className="text-sm leading-relaxed text-[#6b7280]">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
