import { motion } from 'framer-motion'
import {
  Calendar,
  CheckCircle,
  CurrencyDollar,
  Medal,
  ShieldCheck,
  Sparkle,
  Users,
} from '@phosphor-icons/react'

export const WhyChooseSection = () => (
  <section data-page="about" className="py-20 bg-muted/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight" style={{ letterSpacing: '-0.01em' }}>
          Why Choose Medina Precision Painting
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We're committed to delivering outstanding results and exceptional customer service on every project.
        </p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
        {[
          { icon: Medal, title: '5 Years Experience', desc: 'Proven expertise across commercial, residential, and industrial projects' },
          { icon: Users, title: 'Expert Craftsmanship', desc: 'Meticulous attention to detail on every surface type' },
          { icon: ShieldCheck, title: 'Fully Insured', desc: '$2M liability coverage and workers compensation' },
          { icon: CurrencyDollar, title: 'Honest Pricing', desc: 'Detailed estimates with no hidden fees or surprises' },
          { icon: Sparkle, title: 'Quality Materials', desc: 'Expert selection of the perfect paints and primers for your project' },
          { icon: Calendar, title: 'Flexible Service', desc: 'Serving all of Georgia with professional painting solutions' },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center text-center gap-3"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <item.icon size={28} weight="duotone" className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
      >
        {[
          'Expert on drywall, wood, siding, metal, masonry, and cabinets',
          'Comprehensive knowledge of paints and primers',
          'Perfect product selection for each project',
          'High-end residential painting experience',
          'Commercial and industrial project expertise',
          'Professional service throughout Georgia',
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3"
          >
            <CheckCircle size={24} weight="fill" className="text-primary shrink-0 mt-0.5" />
            <span className="text-foreground">{item}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
)
