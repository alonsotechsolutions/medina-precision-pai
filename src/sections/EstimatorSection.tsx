import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Calendar } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { useQuoteForm } from '@/contexts/QuoteFormContext'
import {
  PROJECT_CONFIG,
  QUALITY_OPTIONS,
  type ProjectConfig,
  type ProjectType,
  type QualityLevel,
} from '@/types/quote'

export const EstimatorSection = () => {
  const { openQuoteForm } = useQuoteForm()
  const [calcProject, setCalcProject] = useState<ProjectType>('interior')
  const [calcQuantity, setCalcQuantity] = useState<number>(PROJECT_CONFIG.interior.defaultValue)
  const [calcRooms, setCalcRooms] = useState<number>(3)
  const [calcQuality, setCalcQuality] = useState<QualityLevel>('premium')

  // When the project type changes, reset the quantity to the default for
  // that project type so the slider doesn't sit outside its new bounds.
  const handleProjectChange = (key: ProjectType) => {
    setCalcProject(key)
    setCalcQuantity(PROJECT_CONFIG[key].defaultValue)
  }

  const estimate = useMemo(() => {
    const cfg = PROJECT_CONFIG[calcProject]
    const qualityMult = cfg.showQuality
      ? (QUALITY_OPTIONS.find(q => q.value === calcQuality)?.multiplier ?? 1)
      : 1
    const roomAdj = cfg.showRooms ? 1 + Math.max(0, calcRooms - 1) * 0.04 : 1
    const center = calcQuantity * cfg.baseRate * qualityMult * roomAdj
    const low = Math.max(150, Math.round((center * 0.85) / 25) * 25)
    const high = Math.max(low + 100, Math.round((center * 1.15) / 25) * 25)
    return { low, high }
  }, [calcProject, calcQuantity, calcRooms, calcQuality])

  const buildEstimatorSummary = (): string => {
    const cfg = PROJECT_CONFIG[calcProject]
    const lines = [
      '--- Instant Estimator Result ---',
      `Project: ${cfg.label}`,
      `${cfg.unitLabel}: ${calcQuantity.toLocaleString()} ${cfg.unitSuffix}`,
    ]
    if (cfg.showRooms) lines.push(`${cfg.roomsLabel}: ${calcRooms}`)
    if (cfg.showQuality) {
      const q = QUALITY_OPTIONS.find(o => o.value === calcQuality)
      lines.push(`Paint Quality: ${q?.label} (${q?.subtitle})`)
    }
    lines.push(`Estimated Range: $${estimate.low.toLocaleString()} – $${estimate.high.toLocaleString()}`)
    return lines.join('\n')
  }

  const handleGetExactPrice = () => {
    openQuoteForm({
      serviceTypes: [calcProject],
      projectDescription: buildEstimatorSummary(),
    })
  }

  return (
    <section id="estimator" data-page="services" className="py-20 bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <Badge variant="secondary" className="mb-3">Free Tool</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight" style={{ letterSpacing: '-0.01em' }}>
            Instant Paint Cost Estimator
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get a ballpark price in seconds. For an exact quote, schedule a free on-site visit — we'll measure everything and confirm your price in writing.
          </p>
        </motion.div>
        <Card>
          <CardContent className="p-6 sm:p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <Label className="mb-3 block">Project Type</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(Object.entries(PROJECT_CONFIG) as [ProjectType, ProjectConfig][]).map(([key, cfg]) => (
                      <Button
                        key={key}
                        type="button"
                        variant={calcProject === key ? 'default' : 'outline'}
                        onClick={() => handleProjectChange(key)}
                        className="w-full text-xs sm:text-sm h-auto py-2 px-2 whitespace-normal"
                      >
                        {cfg.shortLabel}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3 gap-3">
                    <Label htmlFor="calc-quantity">{PROJECT_CONFIG[calcProject].unitLabel}</Label>
                    <span className="font-semibold text-primary shrink-0">
                      {calcQuantity.toLocaleString()} {PROJECT_CONFIG[calcProject].unitSuffix}
                    </span>
                  </div>
                  <Slider
                    id="calc-quantity"
                    value={[calcQuantity]}
                    onValueChange={(v) => setCalcQuantity(v[0])}
                    min={PROJECT_CONFIG[calcProject].sliderMin}
                    max={PROJECT_CONFIG[calcProject].sliderMax}
                    step={PROJECT_CONFIG[calcProject].sliderStep}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {PROJECT_CONFIG[calcProject].tip}
                  </p>
                </div>
                {PROJECT_CONFIG[calcProject].showRooms && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label htmlFor="calc-rooms">{PROJECT_CONFIG[calcProject].roomsLabel}</Label>
                      <span className="font-semibold text-primary">{calcRooms}</span>
                    </div>
                    <Slider
                      id="calc-rooms"
                      value={[calcRooms]}
                      onValueChange={(v) => setCalcRooms(v[0])}
                      min={1}
                      max={15}
                      step={1}
                    />
                  </div>
                )}
                {PROJECT_CONFIG[calcProject].showQuality && (
                  <div>
                    <Label className="mb-3 block">Paint Quality</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {QUALITY_OPTIONS.map(opt => (
                        <Button
                          key={opt.value}
                          type="button"
                          variant={calcQuality === opt.value ? 'default' : 'outline'}
                          onClick={() => setCalcQuality(opt.value)}
                          className="w-full h-auto py-2 px-2 flex flex-col gap-0.5 items-center"
                        >
                          <span className="font-semibold text-sm leading-tight">{opt.label}</span>
                          <span className="text-[10px] opacity-75 leading-tight whitespace-normal text-center">
                            {opt.subtitle}
                          </span>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-primary text-primary-foreground rounded-xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-primary-foreground/80">
                    <Calculator size={20} weight="duotone" />
                    <span className="text-sm uppercase tracking-wide">Estimated Project Cost</span>
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold mb-2">
                    ${estimate.low.toLocaleString()} – ${estimate.high.toLocaleString()}
                  </div>
                  <p className="text-sm text-primary-foreground/80 leading-relaxed mb-6">
                    Starting estimate for <strong>{PROJECT_CONFIG[calcProject].label}</strong>
                    {PROJECT_CONFIG[calcProject].showQuality && <> at <strong>{calcQuality}</strong> grade</>}. Final pricing depends on prep work, surface condition, and specific paint products — confirmed during your free on-site visit.
                  </p>
                </div>
                <Button
                  size="lg"
                  onClick={handleGetExactPrice}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground w-full"
                >
                  <Calendar size={20} className="mr-2" />
                  Get My Exact Price
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
