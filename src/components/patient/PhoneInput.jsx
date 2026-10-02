import { useState } from 'react'

const COUNTRY_LIST = [
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳', placeholder: '98765 43210', hint: '10-digit Indian mobile number', length: 10 },
  { code: 'US', name: 'United States / Canada', dialCode: '+1', flag: '🇺🇸', placeholder: '(555) 019-2834', hint: '10-digit US/Canada number', length: 10 },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧', placeholder: '7911 123456', hint: 'UK mobile or landline', length: 10 },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪', placeholder: '50 123 4567', hint: 'UAE mobile number', length: 9 },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺', placeholder: '412 345 678', hint: 'Australian number', length: 9 },
  { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬', placeholder: '8123 4567', hint: '8-digit Singapore number', length: 8 },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦', placeholder: '(555) 019-2834', hint: '10-digit Canadian number', length: 10 },
  { code: 'MY', name: 'Malaysia', dialCode: '+60', flag: '🇲🇾', placeholder: '12 345 6789', hint: 'Malaysian mobile number', length: 9 },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64', flag: '🇳🇿', placeholder: '21 123 4567', hint: 'NZ mobile number', length: 9 },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪', placeholder: '151 23456789', hint: 'German phone number', length: 11 },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷', placeholder: '6 12 34 56 78', hint: 'French phone number', length: 9 },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦', placeholder: '50 123 4567', hint: 'Saudi mobile number', length: 9 },
  { code: 'QA', name: 'Qatar', dialCode: '+974', flag: '🇶🇦', placeholder: '3312 3456', hint: 'Qatari phone number', length: 8 },
  { code: 'OM', name: 'Oman', dialCode: '+968', flag: '🇴🇲', placeholder: '9123 4567', hint: 'Omani phone number', length: 8 },
  { code: 'KW', name: 'Kuwait', dialCode: '+965', flag: '🇰🇼', placeholder: '5123 4567', hint: 'Kuwaiti phone number', length: 8 },
  { code: 'BH', name: 'Bahrain', dialCode: '+973', flag: '🇧🇭', placeholder: '3612 3456', hint: 'Bahraini phone number', length: 8 },
  { code: 'NP', name: 'Nepal', dialCode: '+977', flag: '🇳🇵', placeholder: '9841 234567', hint: 'Nepali mobile number', length: 10 },
  { code: 'BD', name: 'Bangladesh', dialCode: '+880', flag: '🇧🇩', placeholder: '1712 345678', hint: 'Bangladeshi mobile number', length: 10 },
  { code: 'LK', name: 'Sri Lanka', dialCode: '+94', flag: '🇱🇰', placeholder: '71 234 5678', hint: 'Sri Lankan mobile number', length: 9 },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦', placeholder: '71 123 4567', hint: 'South African number', length: 9 },
  { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪', placeholder: '85 123 4567', hint: 'Irish phone number', length: 9 },
  { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱', placeholder: '6 12345678', hint: 'Dutch phone number', length: 9 },
  { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭', placeholder: '78 123 45 67', hint: 'Swiss phone number', length: 9 },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹', placeholder: '312 345 6789', hint: 'Italian phone number', length: 10 },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸', placeholder: '612 34 56 78', hint: 'Spanish phone number', length: 9 },
  { code: 'OTHER', name: 'Other International', dialCode: '+', flag: '🌐', placeholder: 'Enter with country code', hint: 'Include country code & number' },
]

function parsePhone(value, fallbackCountryCode) {
  if (!value || typeof value !== 'string') {
    const fallback = COUNTRY_LIST.find((c) => c.code === fallbackCountryCode) || COUNTRY_LIST[0]
    return { country: fallback, localNumber: '' }
  }

  const clean = value.trim()
  const sorted = [...COUNTRY_LIST].sort((a, b) => b.dialCode.length - a.dialCode.length)

  for (const c of sorted) {
    if (c.dialCode !== '+' && clean.startsWith(c.dialCode)) {
      return { country: c, localNumber: clean.slice(c.dialCode.length).trim() }
    }
  }

  if (clean.startsWith('+')) {
    const otherCountry = COUNTRY_LIST.find((c) => c.code === 'OTHER') || COUNTRY_LIST[0]
    return { country: otherCountry, localNumber: clean.replace(/^\+/, '').trim() }
  }

  const fallback = COUNTRY_LIST.find((c) => c.code === fallbackCountryCode) || COUNTRY_LIST[0]
  return { country: fallback, localNumber: clean }
}

function formatDigits(rawDigits, country) {
  const digits = rawDigits.replace(/\D/g, '')

  if (country.code === 'IN') {
    const limited = digits.slice(0, 10)
    if (limited.length > 5) {
      return `${limited.slice(0, 5)} ${limited.slice(5)}`
    }
    return limited
  }

  if (country.code === 'US' || country.code === 'CA') {
    const limited = digits.slice(0, 10)
    if (limited.length > 6) {
      return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`
    }
    if (limited.length > 3) {
      return `(${limited.slice(0, 3)}) ${limited.slice(3)}`
    }
    return limited
  }

  if (digits.length > 7) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`
  }
  if (digits.length > 4) {
    return `${digits.slice(0, 4)} ${digits.slice(4)}`
  }
  return digits
}

export default function PhoneInput({ id, value, onChange, error }) {
  const [selectedCountryCode, setSelectedCountryCode] = useState('IN')
  const parsed = parsePhone(value, selectedCountryCode)
  const currentCountry = parsed.country

  const handleCountryChange = (e) => {
    const newCode = e.target.value
    setSelectedCountryCode(newCode)
    const newCountry = COUNTRY_LIST.find((c) => c.code === newCode) || COUNTRY_LIST[0]
    const formatted = formatDigits(parsed.localNumber, newCountry)
    emitValue(newCountry, formatted)
  }

  const handleNumberChange = (e) => {
    const input = e.target.value

    // If pasted with leading +, auto-detect country
    if (input.startsWith('+')) {
      const detected = parsePhone(input, selectedCountryCode)
      setSelectedCountryCode(detected.country.code)
      const formatted = formatDigits(detected.localNumber, detected.country)
      emitValue(detected.country, formatted)
      return
    }

    const formatted = formatDigits(input, currentCountry)
    emitValue(currentCountry, formatted)
  }

  const emitValue = (country, number) => {
    const trimmed = number.trim()
    if (!trimmed) {
      onChange(id, '')
      return
    }
    if (country.dialCode === '+') {
      onChange(id, `+${trimmed}`)
    } else {
      onChange(id, `${country.dialCode} ${trimmed}`)
    }
  }

  return (
    <div className="space-y-1.5">
      <div
        className={`flex items-stretch bg-white border ${
          error ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20'
        } rounded-xl shadow-xs transition-all overflow-hidden`}
      >
        {/* Country Code Picker */}
        <div className="relative flex items-center bg-slate-50/90 border-r border-slate-200 px-3 py-2 cursor-pointer hover:bg-slate-100 transition-colors shrink-0 select-none">
          <span className="text-lg leading-none mr-2">{currentCountry.flag}</span>
          <span className="text-sm font-bold text-slate-800 tracking-tight mr-1">
            {currentCountry.dialCode}
          </span>
          <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>

          {/* Native Select Overlay for accessible mobile & desktop picker */}
          <select
            value={currentCountry.code}
            onChange={handleCountryChange}
            aria-label="Select Country Dial Code"
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full text-base"
          >
            <optgroup label="Popular">
              <option value="IN">🇮🇳 India (+91)</option>
              <option value="US">🇺🇸 United States / Canada (+1)</option>
              <option value="GB">🇬🇧 United Kingdom (+44)</option>
              <option value="AE">🇦🇪 United Arab Emirates (+971)</option>
              <option value="AU">🇦🇺 Australia (+61)</option>
              <option value="SG">🇸🇬 Singapore (+65)</option>
              <option value="CA">🇨🇦 Canada (+1)</option>
            </optgroup>
            <optgroup label="All Countries">
              {COUNTRY_LIST.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name} ({c.dialCode})
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Local Number Input */}
        <input
          id={id}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          className="flex-1 px-3.5 py-2.5 bg-transparent text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none min-w-0"
          value={parsed.localNumber}
          placeholder={currentCountry.placeholder}
          onChange={handleNumberChange}
        />
      </div>

      {/* Helper text showing format information */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
        <span>
          {currentCountry.code === 'IN' ? (
            <span className="text-emerald-700 font-medium flex items-center gap-1">
              <span>🇮🇳</span>
              <span>India format: 10-digit mobile number</span>
            </span>
          ) : (
            <span>{currentCountry.hint || 'Enter phone number with country code'}</span>
          )}
        </span>
        <span className="text-slate-400">
          Selected: {currentCountry.name} ({currentCountry.dialCode})
        </span>
      </div>
    </div>
  )
}
