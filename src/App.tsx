import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  Eye
} from '@phosphor-icons/react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { useKV } from '@github/spark/hooks'
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
    projectDescription: ''
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showFloatingCTA, setShowFloatingCTA] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null)
  
  const [quotes, setQuotes] = useKV<QuoteRequest[]>('quote-requests', [])

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingCTA(window.scrollY > 800)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const checkOwner = async () => {
      const user = await window.spark.user()
      if (user) {
        setIsOwner(user.isOwner)
      }
    }
    checkOwner()
  }, [])

  const sendEmailNotification = async (quote: QuoteRequest) => {
    try {
      const promptText = `Generate a professional email notification for a new quote request for Medina Precision Painting. 

Business Details:
- Business Name: Medina Precision Painting
- Phone: (478) 955-2341
- Email: info@medinaprecisionpainting.com

Quote Request Details:
- Customer Name: ${quote.name}
- Email: ${quote.email}
- Phone: ${quote.phone}
- Address: ${quote.address || 'Not provided'}
- Service Type: ${quote.serviceType}
- Property Type: ${quote.propertyType || 'Not specified'}
- Project Description: ${quote.projectDescription || 'No description provided'}
- Submitted: ${new Date(quote.submittedAt).toLocaleString()}

Generate a JSON object with the following structure:
{
  "subject": "New Quote Request from [Customer Name]",
  "body": "Professional email body in plain text format with all the details organized clearly"
}

Make the email professional, concise, and include all relevant customer information.`

      const emailContent = await window.spark.llm(promptText, 'gpt-4o-mini', true)
      const parsedEmail = JSON.parse(emailContent)
      
      console.log('📧 Email Notification Generated:', parsedEmail)
      toast.info('Email notification prepared', {
        description: `Quote request from ${quote.name} logged for review`
      })
      
      return parsedEmail
    } catch (error) {
      console.error('Failed to generate email notification:', error)
      toast.error('Could not prepare email notification')
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
      projectDescription: ''
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
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <div className="flex items-center">
              <img src={logoImage} alt="Medina Precision Painting" className="h-20 w-auto" />
            </div>
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
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Smith"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Property Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="123 Main St, Warner Robins, GA"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service-type">Service Type *</Label>
                      <Select
                        required
                        value={formData.serviceType}
                        onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                      >
                        <SelectTrigger id="service-type">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="interior">Interior Painting</SelectItem>
                          <SelectItem value="exterior">Exterior Painting</SelectItem>
                          <SelectItem value="cabinets">Cabinet Refinishing</SelectItem>
                          <SelectItem value="commercial">Commercial Painting</SelectItem>
                          <SelectItem value="pressure-washing">Pressure Washing</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="property-type">Property Type</Label>
                      <Select
                        value={formData.propertyType}
                        onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                      >
                        <SelectTrigger id="property-type">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">Residential</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-description">Project Description</Label>
                      <Textarea
                        id="project-description"
                        value={formData.projectDescription}
                        onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                        placeholder="Tell us about your project (optional)"
                        rows={4}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      Submit Request
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
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
      <main className="pt-24 text-lg">
        <section className="relative py-24 sm:py-32 bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
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

        <section className="py-20 bg-background">
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
          </div>
        </section>

        <section className="py-20 bg-muted/30">
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
          </div>
        </section>

        <section className="py-20 bg-background">
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
          </div>
        </section>

        <section className="py-20 bg-muted/30">
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

        <section className="py-20 bg-background">
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

        <section className="py-16 bg-muted/30">
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

        <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
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

        <section className="py-20 bg-background">
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
            <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
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
                <a href="mailto:info@medinaprecisionpainting.com" className="text-muted-foreground hover:text-primary transition-colors">
                  info@medinaprecisionpainting.com
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
                  Warner Robins<br />& All of Georgia
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
              View and manage all quote requests. Total: {(quotes || []).length} quotes
            </DialogDescription>
          </DialogHeader>
          
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

            {(['new', 'contacted', 'quoted', 'completed'] as const).map((status) => (
              <TabsContent key={status} value={status} className="flex-1 overflow-y-auto mt-4 space-y-4">
                {getQuotesByStatus(status).length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <ClipboardText size={48} className="mx-auto mb-4 opacity-20" />
                    <p>No {status} quotes</p>
                  </div>
                ) : (
                  getQuotesByStatus(status).map((quote) => (
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
            ))}
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
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <img src={logoImage} alt="Medina Precision Painting" className="h-16 w-auto brightness-0 invert" />
            </div>
            <div className="text-center md:text-right text-sm opacity-80">
              <p>© 2024 Medina Precision Painting. All rights reserved.</p>
              <p className="mt-1">Licensed, Bonded & Insured • Family-Owned & Operated</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App
