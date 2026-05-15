import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { serviceAreas } from '@/data/serviceAreas'

export const ServiceAreasSection = () => (
  <section data-page="contact" className="py-16 bg-muted/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Serving All of Georgia
        </h2>
        <p className="text-muted-foreground mb-6">
          Proudly providing professional painting services throughout Georgia, with a home base in Warner Robins
        </p>
      </motion.div>
      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        {serviceAreas.map((area, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <Badge variant="outline" className="text-sm px-4 py-2">
              {area}
            </Badge>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)
