"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, DollarSign, Info, MapPin, Upload, X, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { NavBar } from "@/components/nav-bar"
import { format } from "date-fns"

// Service categories with icons
const serviceCategories = [
  { value: "plumbing", label: "Plumbing", icon: "💧" },
  { value: "electrical", label: "Electrical", icon: "⚡" },
  { value: "carpentry", label: "Carpentry", icon: "🔨" },
  { value: "painting", label: "Painting", icon: "🖌️" },
  { value: "cleaning", label: "Cleaning", icon: "🧹" },
  { value: "landscaping", label: "Landscaping", icon: "🌱" },
  { value: "roofing", label: "Roofing", icon: "🏠" },
  { value: "hvac", label: "HVAC", icon: "❄️" },
  { value: "appliance", label: "Appliance Repair", icon: "🔧" },
  { value: "other", label: "Other", icon: "📦" },
]

export default function PostJobPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    address: "",
    budget: [100, 500],
    date: undefined as Date | undefined,
    timePreference: "anytime",
    urgency: "standard",
    photos: [] as string[],
    contactPreference: "either",
    additionalDetails: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, date }))

    // Clear error when field is edited
    if (errors.date) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.date
        return newErrors
      })
    }
  }

  // Handle budget slider change
  const handleBudgetChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, budget: value }))
  }

  // Handle photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newPhotos = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos].slice(0, 5), // Limit to 5 photos
      }))
    }
  }

  // Remove photo
  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }))
  }

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Job title is required"
    }

    if (!formData.category) {
      newErrors.category = "Please select a category"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    } else if (formData.description.length < 30) {
      newErrors.description = "Description should be at least 30 characters"
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }

    if (step === 1 && Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return false
    }

    if (step === 2) {
      if (!formData.date) {
        newErrors.date = "Please select a date"
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return false
      }
    }

    return true
  }

  // Handle next step
  const handleNextStep = () => {
    if (validateForm()) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    }
  }

  // Handle previous step
  const handlePrevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Redirect after success
      setTimeout(() => {
        router.push("/jobs")
      }, 3000)
    }, 1500)
  }

  // Get selected category icon
  const getCategoryIcon = () => {
    const category = serviceCategories.find((cat) => cat.value === formData.category)
    return category ? category.icon : "📦"
  }

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 bg-gray-50 py-10">
        <div className="container max-w-5xl px-4 md:px-6">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
              <h1 className="mb-2 text-3xl font-bold">Job Posted Successfully!</h1>
              <p className="mb-8 text-muted-foreground">
                Your job has been posted and is now visible to professionals in your area.
              </p>
              <div className="flex gap-4">
                <Button asChild variant="outline">
                  <Link href="/jobs">View All Jobs</Link>
                </Button>
                <Button asChild>
                  <Link href="/">Return to Home</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold">Post a New Job</h1>
                <p className="text-muted-foreground">
                  Tell us what you need help with and find the right professional for your project.
                </p>
              </div>

              {/* Progress Steps */}
              <div className="mb-10">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                        step >= 1 ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300 bg-white text-gray-400"
                      }`}
                    >
                      1
                    </div>
                    <span className={`mt-2 text-sm ${step >= 1 ? "font-medium text-blue-600" : "text-gray-500"}`}>
                      Job Details
                    </span>
                  </div>
                  <div className={`h-1 w-full max-w-[100px] ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                        step >= 2 ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300 bg-white text-gray-400"
                      }`}
                    >
                      2
                    </div>
                    <span className={`mt-2 text-sm ${step >= 2 ? "font-medium text-blue-600" : "text-gray-500"}`}>
                      Schedule & Budget
                    </span>
                  </div>
                  <div className={`h-1 w-full max-w-[100px] ${step >= 3 ? "bg-blue-600" : "bg-gray-200"}`}></div>
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                        step >= 3 ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300 bg-white text-gray-400"
                      }`}
                    >
                      3
                    </div>
                    <span className={`mt-2 text-sm ${step >= 3 ? "font-medium text-blue-600" : "text-gray-500"}`}>
                      Review & Submit
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
                <div>
                  <form onSubmit={handleSubmit}>
                    {/* Step 1: Job Details */}
                    {step === 1 && (
                      <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold">Job Details</h2>
                        <p className="text-sm text-muted-foreground">
                          Provide the basic information about the job you need help with.
                        </p>

                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="title" className="text-sm font-medium">
                              Job Title <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="title"
                              name="title"
                              placeholder="e.g., Fix leaky bathroom faucet"
                              value={formData.title}
                              onChange={handleChange}
                              className={errors.title ? "border-red-500" : ""}
                            />
                            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
                          </div>

                          <div>
                            <Label htmlFor="category" className="text-sm font-medium">
                              Service Category <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              value={formData.category}
                              onValueChange={(value) => handleSelectChange("category", value)}
                            >
                              <SelectTrigger id="category" className={errors.category ? "border-red-500" : ""}>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                              <SelectContent>
                                {serviceCategories.map((category) => (
                                  <SelectItem key={category.value} value={category.value}>
                                    <div className="flex items-center">
                                      <span className="mr-2">{category.icon}</span>
                                      {category.label}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
                          </div>

                          <div>
                            <Label htmlFor="description" className="text-sm font-medium">
                              Job Description <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                              id="description"
                              name="description"
                              placeholder="Describe what you need help with in detail..."
                              value={formData.description}
                              onChange={handleChange}
                              className={`min-h-[120px] ${errors.description ? "border-red-500" : ""}`}
                            />
                            <div className="mt-1 flex items-center justify-between">
                              <p className="text-xs text-muted-foreground">
                                Min. 30 characters ({formData.description.length}/30)
                              </p>
                              {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="location" className="text-sm font-medium">
                              Location <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="location"
                                name="location"
                                placeholder="City, State or Zip Code"
                                value={formData.location}
                                onChange={handleChange}
                                className={`pl-9 ${errors.location ? "border-red-500" : ""}`}
                              />
                            </div>
                            {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location}</p>}
                          </div>

                          <div>
                            <Label htmlFor="address" className="text-sm font-medium">
                              Street Address <span className="text-muted-foreground text-xs">(Optional)</span>
                            </Label>
                            <Input
                              id="address"
                              name="address"
                              placeholder="123 Main St, Apt 4B"
                              value={formData.address}
                              onChange={handleChange}
                            />
                            <p className="mt-1 text-xs text-muted-foreground">
                              Your exact address will only be shared with the professional you hire.
                            </p>
                          </div>
                        </div>

                        <div className="pt-4">
                          <Button
                            type="button"
                            onClick={handleNextStep}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                          >
                            Continue to Schedule & Budget
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Schedule & Budget */}
                    {step === 2 && (
                      <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold">Schedule & Budget</h2>
                        <p className="text-sm text-muted-foreground">
                          Let us know when you need the job done and your budget.
                        </p>

                        <div className="space-y-6">
                          <div>
                            <Label className="text-sm font-medium">
                              When do you need this done? <span className="text-red-500">*</span>
                            </Label>
                            <div className="mt-2">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={`w-full justify-start text-left font-normal ${
                                      !formData.date ? "text-muted-foreground" : ""
                                    } ${errors.date ? "border-red-500" : ""}`}
                                  >
                                    <Calendar className="mr-2 h-4 w-4" />
                                    {formData.date ? format(formData.date, "PPP") : "Select a date"}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <CalendarComponent
                                    mode="single"
                                    selected={formData.date}
                                    onSelect={handleDateSelect}
                                    initialFocus
                                    disabled={(date) => date < new Date()}
                                  />
                                </PopoverContent>
                              </Popover>
                              {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm font-medium">Time Preference</Label>
                            <RadioGroup
                              value={formData.timePreference}
                              onValueChange={(value) => handleSelectChange("timePreference", value)}
                              className="mt-2 space-y-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="morning" id="morning" />
                                <Label htmlFor="morning" className="font-normal">
                                  Morning (8am - 12pm)
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="afternoon" id="afternoon" />
                                <Label htmlFor="afternoon" className="font-normal">
                                  Afternoon (12pm - 5pm)
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="evening" id="evening" />
                                <Label htmlFor="evening" className="font-normal">
                                  Evening (5pm - 8pm)
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="anytime" id="anytime" />
                                <Label htmlFor="anytime" className="font-normal">
                                  Anytime
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div>
                            <Label className="text-sm font-medium">How urgent is this job?</Label>
                            <RadioGroup
                              value={formData.urgency}
                              onValueChange={(value) => handleSelectChange("urgency", value)}
                              className="mt-2 space-y-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="emergency" id="emergency" />
                                <Label htmlFor="emergency" className="font-normal">
                                  Emergency (ASAP)
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="urgent" id="urgent" />
                                <Label htmlFor="urgent" className="font-normal">
                                  Urgent (Within 24-48 hours)
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="standard" id="standard" />
                                <Label htmlFor="standard" className="font-normal">
                                  Standard (Within the week)
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="flexible" id="flexible" />
                                <Label htmlFor="flexible" className="font-normal">
                                  Flexible (No rush)
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div>
                            <div className="flex items-center justify-between">
                              <Label className="text-sm font-medium">Budget Range (USD)</Label>
                              <span className="text-sm font-medium">
                                ${formData.budget[0]} - ${formData.budget[1]}
                              </span>
                            </div>
                            <Slider
                              value={formData.budget}
                              min={50}
                              max={2000}
                              step={50}
                              onValueChange={handleBudgetChange}
                              className="mt-4"
                            />
                            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                              <span>$50</span>
                              <span>$2000+</span>
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm font-medium">Upload Photos (Optional)</Label>
                            <div className="mt-2 grid grid-cols-3 gap-4 sm:grid-cols-5">
                              {formData.photos.map((photo, index) => (
                                <div key={index} className="relative h-24 w-full overflow-hidden rounded-md">
                                  <Image
                                    src={photo || "/placeholder.svg"}
                                    alt={`Uploaded photo ${index + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removePhoto(index)}
                                    className="absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white hover:bg-black"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              ))}
                              {formData.photos.length < 5 && (
                                <label className="flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
                                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="mb-1 h-6 w-6 text-gray-400" />
                                    <p className="text-xs text-gray-500">Upload</p>
                                  </div>
                                  <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                    multiple
                                  />
                                </label>
                              )}
                            </div>
                            <p className="mt-2 text-xs text-muted-foreground">
                              Upload up to 5 photos to help professionals understand your job better.
                            </p>
                          </div>

                          <div>
                            <Label className="text-sm font-medium">Contact Preference</Label>
                            <RadioGroup
                              value={formData.contactPreference}
                              onValueChange={(value) => handleSelectChange("contactPreference", value)}
                              className="mt-2 space-y-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="phone" id="phone" />
                                <Label htmlFor="phone" className="font-normal">
                                  Phone Call
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="message" id="message" />
                                <Label htmlFor="message" className="font-normal">
                                  Message/Email
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="either" id="either" />
                                <Label htmlFor="either" className="font-normal">
                                  Either is fine
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div>
                            <Label htmlFor="additionalDetails" className="text-sm font-medium">
                              Additional Details <span className="text-muted-foreground text-xs">(Optional)</span>
                            </Label>
                            <Textarea
                              id="additionalDetails"
                              name="additionalDetails"
                              placeholder="Any other details professionals should know..."
                              value={formData.additionalDetails}
                              onChange={handleChange}
                              className="min-h-[80px]"
                            />
                          </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                          <Button type="button" variant="outline" onClick={handlePrevStep} className="w-full">
                            Back
                          </Button>
                          <Button
                            type="button"
                            onClick={handleNextStep}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                          >
                            Continue to Review
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Review & Submit */}
                    {step === 3 && (
                      <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold">Review Your Job</h2>
                        <p className="text-sm text-muted-foreground">
                          Please review your job details before submitting.
                        </p>

                        <div className="space-y-6">
                          <div className="rounded-lg bg-blue-50 p-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-xl">
                                {getCategoryIcon()}
                              </div>
                              <div>
                                <h3 className="font-semibold">{formData.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {formData.category &&
                                    serviceCategories.find((c) => c.value === formData.category)?.label}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">Job Description</h3>
                              <p className="mt-1">{formData.description}</p>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                                <p className="mt-1 flex items-center gap-1">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  {formData.location}
                                </p>
                              </div>

                              <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Date Needed</h3>
                                <p className="mt-1 flex items-center gap-1">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  {formData.date ? format(formData.date, "PPP") : "Not specified"}
                                </p>
                              </div>

                              <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Time Preference</h3>
                                <p className="mt-1 flex items-center gap-1">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  {formData.timePreference === "morning"
                                    ? "Morning (8am - 12pm)"
                                    : formData.timePreference === "afternoon"
                                      ? "Afternoon (12pm - 5pm)"
                                      : formData.timePreference === "evening"
                                        ? "Evening (5pm - 8pm)"
                                        : "Anytime"}
                                </p>
                              </div>

                              <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Budget Range</h3>
                                <p className="mt-1 flex items-center gap-1">
                                  <DollarSign className="h-4 w-4 text-muted-foreground" />${formData.budget[0]} - $
                                  {formData.budget[1]}
                                </p>
                              </div>
                            </div>

                            <Separator />

                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">Urgency</h3>
                              <Badge
                                variant="outline"
                                className={`mt-1 ${
                                  formData.urgency === "emergency"
                                    ? "border-red-200 bg-red-50 text-red-700"
                                    : formData.urgency === "urgent"
                                      ? "border-orange-200 bg-orange-50 text-orange-700"
                                      : formData.urgency === "standard"
                                        ? "border-blue-200 bg-blue-50 text-blue-700"
                                        : "border-green-200 bg-green-50 text-green-700"
                                }`}
                              >
                                {formData.urgency === "emergency"
                                  ? "Emergency (ASAP)"
                                  : formData.urgency === "urgent"
                                    ? "Urgent (Within 24-48 hours)"
                                    : formData.urgency === "standard"
                                      ? "Standard (Within the week)"
                                      : "Flexible (No rush)"}
                              </Badge>
                            </div>

                            {formData.photos.length > 0 && (
                              <>
                                <Separator />
                                <div>
                                  <h3 className="text-sm font-medium text-muted-foreground">Photos</h3>
                                  <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
                                    {formData.photos.map((photo, index) => (
                                      <div
                                        key={index}
                                        className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md"
                                      >
                                        <Image
                                          src={photo || "/placeholder.svg"}
                                          alt={`Job photo ${index + 1}`}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </>
                            )}

                            {formData.additionalDetails && (
                              <>
                                <Separator />
                                <div>
                                  <h3 className="text-sm font-medium text-muted-foreground">Additional Details</h3>
                                  <p className="mt-1">{formData.additionalDetails}</p>
                                </div>
                              </>
                            )}
                          </div>

                          <div className="rounded-lg bg-gray-50 p-4">
                            <div className="flex items-start gap-3">
                              <Info className="mt-0.5 h-5 w-5 text-blue-600" />
                              <div>
                                <h3 className="font-medium">What happens next?</h3>
                                <p className="text-sm text-muted-foreground">
                                  After submitting, your job will be visible to qualified professionals in your area.
                                  You'll receive notifications when professionals express interest or have questions.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Switch id="terms" defaultChecked />
                            <Label htmlFor="terms" className="text-sm">
                              I agree to the{" "}
                              <Link href="#" className="text-blue-600 hover:underline">
                                Terms of Service
                              </Link>{" "}
                              and{" "}
                              <Link href="#" className="text-blue-600 hover:underline">
                                Privacy Policy
                              </Link>
                            </Label>
                          </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                          <Button type="button" variant="outline" onClick={handlePrevStep} className="w-full">
                            Back
                          </Button>
                          <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Posting Job..." : "Post Job Now"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                  {/* Tips Card */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="mb-4 font-semibold">Tips for a Great Job Post</h3>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-600" />
                          <span>Be specific about what you need done</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-600" />
                          <span>Include measurements or dimensions if relevant</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-600" />
                          <span>Add photos to help professionals understand the job</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-600" />
                          <span>Be clear about your timeline and availability</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-600" />
                          <span>Set a realistic budget range for quality work</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* FAQ Card */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="mb-4 font-semibold">Frequently Asked Questions</h3>
                      <div className="space-y-4 text-sm">
                        <div>
                          <h4 className="font-medium">How quickly will I get responses?</h4>
                          <p className="text-muted-foreground">
                            Most jobs receive responses within 24 hours, often much sooner for urgent requests.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium">Is my information secure?</h4>
                          <p className="text-muted-foreground">
                            Yes, your personal details are only shared with professionals you choose to work with.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium">Can I edit my job after posting?</h4>
                          <p className="text-muted-foreground">
                            Yes, you can edit your job details at any time before accepting an offer.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Need Help Card */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="mb-2 font-semibold">Need Help?</h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        Our support team is available to assist you with any questions.
                      </p>
                      <Button variant="outline" className="w-full">
                        Contact Support
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
