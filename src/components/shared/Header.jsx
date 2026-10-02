import { useState } from 'react'

export default function Header({
  currentView = 'form',
  onNavigate,
  onViewChange,
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

  const handleSelectView = (view) => {
    if (onViewChange) onViewChange(view)
    if (onNavigate) onNavigate(view === 'admin' ? '/admin' : '/')
  }

  return (
    <>
      {/* Top Clinical Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-[11px] font-medium py-1.5 px-3 sm:px-8 border-b border-blue-950">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="truncate">
              AyurHealth Pre-Consultation Assessment <span className="hidden sm:inline">• Confidential & HIPAA-Compliant Patient Portal</span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-blue-200 text-[11px] shrink-0">
            <span className="hidden md:inline text-blue-200/80">
              Clinic Hours: Mon–Sat 8:00 AM – 7:00 PM
            </span>
            <span className="hidden md:inline text-white/20">|</span>
            <a
              href="tel:+918858872301"
              className="hover:text-white transition-colors flex items-center gap-1.5 font-bold text-white bg-blue-800/50 hover:bg-blue-800 px-2.5 py-0.5 rounded-md border border-blue-700/60 shadow-xs"
              title="Call AyurHealth Clinic"
            >
              <svg className="w-3 h-3 text-sky-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>+91 88588 72301</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left Brand & Logo */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Mobile Sidebar Toggle (only in form view) */}
            {isFormView && (
              <button
                type="button"
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl cursor-pointer transition-colors border border-slate-200/80 shrink-0"
                onClick={onToggleSidebar}
                aria-label="Toggle section menu"
                title="View questionnaire sections"
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
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group min-w-0"
              onClick={() => handleSelectView('form')}
              title="AyurHealth Clinic"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-500 text-white flex items-center justify-center shadow-md shadow-blue-500/25 shrink-0 group-hover:scale-105 transition-transform duration-200">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L9.5 8.5 3 9.5l5 4.5L6.5 21 12 17.5 17.5 21l-1.5-7 5-4.5-6.5-1L12 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h1 className="font-black text-slate-900 text-base sm:text-lg leading-tight tracking-tight truncate">
                    AyurHealth
                  </h1>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-md shrink-0">
                    Clinic
                  </span>
                  {isAdminView && (
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded-md shrink-0">
                      Admin
                    </span>
                  )}
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-blue-600 tracking-wide block uppercase truncate">
                  {isAdminView ? 'Clinical Management' : 'Ayurvedic Health Assessment'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Section */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* If in Patient Form Mode */}
            {isFormView && (
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                {/* Step indicator badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-blue-50/80 border border-blue-200/80 text-[11px] sm:text-xs font-bold text-blue-800 shadow-2xs">
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-blue-600" />
                  <span className="hidden sm:inline">Step {currentStep} of {totalSteps}</span>
                  <span className="sm:hidden">{currentStep}/{totalSteps}</span>
                </div>

                {/* Reset Draft Button */}
                <button
                  type="button"
                  className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer shadow-2xs"
                  onClick={onClearDraft}
                  title="Clear current responses and start over"
                >
                  <svg className="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  <span className="hidden md:inline">Reset</span>
                </button>

                {/* Help Guide Button */}
                <button
                  type="button"
                  className="p-1 sm:p-1.5 rounded-lg sm:rounded-xl border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
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
            )}

            {/* If in Admin Portal Mode */}
            {isAdminView && (
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => handleSelectView('form')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  <span className="hidden sm:inline">Patient Form</span>
                  <span className="sm:hidden">Form</span>
                </button>

                {adminUser ? (
                  <>
                    <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="w-6 h-6 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center uppercase shadow-xs">
                        {(adminUser.name || 'A').charAt(0)}
                      </div>
                      <div className="text-left hidden md:block">
                        <div className="text-xs font-bold text-slate-900 leading-none">
                          {adminUser.name}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all cursor-pointer shadow-2xs"
                      onClick={onLogout}
                      title="Sign Out"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      <span className="hidden sm:inline">Sign Out</span>
                    </button>
                  </>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Patient Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-5 sm:p-8 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
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

            <div className="text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
              <p>
                Welcome to your <strong>AyurHealth Pre-Consultation Assessment</strong>. Your answers help your Ayurvedic practitioner understand your unique constitution (Prakriti), digestive strength (Agni), and wellness history before your consultation.
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-700 bg-slate-50 p-3 sm:p-3.5 rounded-xl border border-slate-200">
                <li>Answer based on what happens <strong>most of the time</strong>, rather than rare occasions.</li>
                <li>Your progress is <strong>automatically saved</strong> in your browser as you type.</li>
                <li>In Step 6, you will be able to review and edit any response before transmitting to your practitioner.</li>
              </ul>
            </div>

            <button
              type="button"
              className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs sm:text-sm hover:bg-blue-700 transition-colors cursor-pointer"
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
