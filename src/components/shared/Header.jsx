import { useState } from 'react'

export default function Header({
  currentView = 'form',
  onNavigate,
  adminUser,
  onLogout,
  currentStep = 1,
  totalSteps = 6,
  onToggleSidebar,
  onClearDraft,
}) {
  const [showHelpModal, setShowHelpModal] = useState(false)

  const isFormView = currentView === 'form'
  const isAdminView = currentView === 'admin'

  return (
    <>
      {/* Top Clinical Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-[11px] font-medium py-1.5 px-4 sm:px-8 border-b border-blue-950">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="truncate">
              AyurHealth Pre-Consultation Assessment • Confidential & HIPAA-Compliant Patient Portal
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-blue-200 text-[11px]">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Clinic Hours: Mon–Sat 8:00 AM – 7:00 PM
            </span>
            <span className="text-white/20">|</span>
            <a href="tel:+15550192834" className="hover:text-white transition-colors flex items-center gap-1 font-semibold text-white">
              <svg className="w-3 h-3 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +1 (555) 019-2834
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3.5">
          
          {/* Left Brand & Logo */}
          <div className="w-full md:w-auto flex items-center justify-between md:justify-start gap-3">
            <div className="flex items-center gap-3">
              {/* Mobile Sidebar Toggle (only in form view) */}
              {isFormView && (
                <button
                  type="button"
                  className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl cursor-pointer transition-colors border border-slate-200/80"
                  onClick={onToggleSidebar}
                  aria-label="Toggle section menu"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </button>
              )}

              {/* Logo Emblem */}
              <div
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => onNavigate('/')}
              >
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-500 text-white flex items-center justify-center shadow-md shadow-blue-500/25 shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L9.5 8.5 3 9.5l5 4.5L6.5 21 12 17.5 17.5 21l-1.5-7 5-4.5-6.5-1L12 2z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h1 className="font-black text-slate-900 text-lg leading-tight tracking-tight">
                      AyurHealth
                    </h1>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-md">
                      Clinic
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-blue-600 tracking-wide block uppercase">
                    Ayurvedic Health Assessment
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile View Switcher */}
            {/* <div className="md:hidden flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  isFormView ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-500'
                }`}
                onClick={() => onNavigate('/')}
              >
                Patient
              </button>
              <button
                type="button"
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  isAdminView ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-500'
                }`}
                onClick={() => onNavigate('/admin')}
              >
                Admin
              </button>
            </div> */}
          </div>

          {/* Center: Segmented Navigation Switcher (Desktop) */}
          <div className="hidden md:flex items-center bg-slate-100/90 p-1 rounded-2xl border border-slate-200/90 shadow-2xs">
            <button
              type="button"
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                isFormView
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
              onClick={() => onNavigate('/')}
            >
              <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <span>Patient Intake Form</span>
            </button>

            <button
              type="button"
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                isAdminView
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
              onClick={() => onNavigate('/admin')}
            >
              <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Admin Portal</span>
              {adminUser && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </button>
          </div>

          {/* Right Action Section */}
          <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3 pt-1 md:pt-0 border-t md:border-t-0 border-slate-100">
            {/* If in Patient Form Mode */}
            {isFormView && (
              <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
                {/* Step indicator badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50/80 border border-blue-200/80 text-xs font-bold text-blue-800 shadow-2xs">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>Step {currentStep} of {totalSteps}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Reset Draft Button */}
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer shadow-2xs"
                    onClick={onClearDraft}
                    title="Clear current responses and start over"
                  >
                    <svg className="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                    <span>Reset</span>
                  </button>

                  {/* Help Guide Button */}
                  <button
                    type="button"
                    className="p-1.5 rounded-xl border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                    onClick={() => setShowHelpModal(true)}
                    title="Patient instructions"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* If in Admin Portal Mode */}
            {isAdminView && (
              <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                {adminUser ? (
                  <>
                    <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center uppercase shadow-xs">
                        {(adminUser.name || 'A').charAt(0)}
                      </div>
                      <div className="text-left hidden sm:block">
                        <div className="text-xs font-bold text-slate-900 leading-none">
                          {adminUser.name}
                        </div>
                        <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Authenticated
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all cursor-pointer shadow-2xs"
                      onClick={onLogout}
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Practitioner Login Required</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Patient Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                Assessment Guidelines
              </h3>
              <button
                type="button"
                className="text-slate-400 hover:text-slate-700 text-xl font-bold cursor-pointer"
                onClick={() => setShowHelpModal(false)}
              >
                &times;
              </button>
            </div>

            <div className="text-sm text-slate-600 space-y-3 leading-relaxed">
              <p>
                Welcome to your <strong>AyurHealth Pre-Consultation Assessment</strong>. Your answers help your Ayurvedic practitioner understand your unique constitution (Prakriti), digestive strength (Agni), and wellness history before your consultation.
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <li>Answer based on what happens <strong>most of the time</strong>, rather than rare occasions.</li>
                <li>Your progress is <strong>automatically saved</strong> in your browser as you type.</li>
                <li>In Step 6, you will be able to review and edit any response before transmitting to your practitioner.</li>
              </ul>
            </div>

            <button
              type="button"
              className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors cursor-pointer"
              onClick={() => setShowHelpModal(false)}
            >
              Got It, Continue Assessment
            </button>
          </div>
        </div>
      )}
    </>
  )
}
