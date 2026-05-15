import { motion } from 'framer-motion'
import { Calendar } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { useQuoteForm } from '@/contexts/QuoteFormContext'

export const CtaBannerSection = () => {
  const { openQuoteForm } = useQuoteForm()
  return (
    <section data-page="home services gallery about contact" className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, currentColor 1deg, transparent 2deg, transparent 60deg)`,
      }}></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight" style={{ letterSpacing: '-0.01em' }}>
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Get your free, no-obligation estimate today. We'll visit your property, discuss your vision, and provide a detailed quote with transparent pricing.
          </p>
          <Button
            size="lg"
            onClick={() => openQuoteForm()}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Calendar size={20} className="mr-2" />
            Schedule Free Estimate
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
