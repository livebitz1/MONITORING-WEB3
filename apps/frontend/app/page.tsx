"use client"

import type React from "react"

import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import {
  Bell,
  CheckCircle,
  Clock,
  Shield,
  Activity,
  ChevronDown,
  Star,
  Zap,
  Server,
  AlertTriangle,
  BarChart,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

export function AppBar({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for smoother animations
      window.requestAnimationFrame(() => {
        setScrollY(window.scrollY)
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleResize = () => {
      setViewportHeight(window.innerHeight)
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      <header
        className={`flex justify-between items-center p-4 md:px-8 h-20 backdrop-blur-md sticky top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-black/80 border-b border-gold-500/30" : "bg-transparent"
        }`}
        style={{
          boxShadow: scrolled ? "0 4px 30px rgba(212, 175, 55, 0.1)" : "none",
        }}
      >
        <div className="flex items-center gap-2 relative">
          <div
            className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(212, 175, 55, 0.3) 0%, transparent 70%)`,
              filter: "blur(8px)",
            }}
          />
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-black border border-gold-500/50 relative z-10">
            <Activity className="h-5 w-5 text-gold-500" />
          </div>
          <span className="text-xl font-bold text-white relative z-10">
            Up<span className="text-gold-500">time</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-white/80">
          {["Features", "Pricing", "Documentation", "Blog"].map((item, index) => (
            <Link key={index} href={`/${item.toLowerCase()}`} className="relative group overflow-hidden">
              <span className="relative z-10 transition-colors duration-300 group-hover:text-gold-500">{item}</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div
            className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
          ></div>
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${mobileMenuOpen ? "opacity-0" : ""}`}></div>
          <div
            className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          ></div>
        </button>

        <div className="hidden md:flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="relative group px-5 py-2.5 rounded-lg bg-black border border-white/20 text-white font-medium overflow-hidden">
                <span className="relative z-10 flex items-center gap-1.5 transition-colors duration-300 group-hover:text-gold-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  Sign In
                </span>
                <span className="absolute inset-0 border border-gold-500/0 group-hover:border-gold-500/100 rounded-lg transition-all duration-500"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="absolute bottom-0 left-0 w-full h-0 bg-gold-500/20 group-hover:h-full transition-all duration-500 z-0"></span>
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button className="relative group px-5 py-2.5 rounded-lg bg-black text-white font-medium overflow-hidden">
                <span className="absolute inset-0 border border-gold-500 rounded-lg z-0"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-gold-500 to-amber-400 opacity-10 group-hover:opacity-20 transition-opacity duration-500 z-0"></span>
                <span
                  className="absolute -inset-px bg-gradient-to-r from-gold-500 to-amber-400 rounded-lg z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ filter: "blur(4px)" }}
                ></span>
                <span className="relative z-10 flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gold-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="23" y1="11" x2="17" y2="11" />
                  </svg>
                  Sign Up
                </span>
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <div className="relative group">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-gold-500 to-amber-400 opacity-70 group-hover:opacity-100 blur-sm transition duration-300"></div>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "border-2 border-black hover:border-gold-500 transition-colors",
                  },
                }}
              />
            </div>
          </SignedIn>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-md transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          {["Features", "Pricing", "Documentation", "Blog"].map((item, index) => (
            <Link
              key={index}
              href={`/${item.toLowerCase()}`}
              className="text-white text-2xl py-4 hover:text-gold-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </Link>
          ))}

          <div className="flex flex-col gap-4 mt-8">
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  className="px-8 py-3 border border-white/20 rounded-lg text-white hover:text-gold-500 hover:border-gold-500 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button
                  className="px-8 py-3 border border-gold-500 rounded-lg text-white hover:bg-gold-500/10 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      </div>

      {children}
    </>
  )
}

export default function UptimeLanding() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null)

  // Track mouse position for background effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      // Use requestAnimationFrame for smoother animations
      window.requestAnimationFrame(() => {
        setScrollY(window.scrollY)
      })
    }

    const handleResize = () => {
      setViewportHeight(window.innerHeight)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px 0px -10% 0px", // Trigger slightly before element enters viewport
      threshold: [0.1, 0.3, 0.5], // Multiple thresholds for smoother animations
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view")
        } else {
          // Only remove the class if it's completely out of view
          if (
            entry.boundingClientRect.y > window.innerHeight ||
            entry.boundingClientRect.y + entry.boundingClientRect.height < 0
          ) {
            entry.target.classList.remove("in-view")
          }
        }
      })
    }, options)

    // Observe all sections
    sectionsRef.current.forEach((section) => {
      if (section) observerRef.current?.observe(section)
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Testimonial data
  const testimonials = [
    {
      quote:
        "Uptime Monitor has been a game-changer for our business. We've reduced our downtime by 95% since implementing their solution.",
      author: "Sarah Johnson",
      role: "CTO, TechCorp",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      quote:
        "The instant alerts have saved us countless hours of troubleshooting. Our customers are happier and our team is more productive.",
      author: "Michael Chen",
      role: "DevOps Lead, CloudScale",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      quote:
        "I've tried many monitoring solutions, but Uptime Monitor offers the perfect balance of features, ease of use, and reliability.",
      author: "Emma Rodriguez",
      role: "IT Director, Global Retail",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  // FAQ data
  const faqs = [
    {
      question: "How does Uptime Monitor work?",
      answer:
        "Uptime Monitor checks your websites and services at regular intervals from multiple locations around the world. If any issues are detected, you'll receive instant alerts through your preferred channels, allowing you to address problems before they impact your users.",
    },
    {
      question: "What types of services can I monitor?",
      answer:
        "You can monitor websites, APIs, databases, DNS servers, mail servers, and virtually any service with an endpoint. Our flexible monitoring system supports HTTP/HTTPS, TCP, ICMP, and custom protocols.",
    },
    {
      question: "How quickly will I be notified of downtime?",
      answer:
        "Notifications are sent within seconds of detecting an issue. Our system performs verification checks from multiple locations to eliminate false positives before alerting you.",
    },
    {
      question: "Can I customize alert thresholds?",
      answer:
        "Yes, you can set custom thresholds for response time, SSL certificate expiration, content validation, and more. This allows you to be alerted before critical failures occur.",
    },
    {
      question: "Do you offer a free trial?",
      answer:
        "Yes, we offer a 14-day free trial with full access to all features. No credit card required to start monitoring your services today.",
    },
  ]

  // How it works steps
  const howItWorksSteps = [
    {
      icon: Server,
      title: "Connect Your Services",
      description: "Add your websites, APIs, and services to our monitoring platform with just a few clicks.",
    },
    {
      icon: Zap,
      title: "Configure Monitoring",
      description: "Set up check intervals, alert thresholds, and notification preferences to match your needs.",
    },
    {
      icon: AlertTriangle,
      title: "Receive Instant Alerts",
      description: "Get notified immediately when issues are detected through email, SMS, Slack, or other channels.",
    },
    {
      icon: BarChart,
      title: "Analyze Performance",
      description: "Track uptime, response times, and other metrics to optimize your services over time.",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background gradient that follows mouse */}
      <div
        className="fixed inset-0 z-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(212, 175, 55, 0.15) 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      ></div>

      <AppBar>
        <main className="relative">
          {/* Hero Section */}
          <section
            ref={(el) => (sectionsRef.current[0] = el)}
            className="relative min-h-[90vh] flex items-center py-32 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden animate-section"
            style={{
              perspective: "1000px",
            }}
          >
            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-gold-500/30"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: 0.3 + Math.random() * 0.7,
                    animation: `float ${5 + Math.random() * 10}s linear infinite`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                ></div>
              ))}
            </div>

            <div className="flex flex-col items-center text-center relative z-10 w-full">
              <div className="animate-title">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
                  Never Miss a Beat with <span className="text-gold-500">Uptime</span> Monitor
                </h1>
                <p className="text-xl text-white/70 max-w-3xl mb-10 mx-auto">
                  Real-time monitoring for your websites and services. Get instant alerts when your systems go down.
                </p>
              </div>

              <div className="animate-buttons">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/signup"
                    className="group relative px-8 py-3 rounded-lg bg-black border border-gold-500 text-white font-medium overflow-hidden"
                  >
                    <span className="relative z-10 group-hover:text-gold-500 transition-colors duration-300">
                      Start Monitoring
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-gold-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Link>
                  <Link
                    href="/demo"
                    className="group relative px-8 py-3 rounded-lg bg-black border border-white/20 text-white font-medium overflow-hidden"
                  >
                    <span className="relative z-10 group-hover:text-gold-500 transition-colors duration-300">
                      View Demo
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-center w-full animate-stats">
              {[
                { value: "99.9%", label: "Uptime Guarantee" },
                { value: "24/7", label: "Continuous Monitoring" },
                { value: "1s", label: "Alert Response Time" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="relative group bg-black/50 p-6 rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-500 hover:border-gold-500/50 stat-item"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    const y = e.clientY - rect.top
                    e.currentTarget.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(212, 175, 55, 0.15) 0%, transparent 70%)`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = ""
                  }}
                >
                  <p className="text-4xl font-bold text-gold-500 mb-2">{stat.value}</p>
                  <p className="text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How It Works Section */}
          <section
            ref={(el) => (sectionsRef.current[1] = el)}
            className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto animate-section"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 section-title">
              How <span className="text-gold-500">Uptime</span> Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {/* Connecting line */}
              <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-500/0 via-gold-500/50 to-gold-500/0 hidden lg:block"></div>

              {howItWorksSteps.map((step, index) => (
                <div
                  key={index}
                  className="relative group bg-black/70 p-8 rounded-xl border border-white/10 transition-all duration-500 hover:border-gold-500/50 how-it-works-item"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    const y = e.clientY - rect.top
                    e.currentTarget.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(212, 175, 55, 0.1) 0%, rgba(0, 0, 0, 0.7) 70%)`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(0, 0, 0, 0.7)"
                  }}
                >
                  <div className="relative mb-6">
                    <div className="absolute -inset-2 rounded-full bg-gold-500/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></div>
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center border border-gold-500/50 group-hover:border-gold-500 transition-colors duration-300 relative z-10">
                      <step.icon className="h-8 w-8 text-gold-500" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-black border border-gold-500 flex items-center justify-center text-gold-500 font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-gold-500 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-white/60 group-hover:text-white/80 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Features Section */}
          <section
            ref={(el) => (sectionsRef.current[2] = el)}
            className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto animate-section"
          >
            <div
              className="relative bg-black/50 p-12 rounded-2xl border border-white/10 backdrop-blur-sm"
              style={{
                transform: `perspective(1000px) rotateX(${Math.min(5, Math.max(-5, (scrollY - 800) * 0.01))}deg)`,
                transformOrigin: "center center",
              }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 section-title">
                Powerful <span className="text-gold-500">Monitoring</span> Features
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: Bell,
                    title: "Instant Alerts",
                    desc: "Get notified immediately when your services experience downtime.",
                  },
                  {
                    icon: Clock,
                    title: "Response Time",
                    desc: "Track and analyze response times to optimize performance.",
                  },
                  {
                    icon: Shield,
                    title: "SSL Monitoring",
                    desc: "Monitor SSL certificates and get alerts before they expire.",
                  },
                  {
                    icon: CheckCircle,
                    title: "Status Pages",
                    desc: "Create public status pages to keep your users informed.",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="group bg-black/70 p-6 rounded-xl border border-white/10 transition-all duration-500 hover:border-gold-500/50 feature-item"
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      const x = e.clientX - rect.left
                      const y = e.clientY - rect.top
                      e.currentTarget.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(212, 175, 55, 0.1) 0%, rgba(0, 0, 0, 0.7) 70%)`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(0, 0, 0, 0.7)"
                    }}
                  >
                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4 border border-gold-500/30 group-hover:border-gold-500 transition-colors duration-300">
                      <feature.icon className="text-gold-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-gold-500 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 group-hover:text-white/80 transition-colors duration-300">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section
            ref={(el) => (sectionsRef.current[3] = el)}
            className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto animate-section"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 section-title">
              Trusted by <span className="text-gold-500">Industry Leaders</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-black/70 p-8 rounded-xl border border-white/10 transition-all duration-500 hover:border-gold-500/50 testimonial-item"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    const y = e.clientY - rect.top
                    e.currentTarget.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(212, 175, 55, 0.1) 0%, rgba(0, 0, 0, 0.7) 70%)`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(0, 0, 0, 0.7)"
                  }}
                >
                  <div className="mb-6">
                    <Star className="h-6 w-6 text-gold-500 inline-block" />
                    <Star className="h-6 w-6 text-gold-500 inline-block" />
                    <Star className="h-6 w-6 text-gold-500 inline-block" />
                    <Star className="h-6 w-6 text-gold-500 inline-block" />
                    <Star className="h-6 w-6 text-gold-500 inline-block" />
                  </div>
                  <blockquote className="text-lg italic text-white/80 mb-6">"{testimonial.quote}"</blockquote>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full border border-gold-500/50 mr-4"
                    />
                    <div>
                      <p className="font-semibold text-white">{testimonial.author}</p>
                      <p className="text-white/60 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section
            ref={(el) => (sectionsRef.current[4] = el)}
            className="py-20 px-4 md:px-6 lg:px-8 max-w-4xl mx-auto animate-section"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 section-title">
              Frequently <span className="text-gold-500">Asked</span> Questions
            </h2>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-black/70 border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-gold-500/30 faq-item"
                >
                  <button
                    className="w-full px-6 py-4 flex justify-between items-center text-left"
                    onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                  >
                    <h3 className="text-lg font-medium">{faq.question}</h3>
                    <ChevronDown
                      className={`h-5 w-5 text-gold-500 transition-transform duration-300 ${
                        activeAccordion === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ${
                      activeAccordion === index ? "max-h-40 pb-6" : "max-h-0"
                    }`}
                  >
                    <p className="text-white/70">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing Section */}
          <section
            ref={(el) => (sectionsRef.current[5] = el)}
            className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto animate-section"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 section-title">
              Simple, <span className="text-gold-500">Transparent</span> Pricing
            </h2>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              style={{
                transform: `perspective(1000px) rotateY(${Math.min(5, Math.max(-5, (scrollY - 2100) * 0.01))}deg)`,
              }}
            >
              {[
                {
                  title: "Starter",
                  price: "$19",
                  desc: "Perfect for small websites and personal projects.",
                  features: ["5 monitors", "1-minute checks", "Email alerts"],
                  popular: false,
                },
                {
                  title: "Pro",
                  price: "$49",
                  desc: "For growing businesses with multiple websites.",
                  features: ["20 monitors", "30-second checks", "SMS + Email alerts", "Public status page"],
                  popular: true,
                },
                {
                  title: "Enterprise",
                  price: "$149",
                  desc: "For large organizations with advanced needs.",
                  features: [
                    "Unlimited monitors",
                    "10-second checks",
                    "All alert channels",
                    "Custom branding",
                    "API access",
                  ],
                  popular: false,
                },
              ].map((plan, index) => (
                <div
                  key={index}
                  className={`group bg-black/70 p-8 rounded-xl border ${plan.popular ? "border-gold-500" : "border-white/10"} relative transition-all duration-500 hover:border-gold-500/70 pricing-item`}
                  style={{
                    zIndex: plan.popular ? 10 : 5,
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    const y = e.clientY - rect.top
                    e.currentTarget.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(212, 175, 55, 0.1) 0%, rgba(0, 0, 0, 0.7) 70%)`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(0, 0, 0, 0.7)"
                  }}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-gold-500 text-black px-3 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
                      Popular
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-gold-500 transition-colors duration-300">
                    {plan.title}
                  </h3>
                  <p className="text-4xl font-bold mb-4 text-white">
                    {plan.price}
                    <span className="text-lg text-white/40">/mo</span>
                  </p>
                  <p className="text-white/60 mb-6">{plan.desc}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center feature-list-item">
                        <CheckCircle className="text-gold-500 mr-2 h-5 w-5" />
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.title === "Enterprise" ? "/contact" : "/signup"}
                    className={`block w-full py-3 rounded-lg text-center font-medium transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-gold-500/20 to-transparent border border-gold-500 text-white hover:from-gold-500/30"
                        : "bg-black border border-white/20 text-white hover:border-gold-500/50 hover:text-gold-500"
                    }`}
                  >
                    {plan.title === "Enterprise" ? "Contact Sales" : "Get Started"}
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section
            ref={(el) => (sectionsRef.current[6] = el)}
            className="py-20 px-4 md:px-6 lg:px-8 max-w-5xl mx-auto text-center animate-section"
          >
            <div className="relative p-12 rounded-2xl border border-white/10 overflow-hidden cta-container">
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-gold-500"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      opacity: 0.2 + Math.random() * 0.3,
                      animation: `float ${5 + Math.random() * 15}s linear infinite`,
                      animationDelay: `${Math.random() * 5}s`,
                    }}
                  ></div>
                ))}
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 cta-title">
                  Ready to ensure your services <span className="text-gold-500">never go down</span> unnoticed?
                </h2>
                <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto cta-text">
                  Join thousands of companies that trust our uptime monitoring service to keep their systems running
                  smoothly.
                </p>
                <Link
                  href="/signup"
                  className="group relative inline-flex items-center px-8 py-3 rounded-lg bg-black border border-gold-500 text-white font-medium overflow-hidden cta-button"
                >
                  <span className="relative z-10 group-hover:text-gold-500 transition-colors duration-300">
                    Start Your Free Trial
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-gold-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer
          className="bg-black py-12 px-4 md:px-6 lg:px-8 border-t border-white/10"
          ref={(el) => (sectionsRef.current[7] = el)}
        >
          <div
            className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 footer-content"
            style={{
              transform: `translateY(${Math.min(0, 50 - (scrollY - 2800) * 0.1)}px)`,
              opacity: Math.min(1, Math.max(0, (scrollY - 2800) * 0.003)),
            }}
          >
            <div>
              <h3 className="text-xl font-bold mb-4">
                Up<span className="text-gold-500">time</span> Monitor
              </h3>
              <p className="text-white/60">
                Reliable monitoring for websites and services. Get alerted when your systems go down.
              </p>
              <div className="flex items-center mt-6 space-x-4">
                {["twitter", "facebook", "linkedin", "github"].map((social) => (
                  <a
                    key={social}
                    href={`https://${social}.com`}
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-gold-500 transition-colors"
                    aria-label={`Follow us on ${social}`}
                  >
                    <span className="text-white/70 hover:text-gold-500 transition-colors">
                      {social[0].toUpperCase()}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Documentation", "Status"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Contact"],
              },
              {
                title: "Legal",
                links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
              },
            ].map((section, index) => (
              <div key={index}>
                <h4 className="text-lg font-medium mb-4 text-gold-500">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li
                      key={i}
                      className="footer-link"
                      style={{
                        transitionDelay: `${index * 100 + i * 50}ms`,
                      }}
                    >
                      <Link
                        href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-white/60 hover:text-gold-500 transition-colors duration-300"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-white/40">
            <p>© {new Date().getFullYear()} Uptime Monitor. All rights reserved.</p>
          </div>
        </footer>
      </AppBar>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-10px) translateX(10px);
          }
          50% {
            transform: translateY(0) translateX(20px);
          }
          75% {
            transform: translateY(10px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(212, 175, 55, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(212, 175, 55, 0);
          }
        }
        
        /* Custom gold color */
        :root {
          --color-gold-500: #D4AF37;
        }
        
        .text-gold-500 {
          color: var(--color-gold-500);
        }
        
        .bg-gold-500 {
          background-color: var(--color-gold-500);
        }
        
        .border-gold-500 {
          border-color: var(--color-gold-500);
        }
        
        .from-gold-500 {
          --tw-gradient-from: var(--color-gold-500);
        }
        
        .to-gold-500 {
          --tw-gradient-to: var(--color-gold-500);
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Section animations */
        .animate-section {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67), 
                      transform 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67);
          will-change: opacity, transform;
        }
        
        .animate-section.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Staggered animations for children */
        .stat-item, .feature-item, .pricing-item, .footer-link, .feature-list-item, 
        .testimonial-item, .faq-item, .how-it-works-item {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
          will-change: opacity, transform;
        }
        
        .in-view .stat-item, .in-view .feature-item, .in-view .pricing-item, 
        .in-view .footer-link, .in-view .feature-list-item, .in-view .testimonial-item,
        .in-view .faq-item, .in-view .how-it-works-item {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Apply staggered delays to children */
        .in-view .stat-item:nth-child(1),
        .in-view .feature-item:nth-child(1),
        .in-view .pricing-item:nth-child(1),
        .in-view .testimonial-item:nth-child(1),
        .in-view .how-it-works-item:nth-child(1) {
          transition-delay: 0.1s;
        }
        
        .in-view .stat-item:nth-child(2),
        .in-view .feature-item:nth-child(2),
        .in-view .pricing-item:nth-child(2),
        .in-view .testimonial-item:nth-child(2),
        .in-view .how-it-works-item:nth-child(2) {
          transition-delay: 0.2s;
        }
        
        .in-view .stat-item:nth-child(3),
        .in-view .feature-item:nth-child(3),
        .in-view .pricing-item:nth-child(3),
        .in-view .testimonial-item:nth-child(3),
        .in-view .how-it-works-item:nth-child(3) {
          transition-delay: 0.3s;
        }
        
        .in-view .stat-item:nth-child(4),
        .in-view .feature-item:nth-child(4),
        .in-view .how-it-works-item:nth-child(4) {
          transition-delay: 0.4s;
        }
        
        /* Title animations */
        .section-title, .cta-title {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
          will-change: opacity, transform;
        }
        
        .in-view .section-title, .in-view .cta-title {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* CTA container animation */
        .cta-container {
          opacity: 0;
          transform: scale(0.95);
          transition: opacity 1s ease-out, transform 1s ease-out;
          will-change: opacity, transform;
        }
        
        .in-view .cta-container {
          opacity: 1;
          transform: scale(1);
        }
        
        /* Hero animations */
        .animate-title {
          opacity: 0;
          animation: fadeInUp 1s ease-out forwards;
          animation-delay: 0.2s;
        }
        
        .animate-buttons {
          opacity: 0;
          animation: fadeInUp 1s ease-out forwards;
          animation-delay: 0.5s;
        }
        
        .animate-stats {
          opacity: 0;
          animation: fadeInUp 1s ease-out forwards;
          animation-delay: 0.8s;
        }
        
        /* Footer content animation */
        .footer-content {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
          will-change: opacity, transform;
        }
        
        .in-view .footer-content {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* FAQ accordion animation */
        .faq-item {
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        /* Mobile menu animation */
        @media (max-width: 768px) {
          .animate-section {
            transform: translateY(10px);
          }
        }
      `}</style>
    </div>
  )
}
