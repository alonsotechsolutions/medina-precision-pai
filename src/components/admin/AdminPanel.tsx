import { useMemo, useState } from 'react'
import {
  ClipboardText,
  Download,
  EnvelopeSimple,
  Eye,
  MagnifyingGlass,
  MapPin,
  Phone,
  Trash,
} from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useQuoteForm } from '@/contexts/QuoteFormContext'
import { useNewsletter } from '@/contexts/NewsletterContext'
import { formatServices, getQuoteServices } from '@/lib/quote-helpers'
import type { QuoteRequest } from '@/types/quote'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const getStatusColor = (status: QuoteRequest['status']) => {
  switch (status) {
    case 'new':       return 'bg-accent text-accent-foreground'
    case 'contacted': return 'bg-secondary text-secondary-foreground'
    case 'quoted':    return 'bg-primary text-primary-foreground'
    case 'completed': return 'bg-muted text-muted-foreground'
  }
}

export const AdminPanel = ({ open, onOpenChange }: Props) => {
  const { quotes, setQuotes } = useQuoteForm()
  const { subscribers } = useNewsletter()
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null)
  const [quoteSearch, setQuoteSearch] = useState('')

  const allQuotes = quotes || []

  const getQuotesByStatus = (status: QuoteRequest['status']) =>
    allQuotes.filter(q => q.status === status)

  const filterBySearch = (list: QuoteRequest[]) => {
    const term = quoteSearch.trim().toLowerCase()
    if (!term) return list
    return list.filter(q => {
      const services = formatServices(getQuoteServices(q)).toLowerCase()
      return (
        q.name.toLowerCase().includes(term) ||
        q.email.toLowerCase().includes(term) ||
        q.phone.toLowerCase().includes(term) ||
        (q.address || '').toLowerCase().includes(term) ||
        services.includes(term) ||
        (q.propertyType || '').toLowerCase().includes(term) ||
        (q.projectDescription || '').toLowerCase().includes(term)
      )
    })
  }

  const updateQuoteStatus = (id: string, status: QuoteRequest['status']) => {
    setQuotes(current => (current || []).map(q => (q.id === id ? { ...q, status } : q)))
    if (selectedQuote?.id === id) setSelectedQuote(prev => (prev ? { ...prev, status } : prev))
  }

  const deleteQuote = (id: string) => {
    setQuotes(current => (current || []).filter(q => q.id !== id))
    if (selectedQuote?.id === id) setSelectedQuote(null)
  }

  const exportQuotesCSV = () => {
    if (allQuotes.length === 0) return
    const escape = (v: string | undefined) => {
      const s = (v ?? '').replace(/"/g, '""')
      return /[",\n]/.test(s) ? `"${s}"` : s
    }
    const headers = [
      'id', 'name', 'email', 'phone', 'address', 'serviceTypes',
      'propertyType', 'preferredDate', 'budgetRange', 'referralSource',
      'projectDescription', 'status', 'submittedAt',
    ]
    const rows = allQuotes.map(q => [
      q.id, q.name, q.email, q.phone, q.address || '',
      formatServices(getQuoteServices(q)),
      q.propertyType || '', q.preferredDate || '', q.budgetRange || '',
      q.referralSource || '', q.projectDescription || '', q.status, q.submittedAt,
    ].map(escape).join(','))
    const csv = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `medina-quotes-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const subscribersCount = useMemo(() => (subscribers || []).length, [subscribers])

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ClipboardText size={24} weight="duotone" />
              Quote Requests Management
            </DialogTitle>
            <DialogDescription>
              View and manage all quote requests. Total: {allQuotes.length} quotes • Newsletter subscribers: {subscribersCount}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(['new', 'contacted', 'quoted', 'completed'] as const).map(s => (
              <div key={s} className="rounded-lg border border-border p-3 text-center">
                <div className="text-2xl font-bold text-primary">{getQuotesByStatus(s).length}</div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{s}</div>
              </div>
            ))}
          </div>

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
              {(['new', 'contacted', 'quoted', 'completed'] as const).map(s => (
                <TabsTrigger key={s} value={s} className="relative">
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                  {getQuotesByStatus(s).length > 0 && (
                    <Badge
                      variant={s === 'new' ? undefined : 'secondary'}
                      className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {getQuotesByStatus(s).length}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
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
                                <p><span className="font-medium">Service:</span> {formatServices(getQuoteServices(quote)) || 'Not specified'}</p>
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
                              <Button size="sm" variant="secondary" onClick={() => updateQuoteStatus(quote.id, 'contacted')}>
                                Mark Contacted
                              </Button>
                            )}
                            {quote.status === 'contacted' && (
                              <Button size="sm" variant="secondary" onClick={() => updateQuoteStatus(quote.id, 'quoted')}>
                                Mark Quoted
                              </Button>
                            )}
                            {quote.status === 'quoted' && (
                              <Button size="sm" variant="secondary" onClick={() => updateQuoteStatus(quote.id, 'completed')}>
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
              )
            })}
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
                  <p className="text-sm text-foreground mt-1">{formatServices(getQuoteServices(selectedQuote)) || 'Not specified'}</p>
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
    </>
  )
}
