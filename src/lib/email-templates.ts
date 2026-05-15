import { formatSwatchLabel } from '@/data/palettes'
import type { ColorPalette } from '@/types/palette'
import type { QuoteRequest } from '@/types/quote'
import { formatServices, getQuoteServices } from './quote-helpers'

export const buildPaletteTextBlock = (p: ColorPalette): string => {
  const lines = [
    '───────── Selected Color Palette ─────────',
    `Palette: ${p.name}  (${p.mood})`,
  ]
  p.swatches.forEach((s, i) => {
    lines.push(`  ${i + 1}. ${formatSwatchLabel(s)}   ████`)
  })
  lines.push('Print this card and bring it to your nearest paint store')
  lines.push('for an exact color match.')
  lines.push('─'.repeat(46))
  return lines.join('\n')
}

export const buildPaletteHtmlBlock = (p: ColorPalette): string => {
  const rows = p.swatches.map((s, i) => {
    const product = [s.brand, s.code, s.name].filter(Boolean).join(' · ')
    return (
      `<tr>` +
      `<td style="padding:6px 10px;font-family:monospace;color:#444">${i + 1}</td>` +
      `<td style="padding:6px 10px;width:60px;background:${s.hex};border:1px solid #ccc">&nbsp;</td>` +
      `<td style="padding:6px 10px;font-family:monospace">${s.hex}</td>` +
      `<td style="padding:6px 10px;font-family:sans-serif;color:#222">${product || ''}</td>` +
      `</tr>`
    )
  }).join('')
  return (
    `<div style="font-family:sans-serif">` +
    `<h3 style="margin:0 0 6px 0">Selected Color Palette: ${p.name}</h3>` +
    `<p style="margin:0 0 10px 0;color:#555">${p.mood}</p>` +
    `<table cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #ddd">${rows}</table>` +
    `<p style="margin:10px 0 0 0;color:#555;font-size:12px">Print this email and bring to a paint store for an exact match.</p>` +
    `</div>`
  )
}

export const buildPrintUrl = (slug: string): string =>
  `${window.location.origin}${window.location.pathname}#/print?p=${encodeURIComponent(slug)}`

export const buildEmailBody = (quote: QuoteRequest): string => {
  const base = (
    `New quote request from ${quote.name}\n\n` +
    `Submitted: ${new Date(quote.submittedAt).toLocaleString()}\n\n` +
    `Contact\n` +
    `  Name: ${quote.name}\n` +
    `  Email: ${quote.email}\n` +
    `  Phone: ${quote.phone}\n` +
    `  Address: ${quote.address || 'Not provided'}\n\n` +
    `Project\n` +
    `  Service: ${formatServices(getQuoteServices(quote)) || 'Not specified'}\n` +
    `  Property: ${quote.propertyType || 'Not specified'}\n` +
    `  Preferred date: ${quote.preferredDate || 'Not specified'}\n` +
    `  Budget: ${quote.budgetRange || 'Not specified'}\n` +
    `  Referral: ${quote.referralSource || 'Not specified'}\n\n` +
    `Description\n${quote.projectDescription || '(none)'}\n`
  )
  if (!quote.selectedPalette) return base

  const printUrl = buildPrintUrl(quote.selectedPalette.slug)
  return (
    base +
    `\n${buildPaletteTextBlock(quote.selectedPalette)}\n` +
    `\nPrintable color sheet: ${printUrl}\n`
  )
}
