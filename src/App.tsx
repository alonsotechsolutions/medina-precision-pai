import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
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
  Quotes
} from '@phosphor-icons/react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import logoImage from '@/assets/images/Logo.png'

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

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingCTA(window.scrollY > 800)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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

  const services = [
    {
      icon: House,
      title: 'Interior Painting',
      description: 'Transform your living spaces with expert interior painting that brings new life to every room.',
      features: ['Wall & ceiling painting', 'Trim & door refinishing', 'Color consultation', 'Smooth, flawless finish']
    },
    {
      icon: Palette,
      title: 'Exterior Painting',
      description: 'Protect and beautify your home\'s exterior with durable, weather-resistant paint solutions.',
      features: ['House painting', 'Deck & fence staining', 'Power washing', 'Surface preparation']
    },
    {
      icon: PaintBrush,
      title: 'Cabinet Refinishing',
      description: 'Modernize your kitchen or bathroom with professional cabinet painting and refinishing services.',
      features: ['Kitchen cabinets', 'Bathroom vanities', 'Built-in furniture', 'Custom color matching']
    },
    {
      icon: Sparkle,
      title: 'Pressure Washing',
      description: 'Restore your property\'s appearance with thorough pressure washing services.',
      features: ['House washing', 'Driveway cleaning', 'Deck restoration', 'Pre-paint preparation']
    },
    {
      icon: ShieldCheck,
      title: 'Commercial Painting',
      description: 'Professional painting services for offices, retail spaces, and commercial properties.',
      features: ['Minimal disruption', 'Flexible scheduling', 'Large-scale projects', 'Quality materials']
    },
    {
      icon: Medal,
      title: 'Specialty Finishes',
      description: 'Unique textures, patterns, and custom finishes to make your space truly distinctive.',
      features: ['Decorative painting', 'Accent walls', 'Textured finishes', 'Custom designs']
    }
  ]

  const testimonials = [
    {
      name: 'Jennifer Martinez',
      location: 'Warner Robins, GA',
      rating: 5,
      text: 'Medina Precision Painting did an amazing job on our home. Professional, punctual, and the quality is outstanding. Highly recommend!'
    },
    {
      name: 'David Thompson',
      location: 'Macon, GA',
      rating: 5,
      text: 'Best painting company in Central Georgia! They transformed our office space and stayed on budget. Will definitely use them again.'
    },
    {
      name: 'Sarah Williams',
      location: 'Perry, GA',
      rating: 5,
      text: 'From the free estimate to the final walkthrough, everything was handled with care and professionalism. Our house looks brand new!'
    }
  ]

  const galleryImages = [
    { title: 'Modern Living Room', category: 'Interior' },
    { title: 'Victorian Exterior', category: 'Exterior' },
    { title: 'Kitchen Cabinet Refresh', category: 'Cabinets' },
    { title: 'Commercial Office', category: 'Commercial' },
    { title: 'Deck Staining', category: 'Exterior' },
    { title: 'Accent Wall Design', category: 'Interior' }
  ]

  const serviceAreas = [
    'Warner Robins', 'Macon', 'Perry', 'Centerville', 'Byron', 'Fort Valley',
    'Bonaire', 'Kathleen', 'Hawkinsville', 'Eastman', 'Dublin', 'Milledgeville'
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
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <img src={logoImage} alt="Medina Precision Painting" className="h-14 w-auto" />
            </div>
            <div className="flex items-center gap-4">
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

      <main className="pt-20">
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
                Family-owned painting business serving Warner Robins and Central Georgia since 2006. Professional craftsmanship, honest pricing, and outstanding results guaranteed.
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
                  { icon: Medal, text: '18+ Years Experience' },
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
                From residential homes to commercial properties, we deliver exceptional painting services tailored to your needs.
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
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-border hover:border-primary transition-all duration-300"
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <ImageIcon size={48} weight="duotone" className="text-primary/40 mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">{image.title}</h3>
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
                Don't just take our word for it. Here's what Central Georgia homeowners and businesses say about working with us.
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
                { icon: Medal, title: 'Professional Business', desc: 'Trusted painting business serving Central Georgia with pride' },
                { icon: Users, title: 'Expert Craftsmen', desc: 'Trained, background-checked professionals on every crew' },
                { icon: ShieldCheck, title: 'Fully Insured', desc: '$2M liability coverage and workers compensation' },
                { icon: CurrencyDollar, title: 'Upfront Pricing', desc: 'Detailed estimates with no hidden fees or surprises' },
                { icon: Sparkle, title: '2-Year Warranty', desc: 'All labor and materials backed by our guarantee' },
                { icon: Calendar, title: 'Flexible Scheduling', desc: 'Work around your schedule with minimal disruption' }
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
                'Premium Sherwin-Williams and Benjamin Moore paints',
                'Thorough surface preparation and priming',
                'Protection of furniture and flooring',
                'Daily cleanup and job site maintenance',
                'Color matching and consultation services',
                'Lead-safe certified for older homes'
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
                  Medina Precision Painting is a trusted painting business serving homeowners and businesses throughout Warner Robins and Central Georgia. We bring generations of painting expertise and a commitment to precision in every project.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  We take pride in every project, treating your property with the same care and attention we'd give our own homes. From meticulous surface preparation to the final coat, we ensure every detail meets our high standards and exceeds your expectations.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">EPA Lead-Safe Certified</Badge>
                  <Badge variant="secondary">Fully Licensed & Bonded</Badge>
                  <Badge variant="secondary">$2M Liability Insurance</Badge>
                  <Badge variant="secondary">BBB Accredited</Badge>
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
                Serving Warner Robins & Central Georgia
              </h2>
              <p className="text-muted-foreground mb-6">
                Proudly providing professional painting services to the following communities within 1.5 hours of Warner Robins
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
                  Warner Robins<br />& Central Georgia
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <img src={logoImage} alt="Medina Precision Painting" className="h-12 w-auto brightness-0 invert" />
            </div>
            <div className="text-center md:text-right text-sm opacity-80">
              <p>© 2024 Medina Precision Painting. All rights reserved.</p>
              <p className="mt-1">Licensed, Bonded & Insured • Family-Owned & Operated</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
