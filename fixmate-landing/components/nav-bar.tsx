"use client"

import { useState , useEffect } from "react"
import Link from "next/link"
import { Wrench, Menu ,User } from "lucide-react"

import { Button } from "@/components/ui/button" 
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import axios from "axios"
export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isConnected , setIsConnected] = useState(false) 
   const checkAuth = async(token : string)=>{ 
    try {
      const response = await axios(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }) ;
      setIsConnected(true)
    } catch (error) {
      setIsConnected(false)
    }
  }
  useEffect( () => {
    const token = localStorage.getItem("token") 
    
    if (!token) {
      // window.location.href = "/login"
      setIsConnected(false)
    }else{
      checkAuth(token);
    }
  })
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">BrickHole</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/jobs" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Jobs
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">
            How It Works
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-blue-600 transition-colors">
            About Us
          </Link>
        </nav>
    {
      isConnected ? 
            <div className="hidden md:flex items-center gap-4">
            <User/>
          </div> : <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Login
          </Link>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/register">Sign Up</Link>
          </Button>
        </div> 
        
    }

        {/* Mobile menu */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col gap-6 py-6">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                <Wrench className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold">BrickHole</span>
              </Link>

              <nav className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-lg font-medium hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/jobs"
                  className="text-lg font-medium hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Jobs
                </Link>
                <Link
                  href="#"
                  className="text-lg font-medium hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link
                  href="#"
                  className="text-lg font-medium hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
              </nav>

              <div className="flex flex-col gap-2 mt-4"> 
                {
                  isConnected ? 
                  <div className="flex items-center gap-4">
                    <User/>
                  </div> : <>
                   <Button
                  asChild
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setIsMenuOpen(false)}>
                  <Link href="/register">Sign Up</Link>
                </Button>
                  </>
                }
               
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
