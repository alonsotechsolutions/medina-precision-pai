import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, Ca
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
  MapPin, 
import { 
  ShieldCheck,
  House, 
  CurrencyDol
  Palette, 
  Image a
  EnvelopeSimple, 
import { t
  CheckCircle,
  Sparkle,
  Clock,
    phone: '',
  Star,
    addre
  Calendar,
  CurrencyDollar,
  Lightbulb,
  PaintBucket,
  Hammer,
  Image as ImageIcon,
  Users,
    set
} from '@phosphor-icons/react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import logoImage from '@/assets/images/Logo.png'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
      icon: Bu
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
      description: 'Not sure which colors to choose
    }


    { icon: Sparkle, text: 'Treat Your Home Like
  ]
  const testimonials = [
      name: 'Jennifer Mart
      rating: 5,
    },
      name: 'Dav
      rating: 5,
    },
      name: 'Sarah Williams',
      rating: 5,
    }

   

    { title: 'Commer
  ]
  const serviceAre
    'Bonaire', 'Kathleen', 'Hawki

    hidden: { opacity: 0 },
      
     
    }

    hidden: { opacity: 0, y: 20 },
      opacity: 1,
      
     
  }
  return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between h-24">
      
     
              </div>
            <div className="flex it
                <Phone size={18} weight="bold" />
              </a>
      
     
                </D
                  <DialogHeade
                    <DialogDescription>
                    </DialogDescription>
      
     
                      
                        value={for
                        placeholder="John Smith"
                    </div>
    }
  ]

                    
                      />
                    <div className="space-y-2">
                      <Input
                        type="tel"
   

  const testimonials = [
     
                        id="addr
                        onChange={(e
      rating: 5,
                    <div className="space-y-2">
    },
     
                      >
                          <S
      rating: 5,
                          <SelectItem value="exterior">Exterior Painting</SelectItem>
    },
     
      name: 'Sarah Williams',
                    <div cla
      rating: 5,
                        value={formData.propertyType}
    }
  ]

                         
                      </Select>
                    <div className="space-y-2">
                      <Textarea
                        value={formData.projectDescription}
                        placeholder="Tell us about your project (
                      />
   

                </Dialog
            </div>
        </div>


          animate={{ opacity:
    hidden: { opacity: 0 },
            <D
                G
            </Dialo
        </motion.div>

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
                <m
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
                          <CardDescription>{testimonial.location}</CardD
                      </div>
                    <CardContent>
                    </CardContent>
                </motion.div>
            </div>
        </section>
        <section className="py-20 bg-muted/30">
            <motion.div
              whileInView={{ opacity: 1,
              className="text-c
              <h2 classNam
              </h2>
                As a family business, we bring personal care, integrity, and
            </motion.div>
              {[
                { icon: Users, title: 'Family-Trained
                { icon: CurrencyDollar, title: 'Family-Friendly Pricing', desc: 'Honest estimates wi
                { icon:
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true
                  className="flex flex-
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-
                  </div>
                    <h3 className="font-
                  </div>
              ))}
            <motion.div
              whileInView={{ opacity: 1 }}
              className="grid s
              {[
                'Thorough surface preparation with attentio
                'Daily cleanup—we respect your family space',
                'Lead-safe certified to protect children and families'
                <motion.div
                  initia
                  viewport
                  className="flex items-start gap-3"
                  <CheckCircle size=
                </motion.div>
            </motion.div>
        </section>
        <section classN
            <div c
                
              
               

                  Medina Pr
                <p 
                </p>
                  <Badge variant="second
                  <Badge variant="secondary">Full
         
              <motion.div
                whileInView={{ opac
                className="relative"
                <div className
                </div>
            </div>
        </section>
        <section clas
        

              className="text-
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              </h2>
                Proudly serving families and businesses in these Central Georgia communities
            </motio
              {serviceAreas.map((area, index) => (
                  key={
                  whileInView={{ opacity: 1, 
                  transition={{ delay: index
                  <Badge variant="outline" c
                  </Badge>
             
          </div>

          <div className="absolute inset-0 opacity-5" style={{
          }}></div>
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
            >
                Ready to Transform Your Space?
              <p className="text-lg mb-8 text-primary-foreground/90 max-w-2
              </p>
                <DialogTrigger asChild>
                    <Calendar size={20} className="mr-2" />
                  </Button>
              </Dialog>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              initial={{ opacity: 0, y: 20 
              viewport={{ once: true }}
            >
                Get In
              <p classNam
              </p>
            <div classNam
                
                vi

                <div className="w-14 h-14 round
                </div>
                <a href="tel:4789552341" className="text-muted-fore
                </a>
              <motion.div
                whileInView={
                transition={{ delay: 0.2 }}
              >
                  <EnvelopeSimple size={28}
                <h3 className="font-semibold mb-2">Em
                  info@medinaprecisionpainting.com
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
                See the quality and attention to detail that goes into every Medina Family Painting project.
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
                Why Choose Medina Family Painting
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

              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Phone size={28} weight="duotone" className="text-primary" />

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

              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <EnvelopeSimple size={28} weight="duotone" className="text-primary" />

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

              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin size={28} weight="duotone" className="text-primary" />

                <h3 className="font-semibold mb-2">Service Area</h3>
                <p className="text-muted-foreground">
                  Warner Robins<br />& Central Georgia
                </p>
              </motion.div>
            </div>
          </div>

      </main>

      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">

              <img src={logoImage} alt="Medina Precision Painting" className="h-12 w-auto brightness-0 invert" />

            <div className="text-center md:text-right text-sm opacity-80">
              <p>© 2024 Medina Precision Painting. All rights reserved.</p>
              <p className="mt-1">Licensed, Bonded & Insured • Family-Owned & Operated</p>

          </div>

      </footer>

  )



