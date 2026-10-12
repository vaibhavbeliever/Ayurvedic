import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import AdminEditModal from './AdminEditModal'

const CACHE_KEY = 'ayur_admin_consultations_cache_v2'

export default function AdminPanel({ onBackToForm }) {
  // ⚡ 1. Initialize immediately with cached consultations for 0ms startup
  const [allConsultations, setAllConsultations] = useState(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) return JSON.parse(cached)
    } catch {
      // ignore
    }
    return []
  })

  const [isLoading, setIsLoading] = useState(() => allConsultations.length === 0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isSearchingServer, setIsSearchingServer] = useState(false)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedConsultation, setSelectedConsultation] = useState(null)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [dataSource, setDataSource] = useState('Connecting to database...')

  // Ref to track debounce timers
  const debounceTimerRef = useRef(null)

  // ✅ Get backend URL
  const getBackendURL = () => {
    const isProduction =
      window.location.hostname === 'vaidya-shivansh.vercel.app' ||
      window.location.hostname.includes('vercel.app') ||
      window.location.hostname.includes('vaidya-shivansh')

    if (isProduction) {
      return 'https://ayurvedic-backend-hkci.onrender.com'
    }

    return window.location.origin
  }

  const BACKEND_URL = getBackendURL()

  // ⚡ 2. Instant in-memory client-side filter (0 ms latency on typing / clicking tabs)
  const filteredConsultations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()

    return allConsultations.filter((item) => {
      // Status filter
      if (statusFilter !== 'All') {
        const itemStatus = item.status || 'Pending Review'
        if (itemStatus !== statusFilter) return false
      }

      // Search query filter
      if (!q) return true

      const patient = item.patient || {}
      const name = (patient.fullName || '').toLowerCase()
      const email = (patient.email || '').toLowerCase()
      const phone = (patient.phone || '').toLowerCase()
      const address = (patient.address || '').toLowerCase()
      const ref = (item.referenceId || '').toLowerCase()

      return (
        name.includes(q) ||
        email.includes(q) ||
        phone.includes(q) ||
        address.includes(q) ||
        ref.includes(q)
      )
    })
  }, [allConsultations, statusFilter, searchQuery])

  // ⚡ 3. High performance server fetch function
  const fetchFromServer = useCallback(
    async (search = '', status = 'All', showBackgroundSpinner = true) => {
      if (showBackgroundSpinner) {
        setIsSearchingServer(true)
      }
      setError(null)

      try {
        const url = new URL('/api/consultations', BACKEND_URL)
        if (search) url.searchParams.set('search', search)
        if (status !== 'All') url.searchParams.set('status', status)

        const res = await fetch(url.toString())
        if (!res.ok) throw new Error(`HTTP error ${res.status}`)

        const data = await res.json()
        const records = data.records || []

        setAllConsultations((prev) => {
          // If default unfiltered view, update entire cache
          if (!search && status === 'All') {
            try {
              localStorage.setItem(CACHE_KEY, JSON.stringify(records))
            } catch {
              // ignore
            }
            return records
          }

          // Otherwise merge found records into our master list so local view remains comprehensive
          const map = new Map(
            prev.map((item) => [item._id || item.id || item.referenceId, item])
          )
          records.forEach((r) =>
            map.set(r._id || r.id || r.referenceId, r)
          )
          const merged = Array.from(map.values())
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(merged))
          } catch {
            // ignore
          }
          return merged
        })

        setDataSource(
          data.source === 'mongodb'
            ? 'MongoDB Database (Optimized)'
            : 'Local Archive Fallback'
        )
      } catch (err) {
        console.warn('Backend fetch failed, using local cache:', err)
        setError('Could not reach remote server. Showing cached patient records.')
      } finally {
        setIsLoading(false)
        setIsRefreshing(false)
        setIsSearchingServer(false)
      }
    },
    [BACKEND_URL]
  )

  // ⚡ 4. Initial load on mount (background revalidation)
  useEffect(() => {
    let isSubscribed = true

    const initData = async () => {
      try {
        const url = new URL('/api/consultations', BACKEND_URL)
        const res = await fetch(url.toString())
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        const records = data.records || []

        if (isSubscribed) {
          setAllConsultations(records)
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(records))
          } catch {
            // ignore
          }
          setDataSource(
            data.source === 'mongodb'
              ? 'MongoDB Database (Optimized)'
              : 'Local Archive Fallback'
          )
        }
      } catch (err) {
        console.warn('Initial load failed:', err)
        if (isSubscribed) {
          setError('Could not reach remote server. Showing cached patient records.')
        }
      } finally {
        if (isSubscribed) {
          setIsLoading(false)
        }
      }
    }

    initData()

    return () => {
      isSubscribed = false
    }
  }, [BACKEND_URL])

  // ⚡ 5. Debounced server search: only queries backend after 350ms pause in typing
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Only fire background server search if there's an active search query
    if (searchQuery.trim().length > 1) {
      debounceTimerRef.current = setTimeout(() => {
        fetchFromServer(searchQuery, statusFilter, true)
      }, 350)
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [searchQuery, statusFilter, fetchFromServer])

  // Manual refresh handler
  const handleManualRefresh = async () => {
    setIsRefreshing(true)
    await fetchFromServer(searchQuery, statusFilter, false)
  }

  // ⚡ 6. Instant Consultation detail opener (opens modal immediately, loads responses on demand)
  const handleOpenConsultation = async (item) => {
    setSelectedConsultation(item)

    // If responses are not yet loaded (because list uses lightweight lean query), fetch full document in background
    if (!item.responses || Object.keys(item.responses).length === 0) {
      setIsLoadingDetails(true)
      try {
        const id = item._id || item.id || item.referenceId
        const url = new URL(`/api/consultation/${id}`, BACKEND_URL)
        const res = await fetch(url.toString())
        if (res.ok) {
          const data = await res.json()
          if (data.record) {
            setSelectedConsultation(data.record)
            // Update cache with full document so future clicks are instant
            setAllConsultations((prev) =>
              prev.map((c) =>
                c._id === id || c.id === id || c.referenceId === id
                  ? data.record
                  : c
              )
            )
          }
        }
      } catch (err) {
        console.warn('Could not fetch full consultation detail:', err)
      } finally {
        setIsLoadingDetails(false)
      }
    }
  }

  // Save changes handler
  const handleUpdateRecord = async (id, updatedFields) => {
    setIsSaving(true)
    try {
      const url = new URL(`/api/consultation/${id}`, BACKEND_URL)
      const res = await fetch(url.toString(), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      })

      if (!res.ok) throw new Error('Update failed')

      const data = await res.json()
      const updated = data.record || { ...selectedConsultation, ...updatedFields }

      setAllConsultations((prev) => {
        const next = prev.map((c) =>
          c._id === id || c.id === id || c.referenceId === id ? updated : c
        )
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(next))
        } catch {
          // ignore
        }
        return next
      })
      setSelectedConsultation(null)
    } catch (err) {
      console.warn('Error saving to backend, updating locally:', err)
      setAllConsultations((prev) => {
        const next = prev.map((c) => {
          if (c._id === id || c.id === id || c.referenceId === id) {
            return { ...c, ...updatedFields }
          }
          return c
        })
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(next))
        } catch {
          // ignore
        }
        return next
      })
      setSelectedConsultation(null)
    } finally {
      setIsSaving(false)
    }
  }

  // Delete record handler
  const handleDeleteRecord = async (id) => {
    try {
      const url = new URL(`/api/consultation/${id}`, BACKEND_URL)
      await fetch(url.toString(), { method: 'DELETE' })

      setAllConsultations((prev) => {
        const next = prev.filter(
          (c) => c._id !== id && c.id !== id && c.referenceId !== id
        )
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(next))
        } catch {
          // ignore
        }
        return next
      })
      setSelectedConsultation(null)
    } catch (err) {
      console.error('Delete failed:', err)
      setAllConsultations((prev) =>
        prev.filter((c) => c._id !== id && c.id !== id && c.referenceId !== id)
      )
      setSelectedConsultation(null)
    }
  }

  // Metrics counts
  const totalCount = allConsultations.length
  const pendingCount = allConsultations.filter(
    (c) => (c.status || 'Pending Review') === 'Pending Review'
  ).length
  const reviewCount = allConsultations.filter(
    (c) => c.status === 'Under Review'
  ).length
  const completedCount = allConsultations.filter(
    (c) => c.status === 'Completed'
  ).length

  const getStatusBadge = (status = 'Pending Review') => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'Under Review':
        return 'bg-sky-50 text-sky-700 border-sky-200'
      case 'Consultation Scheduled':
        return 'bg-purple-50 text-purple-700 border-purple-200'
      case 'Pending Review':
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200'
    }
  }

  return (
    <div className="w-full max-w-6xl space-y-6">
      {/* Top Banner & Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-8 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wide mb-2">
            <span>Admin & Practitioner Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Consultation Management
          </h2>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mt-1">
            <span>Data Source:</span>
            <strong className="text-blue-600 font-semibold">{dataSource}</strong>
            {isSearchingServer && (
              <span className="inline-flex items-center gap-1 text-[11px] text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                Syncing database...
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-all cursor-pointer shadow-xs"
            onClick={handleManualRefresh}
            title="Refresh patient records from database"
          >
            <svg
              className={`w-3.5 h-3.5 text-slate-600 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
            onClick={onBackToForm}
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Patient Form</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Total Submissions
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            {totalCount}
          </div>
        </div>
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Pending Review
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1">
            {pendingCount}
          </div>
        </div>
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-sky-600">
            Under Review
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-sky-600 mt-1">
            {reviewCount}
          </div>
        </div>
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Completed
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1">
            {completedCount}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row gap-3 justify-between items-center">
        {/* Instant Search Bar */}
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Search name, phone, email, address, ref..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-9 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <svg
            className="w-4 h-4 text-slate-400 absolute left-3 top-2.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          {/* Quick Clear or Spinner inside input */}
          {searchQuery ? (
            <button
              type="button"
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 font-bold text-xs cursor-pointer"
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              ✕
            </button>
          ) : isSearchingServer ? (
            <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin absolute right-3 top-2.5" />
          ) : null}
        </div>

        {/* Status Pills Filter */}
        <div className="flex gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            'All',
            'Pending Review',
            'Under Review',
            'Consultation Scheduled',
            'Completed',
          ].map((st) => (
            <button
              key={st}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                statusFilter === st
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              onClick={() => setStatusFilter(st)}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl p-3 flex items-center gap-2">
          <svg
            className="w-4 h-4 text-amber-600 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Submissions Table / Cards List */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        {isLoading && allConsultations.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm flex flex-col items-center gap-3">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span>Connecting to database & loading consultations...</span>
          </div>
        ) : filteredConsultations.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div className="font-bold text-slate-800 text-base">
              {searchQuery || statusFilter !== 'All'
                ? 'No matching patient records'
                : 'No Consultation Records Found'}
            </div>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {searchQuery || statusFilter !== 'All'
                ? `No records found matching "${searchQuery || statusFilter}". Try adjusting your filters.`
                : 'Submissions from the patient intake form will appear here in real time.'}
            </p>
            {(searchQuery || statusFilter !== 'All') && (
              <button
                type="button"
                className="mt-2 text-xs text-blue-600 font-bold hover:underline cursor-pointer"
                onClick={() => {
                  setSearchQuery('')
                  setStatusFilter('All')
                }}
              >
                Reset filters
              </button>
            )}
          </div>
        ) : (
          <div>
            {/* Summary count bar */}
            <div className="px-5 py-2.5 bg-slate-50/70 border-b border-slate-100 text-[11px] font-semibold text-slate-500 flex items-center justify-between">
              <span>
                Showing {filteredConsultations.length} of {allConsultations.length} record{allConsultations.length === 1 ? '' : 's'}
              </span>
              {isSearchingServer && (
                <span className="text-blue-600 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                  Checking server updates...
                </span>
              )}
            </div>

            {/* Mobile Cards View (Visible only on small screens < 640px) */}
            <div className="sm:hidden divide-y divide-slate-100">
              {filteredConsultations.map((item) => {
                const patient = item.patient || {}
                const status = item.status || 'Pending Review'
                const dateStr =
                  item.submittedAt || item.createdAt
                    ? new Date(
                        item.submittedAt || item.createdAt
                      ).toLocaleDateString()
                    : '—'

                return (
                  <div
                    key={item._id || item.id || item.referenceId}
                    className="p-4 space-y-3 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                          {(patient.fullName || 'A').charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-slate-900 text-sm leading-tight truncate">
                            {patient.fullName || 'Anonymous Patient'}
                          </h4>
                          <span className="font-mono text-[11px] text-blue-700 bg-blue-50 border border-blue-200/80 px-1.5 py-0.2 rounded font-semibold inline-block mt-0.5">
                            {item.referenceId}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-bold border shrink-0 ${getStatusBadge(
                          status
                        )}`}
                      >
                        {status}
                      </span>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-2.5 text-xs text-slate-600 space-y-1">
                      {patient.email && (
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="text-slate-400">✉️</span>
                          <span className="truncate">{patient.email}</span>
                        </div>
                      )}
                      {patient.phone && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-400">📞</span>
                          <span>{patient.phone}</span>
                        </div>
                      )}
                      {patient.address && (
                        <div className="flex items-start gap-1.5 text-slate-500">
                          <span className="text-slate-400 shrink-0">📍</span>
                          <span className="truncate">{patient.address}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[11px] text-slate-400">
                        <span>Submitted</span>
                        <span className="font-medium text-slate-600">{dateStr}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="w-full py-2 bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                      onClick={() => handleOpenConsultation(item)}
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      <span>View & Edit Details</span>
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Desktop Table View (Visible only on screens >= 640px) */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="py-3 px-5">Patient Name</th>
                    <th className="py-3 px-5">Reference ID</th>
                    <th className="py-3 px-5">Contact Details</th>
                    <th className="py-3 px-5">Submission Date</th>
                    <th className="py-3 px-5">Status</th>
                    <th className="py-3 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredConsultations.map((item) => {
                    const patient = item.patient || {}
                    const status = item.status || 'Pending Review'
                    const dateStr =
                      item.submittedAt || item.createdAt
                        ? new Date(
                            item.submittedAt || item.createdAt
                          ).toLocaleDateString()
                        : '—'

                    return (
                      <tr
                        key={item._id || item.id || item.referenceId}
                        className="hover:bg-blue-50/30 transition-colors"
                      >
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                              {(patient.fullName || 'A').charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 leading-snug">
                                {patient.fullName || 'Anonymous Patient'}
                              </div>
                              <div className="text-[11px] text-slate-400">
                                {patient.occupation ||
                                  patient.sexAtBirth ||
                                  'Patient'}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-5">
                          <span className="font-mono text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-semibold">
                            {item.referenceId}
                          </span>
                        </td>

                        <td className="py-3.5 px-5">
                          <div className="text-xs text-slate-700 font-medium">
                            {patient.email || '—'}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {patient.phone || '—'}
                          </div>
                          {patient.address && (
                            <div
                              className="text-[11px] text-slate-500 truncate max-w-[200px] mt-0.5"
                              title={patient.address}
                            >
                              📍 {patient.address}
                            </div>
                          )}
                        </td>

                        <td className="py-3.5 px-5 text-xs text-slate-500 whitespace-nowrap">
                          {dateStr}
                        </td>

                        <td className="py-3.5 px-5">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(
                              status
                            )}`}
                          >
                            {status}
                          </span>
                        </td>

                        <td className="py-3.5 px-5 text-right whitespace-nowrap">
                          <button
                            type="button"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 rounded-lg text-xs font-bold transition-all cursor-pointer mr-2 shadow-2xs"
                            onClick={() => handleOpenConsultation(item)}
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            <span>View & Edit</span>
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Admin Edit Modal */}
      {selectedConsultation && (
        <AdminEditModal
          key={
            (selectedConsultation._id || selectedConsultation.id || selectedConsultation.referenceId) +
            (selectedConsultation.responses && Object.keys(selectedConsultation.responses).length > 0 ? '-full' : '')
          }
          consultation={selectedConsultation}
          onClose={() => setSelectedConsultation(null)}
          onSave={handleUpdateRecord}
          onDelete={handleDeleteRecord}
          isSaving={isSaving}
          isLoadingDetails={isLoadingDetails}
        />
      )}
    </div>
  )
}
