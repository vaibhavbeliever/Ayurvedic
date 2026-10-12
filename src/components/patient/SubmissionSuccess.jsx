export default function SubmissionSuccess({
  formData,
  referenceId,
  serverStatus,
  onReset
}) {
  return (
    <div className="w-full max-w-2xl bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 shadow-sm text-center flex flex-col items-center space-y-5 sm:space-y-6">
      {/* Icon Badge */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/15">
        <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>

      <div className="space-y-1">
        <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          Submission Successful
        </span>
        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight pt-2">
          Thank You, {formData.fullName || 'Valued Patient'}!
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed pt-1">
          Your pre-consultation assessment has been securely sent to the backend. Your Ayurvedic practitioner will review your health profile before your appointment.
        </p>
      </div>

      {/* Meta Card */}
      <div className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 text-left space-y-3">
        <div className="flex flex-col xs:flex-row xs:items-center justify-between text-xs sm:text-sm border-b border-slate-200/60 pb-2.5 gap-1">
          <span className="text-slate-500 font-medium">Reference Code:</span>
          <span className="font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md text-xs sm:text-sm inline-block w-fit">
            {referenceId}
          </span>
        </div>
        <div className="flex flex-col xs:flex-row xs:items-center justify-between text-xs sm:text-sm border-b border-slate-200/60 pb-2.5 gap-1">
          <span className="text-slate-500 font-medium">Submission Timestamp:</span>
          <span className="font-semibold text-slate-800">{new Date().toLocaleString()}</span>
        </div>
        <div className="flex flex-col xs:flex-row xs:items-center justify-between text-xs sm:text-sm border-b border-slate-200/60 pb-2.5 gap-1">
          <span className="text-slate-500 font-medium">Patient Contact:</span>
          <span className="font-semibold text-slate-800 break-all">{formData.email || formData.phone || '—'}</span>
        </div>
        <div className="flex flex-col xs:flex-row xs:items-center justify-between text-xs sm:text-sm gap-1">
          <span className="text-slate-500 font-medium">Backend Sync Status:</span>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {serverStatus || 'Acknowledged (HTTP 200)'}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full justify-center pt-2">
        <button
          type="button"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold text-sm hover:bg-slate-50 cursor-pointer shadow-xs"
          onClick={() => window.print()}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          <span>Print / Save Copy</span>
        </button>

        <button
          type="button"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 cursor-pointer shadow-md shadow-blue-500/25"
          onClick={onReset}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          <span>Start New Assessment</span>
        </button>
      </div>
    </div>
  )
}
