import { motion } from 'framer-motion'
import { stats } from '@/data/stats'

export const StatsSection = () => (
  <section data-page="home" className="py-12 bg-muted/30 border-y border-border">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <stat.icon size={26} weight="duotone" className="text-primary" />
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)
