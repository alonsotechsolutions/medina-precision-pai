// Curated color-inspiration palette shown on the homepage. Names and hex
// values are stable across reloads so a customer and Eddie can refer back to
// the exact same palette (and hex codes) over time.
//
// Each swatch may optionally carry real paint-store product metadata
// (brand + code + name) so the lead email can give Eddie a SKU to bring to
// Sherwin-Williams, Benjamin Moore, etc. Leave these fields empty until you
// have confirmed product matches.

export interface PaintSwatch {
  hex: string
  name?: string
  brand?: 'Sherwin-Williams' | 'Benjamin Moore' | 'Behr' | string
  code?: string
}

export interface ColorPalette {
  slug: string
  name: string
  mood: string
  swatches: PaintSwatch[]
}
