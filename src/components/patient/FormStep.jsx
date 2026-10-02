import FormField from './FormField'

export default function FormStep({
  step,
  formData,
  onChange,
  errors,
  onNext,
  onPrev,
  isFirstStep,
  totalSteps
}) {
  return (
    <div className="w-full max-w-4xl space-y-6">
      {/* Welcome & Namaskar Card on Step 1 */}
      {isFirstStep && (
        <div className="bg-gradient-to-br from-emerald-50/90 via-teal-50/40 to-sky-50/60 border border-emerald-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-start sm:items-center gap-3">
            <span className="text-3xl sm:text-4xl select-none shrink-0">🌿</span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Ayurvedic Pre-Consultation Health Assessment
              </h1>
              <div className="text-emerald-800 font-bold text-base mt-1 flex items-center gap-2">
                <span>Namaskar 🙏</span>
                <span className="text-slate-300 font-normal">•</span>
                <span className="text-slate-700 font-semibold">Welcome</span>
              </div>
            </div>
          </div>

          <div className="text-sm sm:text-base text-slate-700 space-y-3 leading-relaxed border-t border-emerald-200/60 pt-4">
            <p>
              Before your consultation, we would like to know a little more about you—your health, digestion, eating habits, daily routine, sleep, lifestyle, and overall well-being.
            </p>
            <p>
              Your answers will help us understand you better and make your consultation more personalised and meaningful.
            </p>
            <div className="bg-white/80 border border-emerald-200/80 rounded-xl p-3.5 text-slate-800 text-sm">
              Please answer the questions based on <strong>what is generally true for you most of the time</strong>, rather than an occasional experience.
            </div>
            <p className="text-emerald-900 font-medium text-sm">
              There are no right or wrong answers. <strong>Simply share what feels true for you.</strong>
            </p>
          </div>
        </div>
      )}

      {/* Step Header */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-3">
          <span>Step {step.id} of {totalSteps}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {step.title}
        </h2>
        {step.description && (
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            {step.description}
          </p>
        )}
      </div>

      {/* Subsections Cards */}
      {step.subsections.map((sub, idx) => (
        <div
          key={idx}
          className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">
                {idx + 1}
              </span>
              <span>{sub.title}</span>
            </h3>
            {sub.description && (
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {sub.description}
              </p>
            )}
          </div>

          <div className="space-y-5">
            {sub.fields.map((field) => (
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
      ))}

      {/* Navigation Buttons Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-xs flex items-center justify-between gap-4">
        {!isFirstStep ? (
          <button
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all shadow-xs cursor-pointer"
            onClick={onPrev}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Previous Step</span>
          </button>
        ) : (
          <div />
        )}

        <button
          type="button"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all shadow-md shadow-blue-500/25 cursor-pointer ml-auto"
          onClick={onNext}
        >
          <span>Continue to {step.id === totalSteps ? 'Review' : 'Next Step'}</span>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  )
}
