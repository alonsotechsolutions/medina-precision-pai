import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useQuoteForm } from '@/contexts/QuoteFormContext'

interface Props {
  visible: boolean
}

export const FloatingCTA = ({ visible }: Props) => {
  const { openQuoteForm } = useQuoteForm()
  if (!visible) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <Button
        size="lg"
        onClick={() => openQuoteForm()}
        className="shadow-xl bg-accent hover:bg-accent/90 text-accent-foreground"
      >
        Get Free Quote
      </Button>
    </motion.div>
  )
}
