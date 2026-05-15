import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { CaretLeft, CaretRight, Quotes, Star } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useIsMobile } from '@/hooks/use-mobile'
import { testimonials } from '@/data/testimonials'

export const TestimonialsSection = () => {
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
    <section id="testimonials" data-page="home about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight" style={{ letterSpacing: '-0.01em' }}>
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what Georgia homeowners and businesses say about working with Eddie.
          </p>
        </motion.div>
        {isMobile ? (
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((t, i) => (
                  <div key={i} className="flex-[0_0_100%] min-w-0">
                    <Card className="h-full mx-2">
                      <CardHeader>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(t.rating)].map((_, k) => (
                            <Star key={k} size={18} weight="fill" className="text-accent" />
                          ))}
                        </div>
                        <div className="flex items-start gap-3">
                          <Quotes size={24} weight="duotone" className="text-primary shrink-0" />
                          <div>
                            <CardTitle className="text-lg">{t.name}</CardTitle>
                            <CardDescription>{t.location}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">{t.text}</p>
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
                {testimonials.map((_, i) => (
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
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(t.rating)].map((_, k) => (
                        <Star key={k} size={18} weight="fill" className="text-accent" />
                      ))}
                    </div>
                    <div className="flex items-start gap-3">
                      <Quotes size={24} weight="duotone" className="text-primary shrink-0" />
                      <div>
                        <CardTitle className="text-lg">{t.name}</CardTitle>
                        <CardDescription>{t.location}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{t.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
