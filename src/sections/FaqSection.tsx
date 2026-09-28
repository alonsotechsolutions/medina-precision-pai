import { motion } from 'framer-motion'
import { Phone } from '@phosphor-icons/react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { faqs } from '@/data/faqs'
import { buildPhoneHref, BUSINESS_PHONE_DISPLAY } from '@/lib/site'

export const FaqSection = () => (
  <section id="faq" data-page="services" className="py-20 bg-background">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight" style={{ letterSpacing: '-0.01em' }}>
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-muted-foreground">
          Everything you need to know before scheduling your project.
        </p>
      </motion.div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger className="text-left text-base sm:text-lg font-semibold">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="text-center mt-8">
        <p className="text-muted-foreground mb-3">Don't see your question?</p>
        <a href={buildPhoneHref()}>
          <Button variant="outline">
            <Phone size={18} className="mr-2" />
            Call {BUSINESS_PHONE_DISPLAY}
          </Button>
        </a>
      </div>
    </div>
  </section>
)
