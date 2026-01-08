import React from "react";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useAuth } from "../contexts/AuthProvider";
import useApi from "../hooks/useApi";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

function useThemeColors() {
  // read CSS variables so charts adapt to light/dark theme
  const get = (name, fallback) => {
    try {
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
    } catch {
      return fallback;
    }
  };
  return {
    text: get("--text", "#111827"),
    muted: get("--muted", "#6b7280"),
    primary: get("--primary", "#0ea5a4"),
    accent: get("--accent", "#f59e0b"),
    surface: get("--bg", "#ffffff"),
  };
}

export default function Dashboard() {
  const { user } = useAuth();
  const api = useApi();
  const [overview, setOverview] = useState(null);
  const [charts, setCharts] = useState(null);
  const [recent, setRecent] = useState(null);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const colors = useThemeColors();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);

    async function load() {
      try {
        const [ovRes, chRes, rcRes] = await Promise.all([
          api.get("/dashboard/overview"),
          api.get("/dashboard/charts"),
          api.get("/dashboard/recent"),
        ]);
        setOverview(ovRes.data);
        setCharts(chRes.data);
        setRecent(rcRes.data);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user]);

  // chart options adapt to theme
  const chartOptions = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "top", labels: { color: colors.text } },
        title: { display: false },
        tooltip: { bodyColor: colors.text, backgroundColor: colors.surface },
      },
      scales: {
        x: { ticks: { color: colors.muted }, grid: { color: "transparent" } },
        y: { ticks: { color: colors.muted }, grid: { color: "rgba(0,0,0,0.06)" } },
      },
    };
  }, [colors]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-28 bg-gray-100 dark:bg-gray-800 rounded-lg" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg" />
            <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg" />
          </div>
          <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-lg" />
        </div>
      </div>
    );
  }

  if (!overview || !charts) {
    return <div className="p-6 text-muted">No dashboard data available.</div>;
  }

  const barData = {
    labels: (charts.jobsByCategory || []).map((c) => c._id || "Uncategorized"),
    datasets: [
      {
        label: "Jobs",
        data: (charts.jobsByCategory || []).map((c) => c.count),
        backgroundColor: "rgba(59,130,246,0.8)",
      },
    ],
  };

  const lineData = {
    labels: (charts.jobsByDay || []).map((d) => d._id),
    datasets: [
      {
        label: "Jobs (30 days)",
        data: (charts.jobsByDay || []).map((d) => d.count),
        borderColor: "rgba(34,197,94,0.9)",
        backgroundColor: "rgba(34,197,94,0.12)",
        tension: 0.3,
        fill: true,
        pointRadius: 2,
      },
    ],
  };

  const formatDate = (v) => {
    try {
      return v ? new Date(v).toLocaleString() : "";
    } catch {
      return "";
    }
  };

  return (
    <div className="py-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Dashboard</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Overview and recent activity</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-600 dark:text-gray-400">Last updated: {new Date().toLocaleString()}</div>
        </div>
      </header>

      {/* Overview cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Users</div>
              <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">{overview.totalUsers}</div>
            </div>
            <div className="p-3 rounded-md bg-blue-50 dark:bg-blue-900/40">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87" />
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Jobs</div>
              <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">{overview.totalJobs}</div>
            </div>
            <div className="p-3 rounded-md bg-green-50 dark:bg-green-900/40">
              <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.567-3 3.5S10.343 15 12 15s3-1.567 3-3.5S13.657 8 12 8z" />
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M19 21l-7-6-7 6" />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Active Jobs</div>
              <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">{overview.activeJobs}</div>
            </div>
            <div className="p-3 rounded-md bg-yellow-50 dark:bg-yellow-900/40">
              <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M8.757 15.364L6.636 17.485M17.485 17.485l2.121-2.121M6.636 6.636L8.757 8.757" />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Recent Jobs (30d)</div>
              <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">{overview.recentJobs}</div>
            </div>
            <div className="p-3 rounded-md bg-purple-50 dark:bg-purple-900/40">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7" />
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M16 3v4M8 3v4" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow border overflow-hidden" style={{ minHeight: 300 }}>
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Jobs by Category</h3>
          <div className="w-full h-[260px]">
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>

        <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow border overflow-hidden" style={{ minHeight: 300 }}>
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Jobs Over Time</h3>
          <div className="w-full h-[260px]">
            <Line data={lineData} options={chartOptions} />
          </div>
        </div>
      </section>

      {/* Recent Jobs */}
      <section className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">Recent Jobs</h3>
          <a className="text-sm text-primary-600 dark:text-primary-300 hover:underline" href="/allJobs">View all</a>
        </div>

        <ul className="space-y-3">
          {(recent?.recentJobs || []).map((j) => (
            <li key={j._id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 transition">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-200">
                  {j.category?.slice(0, 1) || "J"}
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">{j.title}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{j.shortDescription}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-2 sm:mt-0">
                <div className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs">{j.category || "Uncategorized"}</div>
                <div>{j.price ? `$${j.price}` : "—"}</div>
                <div className="whitespace-nowrap">{formatDate(j.createdAt)}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}