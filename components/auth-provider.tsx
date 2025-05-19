"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type AuthContextType = {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  // Check authentication status on initial load
  useEffect(() => {
    const checkAuth = () => {
      // In a real app, you would validate the token with your backend
      const auth = localStorage.getItem("isAuthenticated") === "true"
      setIsAuthenticated(auth)

      // Set authentication cookie for middleware
      if (auth) {
        document.cookie = "isAuthenticated=true; path=/; max-age=86400"
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    try {
      // In a real app, you would validate credentials with your backend
      // and receive a token

      // For demo purposes, we'll just check if email and password are provided
      if (email && password) {
        // Store authentication state
        localStorage.setItem("isAuthenticated", "true")
        document.cookie = "isAuthenticated=true; path=/; max-age=86400"
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("isAuthenticated")
    document.cookie = "isAuthenticated=; path=/; max-age=0"
    setIsAuthenticated(false)
    router.push("/login")
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
