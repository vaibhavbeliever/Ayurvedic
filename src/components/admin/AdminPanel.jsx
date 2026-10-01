import { useState, useEffect } from 'react'
import AdminEditModal from './AdminEditModal'

export default function AdminPanel({ onBackToForm }) {
  const [consultations, setConsultations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [dataSource, setDataSource] = useState("Checking database...");

  // ✅ Get backend URL
  const getBackendURL = () => {
    // Production - use full backend URL
    if (window.location.hostname.includes("vercel.app")) {
      return "https://ayurvedic-backend-hkci.onrender.com";
    }
    // Development - use relative path (Vite proxy)
    return window.location.origin;
  };

  const BACKEND_URL = getBackendURL();

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        // ✅ Use full backend URL
        const url = new URL("/api/consultations", BACKEND_URL);

        if (searchQuery) url.searchParams.set("search", searchQuery);
        if (statusFilter !== "All")
          url.searchParams.set("status", statusFilter);

        console.log("🔗 Fetching from:", url.toString());

        const res = await fetch(url.toString());

        if (!res.ok) throw new Error(`HTTP error ${res.status}`);

        const data = await res.json();
        console.log("✅ Data received:", data);

        if (isMounted) {
          setConsultations(data.records || []);
          setDataSource(
            data.source === "mongodb"
              ? "MongoDB Database"
              : "Local Archive Fallback",
          );
          setIsLoading(false);
        }
      } catch (err) {
        console.warn("Backend fetch failed:", err);
        if (isMounted) {
          setError("Could not reach backend. Showing local cache.");
          try {
            const local = JSON.parse(
              localStorage.getItem("ayur_submitted_records") || "[]",
            );
            setConsultations(local);
            setDataSource("Browser Local Cache");
          } catch {
            setConsultations([]);
          }
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [searchQuery, statusFilter, BACKEND_URL]);

  const handleManualRefresh = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const url = new URL("/api/consultations", BACKEND_URL);
      if (searchQuery) url.searchParams.set("search", searchQuery);
      if (statusFilter !== "All") url.searchParams.set("status", statusFilter);

      console.log("🔄 Refreshing from:", url.toString());

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);

      const data = await res.json();
      setConsultations(data.records || []);
      setDataSource(
        data.source === "mongodb"
          ? "MongoDB Database"
          : "Local Archive Fallback",
      );
    } catch (err) {
      console.warn("Refresh failed:", err);
      setError("Could not refresh from backend server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateRecord = async (id, updatedFields) => {
    setIsSaving(true);
    try {
      // ✅ Use full backend URL
      const url = new URL(`/api/consultation/${id}`, BACKEND_URL);

      const res = await fetch(url.toString(), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });

      if (!res.ok) throw new Error("Update failed");

      const data = await res.json();
      setConsultations((prev) =>
        prev.map((c) =>
          c._id === id || c.id === id || c.referenceId === id ? data.record : c,
        ),
      );
      setSelectedConsultation(null);
    } catch (err) {
      console.warn("Error saving to backend, updating locally:", err);
      setConsultations((prev) =>
        prev.map((c) => {
          if (c._id === id || c.id === id || c.referenceId === id) {
            return { ...c, ...updatedFields };
          }
          return c;
        }),
      );
      setSelectedConsultation(null);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteRecord = async (id) => {
    try {
      // ✅ Use full backend URL
      const url = new URL(`/api/consultation/${id}`, BACKEND_URL);
      await fetch(url.toString(), { method: "DELETE" });

      setConsultations((prev) =>
        prev.filter((c) => c._id !== id && c.id !== id && c.referenceId !== id),
      );
      setSelectedConsultation(null);
    } catch (err) {
      console.error("Delete failed:", err);
      setConsultations((prev) =>
        prev.filter((c) => c._id !== id && c.id !== id && c.referenceId !== id),
      );
      setSelectedConsultation(null);
    }
  };

  const totalCount = consultations.length;
  const pendingCount = consultations.filter(
    (c) => (c.status || "Pending Review") === "Pending Review",
  ).length;
  const reviewCount = consultations.filter(
    (c) => c.status === "Under Review",
  ).length;
  const completedCount = consultations.filter(
    (c) => c.status === "Completed",
  ).length;

  const getStatusBadge = (status = "Pending Review") => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Under Review":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "Consultation Scheduled":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Pending Review":
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="w-full max-w-6xl space-y-6">
      {/* Top Banner & Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wide mb-2">
            <span>Admin & Practitioner Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Consultation Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Data Source: <strong className="text-blue-600">{dataSource}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-all cursor-pointer shadow-xs"
            onClick={handleManualRefresh}
          >
            <svg
              className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            <span>Refresh</span>
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
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by name, email, phone, reference..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        </div>

        <div className="flex gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            "All",
            "Pending Review",
            "Under Review",
            "Consultation Scheduled",
            "Completed",
          ].map((st) => (
            <button
              key={st}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                statusFilter === st
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100"
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
        {isLoading ? (
          <div className="p-12 text-center text-slate-400 text-sm flex flex-col items-center gap-3">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span>Loading patient consultations...</span>
          </div>
        ) : consultations.length === 0 ? (
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
            <div className="font-bold text-slate-800">
              No Consultation Records Found
            </div>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Submissions from the patient intake form will appear here in real
              time.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
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
                {consultations.map((item) => {
                  const patient = item.patient || {};
                  const status = item.status || "Pending Review";
                  const dateStr =
                    item.submittedAt || item.createdAt
                      ? new Date(
                          item.submittedAt || item.createdAt,
                        ).toLocaleDateString()
                      : "—";

                  return (
                    <tr
                      key={item._id || item.id || item.referenceId}
                      className="hover:bg-blue-50/30 transition-colors"
                    >
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                            {(patient.fullName || "A").charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 leading-snug">
                              {patient.fullName || "Anonymous Patient"}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {patient.occupation ||
                                patient.sexAtBirth ||
                                "Patient"}
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
                          {patient.email || "—"}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {patient.phone || "—"}
                        </div>
                      </td>

                      <td className="py-3.5 px-5 text-xs text-slate-500 whitespace-nowrap">
                        {dateStr}
                      </td>

                      <td className="py-3.5 px-5">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(
                            status,
                          )}`}
                        >
                          {status}
                        </span>
                      </td>

                      <td className="py-3.5 px-5 text-right whitespace-nowrap">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 rounded-lg text-xs font-bold transition-all cursor-pointer mr-2"
                          onClick={() => setSelectedConsultation(item)}
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
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Admin Edit Modal */}
      {selectedConsultation && (
        <AdminEditModal
          consultation={selectedConsultation}
          onClose={() => setSelectedConsultation(null)}
          onSave={handleUpdateRecord}
          onDelete={handleDeleteRecord}
          isSaving={isSaving}
        />
      )}
    </div>
  );
}

