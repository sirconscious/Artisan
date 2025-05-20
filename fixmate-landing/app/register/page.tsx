"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Wrench, Eye, EyeOff, Check, AlertCircle } from "lucide-react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { NavBar } from "@/components/nav-bar"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showpassword_confirmation, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "find-worker",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() 
    setError("")

    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.password_confirmation) {
      setError("All fields are required")
      return
    }

    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    setIsLoading(true) 
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;  
      const response = await axios.post(`${url}/api/register`, formData);  
      const {email , password} = formData
      const repsponse2 =await axios.post(`${url}/api/login`, { email , password}); 
  setIsLoading(false)
console.log(formData)
    // Simulate API call
    // setTimeout(() => {
    //   setIsLoading(false)
    //   // For demo purposes, always succeed
      window.location.href = "/jobs"
    // }, 1500)
  }

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, text: "" }

    if (password.length < 8) {
      return { strength: 1, text: "Weak" }
    } else if (password.length < 12) {
      return { strength: 2, text: "Medium" }
    } else {
      return { strength: 3, text: "Strong" }
    }
  }

  const passwordStrength = getPasswordStrength(formData.password)

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex flex-1 items-center justify-center bg-gray-50 py-12">
        <div className="mx-auto w-full max-w-md space-y-6 px-4">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Wrench className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold">Create your BrickHole account</h1>
            <p className="text-sm text-muted-foreground">
              Join our community of home service professionals and customers
            </p>
          </div>

          <div className="bg-white p-6 shadow-sm rounded-lg">
            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="transition-all focus-visible:ring-blue-600"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="transition-all focus-visible:ring-blue-600"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="pr-10 transition-all focus-visible:ring-blue-600"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-xs">Password strength:</div>
                      <div
                        className={`text-xs font-medium ${
                          passwordStrength.strength === 1
                            ? "text-red-500"
                            : passwordStrength.strength === 2
                              ? "text-yellow-500"
                              : "text-green-500"
                        }`}
                      >
                        {passwordStrength.text}
                      </div>
                    </div>
                    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          passwordStrength.strength === 1
                            ? "bg-red-500 w-1/3"
                            : passwordStrength.strength === 2
                              ? "bg-yellow-500 w-2/3"
                              : "bg-green-500 w-full"
                        }`}
                      />
                    </div>
                    <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                      <li className="flex items-center gap-1">
                        {formData.password.length >= 8 ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <AlertCircle className="h-3 w-3 text-muted-foreground" />
                        )}
                        At least 8 characters
                      </li>
                      <li className="flex items-center gap-1">
                        {/[A-Z]/.test(formData.password) ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <AlertCircle className="h-3 w-3 text-muted-foreground" />
                        )}
                        At least one uppercase letter
                      </li>
                      <li className="flex items-center gap-1">
                        {/[0-9]/.test(formData.password) ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <AlertCircle className="h-3 w-3 text-muted-foreground" />
                        )}
                        At least one number
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password_confirmation" className="text-sm font-medium">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="password_confirmation"
                    name="password_confirmation"
                    type={showpassword_confirmation ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    className="pr-10 transition-all focus-visible:ring-blue-600"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowPassword(!showpassword_confirmation)}
                  >
                    {showpassword_confirmation ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {formData.password_confirmation && formData.password !== formData.password_confirmation && (
                  <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">I want to:</label>
                <RadioGroup value={formData.role} onValueChange={handleRoleChange} className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="find-worker" id="find-worker" />
                    <Label htmlFor="find-worker">Find a worker for my projects</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="offer-services" id="offer-services" />
                    <Label htmlFor="offer-services">Offer my services as a professional</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By creating an account, you agree to our{" "}
                <Link href="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </form>
          </div>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
