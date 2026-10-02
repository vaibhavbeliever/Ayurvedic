import { useState, useEffect } from 'react'

export default function ImageLightbox({ src, title = 'Uploaded Image', onClose }) {
  const [zoomLevel, setZoomLevel] = useState(1)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === '+' || e.key === '=') setZoomLevel((z) => Math.min(z + 0.3, 3))
      if (e.key === '-' || e.key === '_') setZoomLevel((z) => Math.max(z - 0.3, 0.7))
      if (e.key === '0') setZoomLevel(1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!src) return null

  const getBlobUrl = () => {
    if (src.startsWith('data:')) {
      const parts = src.split(';base64,')
      const contentType = parts[0].split(':')[1] || 'image/jpeg'
      const raw = window.atob(parts[1])
      const rawLength = raw.length
      const uInt8Array = new Uint8Array(rawLength)
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
      }
      const blob = new Blob([uInt8Array], { type: contentType })
      return URL.createObjectURL(blob)
    }
    return src
  }

  // Convert base64 dataUrl to blob URL so browsers allow opening in a new tab without blocking
  const handleOpenInNewTab = () => {
    try {
      const blobUrl = getBlobUrl()
      window.open(blobUrl, '_blank')
    } catch {
      const win = window.open('', '_blank')
      if (win) {
        win.document.write(`
          <!DOCTYPE html>
          <html>
            <head><title>${title}</title><style>body{margin:0;background:#090d16;display:flex;justify-content:center;align-items:center;min-height:100vh;}img{max-width:96vw;max-height:96vh;object-fit:contain;border-radius:12px;box-shadow:0 20px 40px rgba(0,0,0,0.8);}</style></head>
            <body><img src="${src}" alt="${title}" /></body>
          </html>
        `)
        win.document.close()
      }
    }
  }

  const handleDownload = () => {
    try {
      const blobUrl = getBlobUrl()
      const link = document.createElement('a')
      link.href = blobUrl
      const safeTitle = (title || 'consultation-photo').toLowerCase().replace(/[^a-z0-9]/g, '_')
      link.download = `${safeTitle}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch {
      window.open(src, '_blank')
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in select-none"
      onClick={onClose}
    >
      <div
        className="relative bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl max-w-5xl w-full max-h-[94vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-900 border-b border-slate-800 text-white shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <span className="font-semibold text-sm truncate text-slate-100 max-w-[200px] sm:max-w-md">
              {title}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 mr-1">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
                className="w-7 h-7 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors text-xs font-bold"
                title="Zoom Out (-)"
              >
                &minus;
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                className="px-2 h-7 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors text-xs font-mono font-medium"
                title="Reset Zoom (0)"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 3))}
                className="w-7 h-7 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors text-xs font-bold"
                title="Zoom In (+)"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleOpenInNewTab}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-700"
              title="Open full image in a separate tab"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span className="hidden sm:inline">New Tab</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Download image file"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors text-lg font-bold border border-slate-700 ml-0.5 sm:ml-1"
              title="Close viewer (Esc)"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Image Display Area */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-slate-950/70 min-h-[320px] max-h-[76vh]">
          <img
            src={src}
            alt={title}
            style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.15s ease-out' }}
            className="max-h-[72vh] max-w-full object-contain rounded-xl shadow-2xl border border-slate-800 select-none bg-slate-900 cursor-zoom-in"
            onClick={() => setZoomLevel((z) => (z === 1 ? 1.8 : 1))}
            title="Click to toggle zoom"
          />
        </div>

        {/* Footer info bar */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-900 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between shrink-0">
          <span className="hidden sm:inline">
            Click photo to zoom &bull; Click outside or press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">ESC</kbd> to close
          </span>
          <span className="sm:hidden">
            Tap photo to zoom &bull; Tap outside to close
          </span>
          <span className="text-emerald-400 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Full resolution
          </span>
        </div>
      </div>
    </div>
  )
}
