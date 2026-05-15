import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { CaretLeft, CaretRight, Lightbulb } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useIsMobile } from '@/hooks/use-mobile'
import { useQuoteForm } from '@/contexts/QuoteFormContext'
import { COLOR_PALETTES } from '@/data/palettes'
import type { ColorPalette } from '@/types/palette'

/** Single palette card — rendered the same way in the grid and the mobile carousel. */
interface PaletteCardProps {
  palette: ColorPalette
  isMobile: boolean
}

const PaletteCard = ({ palette, isMobile }: PaletteCardProps) => {
  const { openQuoteForm } = useQuoteForm()
  // Open a fresh form pre-filled only with the palette info — no leftover
  // state from a previous estimator session.
  const openWithPalette = () => {
    openQuoteForm({
      selectedPalette: palette,
      projectDescription: `Inspired by palette: ${palette.name} (${palette.mood})`,
    })
  }
  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={openWithPalette}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          openWithPalette()
        }
      }}
      aria-label={`Request a free quote inspired by the ${palette.name} palette`}
      className={`overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary${isMobile ? ' mx-2' : ''}`}
    >
      <div className="flex h-32">
        {palette.swatches.map((s, idx) => (
          <div
            key={idx}
            className="flex-1 transition-all duration-300 hover:flex-[1.5]"
            style={{ backgroundColor: s.hex }}
            title={s.hex}
            aria-label={`Color swatch ${s.hex}`}
          />
        ))}
      </div>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-semibold text-lg">{palette.name}</h3>
          <Lightbulb size={20} weight="duotone" className="text-accent shrink-0" />
        </div>
        <p className="text-sm text-muted-foreground mb-3">{palette.mood}</p>
        <div className="flex flex-wrap gap-1.5">
          {palette.swatches.map((s, idx) => (
            <code key={idx} className="text-xs bg-muted px-2 py-0.5 rounded">{s.hex}</code>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          We can color-match this exactly at any paint store.
        </p>
        <p className="text-xs text-primary mt-1 font-medium">
          {isMobile ? 'Tap' : 'Click'} to request a free quote with this palette →
        </p>
      </CardContent>
    </Card>
  )
}

export const PaletteSection = () => {
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
    <section id="palettes" data-page="home" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight" style={{ letterSpacing: '-0.01em' }}>
            Color Inspiration
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse curated palettes to find your style. We'll help you fine-tune the perfect shades during your free color consultation.
          </p>
        </motion.div>

        {isMobile ? (
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {COLOR_PALETTES.map((palette, i) => (
                  <div key={i} className="flex-[0_0_100%] min-w-0">
                    <PaletteCard palette={palette} isMobile />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button variant="outline" size="icon" onClick={scrollPrev} className="rounded-full">
                <CaretLeft size={20} weight="bold" />
              </Button>
              <div className="flex gap-1.5">
                {COLOR_PALETTES.map((_, i) => (
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
            {COLOR_PALETTES.map((palette, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <PaletteCard palette={palette} isMobile={false} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
