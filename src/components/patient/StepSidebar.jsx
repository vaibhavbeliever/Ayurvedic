export default function StepSidebar({
  steps,
  currentStep,
  onSelectStep,
  formData,
  isOpen,
  onClose
}) {
  const isStepComplete = (step) => {
    return step.subsections.every((sub) => {
      const required = sub.fields.filter((f) => f.required)
      return required.every((f) => {
        const val = formData[f.id]
        if (val === undefined || val === '') return false
        if (Array.isArray(val) && val.length === 0) return false
        return true
      })
    })
  }

  const completedCount = steps.filter((s) => isStepComplete(s)).length
  const totalSteps = steps.length
  const percentComplete = Math.round((completedCount / totalSteps) * 100)

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 lg:top-36 left-0 h-full w-72 sm:w-80 bg-white border-r border-slate-200/80 flex flex-col z-50 transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Assessment Steps
            </span>
            <button
              type="button"
              className="lg:hidden text-slate-400 hover:text-slate-700 text-xl font-bold p-1 cursor-pointer"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">Ayurvedic Health Intake</h3>

          {/* Progress Bar Card */}
          <div className="mt-4 bg-slate-50 border border-slate-200/70 rounded-xl p-3.5 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-600">Completion</span>
              <span className="text-blue-600">{percentComplete}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200/70 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-500">
              {completedCount} of {totalSteps} sections completed
            </div>
          </div>
        </div>

        {/* Step Items Navigation List */}
        <nav className="flex-1 p-3 overflow-y-auto space-y-1">
          {steps.map((step) => {
            const isActive = currentStep === step.id
            const isDone = isStepComplete(step)

            return (
              <button
                key={step.id}
                type="button"
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left text-sm transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
                onClick={() => {
                  onSelectStep(step.id)
                  if (onClose) onClose()
                }}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold shrink-0 transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : isDone
                      ? 'bg-emerald-100 text-emerald-700 font-bold'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {isDone ? (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>

                <div className="truncate flex-1">
                  <div className="font-semibold text-xs text-slate-900 truncate">{step.shortTitle}</div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {step.subsections.length} parts
                  </div>
                </div>
              </button>
            )
          })}

          {/* Step 6: Review & Submit button */}
          <div className="pt-2 mt-2 border-t border-slate-100">
            <button
              type="button"
              className={`w-full flex items-center gap-3 p-3 rounded-xl text-left text-sm transition-all cursor-pointer ${
                currentStep === 6
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/25'
                  : 'bg-blue-50/60 text-blue-900 border border-blue-200 hover:bg-blue-50 font-semibold'
              }`}
              onClick={() => {
                onSelectStep(6)
                if (onClose) onClose()
              }}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold shrink-0 ${
                  currentStep === 6 ? 'bg-white text-blue-700' : 'bg-blue-200 text-blue-800'
                }`}
              >
                6
              </div>
              <div className="truncate flex-1">
                <div className="font-bold text-xs truncate">Review & Submit</div>
                <div className={`text-[11px] truncate ${currentStep === 6 ? 'text-blue-100' : 'text-blue-600'}`}>
                  Verification & Send
                </div>
              </div>
            </button>
          </div>
        </nav>
      </aside>
    </>
  )
}
