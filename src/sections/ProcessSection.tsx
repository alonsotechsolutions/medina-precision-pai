import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { processSteps } from '@/data/process'

export const ProcessSection = () => (
  <section id="process" data-page="services" className="py-20 bg-background">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight" style={{ letterSpacing: '-0.01em' }}>
          Our Process — Stress-Free, Start to Finish
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Five simple steps from your first call to a perfect finished space.
        </p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {processSteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <Card className="h-full text-center">
              <CardHeader>
                <div className="relative w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3">
                  <step.icon size={26} weight="duotone" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {step.desc}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)
