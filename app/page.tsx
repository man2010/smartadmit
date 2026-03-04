"use client"

import { Navbar } from "@/components/shared/navbar"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Impact } from "@/components/landing/impact"
import { Pricing } from "@/components/landing/pricing"
import { Testimonials } from "@/components/landing/testimonials"
import { CTASection, Footer } from "@/components/landing/footer"
import { ToastContainer } from "@/components/shared/toast-container"

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Impact />
        <Pricing />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
      <ToastContainer />
    </>
  )
}
