import { useState, useMemo } from 'react'
import { COMBINED_STEPS, CONSENT_SECTION } from '../../data/formSchema'
import ImageLightbox from '../shared/ImageLightbox'

export default function AdminEditModal({
  consultation,
  onClose,
  onSave,
  onDelete,
  isSaving,
}) {
  const [activeTab, setActiveTab] = useState('responses') // default to responses so practitioner immediately sees answers!
  const [isEditMode, setIsEditMode] = useState(false)
  const [filterFilledOnly, setFilterFilledOnly] = useState(true)
  const [lightboxImage, setLightboxImage] = useState(null)

  const [patientData, setPatientData] = useState({
    fullName: consultation.patient?.fullName || consultation.responses?.fullName || '',
    email: consultation.patient?.email || consultation.responses?.email || '',
    phone: consultation.patient?.phone || consultation.responses?.phone || '',
    address: consultation.patient?.address || consultation.responses?.address || '',
    dob: consultation.patient?.dob || consultation.responses?.dob || '',
    timeOfBirth: consultation.patient?.timeOfBirth || consultation.responses?.timeOfBirth || '',
    placeOfBirth: consultation.patient?.placeOfBirth || consultation.responses?.placeOfBirth || '',
    sexAtBirth: consultation.patient?.sexAtBirth || consultation.responses?.sexAtBirth || '',
    occupation: consultation.patient?.occupation || consultation.responses?.occupation || '',
    height: consultation.patient?.height || consultation.responses?.height || '',
    currentWeight: consultation.patient?.currentWeight || consultation.responses?.currentWeight || '',
    usualWeight: consultation.patient?.usualWeight || consultation.responses?.usualWeight || '',
  })

  const [status, setStatus] = useState(consultation.status || 'Pending Review')
  const [practitionerNotes, setPractitionerNotes] = useState(consultation.practitionerNotes || '')
  const [primaryDosha, setPrimaryDosha] = useState(consultation.doshaAssessment?.primaryDosha || '')
  const [doshaNotes, setDoshaNotes] = useState(consultation.doshaAssessment?.notes || '')
  const [responses, setResponses] = useState(consultation.responses || {})

  // Build field mapping from schema
  const { allSections, knownFieldIds } = useMemo(() => {
    const map = {}
    const sections = []
    const ids = new Set()

    COMBINED_STEPS.forEach((step) => {
      step.subsections.forEach((sub) => {
        const fields = sub.fields.filter((f) => f.type !== 'notice')
        fields.forEach((f) => {
          map[f.id] = f
          ids.add(f.id)
        })
        sections.push({
          stepId: step.id,
          stepTitle: step.title,
          shortTitle: step.shortTitle,
          title: sub.title,
          description: sub.description,
          fields,
        })
      })
    })

    // Include consent section
    const consentFields = CONSENT_SECTION.fields.filter((f) => f.type !== 'notice')
    consentFields.forEach((f) => {
      map[f.id] = f
      ids.add(f.id)
    })
    sections.push({
      stepId: 6,
      stepTitle: 'Review & Declaration',
      shortTitle: 'Declaration',
      title: CONSENT_SECTION.title,
      description: CONSENT_SECTION.description,
      fields: consentFields,
    })

    return { allSections: sections, knownFieldIds: ids }
  }, [])

  // Legacy or unmapped fields in responses
  const unmappedEntries = useMemo(() => {
    return Object.entries(responses).filter(([key]) => !knownFieldIds.has(key))
  }, [responses, knownFieldIds])

  // Count answered questions
  const answeredCount = useMemo(() => {
    return Object.values(responses).filter(
      (v) => v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && v.length === 0)
    ).length
  }, [responses])

  const handlePatientFieldChange = (field, val) => {
    setPatientData((prev) => ({ ...prev, [field]: val }))
  }

  const handleResponseChange = (fieldId, val) => {
    setResponses((prev) => ({ ...prev, [fieldId]: val }))
  }

  const handleSave = () => {
    onSave(consultation._id || consultation.id || consultation.referenceId, {
      patient: patientData,
      status,
      practitionerNotes,
      doshaAssessment: {
        primaryDosha,
        notes: doshaNotes,
      },
      responses,
    })
  }

  // Format value display in Clinical View
  const renderFormattedValue = (val, fieldDef) => {
    if (val === undefined || val === null || val === '') {
      return <span className="text-slate-400 italic text-xs">Not answered</span>
    }

    const type = fieldDef?.type

    if (Array.isArray(val)) {
      if (val.length === 0) {
        return <span className="text-slate-400 italic text-xs">None selected</span>
      }
      return (
        <div className="flex flex-wrap gap-1.5 mt-1">
          {val.map((item, idx) => (
            <span
              key={idx}
              className="inline-block bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-2xs"
            >
              {item}
            </span>
          ))}
        </div>
      )
    }

    if (type === 'scale') {
      return (
        <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-900 border border-blue-200 px-3 py-1 rounded-lg text-xs font-bold shadow-2xs">
          <span className="text-sm font-extrabold text-blue-600">{val}</span> / 10
        </div>
      )
    }

    if (type === 'file' || (typeof val === 'object' && val?.dataUrl)) {
      const src = typeof val === 'string' ? val : val?.dataUrl
      const name = typeof val === 'object' ? val?.name : (fieldDef?.label || 'Uploaded photo')
      if (!src) return <span className="text-slate-400 italic text-xs">No file uploaded</span>
      return (
        <div className="flex items-center gap-3 mt-1.5 p-2.5 bg-white border border-slate-200 rounded-xl max-w-sm shadow-xs">
          <img
            src={src}
            alt="Upload thumbnail"
            className="w-14 h-14 object-cover rounded-lg border border-slate-200 bg-slate-50 shrink-0 cursor-pointer hover:opacity-90 hover:scale-105 transition-all shadow-2xs"
            onClick={() => setLightboxImage({ src, title: name })}
          />
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-800 truncate">{name}</p>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Attached file
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

    if (type === 'radio') {
      return (
        <span className="inline-block bg-slate-100 text-slate-800 border border-slate-200 px-2.5 py-0.5 rounded-md text-xs font-semibold">
          {String(val)}
        </span>
      )
    }

    return (
      <div className="text-sm text-slate-800 whitespace-pre-line leading-relaxed font-medium bg-white/70 p-2 rounded-lg border border-slate-200/50">
        {String(val)}
      </div>
    )
  }

  const dateDisplay = consultation.submittedAt || consultation.createdAt
    ? new Date(consultation.submittedAt || consultation.createdAt).toLocaleString()
    : 'Recently'

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl w-full max-w-5xl max-h-[94vh] flex flex-col my-auto overflow-hidden">
          
          {/* Modal Top Header */}
          <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-blue-700 to-sky-500 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20 shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <polyline points="16 11 18 13 22 9" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 truncate">
                    {patientData.fullName || 'Patient Assessment'}
                  </h3>
                  <span className="font-mono text-[11px] sm:text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-md font-bold">
                    {consultation.referenceId}
                  </span>
                  <span className="text-[11px] sm:text-xs px-2 py-0.5 rounded-full font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    {status}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 truncate">
                  Submitted on {dateDisplay} • {answeredCount} responses recorded
                </p>
              </div>
            </div>

            <button
              type="button"
              className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 cursor-pointer transition-colors text-lg font-bold shrink-0"
              onClick={onClose}
              title="Close modal"
            >
              &times;
            </button>
          </div>

          {/* Modal Tabs Bar */}
          <div className="flex border-b border-slate-200 px-3 sm:px-6 bg-white gap-1 sm:gap-3 overflow-x-auto shrink-0 scrollbar-none">
            <button
              type="button"
              className={`py-2.5 sm:py-3 px-2 sm:px-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                activeTab === 'responses'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
              onClick={() => setActiveTab('responses')}
            >
              <span>Assessment Responses</span>
              <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.2 rounded-full font-extrabold">
                {answeredCount}
              </span>
            </button>

            <button
              type="button"
              className={`py-2.5 sm:py-3 px-2 sm:px-3 text-xs font-bold border-b-2 transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                activeTab === 'patient'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
              onClick={() => setActiveTab('patient')}
            >
              Demographics & Vitals
            </button>

            <button
              type="button"
              className={`py-2.5 sm:py-3 px-2 sm:px-3 text-xs font-bold border-b-2 transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                activeTab === 'notes'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
              onClick={() => setActiveTab('notes')}
            >
              Practitioner Notes & Dosha
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-5 bg-slate-50/40">
            
            {/* TAB 1: RESPONSES (STRUCTURED CLINICAL VIEW / EDIT) */}
            {activeTab === 'responses' && (
              <div className="space-y-4">
                {/* Controls bar */}
                <div className="bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-xs">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Patient Consultation Intake Responses
                    </h4>
                    <p className="text-xs text-slate-500">
                      Organized by assessment steps matching the patient intake questionnaire.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                        checked={filterFilledOnly}
                        onChange={(e) => setFilterFilledOnly(e.target.checked)}
                      />
                      <span>Show only answered</span>
                    </label>

                    <button
                      type="button"
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        isEditMode
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                      onClick={() => setIsEditMode((prev) => !prev)}
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      <span>{isEditMode ? 'Done' : 'Edit'}</span>
                    </button>
                  </div>
                </div>

                {/* Sections list */}
                <div className="space-y-4">
                  {allSections.map((sec, sIdx) => {
                    const visibleFields = sec.fields.filter((field) => {
                      if (!filterFilledOnly) return true
                      const val = responses[field.id]
                      return val !== undefined && val !== null && val !== '' && !(Array.isArray(val) && val.length === 0)
                    })

                    if (visibleFields.length === 0 && filterFilledOnly) {
                      return null
                    }

                    return (
                      <div
                        key={sIdx}
                        className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3.5"
                      >
                        <div className="border-b border-slate-100 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md">
                              Step {sec.stepId}
                            </span>
                            <h5 className="font-extrabold text-sm text-slate-900">{sec.title}</h5>
                          </div>
                          {sec.description && (
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{sec.description}</p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {visibleFields.map((field) => {
                            const val = responses[field.id]

                            return (
                              <div
                                key={field.id}
                                className="bg-slate-50/70 border border-slate-200/70 rounded-xl p-3 sm:p-3.5 space-y-1.5"
                              >
                                <div className="text-xs font-bold text-slate-700 leading-snug">
                                  {field.label}
                                </div>

                                {isEditMode ? (
                                  Array.isArray(val) ? (
                                    <input
                                      type="text"
                                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      value={val.join(', ')}
                                      onChange={(e) =>
                                        handleResponseChange(
                                          field.id,
                                          e.target.value.split(',').map((s) => s.trim())
                                        )
                                      }
                                    />
                                  ) : (
                                    <textarea
                                      rows={2}
                                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      value={val || ''}
                                      onChange={(e) => handleResponseChange(field.id, e.target.value)}
                                    />
                                  )
                                ) : (
                                  <div>{renderFormattedValue(val, field)}</div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}

                  {/* Additional / Unmapped fields fallback (if any exist from earlier submissions) */}
                  {unmappedEntries.length > 0 && (
                    <div className="bg-white border border-amber-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
                      <div className="border-b border-amber-100 pb-2.5">
                        <h5 className="font-extrabold text-sm text-amber-900">
                          Additional Submitted Responses ({unmappedEntries.length})
                        </h5>
                        <p className="text-xs text-amber-700">
                          Data fields recorded from earlier form submissions
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {unmappedEntries.map(([key, val]) => (
                          <div key={key} className="bg-amber-50/40 border border-amber-200/60 rounded-xl p-3 space-y-1">
                            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">
                              {key}
                            </span>
                            <div>{renderFormattedValue(val, { type: 'text' })}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: PATIENT DEMOGRAPHICS & VITALS */}
            {activeTab === 'patient' && (
              <div className="space-y-4">
                <div className="bg-blue-50/50 border border-blue-200/60 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <div className="text-xs font-bold text-blue-900 uppercase tracking-wide">
                      Workflow Stage
                    </div>
                    <div className="text-xs text-blue-700">Update current consultation state</div>
                  </div>

                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="px-3.5 py-2 bg-white border border-blue-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs w-full sm:w-auto"
                  >
                    <option value="Pending Review">Pending Review</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Consultation Scheduled">Consultation Scheduled</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
                    Contact & Identification
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Full Name</label>
                      <input
                        type="text"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={patientData.fullName}
                        onChange={(e) => handlePatientFieldChange('fullName', e.target.value)}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Email Address</label>
                      <input
                        type="email"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={patientData.email}
                        onChange={(e) => handlePatientFieldChange('email', e.target.value)}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={patientData.phone}
                        onChange={(e) => handlePatientFieldChange('phone', e.target.value)}
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2 lg:col-span-3">
                      <label className="text-xs font-bold text-slate-700">Residential Address / City & Country</label>
                      <input
                        type="text"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={patientData.address}
                        onChange={(e) => handlePatientFieldChange('address', e.target.value)}
                        placeholder="House/Street, City, State, Country, Postal Code"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Date of Birth</label>
                      <input
                        type="date"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={patientData.dob}
                        onChange={(e) => handlePatientFieldChange('dob', e.target.value)}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Time of Birth</label>
                      <input
                        type="time"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={patientData.timeOfBirth}
                        onChange={(e) => handlePatientFieldChange('timeOfBirth', e.target.value)}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Place of Birth</label>
                      <input
                        type="text"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={patientData.placeOfBirth}
                        onChange={(e) => handlePatientFieldChange('placeOfBirth', e.target.value)}
                        placeholder="City, Country"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Sex at Birth</label>
                      <select
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={patientData.sexAtBirth}
                        onChange={(e) => handlePatientFieldChange('sexAtBirth', e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Intersex">Intersex</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700">Occupation</label>
                      <input
                        type="text"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={patientData.occupation}
                        onChange={(e) => handlePatientFieldChange('occupation', e.target.value)}
                      />
                    </div>
                  </div>

                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2 pt-3">
                    Physical Body Metrics
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Height</label>
                      <input
                        type="text"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={patientData.height}
                        onChange={(e) => handlePatientFieldChange('height', e.target.value)}
                        placeholder="e.g. 5 ft 8 in"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Current Weight</label>
                      <input
                        type="text"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={patientData.currentWeight}
                        onChange={(e) => handlePatientFieldChange('currentWeight', e.target.value)}
                        placeholder="e.g. 68 kg"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Usual / Comfortable Weight</label>
                      <input
                        type="text"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={patientData.usualWeight}
                        onChange={(e) => handlePatientFieldChange('usualWeight', e.target.value)}
                        placeholder="e.g. 65 kg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: NOTES & DOSHA */}
            {activeTab === 'notes' && (
              <div className="space-y-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Primary Dosha Constitution Diagnosis</label>
                    <select
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                      value={primaryDosha}
                      onChange={(e) => setPrimaryDosha(e.target.value)}
                    >
                      <option value="">Select Primary Dosha Diagnosis</option>
                      <option value="Vata Dominant">Vata Dominant (Air & Ether)</option>
                      <option value="Pitta Dominant">Pitta Dominant (Fire & Water)</option>
                      <option value="Kapha Dominant">Kapha Dominant (Earth & Water)</option>
                      <option value="Vata-Pitta">Vata-Pitta Dual</option>
                      <option value="Pitta-Kapha">Pitta-Kapha Dual</option>
                      <option value="Vata-Kapha">Vata-Kapha Dual</option>
                      <option value="Tridoshic (Balanced)">Tridoshic (Balanced Sama)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Dosha & Agni Clinical Assessment Notes</label>
                    <textarea
                      rows={3}
                      value={doshaNotes}
                      onChange={(e) => setDoshaNotes(e.target.value)}
                      placeholder="e.g. Aggravated Vata in colon causing irregular elimination; Agni is Vishama..."
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Practitioner Treatment Plan & Prescription Notes</label>
                    <textarea
                      rows={6}
                      value={practitionerNotes}
                      onChange={(e) => setPractitionerNotes(e.target.value)}
                      placeholder="Private internal practitioner notes, herbal recommendations, lifestyle advice..."
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Modal Bottom Action Footer */}
          <div className="bg-slate-50 border-t border-slate-200 px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <button
              type="button"
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-2 rounded-lg cursor-pointer transition-colors"
              onClick={() => {
                if (window.confirm(`Delete consultation record ${consultation.referenceId}?`)) {
                  onDelete(consultation._id || consultation.id || consultation.referenceId)
                }
              }}
            >
              Delete Record
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                onClick={onClose}
              >
                Close
              </button>

              <button
                type="button"
                className="px-5 sm:px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 cursor-pointer disabled:opacity-50"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save & Update'}
              </button>
            </div>
          </div>
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
    </>
  )
}
