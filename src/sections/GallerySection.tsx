import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import { galleryImages } from '@/data/gallery'

export const GallerySection = () => {
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
    <section id="gallery" data-page="home gallery" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight" style={{ letterSpacing: '-0.01em' }}>
            Recent Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See the quality and attention to detail that goes into every Medina Precision Painting project.
          </p>
        </motion.div>
        {isMobile ? (
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {galleryImages.map((image, i) => (
                  <div key={i} className="flex-[0_0_100%] min-w-0">
                    <div className="group relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-border mx-2">
                      <img
                        src={image.image}
                        alt={image.title}
                        width={800}
                        height={600}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent flex flex-col items-center justify-end p-6 text-center">
                        <h3 className="text-lg font-semibold text-background mb-2">{image.title}</h3>
                        <Badge variant="secondary">{image.category}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button variant="outline" size="icon" onClick={scrollPrev} className="rounded-full">
                <CaretLeft size={20} weight="bold" />
              </Button>
              <div className="flex gap-1.5">
                {galleryImages.map((_, i) => (
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-border hover:border-primary transition-all duration-300"
              >
                <img
                  src={image.image}
                  alt={image.title}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-6 text-center">
                  <h3 className="text-lg font-semibold text-background mb-2">{image.title}</h3>
                  <Badge variant="secondary">{image.category}</Badge>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
