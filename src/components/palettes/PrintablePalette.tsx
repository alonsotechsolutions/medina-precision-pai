import { Printer } from '@phosphor-icons/react'
import { getPaletteBySlug } from '@/data/palettes'

interface Props {
  slug: string
}

export const PrintablePalette = ({ slug }: Props) => {
  const palette = getPaletteBySlug(slug)
  return (
    <div className="min-h-screen bg-white text-black p-8 print:p-0">
      <style>{`@media print { @page { margin: 0.5in; } body { background: white; } }`}</style>
      {!palette ? (
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-semibold mb-2">Palette not found</h1>
          <p className="text-sm text-gray-600 mb-4">The palette “{slug}” is no longer available.</p>
          <a href="#/home" className="text-primary underline">Return to site</a>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start justify-between border-b border-gray-300 pb-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">{palette.name}</h1>
              <p className="text-gray-600 mt-1">{palette.mood}</p>
            </div>
            <div className="text-right text-sm text-gray-600">
              <div className="font-semibold text-gray-900">Medina Precision Painting</div>
              <div>Warner Robins, GA</div>
              <div>medinaprecisionpainting.com</div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {palette.swatches.map((s, i) => (
              <div key={i} className="border border-gray-300 rounded overflow-hidden">
                <div className="h-32 w-full" style={{ backgroundColor: s.hex }} aria-hidden="true" />
                <div className="p-3 text-sm">
                  <div className="font-mono font-semibold">{s.hex}</div>
                  {(s.brand || s.code || s.name) && (
                    <div className="text-gray-600 mt-1">
                      {[s.brand, s.code, s.name].filter(Boolean).join(' · ')}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-700 border border-gray-300 rounded p-4 mb-6">
            <p className="font-semibold mb-1">How to use this sheet</p>
            <p>Bring this printed page to any Sherwin-Williams, Benjamin Moore, Behr, or local paint store. Their color-matching system can scan the swatches above and mix an exact match in the paint and sheen of your choice.</p>
          </div>
          <div className="flex gap-3 print:hidden">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded font-medium"
            >
              <Printer size={18} weight="bold" /> Print this sheet
            </button>
            <a href="#/home" className="inline-flex items-center px-4 py-2 rounded border border-gray-300 text-sm">← Return to site</a>
          </div>
        </div>
      )}
    </div>
  )
}
