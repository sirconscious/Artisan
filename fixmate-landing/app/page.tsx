import Link from "next/link"
import Image from "next/image"
import {
  Search,
  Wrench,
  Zap,
  Paintbrush,
  Droplets,
  Hammer,
  Star,
  ArrowRight,
  Check,
  Shield,
  Clock,
  DollarSign,
  HeadphonesIcon, 
  User,
  Briefcase,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { NavBar } from "@/components/nav-bar"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-12 lg:py-12 xl:py-17 bg-gradient-to-b from-background to-blue-50 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
            <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full bg-blue-200 opacity-40 blur-3xl"></div>
          </div>

          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-6">
                <div className="inline-flex items-center rounded-full border border-blue-200 bg-white px-3 py-1 text-sm text-blue-600 shadow-sm">
                  <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span> Trusted by 10,000+ homeowners
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    <span className="text-blue-600">Expert Home Services</span>, Just a Click Away
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    BrickHole connects you with verified local professionals for all your home repair and maintenance
                    needs.
                    <span className="font-medium text-foreground"> Quality service, guaranteed satisfaction.</span>
                  </p>
                </div>

                <div className="w-full max-w-md space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-20 animate-pulse"></div>
                    <div className="relative bg-white p-2 rounded-lg shadow-lg">
                      <div className="flex">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input
                            type="text"
                            placeholder="What service do you need?"
                            className="w-full pl-10 pr-20 py-6 text-base rounded-l-md rounded-r-none border-r-0"
                          />
                        </div>
                        <Button
                          size="lg"
                          className="bg-blue-600 hover:bg-blue-700 rounded-l-none px-6 py-6 text-base font-medium"
                        >
                          Find a Pro
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3 px-3">
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-100 cursor-pointer transition-colors">
                          Plumbing
                        </span>
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-100 cursor-pointer transition-colors">
                          Electrical
                        </span>
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-100 cursor-pointer transition-colors">
                          Carpentry
                        </span>
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-100 cursor-pointer transition-colors">
                          Painting
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <svg className="h-4 w-4 fill-current text-yellow-400" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <svg className="h-4 w-4 fill-current text-yellow-400" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <svg className="h-4 w-4 fill-current text-yellow-400" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <svg className="h-4 w-4 fill-current text-yellow-400" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <svg className="h-4 w-4 fill-current text-yellow-400" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <span className="ml-1">4.9/5 from 2,000+ reviews</span>
                    </div>
                    <div>100% satisfaction guarantee</div>
                  </div>
                </div>
              </div>

              <div className="relative  mt-20  hidden lg:block">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-100 rounded-full opacity-80"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-50 rounded-full opacity-80"></div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-xl blur-sm"></div>
                  <Image
                    src="/images/home-repair.png"
                    width={550}
                    height={550}
                    alt="Professional worker helping a homeowner"
                    className="relative mx-auto rounded-xl object-cover shadow-xl"
                  />

                  <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 max-w-[200px]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                        J
                      </div>
                      <div>
                        <p className="text-sm font-medium">John D.</p>
                        <p className="text-xs text-muted-foreground">Plumber</p>
                      </div>
                    </div>
                    <div className="flex items-center text-yellow-400 mb-1">
                      <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    </div>
                    <p className="text-xs">Available today in your area</p>
                  </div>

                  <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-xs font-medium">Verified Professionals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-blue-50 to-transparent"></div>
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full border border-blue-100"></div>
            <div className="absolute top-1/2 -left-20 w-40 h-40 rounded-full border border-blue-100"></div>
          </div>

          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-flex items-center justify-center rounded-full bg-blue-100 p-1 w-12 h-12 mb-4">
                <Wrench className="h-6 w-6 text-blue-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Professional Services</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Browse through our wide range of expert home services, all delivered by verified professionals
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-8">
              {[
                {
                  icon: <Droplets className="h-10 w-10 mb-2 text-blue-600" />,
                  title: "Plumbing",
                  description: "Leaky faucets, clogged drains, pipe repairs and installations",
                  image: "/images/plumbing.jpg",
                },
                {
                  icon: <Zap className="h-10 w-10 mb-2 text-blue-600" />,
                  title: "Electrical",
                  description: "Wiring, lighting, electrical repairs and installations",
                  image: "/images/electrical.jpg",
                },
                {
                  icon: <Paintbrush className="h-10 w-10 mb-2 text-blue-600" />,
                  title: "Painting",
                  description: "Interior & exterior painting services for all surfaces",
                  image: "/images/painting.jpg",
                },
                {
                  icon: <Hammer className="h-10 w-10 mb-2 text-blue-600" />,
                  title: "Carpentry",
                  description: "Furniture assembly, woodwork, repairs and custom builds",
                  image: "/images/carpentry.jpg",
                },
              ].map((service, index) => (
                <Card
                  key={index}
                  className="group overflow-hidden border-none shadow-lg transition-all hover:shadow-xl"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-blue-600">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="mb-4 text-muted-foreground">{service.description}</p>
                    <Button
                      variant="link"
                      className="group flex items-center gap-1 p-0 text-blue-600 transition-all hover:gap-2"
                    >
                      Book Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Button
                variant="outline"
                size="lg"
                className="group border-blue-600 text-blue-600 hover:bg-blue-50 transition-all"
              >
                View All Services <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-16 md:py-24 lg:py-32 bg-blue-50 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
          </div>

          <div className="container px-4 md:px-6 relative">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-flex items-center justify-center rounded-full bg-blue-100 p-1 w-12 h-12 mb-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-6">How BrickHole Works</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Get your home services done in three simple steps, with quality and satisfaction guaranteed every
                  time.
                </p>

                <div className="space-y-8">
                  {[
                    {
                      number: "1",
                      title: "Post a Job",
                      description:
                        "Describe what you need help with, when you need it done, and your budget. Our smart matching system will find the right professionals.",
                    },
                    {
                      number: "2",
                      title: "Get Matched",
                      description:
                        "Receive offers from skilled professionals in your area ready to help. Compare ratings, reviews, and prices to choose the best fit.",
                    },
                    {
                      number: "3",
                      title: "Job Done",
                      description:
                        "Your chosen professional arrives and completes the work to your satisfaction. Payment is only released when you're completely satisfied.",
                    },
                  ].map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                        {step.number}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <Button className="bg-blue-600 hover:bg-blue-700">Get Started Today</Button>
                </div>
              </div>

              <div className="order-1 md:order-2 relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-200 rounded-full opacity-60"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-100 rounded-full opacity-60"></div>

                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/question.jpg"
                    alt="Professional home service"
                    width={600}
                    height={700}
                    className="object-cover w-full h-[500px]"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="text-white font-medium">Satisfaction Guaranteed</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                        <Shield className="h-5 w-5 text-blue-600" />
                      </div>
                      <p className="text-white font-medium">Insured Professionals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-choose-us" className="w-full py-16 md:py-24 lg:py-32 bg-white relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-blue-50 to-transparent"></div>
            <div className="absolute -bottom-10 right-0 w-72 h-72 rounded-full border border-blue-100"></div>
          </div>

          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-flex items-center justify-center rounded-full bg-blue-100 p-1 w-12 h-12 mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Why Choose BrickHole</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  We're committed to providing the best service experience for your home projects
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {[
                {
                  icon: <Check className="h-6 w-6 text-white" />,
                  title: "Verified Professionals",
                  description:
                    "All workers undergo thorough background checks and skill verification before joining our platform.",
                },
                {
                  icon: <Star className="h-6 w-6 text-white" />,
                  title: "Satisfaction Guarantee",
                  description:
                    "If you're not satisfied with the service, we'll work to make it right or provide a refund.",
                },
                {
                  icon: <Shield className="h-6 w-6 text-white" />,
                  title: "Secure Payments",
                  description: "Your payment is held securely until the job is completed to your satisfaction.",
                },
                {
                  icon: <DollarSign className="h-6 w-6 text-white" />,
                  title: "Transparent Pricing",
                  description: "See clear pricing upfront with no hidden fees or surprises.",
                },
                {
                  icon: <HeadphonesIcon className="h-6 w-6 text-white" />,
                  title: "24/7 Support",
                  description: "Our customer service team is available around the clock to assist you.",
                },
                {
                  icon: <Briefcase className="h-6 w-6 text-white" />,
                  title: "Insurance Coverage",
                  description: "All jobs are covered by our insurance policy for your peace of mind.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl border border-blue-100 bg-white p-8 shadow-lg transition-all hover:shadow-xl hover:border-blue-200"
                >
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 opacity-10 blur-2xl transition-all group-hover:opacity-20"></div>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 flex flex-col items-center justify-center rounded-xl bg-blue-50 p-8 text-center">
              <h3 className="mb-4 text-2xl font-bold">Ready to experience the BrickHole difference?</h3>
              <p className="mb-6 max-w-2xl text-muted-foreground">
                Join thousands of satisfied homeowners who trust BrickHole for their home service needs.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">Find a Professional Today</Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-blue-50 relative"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -bottom-10 left-0 w-72 h-72 rounded-full border border-blue-100"></div>
            <div className="absolute top-1/3 right-0 w-40 h-40 rounded-full border border-blue-100"></div>
          </div>

          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-flex items-center justify-center rounded-full bg-blue-100 p-1 w-12 h-12 mb-4">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Customers Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Don't just take our word for it - hear from some of our satisfied customers
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mt-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Homeowner",
                  image: "/images/testimonial-1.png",
                  comment:
                    "BrickHole saved me when my pipe burst in the middle of the night. The plumber arrived within an hour and fixed everything quickly! I couldn't be more grateful for the prompt and professional service.",
                },
                {
                  name: "Michael Chen",
                  role: "Apartment Renter",
                  image: "/images/testimonial-2.png",
                  comment:
                    "I've used BrickHole for electrical and painting services. Both professionals were punctual, skilled, and left my place spotless. The pricing was transparent and fair. I'll definitely use BrickHole again!",
                },
                {
                  name: "Emily Rodriguez",
                  role: "Property Manager",
                  image: "/images/testimonial-3.png",
                  comment:
                    "As a property manager, I rely on BrickHole to handle maintenance requests. Their service is consistently excellent and reliable. The platform makes it easy to track jobs and communicate with professionals.",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl bg-white p-1 shadow-lg transition-all hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 opacity-0 transition-opacity group-hover:opacity-100"></div>
                  <div className="relative rounded-lg bg-white p-6">
                    <div className="flex items-center gap-2 mb-4">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>
                    <p className="mb-6 italic text-muted-foreground">"{testimonial.comment}"</p>
                    <div className="flex items-center gap-4"> 
                      <User />
                      {/* <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover"
                      /> */}
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 flex justify-center">
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-white px-6 py-3 text-sm shadow-sm">
                <span className="mr-2 text-blue-600 font-medium">4.9/5</span>
                <div className="flex items-center gap-1 mr-3">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                </div>
                <span className="text-muted-foreground">Based on 2,000+ verified reviews</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden">
          {/* Background with overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/home-repair.png"
              alt="Home repair professional at work"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-blue-900/80 backdrop-blur-sm"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col space-y-6 text-white">
                <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-sm">
                  <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2"></span> Professionals available in your
                  area
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
                  Ready to Transform Your Home?
                </h2>

                <p className="text-lg md:text-xl text-blue-100">
                  Join thousands of satisfied customers who trust BrickHole for their home service needs. Get started in
                  minutes.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Button
                    size="lg"
                    variant="default"
                    className="bg-white text-blue-700 hover:bg-blue-50 text-base py-6"
                  >
                    Find a Professional
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent text-white border-white hover:bg-white/20 text-base py-6"
                  >
                    Become a Provider
                  </Button>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <div className="flex -space-x-3">
                    <div className="h-10 w-10 rounded-full border-2 border-blue-900 bg-white flex items-center justify-center text-blue-700 font-semibold">
                      J
                    </div>
                    <div className="h-10 w-10 rounded-full border-2 border-blue-900 bg-white flex items-center justify-center text-blue-700 font-semibold">
                      S
                    </div>
                    <div className="h-10 w-10 rounded-full border-2 border-blue-900 bg-white flex items-center justify-center text-blue-700 font-semibold">
                      M
                    </div>
                    <div className="h-10 w-10 rounded-full border-2 border-blue-900 bg-white flex items-center justify-center text-blue-700 font-semibold">
                      +
                    </div>
                  </div>
                  <p className="text-sm text-blue-100">Join 10,000+ homeowners using BrickHole today</p>
                </div>
              </div>

              <div className="relative hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-xl blur-sm"></div>
                <div className="bg-white p-6 rounded-xl shadow-2xl relative">
                  <div className="flex items-center gap-4 mb-6">
                    <Image
                      src="/images/contractor.png"
                      alt="Professional contractor"
                      width={80}
                      height={80}
                      className="rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div>
                      <h3 className="font-bold text-lg">Michael Rodriguez</h3>
                      <p className="text-muted-foreground">Professional Electrician</p>
                      <div className="flex items-center mt-1">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <svg key={i} className="h-4 w-4 fill-yellow-400" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        <span className="ml-2 text-sm font-medium">5.0 (127 reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium mb-2">Recent Projects:</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Rewired kitchen lighting system
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Installed ceiling fans in 3 bedrooms
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Fixed electrical panel issues
                        </li>
                      </ul>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Availability</p>
                        <p className="font-medium text-green-600">Available today</p>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700">View Profile</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

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
