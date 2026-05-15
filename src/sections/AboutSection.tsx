import { motion } from 'framer-motion'
import { PaintBrush } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'

export const AboutSection = () => (
  <section id="about" data-page="about" className="py-20 bg-background">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight" style={{ letterSpacing: '-0.01em' }}>
            About Medina Precision Painting
          </h2>
          <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
            Led by Eddie Medina, Medina Precision Painting brings 5 years of professional painting expertise to homeowners and businesses throughout Georgia. Eddie has successfully completed commercial, residential, and industrial projects, including high-end luxury homes across the state.
          </p>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            With expert knowledge of multiple surface types—including drywall, wood, siding, metal, masonry, and cabinets—Eddie ensures a flawless finish every time. His comprehensive understanding of paints and primers allows him to select the perfect products for each unique project, guaranteeing lasting results that exceed expectations.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">5 Years Experience</Badge>
            <Badge variant="secondary">Fully Licensed & Insured</Badge>
            <Badge variant="secondary">$2M Liability Insurance</Badge>
            <Badge variant="secondary">Multi-Surface Expert</Badge>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-2 border-border">
            <PaintBrush size={120} weight="duotone" className="text-primary/30" />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
)
