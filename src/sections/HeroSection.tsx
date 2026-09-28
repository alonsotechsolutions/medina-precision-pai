import { motion } from 'framer-motion'
import { Calendar, Medal, Phone, ShieldCheck, Sparkle } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { useQuoteForm } from '@/contexts/QuoteFormContext'
import { buildPhoneHref, BUSINESS_PHONE_DISPLAY } from '@/lib/site'

export const HeroSection = () => {
  const { openQuoteForm } = useQuoteForm()
  return (
    <section data-page="home" className="relative py-24 sm:py-32 bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, currentColor 35px, currentColor 36px)`,
      }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-primary-foreground"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
            Transform Your Space with<br />Precision & Care
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
            Family-owned painting business serving Warner Robins and Central Georgia. Professional craftsmanship by Eddie Medina with 5 years of expertise across commercial, residential, and industrial projects. Honest pricing and outstanding results guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => openQuoteForm()}
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8"
            >
              <Calendar size={24} className="mr-2" />
              Get Free Estimate
            </Button>
            <a href={buildPhoneHref()}>
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <Phone size={24} className="mr-2" />
                {BUSINESS_PHONE_DISPLAY}
              </Button>
            </a>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
            {[
              { icon: ShieldCheck, text: 'Fully Licensed & Insured' },
              { icon: Medal, text: '5 Years Experience' },
              { icon: Sparkle, text: '2-Year Warranty' },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-2 bg-background/10 backdrop-blur-sm rounded-full px-4 py-2"
              >
                <benefit.icon size={20} weight="duotone" className="text-primary-foreground" />
                <span className="text-sm font-semibold text-primary-foreground">{benefit.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
