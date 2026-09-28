import { motion } from 'framer-motion'
import { Clock, EnvelopeSimple, MapPin, Phone } from '@phosphor-icons/react'
import { buildMailtoHref, buildPhoneHref, BUSINESS_EMAIL, BUSINESS_PHONE_DISPLAY } from '@/lib/site'

export const ContactSection = () => (
  <section id="contact" data-page="home contact" className="py-20 bg-background">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight" style={{ letterSpacing: '-0.01em' }}>
          Get In Touch
        </h2>
        <p className="text-lg text-muted-foreground">
          We're here to answer your questions and discuss your painting project.
        </p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Phone size={28} weight="duotone" className="text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Phone</h3>
          <a href={buildPhoneHref()} className="text-muted-foreground hover:text-primary transition-colors">
            {BUSINESS_PHONE_DISPLAY}
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <EnvelopeSimple size={28} weight="duotone" className="text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Email</h3>
          <a href={buildMailtoHref()} className="text-muted-foreground hover:text-primary transition-colors break-all">
            {BUSINESS_EMAIL}
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <MapPin size={28} weight="duotone" className="text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Service Area</h3>
          <p className="text-muted-foreground">
            Warner Robins<br />&amp; All of Georgia
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Clock size={28} weight="duotone" className="text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Business Hours</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Mon–Fri: 7:00am – 6:00pm<br />
            Saturday: 8:00am – 4:00pm<br />
            Sunday: By appointment
          </p>
        </motion.div>
      </div>
    </div>
  </section>
)
