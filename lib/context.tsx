"use client"

import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { MOCK_USER, MOCK_PROFILE, MOCK_RESULTS, MOCK_APPLICATIONS, MOCK_DOCUMENTS } from "./mock-data"

// Auth Context
interface AuthContextType {
  isLoggedIn: boolean
  user: typeof MOCK_USER | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

// Profile Context
interface ProfileContextType {
  profile: typeof MOCK_PROFILE
  results: typeof MOCK_RESULTS
  applications: typeof MOCK_APPLICATIONS
  documents: typeof MOCK_DOCUMENTS
  favorites: number[]
  toggleFavorite: (id: number) => void
  updateProfile: (updates: Partial<typeof MOCK_PROFILE>) => void
  addDocument: (doc: (typeof MOCK_DOCUMENTS)[0]) => void
  updateDocStatus: (id: number, status: string) => void
}

const ProfileContext = createContext<ProfileContextType | null>(null)

// Toast Context
export type ToastType = "success" | "error" | "info" | "warning"
interface Toast {
  id: string
  type: ToastType
  message: string
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (type: ToastType, message: string) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  // Auth
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<typeof MOCK_USER | null>(null)

  const login = useCallback(async (email: string, password: string) => {
    if (email === "demo@smartadmit.com" && password === "demo123") {
      setUser(MOCK_USER)
      setIsLoggedIn(true)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setIsLoggedIn(false)
  }, [])

  // Profile
  const [profile, setProfile] = useState(MOCK_PROFILE)
  const [results] = useState(MOCK_RESULTS)
  const [applications] = useState(MOCK_APPLICATIONS)
  const [documents, setDocuments] = useState(MOCK_DOCUMENTS)
  const [favorites, setFavorites] = useState<number[]>([1, 3, 5])

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }, [])

  const updateProfile = useCallback((updates: Partial<typeof MOCK_PROFILE>) => {
    setProfile((prev) => ({ ...prev, ...updates }))
  }, [])

  const addDocument = useCallback((doc: (typeof MOCK_DOCUMENTS)[0]) => {
    setDocuments((prev) => [...prev, doc])
  }, [])

  const updateDocStatus = useCallback((id: number, status: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    )
  }, [])

  // Toast
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = Math.random().toString(36).substring(7)
    setToasts((prev) => [...prev, { id, type, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      <ProfileContext.Provider
        value={{
          profile,
          results,
          applications,
          documents,
          favorites,
          toggleFavorite,
          updateProfile,
          addDocument,
          updateDocStatus,
        }}
      >
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
          {children}
        </ToastContext.Provider>
      </ProfileContext.Provider>
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AppProvider")
  return ctx
}

export function useProfile() {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error("useProfile must be used within AppProvider")
  return ctx
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within AppProvider")
  return ctx
}
