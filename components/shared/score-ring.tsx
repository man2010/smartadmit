"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface ScoreRingProps {
  score: number
  size?: number
  strokeWidth?: number
  className?: string
}

function getScoreColor(score: number) {
  if (score < 60) return "#ef4444"
  if (score < 75) return "#f59e0b"
  if (score < 90) return "#22c55e"
  return "#4F46E5"
}

export function ScoreRing({ score, size = 120, strokeWidth = 8, className = "" }: ScoreRingProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = (score / 100) * circumference
  const color = getScoreColor(score)

  return (
    <div ref={ref} className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: circumference - progress } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="font-serif text-2xl font-extrabold"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {score}
        </motion.span>
        <span className="text-xs text-[#A78BFA]">/ 100</span>
      </div>
    </div>
  )
}
