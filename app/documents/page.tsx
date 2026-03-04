"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth, useProfile, useToast } from "@/lib/context"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { ToastContainer } from "@/components/shared/toast-container"
import { Orbs } from "@/components/shared/orbs"
import {
  Upload, FileText, Eye, Trash2, CheckCircle2, Clock, Circle,
  RefreshCw, X, LayoutDashboard, Globe, User, Menu, AlertCircle
} from "lucide-react"

const docIcons: Record<string, string> = {
  cv: "CV",
  transcript: "RN",
  cover_letter: "LM",
  passport: "ID",
  diploma: "DP",
}

const ocrResult = {
  type: "Releve de notes officiel",
  period: "2021-2024",
  institution: "Universite Cheikh Anta Diop, Dakar",
  gpa: "13.2/20",
  domain: "Informatique - Systemes d'Information",
  signature: "Signature numerique detectee - Document authentique",
}

export default function DocumentsPage() {
  const router = useRouter()
  const { isLoggedIn } = useAuth()
  const { documents, addDocument, updateDocStatus } = useProfile()
  const { addToast } = useToast()
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [ocrVisible, setOcrVisible] = useState(false)
  const [previewDoc, setPreviewDoc] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) router.push("/login")
  }, [isLoggedIn, router])

  const simulateUpload = useCallback(() => {
    setUploading(true)
    setUploadProgress(0)
    setOcrVisible(false)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setUploading(false)
            setOcrVisible(true)
            addToast("success", "Fichier recu ! OCR en cours...")
            setTimeout(() => {
              addToast("success", "Document analyse avec succes !")
            }, 2000)
          }, 300)
          return 100
        }
        return prev + 4
      })
    }, 50)
  }, [addToast])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragActive(false)
      simulateUpload()
    },
    [simulateUpload]
  )

  if (!isLoggedIn) return null

  const uploaded = documents.filter((d) => d.status === "uploaded").length
  const processing = documents.filter((d) => d.status === "processing").length
  const total = documents.length
  const ring = Math.round(((uploaded + processing) / total) * 100)

  return (
    <div className="flex min-h-screen bg-[#F5F3FF]">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar collapsed={sidebarCollapsed} />
      </div>

      {/* Mobile bottom nav */}
      <div className="fixed right-0 bottom-0 left-0 z-50 flex items-center justify-around border-t border-[#e5e7eb] bg-white/90 py-2 backdrop-blur-lg lg:hidden">
        {[
          { href: "/dashboard", icon: LayoutDashboard, label: "Accueil" },
          { href: "/results", icon: Globe, label: "Resultats" },
          { href: "/documents", icon: FileText, label: "Docs" },
          { href: "/profile", icon: User, label: "Profil" },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="flex flex-col items-center gap-0.5">
            <item.icon className={`h-5 w-5 ${item.href === "/documents" ? "text-[#9333EA]" : "text-[#4F46E5]"}`} />
            <span className="text-[10px] font-medium text-[#6b7280]">{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pb-20 lg:pb-0">
        <div className="hidden items-center gap-2 px-6 pt-4 lg:flex">
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="rounded-lg p-2 text-[#1e1b4b]/50 hover:bg-[#4F46E5]/10">
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <div className="mx-auto max-w-6xl px-4 pt-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-serif text-2xl font-extrabold text-[#1e1b4b] sm:text-3xl">Mes documents</h1>
            <p className="mt-1 text-sm text-[#6b7280]">Uploadez et gerez vos documents pour vos candidatures</p>
          </motion.div>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row">
            {/* Sidebar document list */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="w-full shrink-0 lg:w-[260px]"
            >
              <div className="rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
                <h3 className="mb-3 font-serif text-sm font-bold text-[#1e1b4b]">Documents requis</h3>
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm ${
                        doc.status === "uploaded"
                          ? "bg-emerald-50"
                          : doc.status === "processing"
                          ? "bg-amber-50"
                          : "bg-[#F5F3FF]"
                      }`}
                    >
                      {doc.status === "uploaded" ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                      ) : doc.status === "processing" ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                          <Clock className="h-4 w-4 shrink-0 text-amber-500" />
                        </motion.div>
                      ) : (
                        <Circle className="h-4 w-4 shrink-0 text-[#e5e7eb]" />
                      )}
                      <span className="flex-1 font-medium text-[#1e1b4b]">{doc.name}</span>
                      {doc.status === "uploaded" && <span className="text-[10px] text-emerald-500">OK</span>}
                      {doc.status === "processing" && <span className="text-[10px] text-amber-500">OCR...</span>}
                    </div>
                  ))}
                </div>

                {/* Progress ring */}
                <div className="mt-4 flex items-center justify-center gap-3 rounded-xl bg-[#F5F3FF] p-3">
                  <div className="relative h-12 w-12">
                    <svg width={48} height={48} className="-rotate-90">
                      <circle cx={24} cy={24} r={18} fill="none" stroke="#e5e7eb" strokeWidth={4} />
                      <motion.circle
                        cx={24}
                        cy={24}
                        r={18}
                        fill="none"
                        stroke="#4F46E5"
                        strokeWidth={4}
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 18}
                        initial={{ strokeDashoffset: 2 * Math.PI * 18 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 18 * (1 - ring / 100) }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#4F46E5]">
                      {ring}%
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#1e1b4b]">{uploaded + processing}/{total}</p>
                    <p className="text-[10px] text-[#6b7280]">documents</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main area */}
            <div className="flex-1 space-y-6">
              {/* Dropzone */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all ${
                  dragActive
                    ? "scale-[1.01] border-[#9333EA] bg-[#9333EA]/5"
                    : "border-[#4F46E5]/30 bg-white"
                }`}
                onDragOver={(e) => {
                  e.preventDefault()
                  setDragActive(true)
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
              >
                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl opacity-30" style={{
                  background: "linear-gradient(90deg, #4F46E5, #9333EA, #DB2777, #4F46E5)",
                  backgroundSize: "300% 100%",
                  animation: "shimmer 3s linear infinite",
                  maskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                  padding: "2px",
                }} />

                <div className="relative flex flex-col items-center px-6 py-12">
                  <motion.div
                    animate={dragActive ? { scale: 1.1 } : { y: [0, -5, 0] }}
                    transition={dragActive ? {} : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-4 rounded-2xl bg-[#F5F3FF] p-4"
                  >
                    <Upload className="h-8 w-8 text-[#4F46E5]" />
                  </motion.div>

                  {dragActive ? (
                    <p className="text-lg font-semibold text-[#9333EA]">Deposez ici !</p>
                  ) : (
                    <>
                      <p className="text-sm font-semibold text-[#1e1b4b]">
                        Glissez vos fichiers ici ou{" "}
                        <button onClick={simulateUpload} className="text-[#4F46E5] underline hover:text-[#9333EA]">
                          cliquez pour parcourir
                        </button>
                      </p>
                      <p className="mt-1 text-xs text-[#6b7280]">PDF, JPG, PNG - Max 10 MB</p>
                    </>
                  )}
                </div>
              </motion.div>

              {/* Upload progress */}
              <AnimatePresence>
                {uploading && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white p-5"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-[#1e1b4b]">Upload en cours...</span>
                      <span className="text-sm font-bold text-[#4F46E5]">{uploadProgress}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#F5F3FF]">
                      <motion.div
                        className="h-full rounded-full shimmer"
                        style={{ background: "linear-gradient(135deg, #4F46E5 0%, #9333EA 50%, #DB2777 100%)" }}
                        animate={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* OCR Results */}
              <AnimatePresence>
                {ocrVisible && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5"
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      <span className="font-serif text-sm font-bold text-emerald-800">Resultats OCR</span>
                      <button onClick={() => setOcrVisible(false)} className="ml-auto text-emerald-400 hover:text-emerald-600">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="space-y-1.5 text-sm text-emerald-800">
                      <p>{"✅"} Document reconnu : {ocrResult.type}</p>
                      <p>{"📅"} Periode : {ocrResult.period}</p>
                      <p>{"🎓"} Etablissement : {ocrResult.institution}</p>
                      <p>{"📊"} Moyenne extraite : {ocrResult.gpa}</p>
                      <p>{"📚"} Domaine : {ocrResult.domain}</p>
                      <p>{"✅"} {ocrResult.signature}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Document list */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl border border-[#e5e7eb] bg-white shadow-sm"
              >
                <div className="border-b border-[#e5e7eb] px-5 py-3">
                  <h3 className="font-serif text-sm font-bold text-[#1e1b4b]">Fichiers uploades</h3>
                </div>
                <div className="divide-y divide-[#e5e7eb]">
                  {documents
                    .filter((d) => d.status !== "pending")
                    .map((doc) => (
                      <motion.div
                        key={doc.id}
                        layout
                        className="flex items-center gap-3 px-5 py-3"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F5F3FF] text-xs font-bold text-[#4F46E5]">
                          {docIcons[doc.type] || "??"}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#1e1b4b]">{doc.name}</p>
                          <p className="text-[10px] text-[#6b7280]">
                            {doc.size} {doc.date && `- ${doc.date}`}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            doc.status === "uploaded"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {doc.status === "uploaded" ? "Verifie" : "OCR en cours..."}
                        </span>
                        <button
                          onClick={() => {
                            setPreviewDoc(doc.name)
                            addToast("info", `Apercu de ${doc.name}`)
                          }}
                          className="rounded-lg p-1.5 text-[#6b7280] hover:bg-[#F5F3FF] hover:text-[#4F46E5]"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(doc.id)}
                          className="rounded-lg p-1.5 text-[#6b7280] hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </motion.div>
                    ))}
                  {documents.filter((d) => d.status !== "pending").length === 0 && (
                    <div className="px-5 py-8 text-center text-sm text-[#6b7280]">
                      Aucun fichier uploade pour le moment
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Stats bar */}
              <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-[#e5e7eb] bg-white px-5 py-3 shadow-sm">
                <span className="text-xs text-[#6b7280]">
                  Traites : <strong className="text-emerald-600">{uploaded}</strong>
                </span>
                <span className="text-xs text-[#6b7280]">
                  En cours : <strong className="text-amber-600">{processing}</strong>
                </span>
                <span className="text-xs text-[#6b7280]">
                  Erreurs : <strong className="text-red-500">0</strong>
                </span>
                <button
                  onClick={() => addToast("info", "Documents actualises")}
                  className="ml-auto flex items-center gap-1 text-xs font-medium text-[#4F46E5] hover:underline"
                >
                  <RefreshCw className="h-3 w-3" /> Actualiser
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview modal */}
      <AnimatePresence>
        {previewDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setPreviewDoc(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-[#1e1b4b]">{previewDoc}</h3>
                <button onClick={() => setPreviewDoc(null)} className="text-[#6b7280] hover:text-[#1e1b4b]">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex h-64 items-center justify-center rounded-xl bg-[#F5F3FF]">
                <div className="text-center">
                  <FileText className="mx-auto mb-2 h-12 w-12 text-[#4F46E5]/30" />
                  <p className="text-sm text-[#6b7280]">Apercu du document</p>
                  <p className="mt-1 text-xs text-[#A78BFA]">(Preview simulee)</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirm modal */}
      <AnimatePresence>
        {deleteConfirm !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
            >
              <div className="mb-2 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <h3 className="font-serif text-lg font-bold text-[#1e1b4b]">Supprimer ce document ?</h3>
              </div>
              <p className="mb-4 text-sm text-[#6b7280]">Cette action est irreversible.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 rounded-xl border border-[#e5e7eb] px-4 py-2.5 text-sm font-medium text-[#1e1b4b] hover:bg-[#F5F3FF]"
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    addToast("success", "Document supprime")
                    setDeleteConfirm(null)
                  }}
                  className="flex-1 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-600"
                >
                  Supprimer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer />
    </div>
  )
}
