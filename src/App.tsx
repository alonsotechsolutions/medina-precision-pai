import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
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
  ShieldCheck
} from '@phosphor-icons/react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    projectDescription: '',
    propertyType: ''
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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
      propertyType: ''
    })
  }

  const services = [
    {
      icon: House,
      title: 'Interior Painting',
      description: 'Transform your living spaces with expert interior painting. From single rooms to whole-home refreshes.'
    },
    {
      icon: Buildings,
      title: 'Exterior Painting',
      description: 'Protect and beautify your property with durable exterior painting that withstands the elements.'
    },
    {
      icon: Palette,
      title: 'Specialty Finishes',
      description: 'Unique decorative finishes, textures, and custom color matching for distinctive results.'
    }
  ]

  const benefits = [
    { icon: ShieldCheck, text: 'Licensed & Insured' },
    { icon: Clock, text: '15+ Years Experience' },
    { icon: Sparkle, text: 'Satisfaction Guaranteed' },
    { icon: CheckCircle, text: 'Free Estimates' }
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <PaintBrush size={28} weight="duotone" className="text-primary" />
              <span className="text-xl font-bold text-foreground">ColorCraft Painting</span>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Get Free Quote
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
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
                        <SelectItem value="specialty">Specialty Finishes</SelectItem>
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
                      placeholder="Tell us about your project..."
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
      </header>

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
              <Badge className="mb-4 bg-accent text-accent-foreground">Trusted Since 2008</Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}>
                Professional Painting Services That Transform Your Space
              </h1>
              <p className="text-lg sm:text-xl mb-8 text-primary-foreground/90 leading-relaxed">
                Expert interior and exterior painting for residential and commercial properties. Quality craftsmanship, premium materials, and exceptional results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-base">
                      Get Free Quote
                    </Button>
                  </DialogTrigger>
                </Dialog>
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  <Phone size={20} className="mr-2" />
                  (555) 123-4567
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
                Our Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From single rooms to entire properties, we deliver exceptional painting services tailored to your needs.
              </p>
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6"
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
                      <CardDescription className="text-base leading-relaxed">
                        {service.description}
                      </CardDescription>
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
                Why Choose ColorCraft
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're committed to delivering outstanding results and exceptional customer service on every project.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
            >
              {[
                'Premium quality paints and materials',
                'Detailed preparation and clean execution',
                'Respectful of your home and schedule',
                'Transparent pricing with no surprises',
                'Fully licensed, bonded, and insured',
                'Warranty on all workmanship'
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
                  About ColorCraft Painting
                </h2>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  With over 15 years of experience serving homeowners and businesses throughout the region, ColorCraft Painting has built a reputation for excellence, reliability, and exceptional craftsmanship.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Our team of skilled painters takes pride in every project, treating your property with the same care and attention we'd give our own homes. From meticulous surface preparation to the final coat, we ensure every detail meets our high standards.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">EPA Certified</Badge>
                  <Badge variant="secondary">Lead-Safe Certified</Badge>
                  <Badge variant="secondary">Fully Insured</Badge>
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
              <p className="text-lg mb-8 text-primary-foreground/90">
                Get your free, no-obligation quote today. We'll provide a detailed estimate and answer all your questions.
              </p>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    Request Free Quote
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
                <a href="tel:5551234567" className="text-muted-foreground hover:text-primary transition-colors">
                  (555) 123-4567
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
                <a href="mailto:info@colorcraftpainting.com" className="text-muted-foreground hover:text-primary transition-colors">
                  info@colorcraftpainting.com
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
                  Greater Metro Area<br />& Surrounding Communities
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <PaintBrush size={24} weight="duotone" />
              <span className="font-bold">ColorCraft Painting</span>
            </div>
            <div className="text-center md:text-right text-sm opacity-80">
              <p>© 2024 ColorCraft Painting. All rights reserved.</p>
              <p className="mt-1">Licensed, Bonded & Insured</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
