import { useState } from 'react'
import { CONSENT_SECTION } from '../../data/formSchema'
import FormField from './FormField'
import ImageLightbox from '../shared/ImageLightbox'

export default function ReviewStep({
  steps,
  formData,
  onChange,
  errors,
  onEditStep,
  onSubmit,
  isSubmitting,
  onPrev,
  submitError
}) {
  const [filterFilledOnly, setFilterFilledOnly] = useState(false)
  const [lightboxImage, setLightboxImage] = useState(null)

  // Format value display
  const renderValue = (val, type) => {
    if (val === undefined || val === null || val === '') {
      return <span className="text-slate-400 italic font-normal text-xs">Not specified</span>
    }
    if (Array.isArray(val)) {
      if (val.length === 0) return <span className="text-slate-400 italic font-normal text-xs">None selected</span>
      return (
        <div className="flex flex-wrap gap-1.5 mt-1">
          {val.map((item, idx) => (
            <span
              key={idx}
              className="inline-block bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full text-xs font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      )
    }
    if (type === 'scale') {
      return (
        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-0.5 rounded-md text-xs font-bold">
          <span className="text-sm font-extrabold text-blue-600">{val}</span> / 10
        </span>
      )
    }
    if (type === 'file') {
      const src = typeof val === 'string' ? val : val?.dataUrl
      const name = typeof val === 'object' ? val?.name : 'Tongue photograph'
      if (!src) return <span className="text-slate-400 italic font-normal text-xs">No photograph uploaded</span>
      return (
        <div className="flex items-center gap-3 mt-1.5 p-2.5 bg-slate-50 border border-slate-200 rounded-xl max-w-sm">
          <img
            src={src}
            alt="Tongue photo preview"
            className="w-14 h-14 object-cover rounded-lg border border-slate-200 bg-white shrink-0 cursor-pointer hover:opacity-90 hover:scale-105 transition-all shadow-2xs"
            onClick={() => setLightboxImage({ src, title: name })}
          />
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-800 truncate">{name}</p>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Attached photograph
            </p>
            <button
              type="button"
              onClick={() => setLightboxImage({ src, title: name })}
              className="text-[11px] text-blue-600 font-bold hover:text-blue-800 inline-flex items-center gap-1 mt-0.5 cursor-pointer"
            >
              <span>View full size</span>
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 3h6v6" />
                <path d="M10 14L21 3" />
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              </svg>
            </button>
          </div>
        </div>
      )
    }
    return <span className="text-slate-900 font-medium text-sm leading-relaxed">{String(val)}</span>
  }

  // Count answered questions
  let answeredCount = 0
  let totalCount = 0
  steps.forEach((step) => {
    step.subsections.forEach((sub) => {
      sub.fields.forEach((f) => {
        if (f.showIf && !f.showIf(formData)) return
        if (f.type !== 'notice') {
          totalCount++
          const val = formData[f.id]
          if (val !== undefined && val !== '' && !(Array.isArray(val) && val.length === 0)) {
            answeredCount++
          }
        }
      })
    })
  })

  return (
    <div className="w-full max-w-4xl space-y-6">
      {/* Patient Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/20 pb-5 mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-bold uppercase tracking-wider">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            <span>Final Step • Review & Confirm</span>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white text-blue-700 text-xs font-bold hover:bg-blue-50 transition-all shadow-xs cursor-pointer"
            onClick={() => window.print()}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            <span>Print Summary</span>
          </button>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Review Your Pre-Consultation Assessment
        </h2>
        <p className="mt-1.5 text-blue-100 text-sm max-w-2xl leading-relaxed">
          Please verify your health information below before transmitting to your Ayurvedic practitioner.
        </p>

        {/* Quick Patient Meta Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/20">
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
            <div className="text-[11px] font-semibold text-blue-200 uppercase tracking-wide">Patient</div>
            <div className="font-bold text-sm truncate mt-0.5">{formData.fullName || '—'}</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
            <div className="text-[11px] font-semibold text-blue-200 uppercase tracking-wide">DOB</div>
            <div className="font-bold text-sm truncate mt-0.5">{formData.dob || '—'}</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
            <div className="text-[11px] font-semibold text-blue-200 uppercase tracking-wide">Email</div>
            <div className="font-bold text-sm truncate mt-0.5">{formData.email || '—'}</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
            <div className="text-[11px] font-semibold text-blue-200 uppercase tracking-wide">Completed</div>
            <div className="font-bold text-sm text-sky-200 mt-0.5">{answeredCount} of {totalCount}</div>
          </div>
        </div>
      </div>

      {/* Consent & Declaration Section Card */}
      <div className="bg-white border-2 border-blue-500/30 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
            ✓
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">{CONSENT_SECTION.title}</h3>
            <p className="text-xs text-slate-500">{CONSENT_SECTION.description}</p>
          </div>
        </div>

        <div className="space-y-4">
          {CONSENT_SECTION.fields.map((field) => (
            <FormField
              key={field.id}
              field={field}
              value={formData[field.id]}
              onChange={onChange}
              error={errors[field.id]}
            />
          ))}
        </div>
      </div>

      {/* Error alert banner if any */}
      {submitError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-3">
          <svg className="w-5 h-5 text-rose-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div>{submitError}</div>
        </div>
      )}

      {/* Answered only toggle */}
      <div className="flex justify-between items-center px-1">
        <h3 className="text-lg font-bold text-slate-900">Summary of Responses</h3>
        <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer select-none">
          <input
            type="checkbox"
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
            checked={filterFilledOnly}
            onChange={(e) => setFilterFilledOnly(e.target.checked)}
          />
          <span>Show only answered questions</span>
        </label>
      </div>

      {/* Accordion / Review of All Steps */}
      <div className="space-y-4">
        {steps.map((step) => {
          return (
            <div
              key={step.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                    {step.id}
                  </span>
                  <h4 className="text-base font-bold text-slate-900">{step.title}</h4>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all cursor-pointer"
                  onClick={() => onEditStep(step.id)}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  <span>Edit</span>
                </button>
              </div>

              {step.subsections.map((sub, sIdx) => {
                const visibleFields = sub.fields.filter((f) => {
                  if (f.type === 'notice') return false
                  if (f.showIf && !f.showIf(formData)) return false
                  if (!filterFilledOnly) return true
                  const val = formData[f.id]
                  return val !== undefined && val !== '' && !(Array.isArray(val) && val.length === 0)
                })

                if (visibleFields.length === 0 && filterFilledOnly) return null

                return (
                  <div key={sIdx} className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {sub.title}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {visibleFields.map((field) => (
                        <div
                          key={field.id}
                          className="bg-slate-50/70 border border-slate-200/60 rounded-xl p-3.5 space-y-1"
                        >
                          <div className="text-xs text-slate-500 font-medium leading-tight">
                            {field.label}
                          </div>
                          <div>{renderValue(formData[field.id], field.type)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      {/* Bottom Submit Action Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 cursor-pointer"
          onClick={onPrev}
          disabled={isSubmitting}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>Back to Step 5</span>
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <span className="text-xs text-slate-500 text-center sm:text-right hidden sm:inline">
            Transmits questionnaire payload to backend
          </span>

          <button
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3 rounded-xl bg-blue-600 text-white font-bold text-base hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 cursor-pointer disabled:opacity-60"
            onClick={onSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Sending Data...</span>
              </>
            ) : (
              <>
                <span>Send Data to Backend</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Full Size Image Lightbox Modal */}
      {lightboxImage && (
        <ImageLightbox
          src={lightboxImage.src}
          title={lightboxImage.title}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </div>
  )
}
