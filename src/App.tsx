import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  PaintBrush, 
  House, 
  Buildings, 
  Palette, 
  Phone, 
  EnvelopeSimple, 
  MapPin, 
  CheckCircle,
  Sparkle,
  Clock,
  ShieldCheck,
  Star,
  Quotes,
  Calendar,
  CurrencyDollar,
  Lightbulb,
  PaintBucket,
  Hammer,
  Image as ImageIcon,
  Users,
  Medal
} from '@phosphor-icons/react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import logoImage from '@/assets/images/Logo.png'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    projectDescription: '',
    propertyType: '',
    address: ''
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
    toast.success('Quote request received! We\'ll contact you within 24 hours.')
    setIsDialogOpen(false)
    setFormData({
      name: '',
      email: '',
      phone: '',
      serviceType: '',
      projectDescription: '',
      propertyType: '',
      address: ''
    })
  }

  const services = [
    {
      icon: House,
      title: 'Interior Painting',
      description: 'Transform your living spaces with flawless interior painting. We handle everything from single rooms to whole-home makeovers with precision and care.',
      features: ['All room types', 'Trim & baseboards', 'Ceiling painting', 'Wallpaper removal']
    },
    {
      icon: Buildings,
      title: 'Exterior Painting',
      description: 'Protect and enhance your property with premium exterior painting that stands up to Georgia weather.',
      features: ['Full exterior', 'Deck & fence staining', 'Power washing', 'Wood repair']
    },
    {
      icon: Palette,
      title: 'Cabinet Refinishing',
      description: 'Give your kitchen a fresh look without the cost of replacement. Expert cabinet painting and refinishing.',
      features: ['Kitchen cabinets', 'Bathroom vanities', 'Built-in shelving', 'Color consultation']
    },
    {
      icon: PaintBucket,
      title: 'Commercial Painting',
      description: 'Professional painting services for offices, retail spaces, and commercial properties with minimal disruption.',
      features: ['Office buildings', 'Retail spaces', 'Warehouses', 'After-hours scheduling']
    },
    {
      icon: Hammer,
      title: 'Drywall Repair',
      description: 'Complete drywall and plaster repair services to ensure a smooth, flawless painted surface.',
      features: ['Hole repair', 'Texture matching', 'Water damage', 'Crack repair']
    },
    {
      icon: Lightbulb,
      title: 'Color Consultation',
      description: 'Not sure which colors to choose? Our expert color consultants will help you find the perfect palette.',
      features: ['In-home consultation', 'Sample testing', 'Trend guidance', 'Lighting analysis']
    }
  ]

  const benefits = [
    { icon: ShieldCheck, text: 'Family-Owned & Operated' },
    { icon: Clock, text: '18+ Years Serving Families' },
    { icon: Sparkle, text: 'Treat Your Home Like Ours' },
    { icon: CurrencyDollar, text: 'Honest Family Pricing' }
  ]

  const testimonials = [
    {
      name: 'Jennifer Martinez',
      location: 'Warner Robins, GA',
      rating: 5,
      text: 'The Medina family did an amazing job painting our family home. They were respectful, patient with our kids, and treated our house like their own. A family business you can truly trust!'
    },
    {
      name: 'David Chen',
      location: 'Macon, GA',
      rating: 5,
      text: 'As a father of three, I appreciated how careful and clean they were. They worked around our family schedule and the kids loved watching them work. True professionals with family values!'
    },
    {
      name: 'Sarah Williams',
      location: 'Perry, GA',
      rating: 5,
      text: 'It\'s rare to find a family business that cares this much. They treated us like extended family and the results are beautiful. Our home has never looked better!'
    }
  ]

  const galleryImages = [
    { title: 'Modern Living Room', category: 'Interior' },
    { title: 'Exterior Transformation', category: 'Exterior' },
    { title: 'Kitchen Cabinet Refresh', category: 'Cabinets' },
    { title: 'Master Bedroom Suite', category: 'Interior' },
    { title: 'Commercial Office Space', category: 'Commercial' },
    { title: 'Historic Home Exterior', category: 'Exterior' }
  ]

  const serviceAreas = [
    'Warner Robins', 'Macon', 'Perry', 'Fort Valley', 'Byron', 'Centerville',
    'Bonaire', 'Kathleen', 'Hawkinsville', 'Cochran', 'Dublin', 'Milledgeville'
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
                        placeholder="123 Main St, Atlanta, GA"
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
                          <SelectItem value="both">Interior & Exterior</SelectItem>
                          <SelectItem value="cabinets">Cabinet Refinishing</SelectItem>
                          <SelectItem value="commercial">Commercial Painting</SelectItem>
                          <SelectItem value="drywall">Drywall Repair</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="property-type">Property Type *</Label>
                      <Select
                        required
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
                      <Label htmlFor="description">Project Description</Label>
                      <Textarea
                        id="description"
                        value={formData.projectDescription}
                        onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                        placeholder="Tell us about your project (rooms, square footage, timeline, etc.)"
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg">
                Get Free Quote
              </Button>
            </DialogTrigger>
          </Dialog>
        </motion.div>
      )}

      <main className="pt-16">
        <section className="relative bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 11px)`
          }}></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <Badge className="mb-4 bg-accent text-accent-foreground">Family-Owned Since 2006</Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}>
                Your Trusted Family Painting Partners in Warner Robins
              </h1>
              <p className="text-lg sm:text-xl mb-8 text-primary-foreground/90 leading-relaxed">
                As a family-owned business, we treat your home like our own. Professional painting services for families and businesses throughout Central Georgia with honest pricing and workmanship you can trust.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-base">
                      <Calendar size={20} className="mr-2" />
                      Schedule Free Estimate
                    </Button>
                  </DialogTrigger>
                </Dialog>
                <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  <a href="tel:4789552341">
                    <Phone size={20} className="mr-2" />
                    (478) 955-2341
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center text-center gap-2"
                >
                  <benefit.icon size={32} weight="duotone" className="text-primary" />
                  <span className="text-sm font-semibold text-foreground">{benefit.text}</span>
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
                Complete Painting Solutions
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From family homes to local businesses, we deliver exceptional painting services with personal care and attention.
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
                See how we've helped Central Georgia families transform their homes with care and precision.
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
                Don't just take our word for it. Here's what Central Georgia families say about working with the Medina family.
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
                The Medina Family Difference
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                As a family business, we bring personal care, integrity, and generations of craftsmanship to every home we serve.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
              {[
                { icon: Medal, title: 'Multi-Generation Expertise', desc: 'Family painting traditions passed down through generations' },
                { icon: Users, title: 'Family-Trained Crews', desc: 'Many of our team members are family or trained by family' },
                { icon: ShieldCheck, title: 'Family Peace of Mind', desc: 'Fully insured with $2M liability coverage for your protection' },
                { icon: CurrencyDollar, title: 'Family-Friendly Pricing', desc: 'Honest estimates with no hidden fees—we treat you fairly' },
                { icon: Sparkle, title: 'Family Guarantee', desc: '2-year warranty backed by our family name and reputation' },
                { icon: Calendar, title: 'Respectful Scheduling', desc: 'We work around your family\'s schedule and routines' }
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
                'Family-safe, low-VOC premium paints for healthier homes',
                'Thorough surface preparation with attention to detail',
                'Careful protection of your family\'s furniture and belongings',
                'Daily cleanup—we respect your family space',
                'Personalized color consultation for your family\'s style',
                'Lead-safe certified to protect children and families'
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
                  About the Medina Family
                </h2>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  Medina Precision Painting is a proud family-owned business serving families and businesses throughout Warner Robins and Central Georgia since 2006. What started as one family member with a paintbrush and a dream has grown into a trusted name, with family values at the heart of everything we do.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  We understand that your home is where your family creates memories, and we treat it with the same love and care we give our own. Our family teaches the next generation the importance of honest work, attention to detail, and treating customers like extended family. When you hire us, you're not just getting painters—you're getting the Medina family commitment to excellence.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Family-Owned & Operated</Badge>
                  <Badge variant="secondary">EPA Lead-Safe Certified</Badge>
                  <Badge variant="secondary">Fully Licensed & Insured</Badge>
                  <Badge variant="secondary">Multi-Generation Expertise</Badge>
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
                Proudly serving families and businesses in these Central Georgia communities
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
                Get your free, no-obligation estimate today. We'll visit your home, listen to your family's needs, and provide an honest quote with transparent pricing.
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
                The Medina family is here to answer your questions and help bring your vision to life.
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
            <div className="flex items-center">
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
