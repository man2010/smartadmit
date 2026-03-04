"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const confettiColors = ["#4F46E5", "#9333EA", "#DB2777", "#ffffff", "#A78BFA", "#DDD6FE"]

interface Particle {
  id: number
  x: number
  y: number
  color: string
  rotation: number
  scale: number
  delay: number
}

export function Confetti({ trigger }: { trigger: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    if (trigger) {
      const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
        delay: Math.random() * 0.5,
      }))
      setParticles(newParticles)
      setTimeout(() => setParticles([]), 3000)
    }
  }, [trigger])

  if (!particles.length) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute h-3 w-2 rounded-sm"
          style={{
            left: `${p.x}%`,
            backgroundColor: p.color,
          }}
          initial={{ y: -20, rotate: 0, opacity: 1 }}
          animate={{
            y: typeof window !== "undefined" ? window.innerHeight + 20 : 900,
            rotate: p.rotation + 360,
            opacity: [1, 1, 0],
            x: [0, (Math.random() - 0.5) * 200],
          }}
          transition={{
            duration: 2.5,
            delay: p.delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      ))}
    </div>
  )
}
