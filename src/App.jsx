import { useState, useEffect } from 'react'
import { COMBINED_STEPS, CONSENT_SECTION } from './data/formSchema'
import Header from './components/shared/Header'
import StepSidebar from './components/patient/StepSidebar'
import FormStep from './components/patient/FormStep'
import ReviewStep from './components/patient/ReviewStep'
import SubmissionSuccess from './components/patient/SubmissionSuccess'
import AdminPanel from './components/admin/AdminPanel'

const STORAGE_KEY = 'ayur_consultation_form_draft_v2'
const VIEW_STORAGE_KEY = 'ayur_active_view'

function getInitialView() {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.toLowerCase()
    const path = window.location.pathname.toLowerCase()
    const search = new URLSearchParams(window.location.search)
    if (hash === '#admin' || path.startsWith('/admin') || search.get('view') === 'admin' || search.get('panel') === 'admin') {
      return 'admin'
    }
    if (hash === '#form' || hash === '#user' || search.get('view') === 'form' || search.get('panel') === 'user') {
      return 'form'
    }
    try {
      const saved = localStorage.getItem(VIEW_STORAGE_KEY)
      if (saved === 'admin' || saved === 'form') return saved
    } catch {
      // ignore
    }
  }
  return 'form'
}

export default function App() {
  const [currentView, setCurrentView] = useState(getInitialView)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) return JSON.parse(saved)
    } catch {
      // ignore
    }
    return {
      concernImpact: 5,
      sleepQuality: 6,
      currentEnergy: 6,
      currentStress: 5,
      mentalClarity: 6,
      overallWellbeing: 6,
      readinessForChange: 8,
      consentDate: new Date().toISOString().split('T')[0],
    }
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [referenceId, setReferenceId] = useState('')
  const [serverStatus, setServerStatus] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Switch view handler with URL hash and storage sync
  const handleViewChange = (view) => {
    const nextView = view === 'admin' ? 'admin' : 'form'
    setCurrentView(nextView)
    try {
      localStorage.setItem(VIEW_STORAGE_KEY, nextView)
      if (nextView === 'admin') {
        window.location.hash = 'admin'
      } else {
        window.location.hash = 'user'
      }
    } catch {
      // ignore
    }
  }

  // Synchronize view on browser back/forward or direct hash navigation
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.toLowerCase()
      if (hash === '#admin') {
        setCurrentView('admin')
      } else if (hash === '#form' || hash === '#user' || hash === '') {
        setCurrentView('form')
      }
    }

    window.addEventListener('hashchange', handleLocationChange)
    window.addEventListener('popstate', handleLocationChange)
    return () => {
      window.removeEventListener('hashchange', handleLocationChange)
      window.removeEventListener('popstate', handleLocationChange)
    }
  }, [])

  // Auto-save form draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    } catch {
      // ignore
    }
  }, [formData])

  // Scroll to top whenever step or view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentStep, isSubmitted, currentView])

  // Field change handler
  const handleFieldChange = (fieldId, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }))
    if (errors[fieldId]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[fieldId]
        return next
      })
    }
  }

  // Validate fields for a given combined step
  const validateStep = (stepNumber) => {
    const step = COMBINED_STEPS.find((s) => s.id === stepNumber)
    if (!step) return true

    const newErrors = {}
    step.subsections.forEach((sub) => {
      sub.fields.forEach((field) => {
        if (field.required) {
          const val = formData[field.id]
          if (val === undefined || val === null || val === '') {
            newErrors[field.id] = `${field.label} is required`
          } else if (Array.isArray(val) && val.length === 0) {
            newErrors[field.id] = `Please select at least one option`
          }
        }
      })
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Next step handler
  const handleNext = () => {
    if (!validateStep(currentStep)) {
      setTimeout(() => {
        const errorEl = document.querySelector('.border-rose-400')
        if (errorEl) {
          errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 50)
      return
    }

    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  // Previous step handler
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  // Jump to specific step
  const handleSelectStep = (stepNumber) => {
    if (stepNumber > currentStep && currentStep < 6) {
      if (!validateStep(currentStep)) return
    }
    setCurrentStep(stepNumber)
  }

  // Clear draft
  const handleClearDraft = () => {
    if (window.confirm('Reset all responses and start fresh?')) {
      localStorage.removeItem(STORAGE_KEY)
      setFormData({
        concernImpact: 5,
        sleepQuality: 6,
        currentEnergy: 6,
        currentStress: 5,
        mentalClarity: 6,
        overallWellbeing: 6,
        readinessForChange: 8,
        consentDate: new Date().toISOString().split('T')[0],
      })
      setErrors({})
      setCurrentStep(1)
      setIsSubmitted(false)
    }
  }

  // Submit to Backend
  // const handleSubmitToBackend = async () => {
  //   // Validate consent statements in step 6
  //   const consentStatements = formData.consentStatements || []
  //   const consentOptions = CONSENT_SECTION.fields.find((f) => f.id === 'consentStatements')?.options || []
  //   const newErrors = {}

  //   if (consentStatements.length < consentOptions.length) {
  //     newErrors.consentStatements = 'You must agree to all declaration statements.'
  //   }
  //   if (!formData.consentFullName) {
  //     newErrors.consentFullName = 'Please provide your full legal name as digital signature.'
  //   }
  //   if (!formData.consentDate) {
  //     newErrors.consentDate = 'Date is required.'
  //   }

  //   if (Object.keys(newErrors).length > 0) {
  //     setErrors(newErrors)
  //     setSubmitError('Please complete the Consent & Declaration section before sending.')
  //     window.scrollTo({ top: 300, behavior: 'smooth' })
  //     return
  //   }

  //   setIsSubmitting(true)
  //   setSubmitError(null)

  //   const refCode = 'AYUR-' + new Date().getFullYear() + '-' + Math.floor(100000 + Math.random() * 900000)

  //   const payload = {
  //     referenceId: refCode,
  //     submittedAt: new Date().toISOString(),
  //     patient: {
  //       fullName: formData.fullName || '',
  //       email: formData.email || '',
  //       phone: formData.phone || '',
  //       dob: formData.dob || '',
  //     },
  //     responses: formData,
  //   }

  //   console.log('Sending payload to backend:', payload)

  //   try {
  //     const response = await fetch('/api/consultation', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(payload),
  //     })

  //     if (response.ok) {
  //       const data = await response.json().catch(() => ({}))
  //       setServerStatus(data.message || 'Saved to database (HTTP 200)')
  //     } else {
  //       console.warn('Backend returned non-200, archiving locally:', response.status)
  //       setServerStatus(`Acknowledged & stored locally (Server code: ${response.status})`)
  //     }
  //   } catch (err) {
  //     console.warn('Backend offline or simulated, cached locally:', err)
  //     setServerStatus('Stored locally in browser records (Backend server offline)')
  //   } finally {
  //     try {
  //       const existing = JSON.parse(localStorage.getItem('ayur_submitted_records') || '[]')
  //       existing.unshift(payload)
  //       localStorage.setItem('ayur_submitted_records', JSON.stringify(existing.slice(0, 20)))
  //     } catch {
  //       // ignore
  //     }

  //     setReferenceId(refCode)
  //     setIsSubmitting(false)
  //     setIsSubmitted(true)
  //     localStorage.removeItem(STORAGE_KEY)
  //   }
  // }

  const handleSubmitToBackend = async () => {
    // Validate consent statements in step 6
    const consentStatements = formData.consentStatements || [];
    const consentOptions =
      CONSENT_SECTION.fields.find((f) => f.id === "consentStatements")
        ?.options || [];
    const newErrors = {};

    if (consentStatements.length < consentOptions.length) {
      newErrors.consentStatements =
        "You must agree to all declaration statements.";
    }
    if (!formData.consentFullName) {
      newErrors.consentFullName =
        "Please provide your full legal name as digital signature.";
    }
    if (!formData.consentDate) {
      newErrors.consentDate = "Date is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitError(
        "Please complete the Consent & Declaration section before sending.",
      );
      window.scrollTo({ top: 300, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const refCode =
      "AYUR-" +
      new Date().getFullYear() +
      "-" +
      Math.floor(100000 + Math.random() * 900000);

    const payload = {
      referenceId: refCode,
      submittedAt: new Date().toISOString(),
      patient: {
        fullName: formData.fullName || "",
        email: formData.email || "",
        phone: formData.phone || "",
        dob: formData.dob || "",
      },
      responses: formData,
    };

    console.log("Sending payload to backend:", payload);

    try {
      // ✅ Get backend URL
      const getBackendURL = () => {
        const isProduction =
          window.location.hostname === "vaidya-shivansh.vercel.app" ||
          window.location.hostname.includes("vercel.app");

        if (isProduction) {
          return "https://ayurvedic-backend-hkci.onrender.com";
        }
        return window.location.origin;
      };

      const BACKEND_URL = getBackendURL();
      const apiUrl = new URL("/api/consultation", BACKEND_URL).toString();

      console.log("📤 Posting to:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json().catch(() => ({}));
        console.log("✅ Backend success:", data.message);
        setServerStatus(data.message || "Saved to database (HTTP 200)");
      } else {
        console.warn(
          "Backend returned non-200, archiving locally:",
          response.status,
        );
        setServerStatus(
          `Acknowledged & stored locally (Server code: ${response.status})`,
        );
      }
    } catch (err) {
      console.warn("Backend offline or simulated, cached locally:", err);
      setServerStatus(
        "Stored locally in browser records (Backend server offline)",
      );
    } finally {
      try {
        const existing = JSON.parse(
          localStorage.getItem("ayur_submitted_records") || "[]",
        );
        existing.unshift(payload);
        localStorage.setItem(
          "ayur_submitted_records",
          JSON.stringify(existing.slice(0, 20)),
        );
      } catch {
        // ignore
      }

      setReferenceId(refCode);
      setIsSubmitting(false);
      setIsSubmitted(true);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  
  const activeStep = COMBINED_STEPS.find((s) => s.id === currentStep)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-sky-50/20 to-blue-50/25 text-slate-800">
      <Header
        currentView={currentView}
        onViewChange={handleViewChange}
        onNavigate={(route) => handleViewChange(route === '/admin' ? 'admin' : 'form')}
        currentStep={isSubmitted ? 6 : currentStep}
        totalSteps={6}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        onClearDraft={handleClearDraft}
      />

      <div className="max-w-7xl mx-auto w-full flex-1 flex">
        {currentView === 'admin' ? (
          <main className="w-full p-4 sm:p-8 lg:p-10 flex flex-col items-center">
            <AdminPanel onBackToForm={() => handleViewChange('form')} />
          </main>
        ) : (
          <>
            {!isSubmitted && (
              <StepSidebar
                steps={COMBINED_STEPS}
                currentStep={currentStep}
                onSelectStep={handleSelectStep}
                formData={formData}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
              />
            )}

            <main className={`flex-1 p-4 sm:p-8 lg:p-10 flex flex-col items-center min-w-0 ${isSubmitted ? 'w-full' : ''}`}>
              {isSubmitted ? (
                <div className="space-y-4 flex flex-col items-center">
                  <SubmissionSuccess
                    formData={formData}
                    referenceId={referenceId}
                    serverStatus={serverStatus}
                    onReset={() => {
                      setIsSubmitted(false)
                      setCurrentStep(1)
                    }}
                  />
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 underline cursor-pointer"
                    onClick={() => handleViewChange('admin')}
                  >
                    Open Admin Portal to view this record in database →
                  </button>
                </div>
              ) : currentStep === 6 ? (
                <ReviewStep
                  steps={COMBINED_STEPS}
                  formData={formData}
                  onChange={handleFieldChange}
                  errors={errors}
                  onEditStep={(stepId) => setCurrentStep(stepId)}
                  onSubmit={handleSubmitToBackend}
                  isSubmitting={isSubmitting}
                  onPrev={() => setCurrentStep(5)}
                  submitError={submitError}
                />
              ) : (
                activeStep && (
                  <FormStep
                    step={activeStep}
                    formData={formData}
                    onChange={handleFieldChange}
                    errors={errors}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    isFirstStep={currentStep === 1}
                    totalSteps={COMBINED_STEPS.length}
                  />
                )
              )}
            </main>
          </>
        )}
      </div>

      {/* Floating Fast Switcher Pill */}
      {/* <aside aria-label="Panel Navigation" className="fixed bottom-5 right-5 z-50">
        <button
          type="button"
          onClick={() => handleViewChange(currentView === 'admin' ? 'form' : 'admin')}
          className="group inline-flex items-center gap-2.5 px-4 py-2.5 bg-slate-900/95 hover:bg-slate-900 text-white rounded-full text-xs font-bold shadow-2xl shadow-slate-900/30 backdrop-blur-md border border-slate-700/60 transition-all hover:scale-105 active:scale-95 cursor-pointer ring-2 ring-white/20"
          title={currentView === 'admin' ? 'Switch to User Intake Form' : 'Switch to Admin Management Portal'}
        >
          {currentView === 'admin' ? (
            <>
              <svg className="w-4 h-4 text-sky-400 group-hover:-translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span>User Panel (Form)</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 text-emerald-400 group-hover:rotate-45 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Admin Panel</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </>
          )}
        </button>
      </aside> */}
    </div>
  )
}