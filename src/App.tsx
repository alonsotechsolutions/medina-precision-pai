import { useEffect, useState } from 'react'
import { House, PhoneCall } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { faqs } from '@/data/faqs'
import { injectFaqJsonLd } from '@/lib/seo'
import { useHashRoute } from '@/hooks/use-hash-route'
import { usePageMeta } from '@/hooks/use-page-meta'
import { QuoteFormProvider } from '@/contexts/QuoteFormContext'
import { NewsletterProvider } from '@/contexts/NewsletterContext'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingCTA } from '@/components/layout/FloatingCTA'
import { QuoteFormDialog } from '@/components/forms/QuoteFormDialog'
import { AdminPanel } from '@/components/admin/AdminPanel'
import { PrintablePalette } from '@/components/palettes/PrintablePalette'
import { HeroSection } from '@/sections/HeroSection'
import { StatsSection } from '@/sections/StatsSection'
import { ServicesSection } from '@/sections/ServicesSection'
import { GallerySection } from '@/sections/GallerySection'
import { TestimonialsSection } from '@/sections/TestimonialsSection'
import { WhyChooseSection } from '@/sections/WhyChooseSection'
import { AboutSection } from '@/sections/AboutSection'
import { ProcessSection } from '@/sections/ProcessSection'
import { EstimatorSection } from '@/sections/EstimatorSection'
import { PaletteSection } from '@/sections/PaletteSection'
import { WarrantySection } from '@/sections/WarrantySection'
import { FaqSection } from '@/sections/FaqSection'
import { ServiceAreasSection } from '@/sections/ServiceAreasSection'
import { CtaBannerSection } from '@/sections/CtaBannerSection'
import { ContactSection } from '@/sections/ContactSection'
import { buildPhoneHref, BUSINESS_PHONE_DISPLAY } from '@/lib/site'

declare global {
  interface Window {
    spark?: { user?: () => Promise<{ isOwner: boolean } | null> }
  }
}

function AppContent() {
  const { page: currentPage, printSlug, notFound } = useHashRoute()
  usePageMeta(currentPage)
  const [showFloatingCTA, setShowFloatingCTA] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)

  useEffect(() => injectFaqJsonLd(faqs), [])

  useEffect(() => {
    const handleScroll = () => setShowFloatingCTA(window.scrollY > 800)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const checkOwner = async () => {
      try {
        if (!window.spark?.user) return
        const user = await window.spark.user()
        if (user) setIsOwner(user.isOwner)
      } catch {
        // Non-Spark hosts (like GitHub Pages) do not expose this API.
      }
    }
    checkOwner()
  }, [])

  if (printSlug) return <PrintablePalette slug={printSlug} />

  return (
    <div className="min-h-screen bg-background" data-current-page={currentPage}>
      <style>{`[data-page]:not([data-page~="${currentPage}"]){display:none !important;}`}</style>
      <Header
        currentPage={currentPage}
        isOwner={isOwner}
        onOpenAdminPanel={() => setShowAdminPanel(true)}
      />
      <FloatingCTA visible={showFloatingCTA} />
      <main id="main-content" className="pt-44 md:pt-36 text-lg">
        {notFound ? (
          <section className="py-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Page not found</p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight">We couldn&apos;t find that page.</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Please head back to the homepage or call us for help planning your painting project.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg">
                  <a href="#/">
                    <House size={20} />
                    Back to Home
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={buildPhoneHref()}>
                    <PhoneCall size={20} />
                    {BUSINESS_PHONE_DISPLAY}
                  </a>
                </Button>
              </div>
            </div>
          </section>
        ) : (
          <>
            <HeroSection />
            <StatsSection />
            <ServicesSection />
            <GallerySection />
            <TestimonialsSection />
            <WhyChooseSection />
            <AboutSection />
            <ProcessSection />
            <EstimatorSection />
            <PaletteSection />
            <WarrantySection />
            <FaqSection />
            <ServiceAreasSection />
            <CtaBannerSection />
            <ContactSection />
          </>
        )}
      </main>
      <QuoteFormDialog />
      {isOwner && <AdminPanel open={showAdminPanel} onOpenChange={setShowAdminPanel} />}
      <Footer />
    </div>
  )
}

function App() {
  return (
    <QuoteFormProvider>
      <NewsletterProvider>
        <AppContent />
      </NewsletterProvider>
    </QuoteFormProvider>
  )
}

export default App
