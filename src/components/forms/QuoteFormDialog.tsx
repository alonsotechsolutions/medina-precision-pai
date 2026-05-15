import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useQuoteForm } from '@/contexts/QuoteFormContext'
import { SERVICE_OPTIONS } from '@/types/quote'

export const QuoteFormDialog = () => {
  const { formData, setFormData, isDialogOpen, setIsDialogOpen, submitQuote } = useQuoteForm()

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request a Free Quote</DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll contact you within 24 hours with a detailed estimate.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitQuote} className="space-y-4 mt-4">
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
            <Label>Service Type *</Label>
            <p className="text-xs text-muted-foreground">
              Select all that apply.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {SERVICE_OPTIONS.map(opt => {
                const checked = formData.serviceTypes.includes(opt.value)
                const toggle = (next: boolean) => {
                  setFormData(prev => ({
                    ...prev,
                    serviceTypes: next
                      ? [...prev.serviceTypes, opt.value]
                      : prev.serviceTypes.filter(v => v !== opt.value),
                  }))
                }
                return (
                  <label
                    key={opt.value}
                    htmlFor={`service-${opt.value}`}
                    className={`flex items-center gap-2 rounded-md border p-2 text-sm cursor-pointer transition-colors ${checked ? 'border-primary bg-primary/5' : 'border-input hover:bg-muted/40'}`}
                  >
                    <Checkbox
                      id={`service-${opt.value}`}
                      checked={checked}
                      onCheckedChange={(value) => toggle(value === true)}
                    />
                    <span>{opt.label}</span>
                  </label>
                )
              })}
            </div>
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
  )
}
