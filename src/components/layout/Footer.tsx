import {
  Clock,
  CreditCard,
  EnvelopeSimple,
  FacebookLogo,
  GoogleLogo,
  InstagramLogo,
  MapPin,
  PaperPlaneTilt,
  Phone,
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNewsletter } from '@/contexts/NewsletterContext'
import logoImage from '@/assets/images/Logo.png'

export const Footer = () => {
  const { email, setEmail, submit } = useNewsletter()

  return (
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
            <form onSubmit={submit} className="flex flex-col gap-2">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
  )
}
