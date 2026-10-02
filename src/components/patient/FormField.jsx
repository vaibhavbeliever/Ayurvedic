import PhoneInput from './PhoneInput'
import { useRef, useState } from 'react'
import ImageLightbox from '../shared/ImageLightbox'

export default function FormField({ field, value, onChange, error }) {
  const { id, label, type, required, placeholder, help, options, min, max, minLabel, maxLabel } = field
  const fileInputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showLightbox, setShowLightbox] = useState(false)

  const handleTextChange = (e) => {
    onChange(id, e.target.value)
  }

  const handleRadioChange = (opt) => {
    onChange(id, opt)
  }

  const handleCheckboxToggle = (opt) => {
    const currentList = Array.isArray(value) ? value : []
    let updatedList
    if (currentList.includes(opt)) {
      updatedList = currentList.filter((item) => item !== opt)
    } else {
      updatedList = [...currentList, opt]
    }
    onChange(id, updatedList)
  }

  const handleScaleClick = (val) => {
    onChange(id, val)
  }

  const processFile = (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (e.g., JPG, PNG, WebP).')
      return
    }

    setIsProcessing(true)

    // Resize and compress image using HTML Canvas to keep localStorage payload light
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(objectUrl)
      const maxDim = 1200
      let { width, height } = img
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width)
          width = maxDim
        } else {
          width = Math.round((width * maxDim) / height)
          height = maxDim
        }
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)
      const dataUrl = canvas.toDataURL('image/jpeg', 0.82)

      setIsProcessing(false)
      onChange(id, {
        name: file.name,
        type: file.type,
        size: Math.round((dataUrl.length * 3) / 4),
        dataUrl
      })
    }
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      const reader = new FileReader()
      reader.onload = (e) => {
        setIsProcessing(false)
        onChange(id, {
          name: file.name,
          type: file.type,
          size: file.size,
          dataUrl: e.target?.result
        })
      }
      reader.onerror = () => {
        setIsProcessing(false)
      }
      reader.readAsDataURL(file)
    }
    img.src = objectUrl
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleRemoveFile = (e) => {
    e.stopPropagation()
    onChange(id, '')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  if (type === 'notice') {
    return (
      <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex items-start gap-3 text-sky-900 my-2">
        <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-sky-950 mb-0.5">{label}</h4>
          {help && <p className="text-xs text-sky-800 leading-relaxed">{help}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-800 flex items-center" htmlFor={id}>
        <span>{label}</span>
        {required && <span className="text-rose-500 ml-1 font-bold">*</span>}
      </label>

      {help && <p className="text-xs text-slate-500 leading-relaxed -mt-0.5 mb-1">{help}</p>}

      {/* Text, Email, Tel */}
      {['text', 'email'].includes(type) && (
        <input
          id={id}
          type={type}
          className={`w-full px-3.5 py-2.5 bg-white border ${error ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'} rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all shadow-xs`}
          value={value || ''}
          placeholder={placeholder || ''}
          onChange={handleTextChange}
        />
      )}

      {type === 'tel' && (
        <PhoneInput id={id} value={value} onChange={onChange} error={error} />
      )}

      {/* Date */}
      {type === 'date' && (
        <input
          id={id}
          type="date"
          className={`w-full px-3.5 py-2.5 bg-white border ${error ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'} rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all shadow-xs`}
          value={value || ''}
          onChange={handleTextChange}
        />
      )}

      {/* Time */}
      {type === 'time' && (
        <input
          id={id}
          type="time"
          className={`w-full px-3.5 py-2.5 bg-white border ${error ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'} rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all shadow-xs`}
          value={value || ''}
          onChange={handleTextChange}
        />
      )}

      {/* Textarea */}
      {type === 'textarea' && (
        <textarea
          id={id}
          rows={3}
          className={`w-full px-3.5 py-2.5 bg-white border ${error ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'} rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all shadow-xs resize-y`}
          value={value || ''}
          placeholder={placeholder || ''}
          onChange={handleTextChange}
        />
      )}

      {/* Multiple Choice (Radio) */}
      {type === 'radio' && options && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-0.5">
          {options.map((opt) => {
            const isSelected = value === opt
            return (
              <label
                key={opt}
                className={`flex items-center gap-3 p-3 rounded-lg border text-sm cursor-pointer select-none transition-all ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-500 text-blue-900 font-medium shadow-xs ring-1 ring-blue-500'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
                onClick={() => handleRadioChange(opt)}
              >
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span className="leading-snug">{opt}</span>
              </label>
            )
          })}
        </div>
      )}

      {/* Checkboxes (Multi-select) */}
      {type === 'checkbox' && options && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
          {options.map((opt) => {
            const isChecked = Array.isArray(value) && value.includes(opt)
            return (
              <label
                key={opt}
                className={`flex items-start gap-3 p-3 rounded-lg border text-sm cursor-pointer select-none transition-all ${
                  isChecked
                    ? 'bg-blue-50/80 border-blue-500 text-blue-900 font-medium shadow-xs ring-1 ring-blue-500'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
                onClick={() => handleCheckboxToggle(opt)}
              >
                <div
                  className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center shrink-0 transition-colors ${
                    isChecked ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white'
                  }`}
                >
                  {isChecked && (
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span className="leading-snug">{opt}</span>
              </label>
            )
          })}
        </div>
      )}

      {/* Scale 0 - 10 */}
      {type === 'scale' && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-3">
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((score) => {
              const isSelected = Number(value) === score
              return (
                <button
                  key={score}
                  type="button"
                  className={`flex-1 min-w-[36px] py-2.5 rounded-lg text-sm font-bold transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-105'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                  onClick={() => handleScaleClick(score)}
                >
                  {score}
                </button>
              )
            })}
          </div>
          <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
            <span>{minLabel || min}</span>
            <span className="text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              Selected: {value !== undefined ? value : min} / {max}
            </span>
            <span>{maxLabel || max}</span>
          </div>
        </div>
      )}

      {/* File Upload */}
      {type === 'file' && (
        <div>
          <input
            ref={fileInputRef}
            id={id}
            type="file"
            accept={field.accept || 'image/*'}
            className="hidden"
            onChange={handleFileChange}
          />

          {value ? (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <img
                  src={typeof value === 'object' ? value.dataUrl : value}
                  alt="Tongue preview"
                  className="w-16 h-16 object-cover rounded-lg border border-slate-200 shadow-xs shrink-0 bg-white cursor-pointer hover:opacity-90 hover:scale-105 transition-all"
                  onClick={() => setShowLightbox(true)}
                  title="Click to view full size"
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {typeof value === 'object' ? value.name : 'Tongue photograph'}
                  </p>
                  <p className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Photo attached successfully
                  </p>
                  <div className="flex items-center gap-2.5 mt-1">
                    <button
                      type="button"
                      onClick={() => setShowLightbox(true)}
                      className="text-xs text-blue-600 font-bold hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View full size</span>
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M15 3h6v6" />
                        <path d="M10 14L21 3" />
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      </svg>
                    </button>
                    {typeof value === 'object' && value.size && (
                      <span className="text-[11px] text-slate-400">
                        &bull; {(value.size / 1024).toFixed(0)} KB
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/20'
                  : error
                  ? 'border-rose-300 bg-rose-50/20 hover:border-rose-400'
                  : 'border-slate-300 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-400'
              }`}
            >
              {isProcessing ? (
                <div className="flex flex-col items-center gap-2 py-2">
                  <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-medium text-slate-600">Processing photo...</span>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">
                    Click to upload tongue photograph
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    or drag & drop your photo here
                  </p>
                  <span className="text-[11px] text-slate-400 mt-2 font-medium bg-white px-2.5 py-1 rounded-md border border-slate-200">
                    JPG, PNG, or WebP up to 10MB
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {error && <p className="text-xs text-rose-600 font-medium mt-0.5">{error}</p>}

      {/* Full size lightbox preview */}
      {showLightbox && value && (
        <ImageLightbox
          src={typeof value === 'object' ? value.dataUrl : value}
          title={typeof value === 'object' ? value.name : (field.label || 'Tongue photograph')}
          onClose={() => setShowLightbox(false)}
        />
      )}
    </div>
  )
}
