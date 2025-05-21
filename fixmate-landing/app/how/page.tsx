"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image" 
import { NavBar } from "@/components/nav-bar"
import { motion, useScroll, useTransform, useInView, useAnimation, AnimatePresence, type Variants } from "framer-motion"
import {
  ArrowRight,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Home,
  Lightbulb,
  MessageSquare,
  Search,
  Settings,
  Shield,
  Star,
  ThumbsUp,
  PenToolIcon as Tool,
  Zap,
  HelpCircle,
  Smartphone,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const drawLine: Variants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: { duration: 1.5, ease: "easeInOut" },
  },
}

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

// Animated section component
interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

function AnimatedSection({ children, className = "", delay = 0 }: AnimatedSectionProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delay,
            staggerChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

// Step component
interface StepProps {
  number: number
  title: string
  description: string
  icon: React.ReactNode
  image: string
  features: string[]
  isLast?: boolean
}

function Step({ number, title, description, icon, image, features, isLast = false }: StepProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div ref={ref} className="relative">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 md:order-1"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <span className="text-2xl font-bold">{number}</span>
              </div>
              <motion.div
                className="absolute -inset-2 rounded-full border-2 border-blue-200"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </div>
            <div>
              <Badge className="mb-1 bg-blue-500/10 text-blue-600">{`Étape ${number}`}</Badge>
              <h3 className="text-2xl font-bold">{title}</h3>
            </div>
          </div>
          <p className="mb-6 text-lg text-muted-foreground">{description}</p>

          <div className="mb-6 space-y-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle className="h-3.5 w-3.5" />
                </div>
                <p className="text-sm">{feature}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex items-center gap-3 text-blue-600"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            {icon}
            <span className="font-medium">Simple et rapide</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="order-1 md:order-2"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-green-50 shadow-lg transition-all duration-300 hover:shadow-xl">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-green-500/20" />

            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div
                className="flex h-24 w-24 items-center justify-center rounded-full bg-white/80 text-blue-600 backdrop-blur-sm transition-all duration-300"
                animate={
                  isHovered
                    ? {
                        scale: 1.1,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      }
                    : { scale: 1 }
                }
              >
                <motion.div
                  animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                  {icon}
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h4 className="text-lg font-medium">{title}</h4>
              <p className="text-sm text-white/80">{description.split(".")[0]}.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {!isLast && (
        <div className="absolute left-8 top-[calc(100%-1.5rem)] h-24 md:left-[calc(25%-0.75rem)] md:top-full">
          <svg width="32" height="96" viewBox="0 0 32 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M16 0V96"
              stroke="#E5E7EB"
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            />
            <motion.path
              d="M16 96L8 88M16 96L24 88"
              stroke="#E5E7EB"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.3, delay: 1.2 }}
            />
          </svg>
        </div>
      )}
    </div>
  )
}

// Benefit component
interface BenefitProps {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

function Benefit({ icon, title, description, color }: BenefitProps) {
  const [isHovered, setIsHovered] = useState(false)

  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
    green: "bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white",
    purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
    amber: "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
    indigo: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
    rose: "bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white",
  }

  return (
    <motion.div
      variants={fadeInUp}
      className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div
        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full transition-colors duration-300 ${colorClasses[color as keyof typeof colorClasses]}`}
      >
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-medium">{title}</h3>
      <p className="text-muted-foreground">{description}</p>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-green-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-blue-100/40 to-green-100/40 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
        animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  )
}

// Animated background component with particles
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-[30%] left-[10%] h-[500px] w-[500px] rounded-full bg-blue-100/30 blur-[100px]" />
      <div className="absolute -bottom-[20%] right-[10%] h-[400px] w-[400px] rounded-full bg-green-100/30 blur-[100px]" />
      <div className="absolute left-[40%] top-[20%] h-[300px] w-[300px] rounded-full bg-purple-100/20 blur-[100px]" />

      {/* Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-blue-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              x: [0, Math.random() * 30 - 15],
              scale: [1, Math.random() * 1.5 + 0.5, 1],
              opacity: [Math.random() * 0.5 + 0.1, Math.random() * 0.8 + 0.2, Math.random() * 0.5 + 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i + 30}
            className="absolute h-1 w-1 rounded-full bg-green-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              x: [0, Math.random() * 30 - 15],
              scale: [1, Math.random() * 1.5 + 0.5, 1],
              opacity: [Math.random() * 0.5 + 0.1, Math.random() * 0.8 + 0.2, Math.random() * 0.5 + 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  )
}

// Testimonial component
interface TestimonialProps {
  quote: string
  author: string
  role: string
  image: string
  rating: number
  service: string
}

function Testimonial({ quote, author, role, image, rating, service }: TestimonialProps) {
  return (
    <motion.div variants={fadeIn} className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-full">
          <Image src={image || "/placeholder.svg"} alt={author} fill className="object-cover" />
        </div>
        <div>
          <h4 className="font-medium">{author}</h4>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>

      <div className="mb-3 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
        ))}
        <span className="ml-2 text-xs text-muted-foreground">Pour {service}</span>
      </div>

      <p className="italic text-muted-foreground">"{quote}"</p>
    </motion.div>
  )
}

// FAQ Item component
interface FAQItemProps {
  question: string
  answer: string
  icon: React.ReactNode
  value: string
}

function FAQItem({ question, answer, icon, value }: FAQItemProps) {
  return (
    <AccordionItem value={value} className="border-b border-gray-200">
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center gap-3 text-left">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            {icon}
          </div>
          <span>{question}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="pl-11">
          <p className="text-muted-foreground">{answer}</p>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

// Interactive process component
function InteractiveProcess() {
  const [activeStep, setActiveStep] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev % 4) + 1)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isInView])

  const steps = [
    {
      title: "Demande",
      description: "Décrivez votre besoin en détail",
      icon: <Search className="h-6 w-6" />,
      color: "bg-blue-500",
    },
    {
      title: "Propositions",
      description: "Recevez des offres d'artisans qualifiés",
      icon: <MessageSquare className="h-6 w-6" />,
      color: "bg-green-500",
    },
    {
      title: "Sélection",
      description: "Choisissez l'artisan qui vous convient",
      icon: <CheckCircle className="h-6 w-6" />,
      color: "bg-purple-500",
    },
    {
      title: "Paiement",
      description: "Payez en toute sécurité après le service",
      icon: <CreditCard className="h-6 w-6" />,
      color: "bg-amber-500",
    },
  ]

  return (
    <div ref={containerRef} className="relative rounded-xl bg-gradient-to-r from-blue-50 to-green-50 p-8">
      <div className="relative h-[400px]">
        <svg width="100%" height="100%" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M100 200 C 200 100, 400 100, 500 200 C 600 300, 700 300, 700 200"
            stroke="url(#gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="transparent"
            variants={drawLine}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />

          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>

          {steps.map((step, index) => {
            const x = 100 + index * 200
            const y = index % 2 === 0 ? 200 : 200
            const isActive = activeStep === index + 1

            return (
              <g key={index}>
                <motion.circle
                  cx={x}
                  cy={y}
                  r={isActive ? "30" : "20"}
                  className={step.color}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.2 + index * 0.2, duration: 0.5 }}
                />

                <motion.circle
                  cx={x}
                  cy={y}
                  r="40"
                  stroke={isActive ? "currentColor" : "transparent"}
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  className={`${step.color} opacity-20`}
                  fill="transparent"
                  initial={{ scale: 0 }}
                  animate={isInView && isActive ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5 }}
                />

                <motion.g
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.4 + index * 0.2, duration: 0.5 }}
                >
                  <foreignObject x={x - 75} y={y + 50} width="150" height="100">
                    <div
                      className={`flex flex-col items-center text-center ${isActive ? "scale-110" : "scale-100"} transition-transform duration-300`}
                    >
                      <span className={`mb-1 font-medium ${isActive ? "text-gray-900" : "text-gray-600"}`}>
                        {step.title}
                      </span>
                      <span className="text-xs text-gray-500">{step.description}</span>
                    </div>
                  </foreignObject>
                </motion.g>

                <motion.g
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.6 + index * 0.2, duration: 0.5 }}
                >
                  <foreignObject x={x - 12} y={y - 12} width="24" height="24">
                    <div className="flex h-6 w-6 items-center justify-center text-white">{step.icon}</div>
                  </foreignObject>
                </motion.g>
              </g>
            )
          })}
        </svg>

        <div className="absolute left-0 right-0 top-[320px] flex justify-center">
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-8 rounded-full transition-colors duration-300 ${activeStep === index + 1 ? "bg-blue-500" : "bg-gray-300"}`}
                onClick={() => setActiveStep(index + 1)}
                aria-label={`Voir l'étape ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Comparison table component
function ComparisonTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="grid grid-cols-3">
        <div className="border-b border-r border-gray-200 p-6">
          <h3 className="text-lg font-medium">Caractéristiques</h3>
        </div>
        <div className="border-b border-r border-gray-200 bg-blue-50 p-6 text-center">
          <h3 className="text-lg font-medium text-blue-600">Service à la Maison</h3>
        </div>
        <div className="border-b border-gray-200 p-6 text-center">
          <h3 className="text-lg font-medium text-gray-500">Méthode Traditionnelle</h3>
        </div>

        {/* Row 1 */}
        <div className="border-b border-r border-gray-200 p-6">
          <p className="font-medium">Temps de recherche</p>
        </div>
        <div className="border-b border-r border-gray-200 bg-blue-50 p-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <Clock className="h-5 w-5 text-green-500" />
            <p className="font-medium text-green-600">Quelques minutes</p>
          </div>
        </div>
        <div className="border-b border-gray-200 p-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <Clock className="h-5 w-5 text-gray-400" />
            <p className="font-medium text-gray-500">Plusieurs heures ou jours</p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="border-b border-r border-gray-200 p-6">
          <p className="font-medium">Vérification des artisans</p>
        </div>
        <div className="border-b border-r border-gray-200 bg-blue-50 p-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <p className="font-medium text-green-600">Systématique et rigoureuse</p>
          </div>
        </div>
        <div className="border-b border-gray-200 p-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <HelpCircle className="h-5 w-5 text-gray-400" />
            <p className="font-medium text-gray-500">Variable ou inexistante</p>
          </div>
        </div>

        {/* Row 3 */}
        <div className="border-b border-r border-gray-200 p-6">
          <p className="font-medium">Comparaison des prix</p>
        </div>
        <div className="border-b border-r border-gray-200 bg-blue-50 p-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <p className="font-medium text-green-600">Facile et transparente</p>
          </div>
        </div>
        <div className="border-b border-gray-200 p-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <HelpCircle className="h-5 w-5 text-gray-400" />
            <p className="font-medium text-gray-500">Difficile et chronophage</p>
          </div>
        </div>

        {/* Row 4 */}
        <div className="border-b border-r border-gray-200 p-6">
          <p className="font-medium">Paiement sécurisé</p>
        </div>
        <div className="border-b border-r border-gray-200 bg-blue-50 p-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <p className="font-medium text-green-600">Garanti</p>
          </div>
        </div>
        <div className="border-b border-gray-200 p-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <HelpCircle className="h-5 w-5 text-gray-400" />
            <p className="font-medium text-gray-500">Non garanti</p>
          </div>
        </div>

        {/* Row 5 */}
        <div className="border-r border-gray-200 p-6">
          <p className="font-medium">Évaluations et avis</p>
        </div>
        <div className="border-r border-gray-200 bg-blue-50 p-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <p className="font-medium text-green-600">Nombreux et vérifiés</p>
          </div>
        </div>
        <div className="p-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <HelpCircle className="h-5 w-5 text-gray-400" />
            <p className="font-medium text-gray-500">Peu nombreux ou absents</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Service category component
interface ServiceCategoryProps {
  icon: React.ReactNode
  title: string
  count: number
  color: string
}

function ServiceCategory({ icon, title, count, color }: ServiceCategoryProps) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-green-50 text-green-600 border-green-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
  }

  return (
    <motion.div
      variants={scaleUp}
      whileHover={{ y: -5 }}
      className={`flex flex-col items-center rounded-xl border p-6 text-center ${colorClasses[color as keyof typeof colorClasses]}`}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">{icon}</div>
      <h3 className="mb-1 text-lg font-medium">{title}</h3>
      <p className="text-sm opacity-80">{count} artisans</p>
    </motion.div>
  )
}

export default function HowItWorksPage() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const testimonials = [
    {
      quote:
        "Service impeccable ! Le plombier est arrivé à l'heure et a résolu mon problème rapidement. Je recommande vivement.",
      author: "Marie Dupont",
      role: "Propriétaire à Paris",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      service: "Plomberie",
    },
    {
      quote:
        "Très satisfait de la qualité du travail. L'électricien était professionnel et a pris le temps d'expliquer ce qu'il faisait.",
      author: "Thomas Martin",
      role: "Propriétaire à Lyon",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      service: "Électricité",
    },
    {
      quote:
        "La rénovation de ma salle de bain s'est déroulée parfaitement. Travail soigné et dans les délais. Merci !",
      author: "Sophie Leroy",
      role: "Propriétaire à Marseille",
      image: "/placeholder.svg?height=100&width=100",
      rating: 4,
      service: "Rénovation",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="relative min-h-screen bg-white font-sans"> 
    <NavBar />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <AnimatedBackground />
        <div className="relative">
          <AnimatedSection className="container flex min-h-[80vh] flex-col items-center justify-center px-4 py-20 text-center">
            <motion.div
              variants={fadeInUp}
              className="mb-4 inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm text-blue-600"
            >
              <span className="inline-block h-1 w-1 rounded-full bg-blue-500"></span>
              <span className="inline-block h-1 w-1 rounded-full bg-blue-500"></span>
              <span className="inline-block h-1 w-1 rounded-full bg-blue-500"></span>
              COMMENT ÇA MARCHE
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="mb-6 bg-gradient-to-r from-blue-600 via-purple-500 to-green-500 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl"
            >
              Simple, Rapide, Efficace
            </motion.h1>
            <motion.p variants={fadeInUp} className="mb-8 max-w-2xl text-xl text-muted-foreground">
              Découvrez comment Service à la Maison connecte les artisans qualifiés avec les personnes qui ont besoin de
              leurs services en quelques étapes simples.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-8 text-white transition-all duration-300 hover:shadow-lg"
              >
                Commencer Maintenant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-blue-200 px-8 transition-all duration-300 hover:border-blue-400 hover:bg-blue-50"
              >
                Voir la Démo
              </Button>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="absolute bottom-12 left-[45%] -translate-x-1/2 transform"
              style={{ opacity, y }}
            >
              <div className="flex flex-col items-center">
                <span className="mb-2 text-sm text-muted-foreground">Découvrez le processus</span>
                <motion.div
                  className="h-12 w-7 rounded-full border border-blue-200 p-3"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                >
                  <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                    className="h-1.5 w-1.5 rounded-full bg-blue-500"
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-16 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-blue-400/20 to-green-400/20 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </AnimatedSection>
        </div>
      </div>

      {/* Service Categories Section */}
      {/* <AnimatedSection className="container px-4 py-16">
        <motion.div variants={fadeInUp} className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Nos Catégories de Services</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Découvrez la variété de services proposés par nos artisans qualifiés dans différents domaines.
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <ServiceCategory icon={<Tool className="h-8 w-8" />} title="Plomberie" count={328} color="blue" />
          <ServiceCategory icon={<Zap className="h-8 w-8" />} title="Électricité" count={256} color="amber" />
          <ServiceCategory icon={<Home className="h-8 w-8" />} title="Rénovation" count={412} color="green" />
          <ServiceCategory icon={<Settings className="h-8 w-8" />} title="Bricolage" count={189} color="purple" />
          <ServiceCategory icon={<Shield className="h-8 w-8" />} title="Serrurerie" count={143} color="indigo" />
          <ServiceCategory icon={<Lightbulb className="h-8 w-8" />} title="Décoration" count={217} color="rose" />
        </motion.div>
      </AnimatedSection> */}

      {/* Steps Section */}
      <div className="container px-4 py-24">
        <AnimatedSection className="mb-16 text-center">
          <motion.h2 variants={fadeInUp} className="mb-4 text-3xl font-bold sm:text-4xl">
            En 4 Étapes Simples
          </motion.h2>
          <motion.p variants={fadeInUp} className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Notre processus est conçu pour être aussi simple et efficace que possible, vous permettant de trouver
            rapidement le bon professionnel pour votre projet.
          </motion.p>
        </AnimatedSection>

        <div className="space-y-32">
          <Step
            number={1}
            title="Décrivez votre besoin"
            description="Commencez par décrire le service dont vous avez besoin. Précisez les détails importants comme la localisation, la date souhaitée et toute exigence particulière."
            icon={<Search className="h-8 w-8" />}
            image="/placeholder.svg?height=300&width=400"
            features={[
              "Interface intuitive et formulaire simple",
              "Suggestions automatiques basées sur vos besoins",
              "Possibilité d'ajouter des photos pour plus de précision",
              "Estimation de prix instantanée",
            ]}
          />

          <Step
            number={2}
            title="Recevez des propositions"
            description="Les artisans qualifiés dans votre région vous envoient leurs propositions. Consultez leurs profils, évaluations et tarifs pour faire le meilleur choix."
            icon={<MessageSquare className="h-8 w-8" />}
            image="/placeholder.svg?height=300&width=400"
            features={[
              "Notifications en temps réel des nouvelles propositions",
              "Comparaison facile des devis et des profils",
              "Chat intégré pour poser vos questions",
              "Vérification rigoureuse de tous les artisans",
            ]}
          />

          <Step
            number={3}
            title="Choisissez votre artisan"
            description="Sélectionnez l'artisan qui correspond le mieux à vos besoins et à votre budget. Confirmez la date et l'heure du rendez-vous directement via la plateforme."
            icon={<Calendar className="h-8 w-8" />}
            image="/placeholder.svg?height=300&width=400"
            features={[
              "Calendrier interactif pour choisir vos disponibilités",
              "Confirmation instantanée du rendez-vous",
              "Rappels automatiques avant l'intervention",
              "Possibilité de modifier ou d'annuler si nécessaire",
            ]}
          />

          <Step
            number={4}
            title="Service réalisé et paiement"
            description="Une fois le service effectué à votre satisfaction, effectuez le paiement en toute sécurité via notre plateforme et laissez une évaluation pour aider la communauté."
            icon={<CreditCard className="h-8 w-8" />}
            image="/placeholder.svg?height=300&width=400"
            features={[
              "Paiement sécurisé libéré uniquement après validation",
              "Multiples options de paiement disponibles",
              "Facture automatique générée pour vos documents",
              "Système d'évaluation transparent et fiable",
            ]}
            isLast={true}
          />
        </div>
      </div>

      {/* Interactive Process Animation */}
      <AnimatedSection className="container px-4 py-16">
        <motion.div variants={fadeInUp} className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Le Parcours Utilisateur</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Visualisez comment fonctionne notre plateforme de bout en bout pour connecter clients et artisans.
          </p>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          <InteractiveProcess />
        </div>
      </AnimatedSection>

      {/* Comparison Section */}
      <AnimatedSection className="container px-4 py-16">
        <motion.div variants={fadeInUp} className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Pourquoi Nous Choisir</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Découvrez les avantages de Service à la Maison par rapport aux méthodes traditionnelles.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="mx-auto max-w-4xl">
          <ComparisonTable />
        </motion.div>
      </AnimatedSection>

      {/* Testimonials Section */}
      {/* <AnimatedSection className="bg-gradient-to-r from-blue-50 to-green-50 py-24">
        <div className="container px-4">
          <motion.div variants={fadeInUp} className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Ce Que Disent Nos Clients</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Découvrez les expériences de ceux qui ont fait confiance à nos artisans pour leurs projets.
            </p>
          </motion.div>

          <div className="relative mx-auto max-w-4xl overflow-hidden">
            <div className="relative h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Testimonial {...testimonials[activeTestimonial]} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-8 rounded-full transition-colors duration-300 ${activeTestimonial === index ? "bg-blue-500" : "bg-gray-300"}`}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`Voir le témoignage ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection> */}

      {/* Benefits Section */}
      {/* <AnimatedSection className="container px-4 py-24">
        <motion.div variants={fadeInUp} className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Les Avantages de Notre Plateforme</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Service à la Maison offre de nombreux avantages tant pour les clients que pour les artisans.
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Benefit
            icon={<Shield className="h-6 w-6" />}
            title="Artisans Vérifiés"
            description="Tous nos artisans sont soigneusement sélectionnés et leurs compétences sont vérifiées pour garantir un service de qualité."
            color="blue"
          />
          <Benefit
            icon={<Clock className="h-6 w-6" />}
            title="Gain de Temps"
            description="Trouvez rapidement le bon professionnel sans passer des heures à chercher et à comparer les offres."
            color="green"
          />
          <Benefit
            icon={<CreditCard className="h-6 w-6" />}
            title="Paiement Sécurisé"
            description="Notre système de paiement sécurisé protège à la fois les clients et les artisans pour une tranquillité d'esprit totale."
            color="purple"
          />
          <Benefit
            icon={<Star className="h-6 w-6" />}
            title="Évaluations Transparentes"
            description="Consultez les avis authentiques d'autres clients pour faire un choix éclairé et en toute confiance."
            color="amber"
          />
          <Benefit
            icon={<MessageSquare className="h-6 w-6" />}
            title="Communication Facile"
            description="Échangez directement avec les artisans via notre plateforme pour clarifier vos besoins et attentes."
            color="indigo"
          />
          <Benefit
            icon={<ThumbsUp className="h-6 w-6" />}
            title="Satisfaction Garantie"
            description="Nous nous engageons à vous offrir une expérience de qualité et à résoudre tout problème qui pourrait survenir."
            color="rose"
          />
        </motion.div>
      </AnimatedSection> */}

      {/* Mobile App Section */}
      <AnimatedSection className="bg-gradient-to-r from-blue-50 to-green-50 py-24">
        <div className="container px-4">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <motion.div variants={slideInLeft}>
              <Badge className="mb-4 bg-blue-500/10 text-blue-600">Nouveau</Badge>
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Emportez Service à la Maison Partout</h2>
              <p className="mb-6 text-lg text-muted-foreground">
                Notre application mobile vous permet de gérer vos demandes de service, de communiquer avec les artisans
                et de suivre vos rendez-vous, où que vous soyez.
              </p>

              <div className="mb-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Smartphone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Interface intuitive</p>
                    <p className="text-sm text-muted-foreground">
                      Navigation simple et expérience utilisateur optimisée
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Bell className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Notifications en temps réel</p>
                    <p className="text-sm text-muted-foreground">
                      Soyez informé instantanément des nouvelles propositions et messages
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Gestion des rendez-vous</p>
                    <p className="text-sm text-muted-foreground">
                      Consultez et gérez votre calendrier de services facilement
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button className="rounded-full bg-black px-6 text-white hover:bg-gray-800">
                  <svg viewBox="0 0 24 24" className="mr-2 h-5 w-5" fill="currentColor">
                    <path d="M17.5675 12.0084C17.5548 9.53125 19.5403 8.10938 19.6309 8.05469C18.3309 6.17188 16.3106 5.94531 15.6153 5.92969C13.9559 5.75781 12.3434 6.92969 11.4981 6.92969C10.6372 6.92969 9.35281 5.94531 7.94094 5.97656C6.13344 6.00781 4.44406 7.02344 3.51719 8.60156C1.60281 11.8125 3.04406 16.4453 4.88344 18.8672C5.81031 20.0547 6.88344 21.3984 8.27969 21.3516C9.63344 21.3047 10.1528 20.4766 11.7809 20.4766C13.3934 20.4766 13.8809 21.3516 15.2966 21.3203C16.7575 21.3047 17.6997 20.1172 18.5919 18.9141C19.6622 17.5391 20.0919 16.1953 20.1047 16.1328C20.0763 16.1172 17.5825 15.1484 17.5675 12.0084Z" />
                    <path d="M15.0763 4.01562C15.8341 3.08594 16.3372 1.83594 16.1997 0.5625C15.1372 0.609375 13.8059 1.30469 13.0247 2.21875C12.3294 3.02344 11.7247 4.32031 11.8778 5.55469C13.0716 5.64844 14.2934 4.93359 15.0763 4.01562Z" />
                  </svg>
                  App Store
                </Button>
                <Button className="rounded-full bg-black px-6 text-white hover:bg-gray-800">
                  <svg viewBox="0 0 24 24" className="mr-2 h-5 w-5" fill="currentColor">
                    <path d="M3.60156 20.7984C3.42969 20.625 3.28125 20.4141 3.14844 20.1797L3.14062 20.1641C2.92969 19.8047 2.76562 19.4062 2.64844 18.9844C2.39062 18.0938 2.25 17.1797 2.25 16.2422V7.75781C2.25 6.82031 2.39062 5.90625 2.64844 5.01562C2.76562 4.59375 2.92969 4.19531 3.14062 3.83594L3.14844 3.82031C3.28125 3.58594 3.42969 3.375 3.60156 3.20312L3.61719 3.1875C3.78906 3.01562 3.98438 2.85938 4.21094 2.72656L4.22656 2.71875C4.58594 2.50781 4.98438 2.34375 5.40625 2.22656C6.29688 1.96875 7.21094 1.82812 8.14844 1.82812H15.8516C16.7891 1.82812 17.7031 1.96875 18.5938 2.22656C19.0156 2.34375 19.4141 2.50781 19.7734 2.71875L19.7891 2.72656C20.0156 2.85938 20.2109 3.01562 20.3828 3.1875L20.3984 20.20312C20.5703 3.375 20.7188 3.58594 20.8516 3.82031L20.8594 3.83594C21.0703 4.19531 21.2344 4.59375 21.3516 5.01562C21.6094 5.90625 21.75 6.82031 21.75 7.75781V16.2422C21.75 17.1797 21.6094 18.0938 21.3516 18.9844C21.2344 19.4062 21.0703 19.8047 20.8594 20.1641L20.8516 20.1797C20.7188 20.4141 20.5703 20.625 20.3984 20.7984L20.3828 20.8125C20.2109 20.9844 20.0156 21.1406 19.7891 21.2734L19.7734 21.2812C19.4141 21.4922 19.0156 21.6562 18.5938 21.7734C17.7031 22.0312 16.7891 22.1719 15.8516 22.1719H8.14844C7.21094 22.1719 6.29688 22.0312 5.40625 21.7734C4.98438 21.6562 4.58594 21.4922 4.22656 21.2812L4.21094 21.2734C3.98438 21.1406 3.78906 20.9844 3.61719 20.8125L3.60156 20.7984ZM8.14844 3.32812C7.35938 3.32812 6.58594 3.44531 5.85156 3.65625C5.53125 3.75 5.23438 3.875 4.96875 4.02344C4.82812 4.10156 4.69531 4.19531 4.58594 4.29688C4.48438 4.40625 4.39062 4.53906 4.3125 4.67969C4.16406 4.94531 4.03906 5.24219 3.94531 5.5625C3.73438 6.29688 3.61719 7.07031 3.61719 7.85938V16.1406C3.61719 16.9297 3.73438 17.7031 3.94531 18.4375C4.03906 18.7578 4.16406 19.0547 4.3125 19.3203C4.39062 19.4609 4.48438 19.5938 4.58594 19.7031C4.69531 19.8047 4.82812 19.9219 4.96875 20.0234C5.23438 20.2266 5.53125 20.3438 5.85156 20.3594C6.58594 20.375 7.35938 20.4922 8.14844 20.5078Z" />
                  </svg>
                  Google Play
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
