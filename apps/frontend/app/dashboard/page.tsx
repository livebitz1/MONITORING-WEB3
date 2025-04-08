"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ArrowRight, Check, ChevronDown, ChevronUp, Clock, Globe, Server, X, Plus } from "lucide-react"
import Link from "next/link"

// Website type definition
type Website = {
  id: number
  name: string
  url: string
  status: "up" | "down"
  uptime: string
  responseTime: string
  lastChecked: string
  uptimeTicks: ("up" | "down")[]
}

// Sample data for the websites
const initialWebsites: Website[] = [
  {
    id: 1,
    name: "Main Website",
    url: "example.com",
    status: "up",
    uptime: "99.98%",
    responseTime: "187ms",
    lastChecked: "2 minutes ago",
    uptimeTicks: Array(30)
      .fill(null)
      .map(() => (Math.random() > 0.1 ? "up" : "down")),
  },
  {
    id: 2,
    name: "API Service",
    url: "api.example.com",
    status: "up",
    uptime: "99.95%",
    responseTime: "210ms",
    lastChecked: "1 minute ago",
    uptimeTicks: Array(30)
      .fill(null)
      .map(() => (Math.random() > 0.05 ? "up" : "down")),
  },
  {
    id: 3,
    name: "Documentation",
    url: "docs.example.com",
    status: "down",
    uptime: "98.72%",
    responseTime: "0ms",
    lastChecked: "3 minutes ago",
    uptimeTicks: Array(30)
      .fill(null)
      .map(() => (Math.random() > 0.3 ? "up" : "down")),
  },
  {
    id: 4,
    name: "Customer Portal",
    url: "portal.example.com",
    status: "up",
    uptime: "99.99%",
    responseTime: "156ms",
    lastChecked: "just now",
    uptimeTicks: Array(30)
      .fill(null)
      .map(() => (Math.random() > 0.02 ? "up" : "down")),
  },
]

export default function UptimeDashboard() {
  const [expandedWebsite, setExpandedWebsite] = useState<number | null>(null)
  const [websites, setWebsites] = useState<Website[]>(initialWebsites)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newWebsiteUrl, setNewWebsiteUrl] = useState("")
  const [newWebsiteName, setNewWebsiteName] = useState("")
  const [urlError, setUrlError] = useState("")
  const modalRef = useRef<HTMLDivElement>(null)

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false)
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isModalOpen])

  // Handle ESC key to close modal
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsModalOpen(false)
      }
    }

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isModalOpen])

  const toggleWebsite = (id: number) => {
    setExpandedWebsite(expandedWebsite === id ? null : id)
  }

  const openModal = () => {
    setIsModalOpen(true)
    setNewWebsiteUrl("")
    setNewWebsiteName("")
    setUrlError("")
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const validateUrl = (url: string) => {
    // Basic URL validation - check if it's not empty and has a valid format
    if (!url.trim()) {
      return "URL is required"
    }

    // Remove http:// or https:// for simplicity in validation
    const cleanUrl = url.replace(/^https?:\/\//, "")

    // Check if URL already exists
    if (websites.some((website) => website.url.replace(/^https?:\/\//, "") === cleanUrl)) {
      return "This website is already being monitored"
    }

    // Basic domain format validation
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/
    if (!domainRegex.test(cleanUrl) && !domainRegex.test(`${cleanUrl}.com`)) {
      return "Please enter a valid URL"
    }

    return ""
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setNewWebsiteUrl(url)

    // If URL field is not empty and name is empty, try to extract a name from the URL
    if (url && !newWebsiteName) {
      const cleanUrl = url.replace(/^https?:\/\//, "")
      const domainParts = cleanUrl.split(".")

      // If it's a subdomain, use that as the name
      if (domainParts.length > 2) {
        setNewWebsiteName(domainParts[0].charAt(0).toUpperCase() + domainParts[0].slice(1))
      } else if (domainParts.length === 2) {
        // Otherwise use the domain name
        setNewWebsiteName(domainParts[0].charAt(0).toUpperCase() + domainParts[0].slice(1))
      }
    }

    // Clear error when typing
    if (urlError) {
      setUrlError("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate URL
    const error = validateUrl(newWebsiteUrl)
    if (error) {
      setUrlError(error)
      return
    }

    // Clean URL (remove http:// or https:// for consistency)
    const cleanUrl = newWebsiteUrl.replace(/^https?:\/\//, "")

    // Create new website object
    const newWebsite: Website = {
      id: Math.max(0, ...websites.map((w) => w.id)) + 1,
      name: newWebsiteName || cleanUrl,
      url: cleanUrl,
      status: Math.random() > 0.1 ? "up" : "down", // Randomly set status for demo
      uptime: "100.00%", // New website starts with perfect uptime
      responseTime: `${Math.floor(Math.random() * 300)}ms`, // Random response time for demo
      lastChecked: "just now",
      uptimeTicks: Array(30).fill("up"), // Start with all up ticks
    }

    // Add new website to list
    setWebsites([...websites, newWebsite])

    // Close modal
    closeModal()
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-900 text-gray-100">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-slate-700 bg-slate-800 px-6">
        <div className="flex items-center gap-2 font-semibold">
          <Server className="h-5 w-5 text-green-400" />
          <span>Uptime Monitor</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="px-3 py-2 text-gray-100 hover:text-white">
            Dashboard
          </Link>
          <Link href="#" className="px-3 py-2 text-gray-400 hover:text-white">
            Alerts
          </Link>
          <Link href="#" className="px-3 py-2 text-gray-400 hover:text-white">
            Settings
          </Link>
        </nav>
      </header>
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Websites</h1>
            <button
              className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 transition-colors flex items-center gap-2"
              onClick={openModal}
            >
              <Plus className="h-4 w-4" />
              Add Website
            </button>
          </div>
          <div className="grid gap-6">
            {websites.map((website) => (
              <div key={website.id} className="overflow-hidden rounded-lg bg-slate-800 border border-slate-700">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${website.status === "up" ? "bg-green-400" : "bg-red-400"}`}
                      />
                      <h2 className="text-xl font-semibold text-white">{website.name}</h2>
                    </div>
                    <div
                      className={`ml-auto mr-4 rounded-full px-3 py-1 text-xs font-medium ${
                        website.status === "up" ? "border border-green-400 text-green-400" : "bg-red-400 text-slate-900"
                      }`}
                    >
                      {website.status === "up" ? "Operational" : "Down"}
                    </div>
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-sm text-gray-400">
                    <Globe className="h-3 w-3" />
                    {website.url}
                  </div>
                </div>
                <div className="border-t border-slate-700">
                  <div className="px-4 sm:px-6 py-2 flex justify-between items-center">
                    <div className="flex gap-6">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-400">Response: {website.responseTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-400">Uptime: {website.uptime}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleWebsite(website.id)}
                      className="flex items-center justify-center p-2 text-gray-400 hover:text-white transition-colors"
                      aria-expanded={expandedWebsite === website.id}
                    >
                      {expandedWebsite === website.id ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                      <span className="sr-only">Toggle</span>
                    </button>
                  </div>
                  {expandedWebsite === website.id && (
                    <div className="px-4 sm:px-6 pb-4 pt-2 space-y-4 bg-slate-850 bg-opacity-50">
                      <div>
                        <h3 className="text-sm font-medium mb-2 text-gray-300">Last 30 minutes uptime</h3>
                        <div className="flex gap-1 h-8 items-center">
                          {website.uptimeTicks.map((tick, index) => (
                            <div
                              key={index}
                              className={`h-6 w-2 rounded-sm ${tick === "up" ? "bg-green-400" : "bg-red-400"}`}
                              title={`${index + 1} minute(s) ago: ${tick === "up" ? "Operational" : "Down"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-400">
                        <span>Last checked: {website.lastChecked}</span>
                        <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
                          View details <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="border-t border-slate-700 py-4 px-6 bg-slate-800">
        <div className="mx-auto max-w-6xl flex justify-between items-center">
          <p className="text-sm text-gray-400">© 2025 Uptime Monitor. All rights reserved.</p>
          <p className="text-sm text-gray-400">Last updated: Just now</p>
        </div>
      </footer>

      {/* Add Website Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div ref={modalRef} className="bg-slate-800 rounded-lg shadow-lg max-w-md w-full border border-slate-700">
            <div className="flex justify-between items-center p-4 border-b border-slate-700">
              <h2 className="text-xl font-semibold text-white">Add Website</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="website-url" className="block text-sm font-medium text-gray-300 mb-1">
                    Website URL <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="website-url"
                    placeholder="example.com"
                    value={newWebsiteUrl}
                    onChange={handleUrlChange}
                    className={`w-full px-3 py-2 bg-slate-700 border ${
                      urlError ? "border-red-400" : "border-slate-600"
                    } rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500`}
                    required
                  />
                  {urlError && <p className="mt-1 text-sm text-red-400">{urlError}</p>}
                </div>
                <div>
                  <label htmlFor="website-name" className="block text-sm font-medium text-gray-300 mb-1">
                    Website Name <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="website-name"
                    placeholder="My Website"
                    value={newWebsiteName}
                    onChange={(e) => setNewWebsiteName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <p className="mt-1 text-xs text-gray-400">Leave empty to use the domain name</p>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-slate-600 rounded-md text-gray-300 hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 rounded-md text-white hover:bg-green-600 transition-colors"
                >
                  Add Website
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
