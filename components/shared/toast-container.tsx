"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/lib/context"
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react"

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
}

const colors = {
  success: "bg-emerald-500/90 border-emerald-400/50",
  error: "bg-red-500/90 border-red-400/50",
  info: "bg-[#4F46E5]/90 border-[#4F46E5]/50",
  warning: "bg-amber-500/90 border-amber-400/50",
}

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed right-4 bottom-4 z-[100] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type]
          return (
            <motion.div
              key={toast.id}
              initial={{ y: 100, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 20 }}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-white shadow-lg backdrop-blur-xl ${colors[toast.type]}`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="text-sm font-medium">{toast.message}</span>
              <button onClick={() => removeToast(toast.id)} className="ml-2 shrink-0 opacity-60 hover:opacity-100">
                <X className="h-4 w-4" />
              </button>
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 rounded-full bg-white/50"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 3, ease: "linear" }}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
