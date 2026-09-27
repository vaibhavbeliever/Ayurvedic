export default function FormField({ field, value, onChange, error }) {
  const { id, label, type, required, placeholder, help, options, min, max, minLabel, maxLabel } = field

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
      {['text', 'email', 'tel'].includes(type) && (
        <input
          id={id}
          type={type}
          className={`w-full px-3.5 py-2.5 bg-white border ${error ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'} rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all shadow-xs`}
          value={value || ''}
          placeholder={placeholder || ''}
          onChange={handleTextChange}
        />
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

      {error && <p className="text-xs text-rose-600 font-medium mt-0.5">{error}</p>}
    </div>
  )
}
