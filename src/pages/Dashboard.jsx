import React, { useEffect, useMemo, useState } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useAuth } from "../contexts/AuthProvider";
import useApi from "../hooks/useApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

/* ---------- Theme Colors ---------- */
function useThemeColors() {
  const get = (name, fallback) => {
    try {
      return (
        getComputedStyle(document.documentElement)
          .getPropertyValue(name)
          .trim() || fallback
      );
    } catch {
      return fallback;
    }
  };

  return {
    text: get("--text", "#111827"),
    muted: get("--muted", "#6b7280"),
    primary: get("--primary", "#3b82f6"),
    accent: get("--accent", "#22c55e"),
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

  const colors = useThemeColors();

  /* ---------- Fetch Dashboard Data ---------- */

  

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);

    async function loadDashboard() {
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

    loadDashboard();
  }, [user]);

  /* ---------- Chart Options ---------- */
  const chartOptions = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: colors.text },
        },
        tooltip: {
          backgroundColor: colors.surface,
          bodyColor: colors.text,
        },
      },
      scales: {
        x: {
          ticks: { color: colors.muted },
          grid: { display: false },
        },
        y: {
          ticks: { color: colors.muted },
          grid: { color: "rgba(0,0,0,0.06)" },
        },
      },
    };
  }, [colors]);

  if (loading) {
    return (
      <div className="p-6 animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/2" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 bg-gray-200 rounded-lg" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-64 bg-gray-200 rounded-lg" />
          <div className="h-64 bg-gray-200 rounded-lg" />
        </div>
      </div>
    );
  }

  if (!overview || !charts) {
    return <div className="p-6 text-gray-500">No dashboard data available</div>;
  }

  const recentJobsList = Array.isArray(recent) ? recent : (recent?.recentJobs || []);

  /* ---------- Chart Data ---------- */


  const barData = {
    labels: (charts.jobsByCategory || []).map(c => c._id || "Other"),
    datasets: [
      {
        label: "Jobs",
        data: (charts.jobsByCategory || []).map(c => c.count),
        backgroundColor: colors.primary,
        borderRadius: 8,
        barThickness: 30,
      },
    ],
  };

  const lineData = {
    labels: (charts.jobsByDay || []).map(d =>
      new Date(d._id).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      })
    ),
    datasets: [
      {
        label: "Jobs Posted (Last 30 Days)",
        data: (charts.jobsByDay || []).map(d => d.count),
        borderColor: colors.accent,
        backgroundColor: `${colors.accent}33`,
        tension: 0.4,
        fill: true,
        pointRadius: 3,
      },
    ],
  };

  

const doughnutData = {
  labels: ["Accepted", "Pending"],
  datasets: [
    {
      data: [
        charts.jobStatus?.find(s => s._id?.toLowerCase() === "accepted")?.count || 0,
        charts.jobStatus?.find(s => s._id?.toLowerCase() === "pending")?.count || 0,
      ],
      backgroundColor: [colors.accent, colors.muted],
    },
  ],
};


  const formatDate = v => {
    try {
      return new Date(v).toLocaleString();
    } catch {
      return "";
    }
  };

  return (
    <div className="p-6">
      {/* ---------- Header ---------- */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
        <p className="text-gray-600">Overview & analytics</p>
      </header>

      {/* ---------- Overview Cards ---------- */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Users", value: overview.totalUsers },
          { label: "Jobs", value: overview.totalJobs },
          { label: "Active Jobs", value: overview.activeJobs },
          { label: "Recent Jobs", value: overview.recentJobs ?? recentJobsList.length },
        ].map((item, i) => (
          <div
            key={i}
            className="p-4 bg-white rounded-xl shadow border"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {item.value}
            </p>
          </div>
        ))}
      </section>

      {/* ---------- Charts ---------- */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="p-5 bg-white rounded-2xl shadow border">
          <h3 className="font-semibold mb-3 text-indigo-800">Jobs by Category</h3>
          <div className="h-[260px]">
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>

        <div className="lg:col-span-2 p-5 bg-white rounded-2xl shadow border">
          <h3 className="font-semibold mb-3 text-indigo-800">Jobs Over Time</h3>
          <div className="h-[260px]">
            <Line data={lineData} options={chartOptions} />
          </div>
        </div>
      </section>

      {/* ---------- Status Chart ---------- */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-5 bg-white rounded-2xl shadow border">
          <h3 className="font-semibold mb-3 text-indigo-800">Job Status Overview</h3>
          <div className="h-[220px] flex justify-center items-center">
            <Doughnut data={doughnutData} />
          </div>
        </div>
      </section>

      {/* ---------- Recent Jobs ---------- */}
      <section className="p-5 bg-white rounded-2xl shadow border">
        <h3 className="font-bold mb-4 text-indigo-800">Recent Jobs</h3>
        <ul className="space-y-3">
          {recentJobsList.map(job => (
            <li
              key={job._id}
              className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50"
            >
              <div>
                <p className="font-medium text-gray-500">{job.title}</p>
                <p className="text-sm text-gray-500">{job.category}</p>
              </div>
              <div className="text-sm text-gray-500">
                {formatDate(job.createdAt || job.postedDate || job.deadline)}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}