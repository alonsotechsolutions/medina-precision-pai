import { useState, useEffect, useCallback, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Slider } from '@/components/ui/slider'
import { 
  Phone,
  MapPin, 
  EnvelopeSimple, 
  CheckCircle,
  Star,
  Calendar,
  PaintBrush,
  ShieldCheck,
  Medal,
  Users,
  CurrencyDollar,
  Sparkle,
  House,
  Palette,
  Image as ImageIcon,
  Quotes,
  ClipboardText,
  Trash,
  Eye,
  CaretLeft,
  CaretRight,
  Drop,
  Hammer,
  Wrench,
  Calculator,
  ChatCircleText,
  Clock,
  Download,
  PaperPlaneTilt,
  FacebookLogo,
  InstagramLogo,
  GoogleLogo,
  CreditCard,
  Lightbulb,
  ListChecks,
  MagnifyingGlass
} from '@phosphor-icons/react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { useKV } from '@github/spark/hooks'
import { useIsMobile } from '@/hooks/use-mobile'
import useEmblaCarousel from 'embla-carousel-react'
import logoImage from '@/assets/images/Logo.png'

interface QuoteRequest {
  id: string
  name: string
  email: string
  phone: string
  address: string
  serviceType: string
  propertyType: string
  projectDescription: string
  preferredDate?: string
  budgetRange?: string
  referralSource?: string
  status: 'new' | 'contacted' | 'quoted' | 'completed'
  submittedAt: string
}

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    serviceType: '',
    propertyType: '',
    projectDescription: '',
    preferredDate: '',
    budgetRange: '',
    referralSource: ''
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showFloatingCTA, setShowFloatingCTA] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null)
  const [quoteSearch, setQuoteSearch] = useState('')
  const isMobile = useIsMobile()

  const [quotes, setQuotes] = useKV<QuoteRequest[]>('quote-requests', [])
  const [subscribers, setSubscribers] = useKV<{ email: string; subscribedAt: string }[]>('newsletter-subscribers', [])
  const [newsletterEmail, setNewsletterEmail] = useState('')

  // Paint cost estimator state
  const [calcSqFt, setCalcSqFt] = useState<number>(1200)
  const [calcRooms, setCalcRooms] = useState<number>(3)
  const [calcQuality, setCalcQuality] = useState<'standard' | 'premium' | 'luxury'>('premium')
  const [calcProject, setCalcProject] = useState<'interior' | 'exterior' | 'cabinets'>('interior')
  
  const [servicesEmblaRef, servicesEmblaApi] = useEmblaCarousel({ loop: true })
  const [galleryEmblaRef, galleryEmblaApi] = useEmblaCarousel({ loop: true })
  const [testimonialsEmblaRef, testimonialsEmblaApi] = useEmblaCarousel({ loop: true })
  const [palettesEmblaRef, palettesEmblaApi] = useEmblaCarousel({ loop: true, dragFree: true })
  
  const [servicesIndex, setServicesIndex] = useState(0)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [testimonialsIndex, setTestimonialsIndex] = useState(0)
  const [palettesIndex, setPalettesIndex] = useState(0)
  
  const scrollServicesNext = useCallback(() => servicesEmblaApi?.scrollNext(), [servicesEmblaApi])
  const scrollServicesPrev = useCallback(() => servicesEmblaApi?.scrollPrev(), [servicesEmblaApi])
  const scrollGalleryNext = useCallback(() => galleryEmblaApi?.scrollNext(), [galleryEmblaApi])
  const scrollGalleryPrev = useCallback(() => galleryEmblaApi?.scrollPrev(), [galleryEmblaApi])
  const scrollTestimonialsNext = useCallback(() => testimonialsEmblaApi?.scrollNext(), [testimonialsEmblaApi])
  const scrollTestimonialsPrev = useCallback(() => testimonialsEmblaApi?.scrollPrev(), [testimonialsEmblaApi])
  const scrollPalettesNext = useCallback(() => palettesEmblaApi?.scrollNext(), [palettesEmblaApi])
  const scrollPalettesPrev = useCallback(() => palettesEmblaApi?.scrollPrev(), [palettesEmblaApi])
  
  useEffect(() => {
    if (!servicesEmblaApi) return
    const onSelect = () => setServicesIndex(servicesEmblaApi.selectedScrollSnap())
    servicesEmblaApi.on('select', onSelect)
    onSelect()
    return () => { servicesEmblaApi.off('select', onSelect) }
  }, [servicesEmblaApi])
  
  useEffect(() => {
    if (!galleryEmblaApi) return
    const onSelect = () => setGalleryIndex(galleryEmblaApi.selectedScrollSnap())
    galleryEmblaApi.on('select', onSelect)
    onSelect()
    return () => { galleryEmblaApi.off('select', onSelect) }
  }, [galleryEmblaApi])
  
  useEffect(() => {
    if (!testimonialsEmblaApi) return
    const onSelect = () => setTestimonialsIndex(testimonialsEmblaApi.selectedScrollSnap())
    testimonialsEmblaApi.on('select', onSelect)
    onSelect()
    return () => { testimonialsEmblaApi.off('select', onSelect) }
  }, [testimonialsEmblaApi])

  useEffect(() => {
    if (!palettesEmblaApi) return
    const onSelect = () => setPalettesIndex(palettesEmblaApi.selectedScrollSnap())
    palettesEmblaApi.on('select', onSelect)
    onSelect()
    return () => { palettesEmblaApi.off('select', onSelect) }
  }, [palettesEmblaApi])

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingCTA(window.scrollY > 800)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const VALID_PAGES = ['home', 'services', 'gallery', 'about', 'contact'] as const
  type PageKey = typeof VALID_PAGES[number]
  const parseHashPage = (): PageKey => {
    if (typeof window === 'undefined') return 'home'
    const h = window.location.hash
    if (h.startsWith('#/')) {
      const key = h.slice(2).toLowerCase() as PageKey
      return (VALID_PAGES as readonly string[]).includes(key) ? key : 'home'
    }
    return 'home'
  }
  const [currentPage, setCurrentPage] = useState<PageKey>(() => parseHashPage())
  useEffect(() => {
    const onHashChange = () => {
      const next = parseHashPage()
      setCurrentPage(prev => {
        if (prev !== next) {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        return next
      })
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  const pageTitles: Record<PageKey, string> = {
    home: 'Medina Precision Painting — Warner Robins, GA',
    services: 'Services & Process — Medina Precision Painting',
    gallery: 'Gallery — Medina Precision Painting',
    about: 'About — Medina Precision Painting',
    contact: 'Contact — Medina Precision Painting',
  }
  useEffect(() => {
    document.title = pageTitles[currentPage]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  useEffect(() => {
    const checkOwner = async () => {
      const user = await window.spark.user()
      if (user) {
        setIsOwner(user.isOwner)
      }
    }
    checkOwner()
  }, [])

  // Email integration: works on any static host (incl. GitHub Pages).
  // Strategy:
  //   1. POST the quote to Formspree (React + fetch/AJAX) so it works on static
  //      hosting like GitHub Pages without any backend server.
  //   2. Always also open a pre-filled mailto: link as a guaranteed fallback,
  //      so the visitor's mail client can send the lead even if the network
  //      call fails.
  const BUSINESS_EMAIL = 'azianninja1295@gmail.com'
  const FORMSPREE_FORM_ID = 'mlgzkqek'

  const buildEmailBody = (quote: QuoteRequest) => (
    `New quote request from ${quote.name}\n\n` +
    `Submitted: ${new Date(quote.submittedAt).toLocaleString()}\n\n` +
    `Contact\n` +
    `  Name: ${quote.name}\n` +
    `  Email: ${quote.email}\n` +
    `  Phone: ${quote.phone}\n` +
    `  Address: ${quote.address || 'Not provided'}\n\n` +
    `Project\n` +
    `  Service: ${quote.serviceType}\n` +
    `  Property: ${quote.propertyType || 'Not specified'}\n` +
    `  Preferred date: ${quote.preferredDate || 'Not specified'}\n` +
    `  Budget: ${quote.budgetRange || 'Not specified'}\n` +
    `  Referral: ${quote.referralSource || 'Not specified'}\n\n` +
    `Description\n${quote.projectDescription || '(none)'}\n`
  )

  const sendEmailNotification = async (quote: QuoteRequest) => {
    const subject = `New Quote Request from ${quote.name}`
    const body = buildEmailBody(quote)

    // 1. Try Formspree first. VITE_FORMSPREE_ID can override the built-in id.
    const formspreeId =
      (import.meta as unknown as { env: Record<string, string | undefined> }).env.VITE_FORMSPREE_ID ||
      FORMSPREE_FORM_ID
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: subject,
          _replyto: quote.email,
          name: quote.name,
          email: quote.email,
          phone: quote.phone,
          address: quote.address,
          serviceType: quote.serviceType,
          propertyType: quote.propertyType,
          preferredDate: quote.preferredDate,
          budgetRange: quote.budgetRange,
          referralSource: quote.referralSource,
          projectDescription: quote.projectDescription,
          submittedAt: quote.submittedAt,
          message: body,
        }),
      })
      if (res.ok) {
        toast.success('Email sent to Medina Precision Painting.')
        return
      }
      console.warn('Formspree responded with non-OK status', res.status)
    } catch (err) {
      console.warn('Formspree submission failed, falling back to mailto:', err)
    }

    // 2. Mailto fallback — opens the visitor's mail client with a pre-filled
    //    message so the lead can still be delivered without any backend.
    try {
      const mailto = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      window.open(mailto, '_blank')
      toast.info('Opening your email app to send the quote request', {
        description: 'If nothing opens, please email us at ' + BUSINESS_EMAIL,
      })
    } catch (err) {
      console.error('mailto fallback failed:', err)
      toast.error('Could not send email. Please call (478) 955-2341.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newQuote: QuoteRequest = {
      id: `quote-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      serviceType: formData.serviceType,
      propertyType: formData.propertyType,
      projectDescription: formData.projectDescription,
      preferredDate: formData.preferredDate,
      budgetRange: formData.budgetRange,
      referralSource: formData.referralSource,
      status: 'new',
      submittedAt: new Date().toISOString()
    }
    
    setQuotes(currentQuotes => [newQuote, ...(currentQuotes || [])])
    
    await sendEmailNotification(newQuote)
    
    toast.success('Quote request submitted! We\'ll contact you within 24 hours.')
    setIsDialogOpen(false)
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      serviceType: '',
      propertyType: '',
      projectDescription: '',
      preferredDate: '',
      budgetRange: '',
      referralSource: ''
    })
  }

  const updateQuoteStatus = (quoteId: string, newStatus: QuoteRequest['status']) => {
    setQuotes(currentQuotes =>
      (currentQuotes || []).map(quote =>
        quote.id === quoteId ? { ...quote, status: newStatus } : quote
      )
    )
    toast.success('Quote status updated')
  }

  const deleteQuote = (quoteId: string) => {
    setQuotes(currentQuotes => (currentQuotes || []).filter(quote => quote.id !== quoteId))
    toast.success('Quote deleted')
    setSelectedQuote(null)
  }

  const getStatusColor = (status: QuoteRequest['status']) => {
    switch (status) {
      case 'new':
        return 'bg-accent text-accent-foreground'
      case 'contacted':
        return 'bg-secondary text-secondary-foreground'
      case 'quoted':
        return 'bg-primary text-primary-foreground'
      case 'completed':
        return 'bg-muted text-muted-foreground'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const getQuotesByStatus = (status: QuoteRequest['status']) => {
    return (quotes || []).filter(quote => quote.status === status)
  }

  const filterBySearch = (list: QuoteRequest[]) => {
    const q = quoteSearch.trim().toLowerCase()
    if (!q) return list
    return list.filter(quote =>
      quote.name.toLowerCase().includes(q) ||
      quote.email.toLowerCase().includes(q) ||
      quote.phone.toLowerCase().includes(q) ||
      (quote.address || '').toLowerCase().includes(q) ||
      (quote.serviceType || '').toLowerCase().includes(q) ||
      (quote.projectDescription || '').toLowerCase().includes(q)
    )
  }

  const exportQuotesCSV = () => {
    const rows = quotes || []
    if (rows.length === 0) {
      toast.error('No quotes to export')
      return
    }
    const headers = ['Submitted','Name','Email','Phone','Address','Service','Property','Status','PreferredDate','BudgetRange','ReferralSource','Description']
    const escape = (v: string | undefined) => {
      const s = (v ?? '').toString().replace(/"/g, '""')
      return `"${s}"`
    }
    const csv = [
      headers.join(','),
      ...rows.map(r => [
        new Date(r.submittedAt).toISOString(),
        r.name, r.email, r.phone, r.address, r.serviceType, r.propertyType,
        r.status, r.preferredDate, r.budgetRange, r.referralSource, r.projectDescription
      ].map(escape).join(','))
    ].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `medina-quotes-${new Date().toISOString().slice(0,10)}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success(`Exported ${rows.length} quote${rows.length === 1 ? '' : 's'}`)
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const email = newsletterEmail.trim().toLowerCase()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address')
      return
    }
    setSubscribers(current => {
      const list = current || []
      if (list.some(s => s.email === email)) {
        toast.info("You're already subscribed!")
        return list
      }
      toast.success('Thanks for subscribing! Painting tips on the way.')
      return [{ email, subscribedAt: new Date().toISOString() }, ...list]
    })
    setNewsletterEmail('')
  }

  // Paint cost estimator — transparent rough-range calculation.
  // Disclaimer: provides a "starting estimate" only; final pricing requires an on-site visit.
  const calculateEstimate = () => {
    // Base rate in USD per square foot of paintable area, based on 2024 Central-Georgia
    // market averages for labor + standard materials. Update annually as paint and labor
    // costs change. Cabinets are higher because they require disassembly, sanding,
    // priming, and multiple spray coats.
    const baseRate: Record<typeof calcProject, number> = {
      interior: 2.5,  // $/sq ft
      exterior: 3.25, // $/sq ft
      cabinets: 9.0   // $/sq ft (door + frame surface)
    }
    // Quality multiplier reflecting paint grade and prep
    const qualityMultiplier: Record<typeof calcQuality, number> = {
      standard: 1.0,
      premium: 1.25,
      luxury: 1.6
    }
    // Small-project floor: extra rooms add minor trim/prep overhead
    const roomAdj = 1 + Math.max(0, calcRooms - 1) * 0.04
    const center = calcSqFt * baseRate[calcProject] * qualityMultiplier[calcQuality] * roomAdj
    const low = Math.max(250, Math.round(center * 0.85 / 25) * 25)
    const high = Math.max(low + 100, Math.round(center * 1.15 / 25) * 25)
    return { low, high }
  }
  const estimate = calculateEstimate()

  const stats = [
    { value: '5+', label: 'Years of Experience', icon: Medal },
    { value: '150+', label: 'Projects Completed', icon: PaintBrush },
    { value: '100%', label: 'Satisfaction Promise', icon: Sparkle },
    { value: '24hr', label: 'Quote Response Time', icon: Clock }
  ]

  const processSteps = [
    {
      icon: ChatCircleText,
      title: 'Free Consultation',
      desc: 'Tell us about your project online or by phone — we respond within 24 hours.'
    },
    {
      icon: ClipboardText,
      title: 'On-Site Estimate',
      desc: 'Eddie visits your property, measures, and provides a written, transparent quote with no hidden fees.'
    },
    {
      icon: Wrench,
      title: 'Prep & Protect',
      desc: 'Surfaces are cleaned, repaired, and primed. Floors, fixtures, and landscaping are carefully protected.'
    },
    {
      icon: PaintBrush,
      title: 'Precision Painting',
      desc: 'Premium paints applied with expert technique for a flawless, long-lasting finish on every surface.'
    },
    {
      icon: CheckCircle,
      title: 'Final Walkthrough',
      desc: 'We walk every inch with you to confirm perfection — backed by our 2-year workmanship warranty.'
    }
  ]

  const baseColorPalettes = [
    {
      name: 'Coastal Calm',
      mood: 'Serene & Airy',
      colors: ['#E8EEF2', '#A8C3D1', '#5E8CA8', '#2F4858']
    },
    {
      name: 'Modern Farmhouse',
      mood: 'Warm & Welcoming',
      colors: ['#F5F1EA', '#D9CFC1', '#8C7B6B', '#3A322B']
    },
    {
      name: 'Bold Statement',
      mood: 'Dramatic & Confident',
      colors: ['#F2EFEA', '#C9B79C', '#7A2E1F', '#1B1B1B']
    },
    {
      name: 'Georgia Greens',
      mood: 'Natural & Fresh',
      colors: ['#F2F5EE', '#BFD3B0', '#557A46', '#2B3A29']
    },
    {
      name: 'Classic Neutral',
      mood: 'Timeless & Versatile',
      colors: ['#FFFFFF', '#EAE6DF', '#A89F92', '#4B463F']
    },
    {
      name: 'Sunset Warmth',
      mood: 'Cozy & Inviting',
      colors: ['#FFF5EC', '#F0C6A0', '#D27D5B', '#6E2A1E']
    }
  ]

  const clampChannel = (value: number) => Math.max(0, Math.min(255, value))
  const randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min

  const shiftHexColor = (hexColor: string, variance = 18) => {
    const cleaned = hexColor.replace('#', '')
    const r = parseInt(cleaned.slice(0, 2), 16)
    const g = parseInt(cleaned.slice(2, 4), 16)
    const b = parseInt(cleaned.slice(4, 6), 16)

    const nr = clampChannel(r + randomInt(-variance, variance))
    const ng = clampChannel(g + randomInt(-variance, variance))
    const nb = clampChannel(b + randomInt(-variance, variance))

    return `#${[nr, ng, nb].map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase()}`
  }

  const hexToRgb = (hexColor: string) => {
    const cleaned = hexColor.replace('#', '')
    return {
      r: parseInt(cleaned.slice(0, 2), 16),
      g: parseInt(cleaned.slice(2, 4), 16),
      b: parseInt(cleaned.slice(4, 6), 16)
    }
  }

  const derivePaletteIdentity = (colors: string[]) => {
    const rgb = colors.map(hexToRgb)
    const avg = rgb.reduce(
      (acc, c) => ({ r: acc.r + c.r, g: acc.g + c.g, b: acc.b + c.b }),
      { r: 0, g: 0, b: 0 }
    )

    const avgR = avg.r / rgb.length
    const avgG = avg.g / rgb.length
    const avgB = avg.b / rgb.length
    const brightness = (avgR + avgG + avgB) / 3
    const warmth = avgR - avgB

    const contrast = rgb.reduce((sum, c) => {
      const max = Math.max(c.r, c.g, c.b)
      const min = Math.min(c.r, c.g, c.b)
      return sum + (max - min)
    }, 0) / rgb.length

    let family = 'Neutral'
    if (warmth > 28) family = 'Amber'
    else if (warmth < -28) family = 'Azure'
    else if (avgG > avgR + 8 && avgG > avgB + 8) family = 'Sage'
    else if (brightness > 210) family = 'Ivory'
    else if (brightness < 95) family = 'Noir'
    else if (contrast < 35) family = 'Stone'

    let finish = 'Edit'
    if (contrast > 95) finish = 'Statement'
    else if (contrast > 70) finish = 'Composition'
    else if (contrast < 30) finish = 'Whisper'

    const temperaturePhrase = warmth > 20
      ? 'warm undertones'
      : warmth < -20
        ? 'cool undertones'
        : 'balanced undertones'

    const lightPhrase = brightness > 200
      ? 'with an airy, light-forward feel'
      : brightness < 110
        ? 'with rich depth and dramatic weight'
        : 'with a grounded mid-tone balance'

    const contrastPhrase = contrast > 95
      ? 'Built for bold visual contrast.'
      : contrast < 30
        ? 'Designed for a soft, seamless flow.'
        : 'Calibrated for a refined, modern balance.'

    const description = `A ${family.toLowerCase()} palette with ${temperaturePhrase}, ${lightPhrase} ${contrastPhrase}`

    return {
      name: `${family} ${finish}`,
      mood: description
    }
  }

  const createUniquePaletteName = (
    baseName: string,
    usedNames: Set<string>,
    historicalNames: Set<string>
  ) => {
    const reserve = (candidate: string) => {
      usedNames.add(candidate)
      historicalNames.add(candidate)
      return candidate
    }

    if (!usedNames.has(baseName) && !historicalNames.has(baseName)) {
      return reserve(baseName)
    }

    let counter = 2
    let candidate = `${baseName} ${counter}`
    while (usedNames.has(candidate) || historicalNames.has(candidate)) {
      counter += 1
      candidate = `${baseName} ${counter}`
    }

    return reserve(candidate)
  }

  // Keep palettes stable during a session, but refresh with new shades on full reload.
  const colorPalettes = useMemo(() => {
    const usedNames = new Set<string>()
    const historicalNames = new Set<string>()
    const storageKey = 'medina-palette-name-history'

    if (typeof window !== 'undefined') {
      try {
        const raw = window.localStorage.getItem(storageKey)
        if (raw) {
          const parsed = JSON.parse(raw) as string[]
          parsed.forEach(name => historicalNames.add(name))
        }
      } catch (err) {
        console.warn('Could not read palette name history', err)
      }
    }

    const generated = baseColorPalettes.map((palette) => {
      const colors = palette.colors.map(color => shiftHexColor(color))
      const identity = derivePaletteIdentity(colors)
      const uniqueName = createUniquePaletteName(identity.name, usedNames, historicalNames)
      return {
        ...palette,
        ...identity,
        name: uniqueName,
        colors,
      }
    })

    if (typeof window !== 'undefined') {
      try {
        const trimmedHistory = Array.from(historicalNames).slice(-800)
        window.localStorage.setItem(storageKey, JSON.stringify(trimmedHistory))
      } catch (err) {
        console.warn('Could not save palette name history', err)
      }
    }

    return generated
  }, [])

  const faqs = [
    {
      q: 'How much does a typical painting project cost?',
      a: 'Most interior rooms range from $400–$900 each, full-home interiors from $3,000–$8,000, and exterior repaints from $3,500–$10,000+ depending on size, surfaces, and paint quality. Use the calculator on this page for a starting estimate, then schedule a free on-site quote for an exact price.'
    },
    {
      q: 'Are you licensed and insured?',
      a: 'Yes — Medina Precision Painting is fully licensed, bonded, and carries $2M in liability insurance plus workers compensation, so your property and our team are always protected.'
    },
    {
      q: 'How long does a painting project take?',
      a: 'Single rooms typically take 1–2 days, full interiors 3–7 days, and exterior projects 4–10 days depending on size and weather. We confirm the timeline in writing before starting.'
    },
    {
      q: 'What kind of warranty do you offer?',
      a: 'We back every project with a 2-year workmanship warranty. If paint peels, cracks, or fails due to our application, we come back and fix it at no charge.'
    },
    {
      q: 'What paint brands do you use?',
      a: 'We work with premium brands such as Sherwin-Williams, Benjamin Moore, and Behr Premium Plus. We recommend the right product for your surface, traffic level, and budget.'
    },
    {
      q: 'Do I need to move my furniture?',
      a: 'No — we move and cover furniture, protect floors and fixtures, and restore everything when finished. You only need to remove valuables and small breakables.'
    },
    {
      q: 'How do I get a quote?',
      a: 'Click any "Get Free Quote" button or call (478) 955-2341. We typically respond within 24 hours and can usually schedule an on-site estimate within a week.'
    },
    {
      q: 'What forms of payment do you accept?',
      a: 'We accept cash, check, all major credit cards, and electronic transfers. For larger projects we offer milestone-based payment schedules.'
    },
    {
      q: 'Do you offer eco-friendly or low-VOC paints?',
      a: 'Yes — we offer low-VOC and zero-VOC paint options that are safer for kids, pets, and anyone with chemical sensitivities. Just ask when scheduling your estimate.'
    }
  ]

  const services = [
    {
      icon: House,
      title: 'Interior Painting',
      description: 'Transform your living spaces with expert interior painting. Perfect finish on drywall, wood, and more.',
      features: ['Wall & ceiling painting', 'Trim & door refinishing', 'Drywall finishing', 'Multiple surface types']
    },
    {
      icon: Palette,
      title: 'Exterior Painting',
      description: 'Protect and beautify your home with durable paint. Expert application on siding, wood, metal, and masonry.',
      features: ['House painting', 'Siding & masonry', 'Metal surfaces', 'Weather-resistant finishes']
    },
    {
      icon: PaintBrush,
      title: 'Cabinet Refinishing',
      description: 'Modernize your kitchen or bathroom with professional cabinet painting and refinishing services.',
      features: ['Kitchen cabinets', 'Bathroom vanities', 'Custom color matching', 'Smooth cabinet finish']
    },
    {
      icon: Sparkle,
      title: 'High-End Residential',
      description: 'Premium painting services for luxury homes with meticulous attention to detail and flawless results.',
      features: ['Luxury finishes', 'Premium materials', 'Detailed craftsmanship', 'High-end properties']
    },
    {
      icon: ShieldCheck,
      title: 'Commercial & Industrial',
      description: 'Professional painting for offices, retail, warehouses, and industrial facilities throughout Georgia.',
      features: ['Commercial properties', 'Industrial facilities', 'Large-scale projects', 'Flexible scheduling']
    },
    {
      icon: Drop,
      title: 'Pressure Washing',
      description: 'Restore curb appeal and prep surfaces for paint with professional power washing for homes and businesses.',
      features: ['Siding & driveways', 'Decks & patios', 'Pre-paint prep', 'Fence cleaning']
    },
    {
      icon: Hammer,
      title: 'Drywall & Repairs',
      description: 'Patch, repair, and refinish damaged drywall, holes, and water-damaged surfaces before painting.',
      features: ['Hole & crack repair', 'Water damage repair', 'Texture matching', 'Popcorn ceiling removal']
    },
    {
      icon: Wrench,
      title: 'Deck & Fence Staining',
      description: 'Protect and beautify wood surfaces with quality stains and sealers built to last Georgia weather.',
      features: ['Decks & pergolas', 'Wood fences', 'Sealing & waterproofing', 'Color & stain matching']
    },
    {
      icon: Medal,
      title: 'Surface Expertise',
      description: 'Expert knowledge of paints and primers for any surface. Perfect product selection for your project.',
      features: ['Paint selection guidance', 'Primer expertise', 'Surface-specific solutions', 'Quality materials']
    }
  ]

  const testimonials = [
    {
      name: 'Jennifer Martinez',
      location: 'Warner Robins, GA',
      rating: 5,
      text: 'Eddie did an amazing job on our home. Professional, punctual, and the quality is outstanding. He really knows his craft. Highly recommend!'
    },
    {
      name: 'David Thompson',
      location: 'Atlanta, GA',
      rating: 5,
      text: 'Best painting contractor in Georgia! Eddie transformed our office space and stayed on budget. His expertise with different surfaces is impressive.'
    },
    {
      name: 'Sarah Williams',
      location: 'Macon, GA',
      rating: 5,
      text: 'From the free estimate to the final walkthrough, everything was handled with care and professionalism. Eddie selected the perfect paint for our project!'
    }
  ]

  const galleryImages = [
    { 
      title: 'Modern Living Room', 
      category: 'Interior',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'
    },
    { 
      title: 'Victorian Exterior', 
      category: 'Exterior',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80'
    },
    { 
      title: 'Kitchen Cabinet Refresh', 
      category: 'Cabinets',
      image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&q=80'
    },
    { 
      title: 'Commercial Office', 
      category: 'Commercial',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'
    },
    { 
      title: 'Deck Staining', 
      category: 'Exterior',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
    },
    { 
      title: 'Accent Wall Design', 
      category: 'Interior',
      image: 'https://images.unsplash.com/photo-1615875221248-48b7dbced6b4?w=800&q=80'
    }
  ]

  const serviceAreas = [
    'Warner Robins', 'Macon', 'Perry', 'Atlanta', 'Augusta', 'Columbus',
    'Savannah', 'Athens', 'Albany', 'Valdosta', 'Rome', 'Gainesville'
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="min-h-screen bg-background" data-current-page={currentPage}>
      <style>{`[data-page]:not([data-page~="${currentPage}"]){display:none !important;}`}</style>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-32">
            <div className="flex items-center">
              <a href="#/" aria-label="Go to home page" className="inline-flex items-center">
                <img
                  src={logoImage}
                  alt="Medina Precision Painting"
                  className="w-auto"
                  style={{ height: 'calc(var(--spacing) * 70)' }}
                />
              </a>
            </div>
            <nav className="hidden md:flex gap-2 ml-8">
              <a
                href="#/"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-primary bg-accent/40' : 'text-muted-foreground hover:text-primary hover:bg-accent/30'}`}
              >
                Home
              </a>
              {[
                { label: 'Services', href: '#/services', page: 'services' as PageKey },
                { label: 'Gallery', href: '#/gallery', page: 'gallery' as PageKey },
                { label: 'About', href: '#/about', page: 'about' as PageKey },
                { label: 'Contact', href: '#/contact', page: 'contact' as PageKey }
              ].map(tab => (
                <a
                  key={tab.href}
                  href={tab.href}
                  aria-current={currentPage === tab.page ? 'page' : undefined}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === tab.page ? 'text-primary bg-accent/40' : 'text-muted-foreground hover:text-primary hover:bg-accent/30'}`}
                >
                  {tab.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              {isOwner && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAdminPanel(true)}
                  className="hidden md:flex items-center gap-2"
                >
                  <ClipboardText size={18} weight="duotone" />
                  View Quotes ({(quotes || []).length})
                </Button>
              )}
              <a href="tel:4789552341" className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone size={18} weight="bold" />
                (478) 955-2341
              </a>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    Get Free Quote
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Request a Free Quote</DialogTitle>
                    <DialogDescription>
                      Fill out the form below and we'll contact you within 24 hours with a detailed estimate.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Smith" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input id="phone" type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="(555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Property Address</Label>
                      <Input id="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="123 Main St, Warner Robins, GA" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service-type">Service Type *</Label>
                      <Select required value={formData.serviceType} onValueChange={(value) => setFormData({ ...formData, serviceType: value })}>
                        <SelectTrigger id="service-type"><SelectValue placeholder="Select a service" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="interior">Interior Painting</SelectItem>
                          <SelectItem value="exterior">Exterior Painting</SelectItem>
                          <SelectItem value="cabinets">Cabinet Refinishing</SelectItem>
                          <SelectItem value="commercial">Commercial Painting</SelectItem>
                          <SelectItem value="pressure-washing">Pressure Washing</SelectItem>
                          <SelectItem value="drywall-repair">Drywall &amp; Repair</SelectItem>
                          <SelectItem value="deck-fence-staining">Deck &amp; Fence Staining</SelectItem>
                          <SelectItem value="popcorn-ceiling">Popcorn Ceiling Removal</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="property-type">Property Type</Label>
                      <Select value={formData.propertyType} onValueChange={(value) => setFormData({ ...formData, propertyType: value })}>
                        <SelectTrigger id="property-type"><SelectValue placeholder="Select property type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">Residential</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-description">Project Description</Label>
                      <Textarea id="project-description" value={formData.projectDescription} onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })} placeholder="Tell us about your project (optional)" rows={4} />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="preferred-date">Preferred Start Date</Label>
                        <Input id="preferred-date" type="date" value={formData.preferredDate} onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="budget-range">Budget Range</Label>
                        <Select value={formData.budgetRange} onValueChange={(value) => setFormData({ ...formData, budgetRange: value })}>
                          <SelectTrigger id="budget-range"><SelectValue placeholder="Select budget" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-1000">Under $1,000</SelectItem>
                            <SelectItem value="1000-3000">$1,000 – $3,000</SelectItem>
                            <SelectItem value="3000-7500">$3,000 – $7,500</SelectItem>
                            <SelectItem value="7500-15000">$7,500 – $15,000</SelectItem>
                            <SelectItem value="15000-plus">$15,000+</SelectItem>
                            <SelectItem value="not-sure">Not sure yet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="referral-source">How Did You Hear About Us?</Label>
                      <Select value={formData.referralSource} onValueChange={(value) => setFormData({ ...formData, referralSource: value })}>
                        <SelectTrigger id="referral-source"><SelectValue placeholder="Select an option" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="google">Google Search</SelectItem>
                          <SelectItem value="facebook">Facebook</SelectItem>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="referral">Friend / Referral</SelectItem>
                          <SelectItem value="repeat">Repeat Customer</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Submit Request</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        {/* Mobile tab bar */}
        <nav className="md:hidden flex justify-center gap-1 border-t border-border bg-background/95 backdrop-blur-md overflow-x-auto">
          <a
            href="#/"
            className={`px-2 py-2 text-xs font-medium whitespace-nowrap ${currentPage === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
          >
            Home
          </a>
          {[
            { label: 'Services', href: '#/services', page: 'services' as PageKey },
            { label: 'Gallery', href: '#/gallery', page: 'gallery' as PageKey },
            { label: 'About', href: '#/about', page: 'about' as PageKey },
            { label: 'Contact', href: '#/contact', page: 'contact' as PageKey }
          ].map(tab => (
            <a
              key={tab.href}
              href={tab.href}
              aria-current={currentPage === tab.page ? 'page' : undefined}
              className={`px-2 py-2 text-xs font-medium whitespace-nowrap ${currentPage === tab.page ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
            >
              {tab.label}
            </a>
          ))}
        </nav>
      </header>
      {showFloatingCTA && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="shadow-xl bg-accent hover:bg-accent/90 text-accent-foreground">
                Get Free Quote
              </Button>
            </DialogTrigger>
          </Dialog>
        </motion.div>
      )}
      <main className="pt-44 md:pt-36 text-lg">
        <section data-page="home" className="relative py-24 sm:py-32 bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, currentColor 35px, currentColor 36px)`
          }}></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-primary-foreground"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
                Transform Your Space with<br />Precision & Care
              </h1>
              <p className="text-lg sm:text-xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
                Family-owned painting business serving Warner Robins and Central Georgia. Professional craftsmanship by Eddie Medina with 5 years of expertise across commercial, residential, and industrial projects. Honest pricing and outstanding results guaranteed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                      <Calendar size={24} className="mr-2" />
                      Get Free Estimate
                    </Button>
                  </DialogTrigger>
                </Dialog>
                <a href="tel:4789552341">
                  <Button size="lg" variant="secondary" className="text-lg px-8">
                    <Phone size={24} className="mr-2" />
                    (478) 955-2341
                  </Button>
                </a>
              </div>
              <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
                {[
                  { icon: ShieldCheck, text: 'Fully Licensed & Insured' },
                  { icon: Medal, text: '5 Years Experience' },
                  { icon: Sparkle, text: '2-Year Warranty' }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-2 bg-background/10 backdrop-blur-sm rounded-full px-4 py-2"
                  >
                    <benefit.icon size={20} weight="duotone" className="text-primary-foreground" />
                    <span className="text-sm font-semibold text-primary-foreground">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats / Social Proof Counter */}
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
                <div className="overflow-hidden" ref={servicesEmblaRef}>
                  <div className="flex">
                    {services.map((service, index) => (
                      <div key={index} className="flex-[0_0_100%] min-w-0">
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
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={scrollServicesPrev}
                    className="rounded-full"
                  >
                    <CaretLeft size={20} weight="bold" />
                  </Button>
                  <div className="flex gap-1.5">
                    {services.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === servicesIndex ? 'w-8 bg-primary' : 'w-2 bg-border'
                        }`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={scrollServicesNext}
                    className="rounded-full"
                  >
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
                {services.map((service, index) => (
                  <motion.div key={index} variants={itemVariants}>
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
                <div className="overflow-hidden" ref={galleryEmblaRef}>
                  <div className="flex">
                    {galleryImages.map((image, index) => (
                      <div key={index} className="flex-[0_0_100%] min-w-0">
                        <div className="group relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-border mx-2">
                          <img 
                            src={image.image} 
                            alt={image.title}
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
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={scrollGalleryPrev}
                    className="rounded-full"
                  >
                    <CaretLeft size={20} weight="bold" />
                  </Button>
                  <div className="flex gap-1.5">
                    {galleryImages.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === galleryIndex ? 'w-8 bg-primary' : 'w-2 bg-border'
                        }`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={scrollGalleryNext}
                    className="rounded-full"
                  >
                    <CaretRight size={20} weight="bold" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-border hover:border-primary transition-all duration-300"
                  >
                    <img 
                      src={image.image} 
                      alt={image.title}
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
                <div className="overflow-hidden" ref={testimonialsEmblaRef}>
                  <div className="flex">
                    {testimonials.map((testimonial, index) => (
                      <div key={index} className="flex-[0_0_100%] min-w-0">
                        <Card className="h-full mx-2">
                          <CardHeader>
                            <div className="flex items-center gap-1 mb-2">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} size={18} weight="fill" className="text-accent" />
                              ))}
                            </div>
                            <div className="flex items-start gap-3">
                              <Quotes size={24} weight="duotone" className="text-primary shrink-0" />
                              <div>
                                <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                                <CardDescription>{testimonial.location}</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground leading-relaxed">{testimonial.text}</p>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={scrollTestimonialsPrev}
                    className="rounded-full"
                  >
                    <CaretLeft size={20} weight="bold" />
                  </Button>
                  <div className="flex gap-1.5">
                    {testimonials.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === testimonialsIndex ? 'w-8 bg-primary' : 'w-2 bg-border'
                        }`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={scrollTestimonialsNext}
                    className="rounded-full"
                  >
                    <CaretRight size={20} weight="bold" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} size={18} weight="fill" className="text-accent" />
                          ))}
                        </div>
                        <div className="flex items-start gap-3">
                          <Quotes size={24} weight="duotone" className="text-primary shrink-0" />
                          <div>
                            <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                            <CardDescription>{testimonial.location}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">{testimonial.text}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

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
                { icon: Calendar, title: 'Flexible Service', desc: 'Serving all of Georgia with professional painting solutions' }
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
                'Professional service throughout Georgia'
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

        {/* Our Process — 5-step trust-builder */}
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

        {/* Paint Cost Estimator — interactive lead-generation tool */}
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
                      <div className="grid grid-cols-3 gap-2">
                        {([
                          { value: 'interior', label: 'Interior' },
                          { value: 'exterior', label: 'Exterior' },
                          { value: 'cabinets', label: 'Cabinets' }
                        ] as const).map(opt => (
                          <Button
                            key={opt.value}
                            type="button"
                            variant={calcProject === opt.value ? 'default' : 'outline'}
                            onClick={() => setCalcProject(opt.value)}
                            className="w-full"
                          >
                            {opt.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label htmlFor="calc-sqft">Approx. Square Footage</Label>
                        <span className="font-semibold text-primary">{calcSqFt.toLocaleString()} sq ft</span>
                      </div>
                      <Slider
                        id="calc-sqft"
                        value={[calcSqFt]}
                        onValueChange={(v) => setCalcSqFt(v[0])}
                        min={100}
                        max={5000}
                        step={50}
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Tip: average bedroom ≈ 150 sq ft, average house interior ≈ 1,500–2,500 sq ft.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label htmlFor="calc-rooms">Number of Rooms / Sections</Label>
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
                    <div>
                      <Label className="mb-3 block">Paint Quality</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {([
                          { value: 'standard', label: 'Standard' },
                          { value: 'premium', label: 'Premium' },
                          { value: 'luxury', label: 'Luxury' }
                        ] as const).map(opt => (
                          <Button
                            key={opt.value}
                            type="button"
                            variant={calcQuality === opt.value ? 'default' : 'outline'}
                            onClick={() => setCalcQuality(opt.value)}
                            className="w-full"
                          >
                            {opt.label}
                          </Button>
                        ))}
                      </div>
                    </div>
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
                        This range is a starting estimate based on industry averages for{' '}
                        <strong>{calcQuality}</strong>-grade {calcProject} work. Final pricing depends on prep work, surface condition, and specific paint products — confirmed during your free on-site visit.
                      </p>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">
                          <Calendar size={20} className="mr-2" />
                          Get My Exact Price
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Color Palette Inspiration */}
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
                <div className="overflow-hidden" ref={palettesEmblaRef}>
                  <div className="flex">
                    {colorPalettes.map((palette, index) => {
                      const openWithPalette = () => {
                        const paletteLine = `Inspired by palette: ${palette.name} (${palette.mood}) — Colors: ${palette.colors.join(', ')}`
                        setFormData(prev => {
                          const existing = (prev.projectDescription || '').trim()
                          const alreadyHasPalette = existing.includes('Inspired by palette:')
                          const nextDescription = alreadyHasPalette
                            ? existing.replace(/Inspired by palette:.*$/m, paletteLine)
                            : existing
                              ? `${existing}\n\n${paletteLine}`
                              : paletteLine
                          return { ...prev, projectDescription: nextDescription }
                        })
                        setIsDialogOpen(true)
                      }
                      return (
                        <div key={index} className="flex-[0_0_100%] min-w-0">
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
                            className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary mx-2"
                          >
                            <div className="flex h-32">
                              {palette.colors.map((color, idx) => (
                                <div
                                  key={idx}
                                  className="flex-1 transition-all duration-300 hover:flex-[1.5]"
                                  style={{ backgroundColor: color }}
                                  title={color}
                                  aria-label={`Color swatch ${color}`}
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
                                {palette.colors.map((color, idx) => (
                                  <code key={idx} className="text-xs bg-muted px-2 py-0.5 rounded">{color}</code>
                                ))}
                              </div>
                              <p className="text-xs text-primary mt-3 font-medium">
                                Tap to request a free quote with this palette →
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={scrollPalettesPrev}
                    className="rounded-full"
                  >
                    <CaretLeft size={20} weight="bold" />
                  </Button>
                  <div className="flex gap-1.5">
                    {colorPalettes.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === palettesIndex ? 'w-8 bg-primary' : 'w-2 bg-border'
                        }`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={scrollPalettesNext}
                    className="rounded-full"
                  >
                    <CaretRight size={20} weight="bold" />
                  </Button>
                </div>
              </div>
            ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {colorPalettes.map((palette, index) => {
                const openWithPalette = () => {
                  const paletteLine = `Inspired by palette: ${palette.name} (${palette.mood}) — Colors: ${palette.colors.join(', ')}`
                  setFormData(prev => {
                    const existing = (prev.projectDescription || '').trim()
                    const alreadyHasPalette = existing.includes('Inspired by palette:')
                    const nextDescription = alreadyHasPalette
                      ? existing.replace(/Inspired by palette:.*$/m, paletteLine)
                      : existing
                        ? `${existing}\n\n${paletteLine}`
                        : paletteLine
                    return { ...prev, projectDescription: nextDescription }
                  })
                  setIsDialogOpen(true)
                }
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
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
                      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <div className="flex h-32">
                        {palette.colors.map((color, idx) => (
                          <div
                            key={idx}
                            className="flex-1 transition-all duration-300 hover:flex-[1.5]"
                            style={{ backgroundColor: color }}
                            title={color}
                            aria-label={`Color swatch ${color}`}
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
                          {palette.colors.map((color, idx) => (
                            <code key={idx} className="text-xs bg-muted px-2 py-0.5 rounded">{color}</code>
                          ))}
                        </div>
                        <p className="text-xs text-primary mt-3 font-medium">
                          Click to request a free quote with this palette →
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
            )}
          </div>
        </section>
        <section id="warranty" data-page="about" className="py-20 bg-muted/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-[auto_1fr] gap-6 p-6 sm:p-10 items-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto md:mx-0">
                  <ShieldCheck size={56} weight="duotone" className="text-primary" />
                </div>
                <div className="text-center md:text-left">
                  <Badge variant="secondary" className="mb-2">Our Promise</Badge>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight" style={{ letterSpacing: '-0.01em' }}>
                    2-Year Workmanship Warranty &amp; 100% Satisfaction Guarantee
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If your paint peels, cracks, or fails because of our application within two years, we'll come back and fix it free — no questions asked. And before we close out any project, we walk every inch with you to make sure you're 100% satisfied.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge variant="outline">Written Warranty</Badge>
                    <Badge variant="outline">Free Touch-Ups</Badge>
                    <Badge variant="outline">Licensed &amp; Insured</Badge>
                    <Badge variant="outline">Final Walkthrough</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" data-page="services" className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight" style={{ letterSpacing: '-0.01em' }}>
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to know before scheduling your project.
              </p>
            </motion.div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left text-base sm:text-lg font-semibold">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-3">Don't see your question?</p>
              <a href="tel:4789552341">
                <Button variant="outline">
                  <Phone size={18} className="mr-2" />
                  Call (478) 955-2341
                </Button>
              </a>
            </div>
          </div>
        </section>

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

        <section data-page="home services gallery about contact" className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, currentColor 1deg, transparent 2deg, transparent 60deg)`
          }}></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight" style={{ letterSpacing: '-0.01em' }}>
                Ready to Transform Your Space?
              </h2>
              <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
                Get your free, no-obligation estimate today. We'll visit your property, discuss your vision, and provide a detailed quote with transparent pricing.
              </p>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Calendar size={20} className="mr-2" />
                    Schedule Free Estimate
                  </Button>
                </DialogTrigger>
              </Dialog>
            </motion.div>
          </div>
        </section>

        <section id="contact" data-page="home contact" className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight" style={{ letterSpacing: '-0.01em' }}>
                Get In Touch
              </h2>
              <p className="text-lg text-muted-foreground">
                We're here to answer your questions and discuss your painting project.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Phone size={28} weight="duotone" className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Phone</h3>
                <a href="tel:4789552341" className="text-muted-foreground hover:text-primary transition-colors">
                  (478) 955-2341
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <EnvelopeSimple size={28} weight="duotone" className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Email</h3>
                <a href="mailto:azianninja1295@gmail.com" className="text-muted-foreground hover:text-primary transition-colors break-all">
                  azianninja1295@gmail.com
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin size={28} weight="duotone" className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Service Area</h3>
                <p className="text-muted-foreground">
                  Warner Robins<br />&amp; All of Georgia
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Clock size={28} weight="duotone" className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Business Hours</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Mon–Fri: 7:00am – 6:00pm<br />
                  Saturday: 8:00am – 4:00pm<br />
                  Sunday: By appointment
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Dialog open={showAdminPanel} onOpenChange={setShowAdminPanel}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ClipboardText size={24} weight="duotone" />
              Quote Requests Management
            </DialogTitle>
            <DialogDescription>
              View and manage all quote requests. Total: {(quotes || []).length} quotes • Newsletter subscribers: {(subscribers || []).length}
            </DialogDescription>
          </DialogHeader>

          {/* Owner dashboard stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(['new', 'contacted', 'quoted', 'completed'] as const).map(s => (
              <div key={s} className="rounded-lg border border-border p-3 text-center">
                <div className="text-2xl font-bold text-primary">{getQuotesByStatus(s).length}</div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{s}</div>
              </div>
            ))}
          </div>

          {/* Owner tools: search + CSV export */}
          <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
            <div className="relative flex-1">
              <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, phone, address, service..."
                value={quoteSearch}
                onChange={(e) => setQuoteSearch(e.target.value)}
                className="pl-9"
                aria-label="Search quotes"
              />
            </div>
            <Button
              variant="outline"
              onClick={exportQuotesCSV}
              className="flex items-center gap-2 shrink-0"
            >
              <Download size={16} />
              Export CSV
            </Button>
          </div>

          <Tabs defaultValue="new" className="flex-1 overflow-hidden flex flex-col">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="new" className="relative">
                New
                {getQuotesByStatus('new').length > 0 && (
                  <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {getQuotesByStatus('new').length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="contacted">
                Contacted
                {getQuotesByStatus('contacted').length > 0 && (
                  <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {getQuotesByStatus('contacted').length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="quoted">
                Quoted
                {getQuotesByStatus('quoted').length > 0 && (
                  <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {getQuotesByStatus('quoted').length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed
                {getQuotesByStatus('completed').length > 0 && (
                  <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {getQuotesByStatus('completed').length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            {(['new', 'contacted', 'quoted', 'completed'] as const).map((status) => {
              const filtered = filterBySearch(getQuotesByStatus(status))
              return (
              <TabsContent key={status} value={status} className="flex-1 overflow-y-auto mt-4 space-y-4">
                {filtered.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <ClipboardText size={48} className="mx-auto mb-4 opacity-20" />
                    <p>{quoteSearch ? `No matching ${status} quotes` : `No ${status} quotes`}</p>
                  </div>
                ) : (
                  filtered.map((quote) => (
                    <Card key={quote.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{quote.name}</CardTitle>
                            <CardDescription className="mt-1">
                              Submitted: {new Date(quote.submittedAt).toLocaleString()}
                            </CardDescription>
                          </div>
                          <Badge className={getStatusColor(quote.status)}>
                            {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-semibold text-muted-foreground mb-1">Contact Info</p>
                            <div className="space-y-1">
                              <a href={`mailto:${quote.email}`} className="flex items-center gap-2 text-sm hover:text-primary">
                                <EnvelopeSimple size={16} />
                                {quote.email}
                              </a>
                              <a href={`tel:${quote.phone}`} className="flex items-center gap-2 text-sm hover:text-primary">
                                <Phone size={16} />
                                {quote.phone}
                              </a>
                              {quote.address && (
                                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <MapPin size={16} />
                                  {quote.address}
                                </p>
                              )}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-muted-foreground mb-1">Project Details</p>
                            <div className="space-y-1 text-sm">
                              <p><span className="font-medium">Service:</span> {quote.serviceType}</p>
                              {quote.propertyType && (
                                <p><span className="font-medium">Property:</span> {quote.propertyType}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {quote.projectDescription && (
                          <div>
                            <p className="text-sm font-semibold text-muted-foreground mb-1">Description</p>
                            <p className="text-sm text-foreground bg-muted p-3 rounded-md">
                              {quote.projectDescription}
                            </p>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 pt-2 border-t">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedQuote(quote)}
                            className="flex items-center gap-2"
                          >
                            <Eye size={16} />
                            View Details
                          </Button>
                          {quote.status === 'new' && (
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => updateQuoteStatus(quote.id, 'contacted')}
                            >
                              Mark Contacted
                            </Button>
                          )}
                          {quote.status === 'contacted' && (
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => updateQuoteStatus(quote.id, 'quoted')}
                            >
                              Mark Quoted
                            </Button>
                          )}
                          {quote.status === 'quoted' && (
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => updateQuoteStatus(quote.id, 'completed')}
                            >
                              Mark Completed
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this quote?')) {
                                deleteQuote(quote.id)
                              }
                            }}
                            className="flex items-center gap-2 ml-auto"
                          >
                            <Trash size={16} />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            )})}
          </Tabs>
        </DialogContent>
      </Dialog>
      <Dialog open={selectedQuote !== null} onOpenChange={() => setSelectedQuote(null)}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          {selectedQuote && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedQuote.name}</DialogTitle>
                <DialogDescription>
                  Quote request details
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Status</Label>
                  <Badge className={`${getStatusColor(selectedQuote.status)} mt-1`}>
                    {selectedQuote.status.charAt(0).toUpperCase() + selectedQuote.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <Label>Submitted</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(selectedQuote.submittedAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label>Email</Label>
                  <a href={`mailto:${selectedQuote.email}`} className="text-sm text-primary hover:underline block mt-1">
                    {selectedQuote.email}
                  </a>
                </div>
                <div>
                  <Label>Phone</Label>
                  <a href={`tel:${selectedQuote.phone}`} className="text-sm text-primary hover:underline block mt-1">
                    {selectedQuote.phone}
                  </a>
                </div>
                {selectedQuote.address && (
                  <div>
                    <Label>Address</Label>
                    <p className="text-sm text-foreground mt-1">{selectedQuote.address}</p>
                  </div>
                )}
                <div>
                  <Label>Service Type</Label>
                  <p className="text-sm text-foreground mt-1">{selectedQuote.serviceType}</p>
                </div>
                {selectedQuote.propertyType && (
                  <div>
                    <Label>Property Type</Label>
                    <p className="text-sm text-foreground mt-1">{selectedQuote.propertyType}</p>
                  </div>
                )}
                {selectedQuote.projectDescription && (
                  <div>
                    <Label>Project Description</Label>
                    <p className="text-sm text-foreground mt-1 bg-muted p-3 rounded-md">
                      {selectedQuote.projectDescription}
                    </p>
                  </div>
                )}
                <div className="flex gap-2 pt-4 border-t">
                  <Select
                    value={selectedQuote.status}
                    onValueChange={(value) => updateQuoteStatus(selectedQuote.id, value as QuoteRequest['status'])}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="quoted">Quoted</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this quote?')) {
                        deleteQuote(selectedQuote.id)
                      }
                    }}
                    className="ml-auto"
                  >
                    <Trash size={16} className="mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      <footer className="bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div>
              <a href="#/" aria-label="Go to home page" className="inline-flex items-center mb-4">
                <img src={logoImage} alt="Medina Precision Painting" className="h-16 w-auto brightness-0 invert" />
              </a>
              <p className="text-sm opacity-80 leading-relaxed mb-4">
                Family-owned painting contractor serving Warner Robins and all of Georgia. Licensed, insured, and backed by a 2-year warranty.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-background/10 hover:bg-accent flex items-center justify-center transition-colors"
                >
                  <FacebookLogo size={18} weight="fill" />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-background/10 hover:bg-accent flex items-center justify-center transition-colors"
                >
                  <InstagramLogo size={18} weight="fill" />
                </a>
                <a
                  href="https://www.google.com/search?q=Medina+Precision+Painting"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google Business"
                  className="w-9 h-9 rounded-full bg-background/10 hover:bg-accent flex items-center justify-center transition-colors"
                >
                  <GoogleLogo size={18} weight="fill" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#/services" className="hover:opacity-100 hover:text-accent transition-colors">Our Process</a></li>
                <li><a href="#/services" className="hover:opacity-100 hover:text-accent transition-colors">Cost Estimator</a></li>
                <li><a href="#palettes" className="hover:opacity-100 hover:text-accent transition-colors">Color Inspiration</a></li>
                <li><a href="#warranty" className="hover:opacity-100 hover:text-accent transition-colors">Warranty</a></li>
                <li><a href="#faq" className="hover:opacity-100 hover:text-accent transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li className="flex items-start gap-2">
                  <Phone size={16} weight="bold" className="mt-0.5 shrink-0" />
                  <a href="tel:4789552341" className="hover:opacity-100 hover:text-accent transition-colors">(478) 955-2341</a>
                </li>
                <li className="flex items-start gap-2">
                  <EnvelopeSimple size={16} weight="bold" className="mt-0.5 shrink-0" />
                  <a href="mailto:azianninja1295@gmail.com" className="hover:opacity-100 hover:text-accent transition-colors break-all">azianninja1295@gmail.com</a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={16} weight="bold" className="mt-0.5 shrink-0" />
                  <span>Warner Robins, GA<br />Serving all of Georgia</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock size={16} weight="bold" className="mt-0.5 shrink-0" />
                  <span>Mon–Fri 7am–6pm<br />Sat 8am–4pm</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Painting Tips Newsletter</h4>
              <p className="text-sm opacity-80 mb-3">
                Get color tips, maintenance advice, and seasonal offers — no spam.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
                <Input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
                  aria-label="Email address"
                />
                <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">
                  <PaperPlaneTilt size={16} className="mr-2" />
                  Subscribe
                </Button>
              </form>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs opacity-70">
                <CreditCard size={16} weight="duotone" />
                <span>We accept: Cash, Check, Visa, Mastercard, Amex</span>
              </div>
            </div>
          </div>

          <div className="border-t border-background/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm opacity-80">
            <p>© {new Date().getFullYear()} Medina Precision Painting. All rights reserved.</p>
            <p>Licensed, Bonded &amp; Insured • Family-Owned &amp; Operated • EPA Lead-Safe Practices</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App
