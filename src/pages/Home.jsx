import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { categories } from "../Data/Data";
import { useNavigate } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { useAuth } from "../contexts/AuthProvider";
import useApi from "../hooks/useApi";

export default function Home() {
  const api = useApi();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* ---------- Fetch Jobs ---------- */
  useEffect(() => {
  const loadJobs = async () => {
    setLoadingJobs(true);
    try {
      const res = await api.get("/alljobs");
      // Check if API returns { jobs: [...] } or just [...]
      setJobs(res.data.jobs || res.data || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setJobs([]);
    } finally {
      setLoadingJobs(false);
    }
  };
  loadJobs();
}, []);


  /* ---------- Recent Jobs ---------- */
  useEffect(() => {
  const sorted = [...(jobs || [])].sort(
    (a, b) => new Date(b.postedDate) - new Date(a.postedDate)
  );
  setRecentJobs(sorted.slice(0, 4));
}, [jobs]);


  /* ---------- Newsletter Subscription ---------- */
  const handleSubscribe = async () => {
    if (!email) return;
    setSubmitting(true);
    try {
      await api.post("/subscribe", { email });
      setEmail("");
      alert("Subscribed successfully!");
    } catch (err) {
      console.error(err);
      alert("Subscription failed!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full overflow-hidden">
      {/* ---------- Hero Section ---------- */}
      <div className="px-5 md:px-16 min-h-[60vh] flex items-center">
        <div className="hero-content flex-col lg:flex-row-reverse px-5 justify-between">
          <motion.img
            src="https://cdn-icons-png.flaticon.com/512/921/921071.png"
            alt="Banner"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="w-72 lg:w-[400px]"
          />
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-indigo-800">
              Your Reliable Freelance Marketplace
            </h1>
            <p className="py-6 max-w-lg">
              Connect with talented professionals and trusted clients. Create
              jobs, find work, and collaborate easily — all in one platform.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/alljobs")}
                className="btn bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Explore Jobs
              </button>
              <button
                onClick={() => navigate("/dashboard/add-job")}
                className="btn btn-outline border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              >
                Create a Job
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ================= LATEST JOBS ================= */}
      <div className="py-16 px-5 md:px-20">
        <div className="text-center mb-4 relative">
          <h2 className="text-3xl font-bold text-indigo-800 inline-block relative">
            Latest Jobs
            <span className="absolute left-1/2 -bottom-2 w-20 h-1 bg-indigo-600 rounded-full -translate-x-1/2"></span>
          </h2>
        </div>
        <p className="text-center mb-10 max-w-2xl mx-auto">
          Explore the latest opportunities from top recruiters. Find jobs in web development, digital marketing, graphics design, and more.
        </p>

        {/* Jobs Grid */}
        {loadingJobs ? (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        ) : recentJobs.length === 0 ? (
          <p className="text-center">No jobs available.</p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recentJobs.map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 p-4 flex flex-col justify-between cursor-pointer hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={job.coverImage}
                  alt={job.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3
                  className="text-lg font-semibold mb-1 cursor-pointer"
                  onClick={() => navigate(`/allJobs/${job._id}`)}
                >
                  {job.title}
                </h3>
                <p className="text-sm mb-2">{job.category}</p>
                <p className=" text-sm line-clamp-3 mb-2">{job.summary}</p>
                <div className="mt-auto flex justify-between items-center text-xs">
                  <span>{job.postedBy}</span>
                  <span>{new Date(job.postedDate).toLocaleDateString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ---------- Categories ---------- */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-4 relative"
        >
          <h2 className="text-3xl text-indigo-800 font-bold text-indigo-00 inline-block relative">
            Top Categories
            <span className="absolute left-1/2 -bottom-2 w-20 h-1 bg-indigo-600 rounded-full -translate-x-1/2"></span>
          </h2>
          <p className="mt-3 mb-10 max-w-xl mx-auto">
            Discover the main areas where we have exciting job opportunities.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-between gap-8 px-5 md:px-20">
          {categories.map((cat) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="relative card rounded-2xl overflow-hidden shadow-lg border border-gray-100 p-6 w-60 text-center cursor-pointer group transition-all duration-500"
            >
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-linear-to-tr from-indigo-100 to-indigo-200 group-hover:from-indigo-200 group-hover:to-indigo-300 transition-all duration-500">
                <img src={cat.img} alt={cat.name} className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-700 transition-colors">
                {cat.name}
              </h3>
              <p className="text-sm leading-relaxed">
                {cat.description || "Explore jobs in this category and advance your career."}
              </p>
              <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-indigo-600 transition-all duration-500 group-hover:w-full"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= FEATURES ================= */}
      <div className="py-20 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {["Secure Payments", "Verified Clients", "Easy Job Management"].map((f, i) => (
            <motion.div key={i} whileHover={{ y: -8 }} className="p-6 shadow rounded-xl">
              <h3 className="font-semibold text-lg mb-2">{f}</h3>
              <p>Experience a smooth and reliable freelancing journey.</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= HOW IT WORKS ================= */}
      <div className="px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {["Post a Job", "Hire Talent", "Complete Work"].map((s, i) => (
            <motion.div key={i} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} className="p-6 shadow rounded-xl">
              <h3 className="font-semibold text-lg mb-2">{s}</h3>
              <p>Simple steps to get work done efficiently.</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= STATISTICS ================= */}
<section className="py-24 px-6 md:px-20">
  {/* Section Title */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-center mb-16"
  >
    <h2 className="text-3xl md:text-4xl font-bold">
      Platform Statistics
    </h2>
    <p className="mt-3 text-sm max-w-xl mx-auto text-gray-500">
      A quick overview of our growing freelance marketplace
    </p>
  </motion.div>

  {/* Stats Grid */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {[
      { value: "10k+", label: "Jobs Posted" },
      { value: "5k+", label: "Freelancers" },
      { value: "3k+", label: "Clients" },
      { value: "99%", label: "Satisfaction Rate" },
    ].map((stat, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: i * 0.15 }}
        whileHover={{ y: -6, scale: 1.03 }}
        className="flex flex-col items-center justify-center gap-2 p-6 bg-white rounded-2xl shadow-lg transition-all duration-300"
      >
        <motion.h3
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="text-4xl md:text-5xl font-bold"
        >
          {stat.value}
        </motion.h3>

        <p className="text-sm tracking-wide uppercase text-gray-600">
          {stat.label}
        </p>
      </motion.div>
    ))}
  </div>
</section>

{/* ================= BLOG SECTION ================= */}
<section className="py-24 px-6 md:px-20">
  {/* Section Title */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-center mb-16"
  >
    <h2 className="text-3xl md:text-4xl font-bold">
      Latest from Our Blog
    </h2>
    <p className="mt-3 text-sm max-w-xl mx-auto text-gray-500">
      Stay updated with insights, tips, and guides for freelancers and clients.
    </p>
  </motion.div>

  {/* Blog Grid */}
  <div className="flex flex-wrap md:flex-4 justify-between gap-4">
    {[
      {
        title: "5 Tips to Boost Your Freelance Career",
        author: "Sarah Ahmed",
        date: "Jan 10, 2026",
        img: "https://images.unsplash.com/photo-1603575445455-9993f0b5c1d7?auto=format&fit=crop&w=400&q=80",
      },
      {
        title: "How to Find the Right Client Fast",
        author: "Rahim Uddin",
        date: "Jan 12, 2026",
        img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=400&q=80",
      },
      {
        title: "Top 10 Freelancing Tools in 2026",
        author: "Michael Brown",
        date: "Jan 14, 2026",
        img: "https://images.unsplash.com/photo-1591696205602-0b8b3d237a0d?auto=format&fit=crop&w=400&q=80",
      },
      {
        title: "Time Management for Freelancers",
        author: "Sarah Ahmed",
        date: "Jan 15, 2026",
        img: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=400&q=80",
      },
    ].map((blog, i) => (
      <motion.div
        key={i}
        whileHover={{ scale: 1.03, y: -6 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl overflow-hidden shadow-lg w-full sm:w-[48%] md:w-[23%] cursor-pointer"
      >
        <img
          src={blog.img}
          alt={blog.title}
          className="w-full h-40 object-cover"
        />
        <div className="p-6 flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition-colors cursor-pointer">
            {blog.title}
          </h3>
          <p className="text-sm text-gray-500">{blog.date} • {blog.author}</p>
          <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Read More
          </button>
        </div>
      </motion.div>
    ))}
  </div>
</section>



      {/* ================= TESTIMONIALS ================= */}
<section className="relative px-6 md:px-20 py-2 overflow-hidden">
  {/* background blur shapes */}
  <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl" />
  <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl" />

  <div className="relative z-10">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
      Trusted by Professionals Worldwide
    </h2>
    <p className="text-center max-w-2xl mx-auto mb-16">
      Thousands of freelancers and clients rely on our platform to find quality work and talent.
    </p>

    <div className="grid md:grid-cols-3 gap-10">
      {[
        {
          name: "Sarah Ahmed",
          role: "UI/UX Designer",
          text: "The platform feels very professional. I found quality clients quickly, and the workflow is smooth from start to finish.",
        },
        {
          name: "Rahim Uddin",
          role: "Startup Founder",
          text: "Hiring skilled freelancers became effortless. The interface is clean, modern, and saves us a lot of valuable time.",
        },
        {
          name: "Michael Brown",
          role: "Full-Stack Developer",
          text: "Clear job listings, fast communication, and a trustworthy system. Definitely one of the best marketplaces out there.",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -10 }}
          transition={{ type: "spring", stiffness: 180 }}
          className=" backdrop-blur-xl shadow-xl rounded-3xl p-8"
        >
          <p className=" leading-relaxed mb-8 text-[15px]">
            “{item.text}”
          </p>

          <div>
            <h4 className="font-semibold text-indigo-600">
              {item.name}
            </h4>
            <p className="text-sm ">{item.role}</p>
          </div>
        </motion.div>
      ))}
    </div>

    {/* CTA */}
    <div className="text-center mt-20">
      <h3 className="text-2xl font-semibold mb-4">
        Ready to get started?
      </h3>
      <p className=" mb-8">
        Join thousands of professionals and start working smarter today.
      </p>
      <button className="px-8 py-4 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 hover:scale-105 transition">
        Join Now
      </button>
    </div>
  </div>
</section>


      {/* ================= FAQ ================= */}
      <div className="py-20 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-12">FAQ</h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {["How to post a job?", "Is it free?", "How do payments work?"].map((q, i) => (
            <motion.div key={i} whileHover={{ scale: 1.02 }} className="p-5 shadow rounded-xl">
              <h3 className="font-semibold">{q}</h3>
              <p className="text-sm mt-1">Detailed explanation about {q.toLowerCase()}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ---------- Subscription Section ---------- */}
      <div className="pb-20 px-6 lg:px-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto  rounded-3xl p-10 flex flex-col md:flex-row items-center gap-6 shadow-lg"
        >
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Subscribe to our Newsletter
            </h2>
            <p>
              Get the latest jobs and updates delivered straight to your inbox.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input rounded-xl px-4 py-3 w-full md:w-72"
            />
            <button
              onClick={handleSubscribe}
              className="btn bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Subscribe"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
