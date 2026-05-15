import { ShieldCheck } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

export const WarrantySection = () => (
  <section id="warranty" data-page="about" className="py-20 bg-muted/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="overflow-hidden max-w-5xl mx-auto">
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
)
