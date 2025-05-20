"use client"

import type React from "react"
import { NavBar } from "@/components/nav-bar"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Footer } from "react-day-picker"
import Link from "next/link" 
import { Input } from "@/components/ui/input"

import { motion, useScroll, useTransform, useInView, useAnimation, type Variants } from "framer-motion"
import {
  ArrowRight, 
  Wrench, 
  Award,
  CheckCircle,
  Clock,
  Globe,
  HandHeart,
  Home,
  Lightbulb,
  MapPin,
  MessageSquare,
  Shield,
  Sparkles,
  Star,
  PenToolIcon as Tool,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

// Animated feature component
interface FeatureProps {
  icon: React.ReactNode
  title: string
  description: string
  color?: string
}

function Feature({ icon, title, description, color = "blue" }: FeatureProps) {
  const [isHovered, setIsHovered] = useState(false)

  const colorClasses = {
    blue: "bg-blue-50 text-blue-500 group-hover:bg-blue-500 group-hover:text-white",
    green: "bg-green-50 text-green-500 group-hover:bg-green-500 group-hover:text-white",
    purple: "bg-purple-50 text-purple-500 group-hover:bg-purple-500 group-hover:text-white",
    amber: "bg-amber-50 text-amber-500 group-hover:bg-amber-500 group-hover:text-white",
  }

  return (
    <motion.div
      variants={fadeInUp}
      className="group relative rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
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
        className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl bg-gradient-to-r from-blue-500 to-green-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

// Team member card component
interface TeamMemberProps {
  name: string
  role: string
  image: string
  location: string
  experience: string
  skills: string[]
}

function TeamMember({ name, role, image, location, experience, skills }: TeamMemberProps) {
  return (
    <motion.div variants={scaleUp} whileHover={{ y: -8 }} className="group">
      <Card className="overflow-hidden border-none bg-transparent shadow-none transition-all duration-300">
        <CardContent className="relative p-0">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-green-50">
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-300 group-hover:opacity-0">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/80 text-blue-500 backdrop-blur-sm">
                <span className="text-2xl font-medium">{name.charAt(0)}</span>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h3 className="mb-1 text-xl font-medium">{name}</h3>
                <p className="text-sm text-muted-foreground">{role}</p>
              </motion.div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <h3 className="mb-1 text-xl font-medium text-white">{name}</h3>
              <p className="mb-3 text-sm text-white/80">{role}</p>

              <div className="mb-4 flex w-full flex-col gap-2 text-left text-sm text-white/90">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-300" />
                  <span>{location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-300" />
                  <span>{experience}</span>
                </div>
              </div>

              <div className="mb-4 flex w-full flex-wrap gap-1">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="border-blue-300/30 bg-blue-500/10 text-blue-100">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-3">
                <motion.a
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </motion.a>
                <motion.a
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </motion.a>
                <motion.a
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </motion.a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
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
        {Array.from({ length: 20 }).map((_, i) => (
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
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i + 20}
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
        <span className="ml-2 text-xs text-muted-foreground">For {service}</span>
      </div>

      <p className="italic text-muted-foreground">"{quote}"</p>
    </motion.div>
  )
}

// Stats component
interface StatProps {
  value: string
  label: string
  icon: React.ReactNode
  color: string
}

function Stat({ value, label, icon, color }: StatProps) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-500",
    green: "bg-green-50 text-green-500",
    purple: "bg-purple-50 text-purple-500",
    amber: "bg-amber-50 text-amber-500",
  }

  return (
    <motion.div variants={scaleUp} className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm">
      <div
        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${colorClasses[color as keyof typeof colorClasses]}`}
      >
        {icon}
      </div>
      <div className="text-3xl font-bold">{value}</div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </motion.div>
  )
}

export default function AboutPage() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])
  const [activeTab, setActiveTab] = useState("mission")

  return (
    <div className="relative min-h-screen bg-white font-sans">
        <NavBar />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <AnimatedBackground />
        <div className="relative">
          <AnimatedSection className="container flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
            <motion.div
              variants={fadeInUp}
              className="mb-4 inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm text-blue-600"
            >
              <span className="inline-block h-1 w-1 rounded-full bg-blue-500"></span>
              <span className="inline-block h-1 w-1 rounded-full bg-blue-500"></span>
              <span className="inline-block h-1 w-1 rounded-full bg-blue-500"></span>
              NOTRE HISTOIRE
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="mb-6 bg-gradient-to-r from-blue-600 via-purple-500 to-green-500 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl md:text-7xl"
            >
              Empowering Local Talent
            </motion.h1>
            <motion.p variants={fadeInUp} className="mb-8 max-w-2xl text-xl text-muted-foreground">
              Service à la Maison connects skilled local professionals with people who need their services, creating
              opportunities and solving everyday problems through technology and community.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-8 text-white transition-all duration-300 hover:shadow-lg"
              >
                Discover Our Mission
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-blue-200 px-8 transition-all duration-300 hover:border-blue-400 hover:bg-blue-50"
              >
                Meet Our Team
              </Button>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 transform"
              style={{ opacity, y, scale }}
            >
              <div className="flex flex-col items-center">
                <span className="mb-2 text-sm text-muted-foreground">Scroll to explore</span>
                <motion.div
                  className="h-12 w-7 rounded-full border border-blue-200 p-1"
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
          </AnimatedSection>
        </div>
      </div>

      {/* Stats Section */}
      <AnimatedSection className="container px-4 py-12">
        <motion.div variants={staggerContainer} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Stat value="5,000+" label="Artisans Qualifiés" icon={<Users className="h-6 w-6" />} color="blue" />
          <Stat value="25,000+" label="Services Réalisés" icon={<CheckCircle className="h-6 w-6" />} color="green" />
          <Stat value="4.8/5" label="Note Moyenne" icon={<Star className="h-6 w-6" />} color="amber" />
          <Stat value="15+" label="Villes Couvertes" icon={<MapPin className="h-6 w-6" />} color="purple" />
        </motion.div>
      </AnimatedSection>

      {/* Tabs Section */}
      <AnimatedSection className="container px-4 py-24">
        <motion.div variants={fadeInUp} className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Notre Vision</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Découvrez ce qui nous motive et comment nous transformons le secteur des services à domicile.
          </p>
        </motion.div>

        <Tabs defaultValue="mission" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mx-auto mb-8 grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="mission">Mission</TabsTrigger>
            <TabsTrigger value="vision">Vision</TabsTrigger>
            <TabsTrigger value="values">Valeurs</TabsTrigger>
          </TabsList>

          <TabsContent value="mission" className="focus-visible:outline-none">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <motion.div
                variants={slideInLeft}
                initial="hidden"
                animate={activeTab === "mission" ? "visible" : "hidden"}
                className="order-2 md:order-1"
              >
                <div className="mb-8">
                  <h3 className="mb-4 text-2xl font-bold">Notre Mission</h3>
                  <p className="mb-4 text-muted-foreground">
                    Service à la Maison a été créé avec une mission claire : connecter les artisans locaux talentueux
                    avec les personnes qui ont besoin de leurs services, tout en simplifiant le processus pour les deux
                    parties.
                  </p>
                  <p className="text-muted-foreground">
                    Nous croyons que chaque artisan mérite une plateforme pour mettre en valeur ses compétences et que
                    chaque foyer mérite un accès facile à des services de qualité.
                  </p>
                </div>

                <div className="grid gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <CheckCircle className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-sm">Faciliter l'accès aux services à domicile de qualité</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <CheckCircle className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-sm">Créer des opportunités économiques pour les artisans locaux</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <CheckCircle className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-sm">Renforcer les communautés locales par des services de proximité</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={slideInRight}
                initial="hidden"
                animate={activeTab === "mission" ? "visible" : "hidden"}
                className="order-1 md:order-2"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-green-50 p-8">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-full max-w-md">
                      <svg
                        viewBox="0 0 400 400"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-full w-full"
                      >
                        <g opacity="0.2">
                          <motion.path
                            d="M200 50C200 77.6142 177.614 100 150 100C122.386 100 100 77.6142 100 50C100 22.3858 122.386 0 150 0C177.614 0 200 22.3858 200 50Z"
                            fill="#3B82F6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                          <motion.path
                            d="M300 150C300 177.614 277.614 200 250 200C222.386 200 200 177.614 200 150C200 122.386 222.386 100 250 100C277.614 100 300 122.386 300 150Z"
                            fill="#10B981"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                          />
                          <motion.path
                            d="M200 250C200 277.614 177.614 300 150 300C122.386 300 100 277.614 100 250C100 222.386 122.386 200 150 200C177.614 200 200 222.386 200 250Z"
                            fill="#6366F1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                          />
                          <motion.path
                            d="M400 250C400 277.614 377.614 300 350 300C322.386 300 300 277.614 300 250C300 222.386 322.386 200 350 200C377.614 200 400 222.386 400 250Z"
                            fill="#EC4899"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.8 }}
                          />
                          <motion.path
                            d="M300 350C300 377.614 277.614 400 250 400C222.386 400 200 377.614 200 350C200 322.386 222.386 300 250 300C277.614 300 300 322.386 300 350Z"
                            fill="#F59E0B"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1 }}
                          />
                          <motion.path
                            d="M100 350C100 377.614 77.6142 400 50 400C22.3858 400 0 377.614 0 350C0 322.386 22.3858 300 50 300C77.6142 300 100 322.386 100 350Z"
                            fill="#3B82F6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1.2 }}
                          />
                          <motion.path
                            d="M100 150C100 177.614 77.6142 200 50 200C22.3858 200 0 177.614 0 150C0 122.386 22.3858 100 50 100C77.6142 100 100 122.386 100 150Z"
                            fill="#10B981"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1.4 }}
                          />
                          <motion.path
                            d="M400 150C400 177.614 377.614 200 350 200C322.386 200 300 177.614 300 150C300 122.386 322.386 100 350 100C377.614 100 400 122.386 400 150Z"
                            fill="#6366F1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1.6 }}
                          />
                          <motion.path
                            d="M400 50C400 77.6142 377.614 100 350 100C322.386 100 300 77.6142 300 50C300 22.3858 322.386 0 350 0C377.614 0 400 22.3858 400 50Z"
                            fill="#EC4899"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1.8 }}
                          />
                        </g>
                        <motion.path
                          d="M200 200L300 150L400 150L400 250L300 350L200 350L100 250L100 150L200 100L300 150"
                          stroke="#3B82F6"
                          strokeWidth="2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2, delay: 0.5 }}
                        />
                        <motion.path
                          d="M200 200L100 150L0 150L0 250L100 350L200 350"
                          stroke="#10B981"
                          strokeWidth="2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5, delay: 1 }}
                        />
                        <motion.path
                          d="M200 200L200 100L200 0"
                          stroke="#6366F1"
                          strokeWidth="2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: 1.5 }}
                        />
                        <motion.circle
                          cx="200"
                          cy="200"
                          r="10"
                          fill="#3B82F6"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 2 }}
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="vision" className="focus-visible:outline-none">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <motion.div
                variants={slideInLeft}
                initial="hidden"
                animate={activeTab === "vision" ? "visible" : "hidden"}
                className="order-2 md:order-1"
              >
                <div className="mb-8">
                  <h3 className="mb-4 text-2xl font-bold">Notre Vision</h3>
                  <p className="mb-4 text-muted-foreground">
                    Nous envisageons un avenir où la recherche et la réservation de services à domicile sont aussi
                    simples que de commander un repas en ligne, où les artisans peuvent développer leur activité sans
                    obstacles administratifs.
                  </p>
                  <p className="text-muted-foreground">
                    Notre vision est de créer un écosystème où la qualité, la confiance et l'efficacité sont au cœur de
                    chaque interaction entre les clients et les professionnels.
                  </p>
                </div>

                <div className="grid gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <Lightbulb className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-sm">Digitaliser complètement le secteur des services à domicile</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <Lightbulb className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-sm">Devenir la référence pour les services à domicile de qualité</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <Lightbulb className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-sm">Étendre notre présence à l'échelle nationale puis internationale</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={slideInRight}
                initial="hidden"
                animate={activeTab === "vision" ? "visible" : "hidden"}
                className="order-1 md:order-2"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-blue-50">
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <motion.div
                      className="relative h-full w-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                    >
                      <motion.div
                        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-4 border-green-200"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                      <motion.div
                        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-4 border-blue-200"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      />
                      <motion.div
                        className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-4 border-purple-200"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      />

                      <motion.div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md">
                          <Home className="h-10 w-10 text-blue-500" />
                        </div>
                      </motion.div>

                      <motion.div
                        className="absolute left-[30%] top-[30%] -translate-x-1/2 -translate-y-1/2 transform"
                        initial={{ scale: 0, x: "-30%", y: "-30%" }}
                        animate={{ scale: 1, x: "-30%", y: "-30%" }}
                        transition={{ duration: 0.5, delay: 1 }}
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
                          <Tool className="h-6 w-6 text-green-500" />
                        </div>
                      </motion.div>

                      <motion.div
                        className="absolute left-[70%] top-[40%] -translate-x-1/2 -translate-y-1/2 transform"
                        initial={{ scale: 0, x: "-70%", y: "-40%" }}
                        animate={{ scale: 1, x: "-70%", y: "-40%" }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
                          <MessageSquare className="h-6 w-6 text-purple-500" />
                        </div>
                      </motion.div>

                      <motion.div
                        className="absolute left-[50%] top-[75%] -translate-x-1/2 -translate-y-1/2 transform"
                        initial={{ scale: 0, x: "-50%", y: "-75%" }}
                        animate={{ scale: 1, x: "-50%", y: "-75%" }}
                        transition={{ duration: 0.5, delay: 1.4 }}
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
                          <Star className="h-6 w-6 text-amber-500" />
                        </div>
                      </motion.div>

                      <motion.div
                        className="absolute left-[20%] top-[60%] -translate-x-1/2 -translate-y-1/2 transform"
                        initial={{ scale: 0, x: "-20%", y: "-60%" }}
                        animate={{ scale: 1, x: "-20%", y: "-60%" }}
                        transition={{ duration: 0.5, delay: 1.6 }}
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
                          <Users className="h-6 w-6 text-blue-500" />
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="values" className="focus-visible:outline-none">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <motion.div
                variants={slideInLeft}
                initial="hidden"
                animate={activeTab === "values" ? "visible" : "hidden"}
                className="order-2 md:order-1"
              >
                <div className="mb-8">
                  <h3 className="mb-4 text-2xl font-bold">Nos Valeurs</h3>
                  <p className="mb-4 text-muted-foreground">
                    Nos valeurs fondamentales guident chaque décision que nous prenons et chaque fonctionnalité que nous
                    développons. Elles sont au cœur de notre identité et de notre approche.
                  </p>
                  <p className="text-muted-foreground">
                    Ces principes nous aident à créer une plateforme qui répond véritablement aux besoins de nos
                    utilisateurs tout en maintenant les plus hauts standards d'éthique et de qualité.
                  </p>
                </div>

                <div className="grid gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                      <Shield className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="font-medium">Confiance et Sécurité</p>
                      <p className="text-xs text-muted-foreground">Nous vérifions rigoureusement tous nos artisans</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                      <Award className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="font-medium">Excellence et Qualité</p>
                      <p className="text-xs text-muted-foreground">
                        Nous maintenons des standards élevés pour tous les services
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                      <HandHeart className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="font-medium">Communauté et Solidarité</p>
                      <p className="text-xs text-muted-foreground">
                        Nous renforçons les liens entre clients et professionnels
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                      <Globe className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="font-medium">Innovation et Accessibilité</p>
                      <p className="text-xs text-muted-foreground">Nous rendons la technologie accessible à tous</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={slideInRight}
                initial="hidden"
                animate={activeTab === "values" ? "visible" : "hidden"}
                className="order-1 md:order-2"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-4 p-8">
                      <motion.div
                        className="flex flex-col items-center justify-center rounded-xl bg-white/80 p-6 text-center backdrop-blur-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <Shield className="mb-3 h-10 w-10 text-purple-500" />
                        <h4 className="text-lg font-medium">Confiance</h4>
                      </motion.div>

                      <motion.div
                        className="flex flex-col items-center justify-center rounded-xl bg-white/80 p-6 text-center backdrop-blur-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <Award className="mb-3 h-10 w-10 text-blue-500" />
                        <h4 className="text-lg font-medium">Qualité</h4>
                      </motion.div>

                      <motion.div
                        className="flex flex-col items-center justify-center rounded-xl bg-white/80 p-6 text-center backdrop-blur-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        <HandHeart className="mb-3 h-10 w-10 text-green-500" />
                        <h4 className="text-lg font-medium">Communauté</h4>
                      </motion.div>

                      <motion.div
                        className="flex flex-col items-center justify-center rounded-xl bg-white/80 p-6 text-center backdrop-blur-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        <Globe className="mb-3 h-10 w-10 text-amber-500" />
                        <h4 className="text-lg font-medium">Innovation</h4>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection className="container px-4 py-24">
        <motion.div variants={fadeInUp} className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Ce Que Nous Offrons</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Notre plateforme propose une gamme complète de services pour répondre à tous vos besoins domestiques.
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Feature
            icon={<Tool className="h-6 w-6" />}
            title="Services de Plomberie"
            description="Réparations, installations et entretien de tous vos systèmes de plomberie par des professionnels certifiés."
            color="blue"
          />
          <Feature
            icon={<Sparkles className="h-6 w-6" />}
            title="Services Électriques"
            description="Installation, réparation et mise aux normes de vos installations électriques par des électriciens qualifiés."
            color="green"
          />
          <Feature
            icon={<Home className="h-6 w-6" />}
            title="Rénovation Intérieure"
            description="Peinture, pose de revêtements, menuiserie et autres travaux de rénovation pour embellir votre intérieur."
            color="purple"
          />
          <Feature
            icon={<Shield className="h-6 w-6" />}
            title="Sécurité & Serrurerie"
            description="Installation de systèmes de sécurité, remplacement de serrures et interventions d'urgence."
            color="amber"
          />
          <Feature
            icon={<Globe className="h-6 w-6" />}
            title="Jardinage & Extérieur"
            description="Entretien de jardins, aménagement paysager et travaux extérieurs pour valoriser votre propriété."
            color="blue"
          />
          <Feature
            icon={<HandHeart className="h-6 w-6" />}
            title="Aide à Domicile"
            description="Services de ménage, d'aide aux personnes âgées et autres prestations pour faciliter votre quotidien."
            color="green"
          />
        </motion.div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection className="bg-gradient-to-r from-blue-50 to-green-50 py-24">
        <div className="container px-4">
          <motion.div variants={fadeInUp} className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Ce Que Disent Nos Clients</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Découvrez les expériences de ceux qui ont fait confiance à nos artisans pour leurs projets.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Testimonial
              quote="Service impeccable ! Le plombier est arrivé à l'heure et a résolu mon problème rapidement. Je recommande vivement."
              author="Marie Dupont"
              role="Propriétaire à Paris"
              image="/placeholder.svg?height=100&width=100"
              rating={5}
              service="Plomberie"
            />
            <Testimonial
              quote="Très satisfait de la qualité du travail. L'électricien était professionnel et a pris le temps d'expliquer ce qu'il faisait."
              author="Thomas Martin"
              role="Propriétaire à Lyon"
              image="/placeholder.svg?height=100&width=100"
              rating={5}
              service="Électricité"
            />
            <Testimonial
              quote="La rénovation de ma salle de bain s'est déroulée parfaitement. Travail soigné et dans les délais. Merci !"
              author="Sophie Leroy"
              role="Propriétaire à Marseille"
              image="/placeholder.svg?height=100&width=100"
              rating={4}
              service="Rénovation"
            />
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Team Section */}
      <AnimatedSection className="container px-4 py-24">
        <motion.div variants={fadeInUp} className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Notre Équipe</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Rencontrez les personnes passionnées qui travaillent pour connecter les artisans locaux avec ceux qui ont
            besoin de leurs services.
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <TeamMember
            name="Mehdi El Bakouri"
            role="Full-stack Developer"
            image="/placeholder.svg?height=400&width=300"
            location="Paris, France"
            experience="5 ans d'expérience"
            skills={["React", "Node.js", "MongoDB", "AWS"]}
          />
          <TeamMember
            name="Ayoub Ettalbi"
            role="UI/UX & Backend Developer"
            image="/placeholder.svg?height=400&width=300"
            location="Lyon, France"
            experience="4 ans d'expérience"
            skills={["UI/UX", "Python", "Django", "PostgreSQL"]}
          />
          <TeamMember
            name="Amine Boutlha"
            role="Project Manager"
            image="/placeholder.svg?height=400&width=300"
            location="Marseille, France"
            experience="7 ans d'expérience"
            skills={["Agile", "Scrum", "Product Management", "Leadership"]}
          />
          <TeamMember
            name="Abdessamiai Aksas"
            role="Frontend Developer"
            image="/placeholder.svg?height=400&width=300"
            location="Bordeaux, France"
            experience="3 ans d'expérience"
            skills={["React", "TypeScript", "Tailwind CSS", "Next.js"]}
          />
        </motion.div>
      </AnimatedSection>

      {/* Call to Action Section */}
      <AnimatedSection className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-green-500" />
        <div className="absolute inset-0">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            style={{ opacity: 0.1 }}
          >
            <defs>
              <radialGradient id="Gradient1" cx="50%" cy="50%" fx="0.441602%" fy="50%" r=".5">
                <animate attributeName="fx" dur="34s" values="0%;3%;0%" repeatCount="indefinite"></animate>
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.5)"></stop>
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0)"></stop>
              </radialGradient>
              <radialGradient id="Gradient2" cx="50%" cy="50%" fx="2.68147%" fy="50%" r=".5">
                <animate attributeName="fx" dur="23.5s" values="0%;3%;0%" repeatCount="indefinite"></animate>
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.5)"></stop>
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0)"></stop>
              </radialGradient>
              <radialGradient id="Gradient3" cx="50%" cy="50%" fx="0.836536%" fy="50%" r=".5">
                <animate attributeName="fx" dur="21.5s" values="0%;3%;0%" repeatCount="indefinite"></animate>
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.5)"></stop>
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0)"></stop>
              </radialGradient>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient1)">
              <animate attributeName="x" dur="20s" values="25%;0%;25%" repeatCount="indefinite" />
              <animate attributeName="y" dur="21s" values="0%;25%;0%" repeatCount="indefinite" />
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="17s"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient2)">
              <animate attributeName="x" dur="23s" values="0%;-25%;0%" repeatCount="indefinite" />
              <animate attributeName="y" dur="24s" values="25%;-25%;25%" repeatCount="indefinite" />
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="18s"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient3)">
              <animate attributeName="x" dur="25s" values="-25%;0%;-25%" repeatCount="indefinite" />
              <animate attributeName="y" dur="26s" values="0%;-25%;0%" repeatCount="indefinite" />
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360 50 50"
                to="0 50 50"
                dur="19s"
                repeatCount="indefinite"
              />
            </rect>
          </svg>
        </div>

        <div className="container relative px-4 text-center">
          <motion.div variants={fadeInUp} className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Prêt à Rejoindre Notre Communauté ?</h2>
            <p className="mb-8 text-lg text-blue-100">
              Que vous soyez à la recherche de services ou que vous souhaitiez proposer vos compétences, Service à la
              Maison est là pour vous. Rejoignez notre communauté grandissante dès aujourd'hui.
            </p>
            <motion.div className="flex flex-wrap justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block rounded-full bg-white p-[1px]"
              >
                <Button
                  size="lg"
                  className="rounded-full bg-white px-8 text-blue-600 transition-all duration-300 hover:bg-blue-50"
                >
                  Découvrir la Plateforme
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white bg-transparent px-8 text-white transition-all duration-300 hover:bg-white/10"
                >
                  Devenir Artisan
                  <Tool className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/80"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span>Inscription gratuite</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span>Artisans vérifiés</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span>Paiement sécurisé</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span>Support 7j/7</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Footer */}
         <footer className="w-full border-t py-12 md:py-16 bg-[#111827] text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center mb-12 text-center">
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">BrickHole</span>
            </div>
            <p className="max-w-md text-gray-400">
              Connecting you with skilled professionals for all your home service needs.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2 lg:col-span-2">
              <h4 className="text-lg font-bold mb-4">Subscribe to our newsletter</h4>
              <p className="text-sm text-gray-400 mb-4">
                Get the latest news, updates and special offers delivered directly to your inbox.
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Button className="bg-blue-600 hover:bg-blue-700">Subscribe</Button>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold mb-4">Services</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Plumbing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Electrical
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Carpentry
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Cleaning
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Press
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold mb-4">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} BrickHole. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
