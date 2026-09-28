import { Phone, ClipboardText } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { useQuoteForm } from '@/contexts/QuoteFormContext'
import { navTabs } from '@/data/navigation'
import type { PageKey } from '@/data/navigation'
import logoImage from '@/assets/images/Logo.png'
import { buildPhoneHref, BUSINESS_PHONE_DISPLAY } from '@/lib/site'

interface Props {
  currentPage: PageKey
  isOwner: boolean
  onOpenAdminPanel: () => void
}

export const Header = ({ currentPage, isOwner, onOpenAdminPanel }: Props) => {
  const { openQuoteForm, quotes } = useQuoteForm()

  return (
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
          <nav aria-label="Primary" className="hidden md:flex gap-2 ml-8">
            <a
              href="#/"
              aria-current={currentPage === 'home' ? 'page' : undefined}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${currentPage === 'home' ? 'text-primary bg-accent/40' : 'text-muted-foreground hover:text-primary hover:bg-accent/30'}`}
            >
              Home
            </a>
            {navTabs.map(tab => (
              <a
                key={tab.href}
                href={tab.href}
                aria-current={currentPage === tab.page ? 'page' : undefined}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${currentPage === tab.page ? 'text-primary bg-accent/40' : 'text-muted-foreground hover:text-primary hover:bg-accent/30'}`}
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
                onClick={onOpenAdminPanel}
                className="hidden md:flex items-center gap-2"
              >
                <ClipboardText size={18} weight="duotone" />
                View Quotes ({(quotes || []).length})
              </Button>
            )}
            <a
              href={buildPhoneHref()}
              aria-label={`Call ${BUSINESS_PHONE_DISPLAY}`}
              className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
            >
              <Phone size={18} weight="bold" />
              <span className="hidden lg:inline">{BUSINESS_PHONE_DISPLAY}</span>
            </a>
            <Button
              onClick={() => openQuoteForm()}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Get Free Quote
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile tab bar */}
      <nav aria-label="Mobile" className="md:hidden flex justify-center gap-1 border-t border-border bg-background/95 backdrop-blur-md overflow-x-auto">
        <a
          href="#/"
          aria-current={currentPage === 'home' ? 'page' : undefined}
          className={`px-2 py-2 text-xs font-medium whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm ${currentPage === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
        >
          Home
        </a>
        {navTabs.map(tab => (
          <a
            key={tab.href}
            href={tab.href}
            aria-current={currentPage === tab.page ? 'page' : undefined}
            className={`px-2 py-2 text-xs font-medium whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm ${currentPage === tab.page ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
          >
            {tab.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
