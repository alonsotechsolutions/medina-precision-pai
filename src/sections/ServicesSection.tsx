import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { CaretLeft, CaretRight, CheckCircle } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useIsMobile } from '@/hooks/use-mobile'
import { services } from '@/data/services'
import { containerVariants, itemVariants } from '@/lib/motion'

export const ServicesSection = () => {
  const isMobile = useIsMobile()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })
  const [index, setIndex] = useState(0)
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  return (
    <section id="services" data-page="home services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight" style={{ letterSpacing: '-0.01em' }}>
            Complete Painting Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From high-end homes to commercial and industrial facilities, Eddie delivers exceptional painting services with expert knowledge of surfaces, paints, and primers.
          </p>
        </motion.div>
        {isMobile ? (
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {services.map((service, i) => (
                  <div key={i} className="flex-[0_0_100%] min-w-0">
                    <Card className="h-full transition-all duration-300 border-border mx-2">
                      <CardHeader>
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                          <service.icon size={28} weight="duotone" className="text-primary" />
                        </div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base leading-relaxed mb-4">
                          {service.description}
                        </CardDescription>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle size={16} weight="fill" className="text-primary shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button variant="outline" size="icon" onClick={scrollPrev} className="rounded-full">
                <CaretLeft size={20} weight="bold" />
              </Button>
              <div className="flex gap-1.5">
                {services.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-primary' : 'w-2 bg-border'}`}
                  />
                ))}
              </div>
              <Button variant="outline" size="icon" onClick={scrollNext} className="rounded-full">
                <CaretRight size={20} weight="bold" />
              </Button>
            </div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-border">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <service.icon size={28} weight="duotone" className="text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed mb-4">
                      {service.description}
                    </CardDescription>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle size={16} weight="fill" className="text-primary shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
