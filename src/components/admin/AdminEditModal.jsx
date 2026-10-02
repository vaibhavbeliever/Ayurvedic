import { useState } from 'react'

export default function AdminEditModal({
  consultation,
  onClose,
  onSave,
  onDelete,
  isSaving,
}) {
  const [activeTab, setActiveTab] = useState('patient')
  const [patientData, setPatientData] = useState({
    fullName: consultation.patient?.fullName || '',
    email: consultation.patient?.email || '',
    phone: consultation.patient?.phone || '',
    dob: consultation.patient?.dob || '',
    sexAtBirth: consultation.patient?.sexAtBirth || '',
    occupation: consultation.patient?.occupation || '',
  })
  const [status, setStatus] = useState(consultation.status || 'Pending Review')
  const [practitionerNotes, setPractitionerNotes] = useState(consultation.practitionerNotes || '')
  const [primaryDosha, setPrimaryDosha] = useState(consultation.doshaAssessment?.primaryDosha || '')
  const [doshaNotes, setDoshaNotes] = useState(consultation.doshaAssessment?.notes || '')
  const [responses, setResponses] = useState(consultation.responses || {})

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

  const dateDisplay = consultation.submittedAt || consultation.createdAt
    ? new Date(consultation.submittedAt || consultation.createdAt).toLocaleString()
    : 'Recently'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col my-auto overflow-hidden">
        {/* Modal Top Header */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <polyline points="16 11 18 13 22 9" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-slate-900">
                  {patientData.fullName || 'Patient Details'}
                </h3>
                <span className="font-mono text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-md font-bold">
                  {consultation.referenceId}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Submitted on {dateDisplay}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 cursor-pointer"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Modal Tabs Bar */}
        <div className="flex border-b border-slate-200 px-6 bg-white gap-2">
          <button
            type="button"
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'patient'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
            onClick={() => setActiveTab('patient')}
          >
            Patient Contact & Status
          </button>
          <button
            type="button"
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'notes'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
            onClick={() => setActiveTab('notes')}
          >
            Practitioner Clinical Notes & Dosha
          </button>
          <button
            type="button"
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'responses'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
            onClick={() => setActiveTab('responses')}
          >
            Assessment Questionnaire ({Object.keys(responses).length})
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'patient' && (
            <div className="space-y-5">
              <div className="bg-blue-50/50 border border-blue-200/60 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <div className="text-xs font-bold text-blue-900 uppercase tracking-wide">
                    Consultation Status
                  </div>
                  <div className="text-xs text-blue-700">Update workflow stage for this patient</div>
                </div>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="px-3.5 py-2 bg-white border border-blue-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
                >
                  <option value="Pending Review">Pending Review</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Consultation Scheduled">Consultation Scheduled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={patientData.fullName}
                    onChange={(e) => handlePatientFieldChange('fullName', e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={patientData.email}
                    onChange={(e) => handlePatientFieldChange('email', e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={patientData.phone}
                    onChange={(e) => handlePatientFieldChange('phone', e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Date of Birth</label>
                  <input
                    type="date"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={patientData.dob}
                    onChange={(e) => handlePatientFieldChange('dob', e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Sex at Birth</label>
                  <select
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Occupation</label>
                  <input
                    type="text"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={patientData.occupation}
                    onChange={(e) => handlePatientFieldChange('occupation', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Primary Dosha Constitution Diagnosis</label>
                <select
                  value={primaryDosha}
                  onChange={(e) => setPrimaryDosha(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Unassessed / Pending Consultation</option>
                  <option value="Vata">Vata Dominant (Air & Space)</option>
                  <option value="Pitta">Pitta Dominant (Fire & Water)</option>
                  <option value="Kapha">Kapha Dominant (Earth & Water)</option>
                  <option value="Vata-Pitta">Vata-Pitta Dual</option>
                  <option value="Pitta-Kapha">Pitta-Kapha Dual</option>
                  <option value="Vata-Kapha">Vata-Kapha Dual</option>
                  <option value="Tridoshic (Sama)">Tridoshic (Balanced Sama)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Dosha & Vikriti Clinical Findings</label>
                <textarea
                  rows={3}
                  value={doshaNotes}
                  onChange={(e) => setDoshaNotes(e.target.value)}
                  placeholder="e.g. Aggravated Vata in colon causing irregular digestion..."
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Practitioner Treatment Plan & Prescription Notes</label>
                <textarea
                  rows={6}
                  value={practitionerNotes}
                  onChange={(e) => setPractitionerNotes(e.target.value)}
                  placeholder="Private internal practitioner notes, herbal recommendations..."
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'responses' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                All patient answers submitted during intake. You can edit any field if needed.
              </p>

              <div className="space-y-3">
                {Object.entries(responses).map(([key, val]) => (
                  <div key={key} className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                      {key}
                    </span>
                    {Array.isArray(val) ? (
                      <input
                        type="text"
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={val.join(', ')}
                        onChange={(e) =>
                          handleResponseChange(
                            key,
                            e.target.value.split(',').map((s) => s.trim())
                          )
                        }
                      />
                    ) : (
                      <textarea
                        rows={2}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={val || ''}
                        onChange={(e) => handleResponseChange(key, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-2 rounded-lg cursor-pointer"
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
              Cancel
            </button>

            <button
              type="button"
              className="px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 cursor-pointer disabled:opacity-50"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Saving Changes...' : 'Save & Update Record'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

