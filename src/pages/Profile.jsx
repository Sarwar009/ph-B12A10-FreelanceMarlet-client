import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthProvider";
import useApi from "../hooks/useApi";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Profile() {
  const { user } = useAuth();
  const api = useApi();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    if (!user) return;
    axios
      .get(`${API}/users/${user.email}`)
      .then((r) => setProfile(r.data))
      .catch(console.error);
  }, [user]);

  useEffect(() => {
    if (!profile) return;
    setForm({
      name: profile.name || "",
      phone: profile.phone || "",
      location: profile.location || "",
      bio: profile.bio || "",
      photoURL: profile.photoURL || "",
    });
  }, [profile]);

  const save = async () => {
    try {
      await api.put(`/users/${user.email}`, form);
      const r = await api.get(`/users/${user.email}`);
      setProfile(r.data);
      setEditing(false);
    } catch (err) {
      console.error("Profile save failed", err);
    }
  };

  if (!profile)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 dark:text-gray-300">Loading...</p>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-2xl shadow-md transition-colors duration-300">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-800">
        Profile
      </h2>

      <div className="flex flex-col space-y-4">
        {/* Name */}
        <div className="flex flex-col">
          <label className="font-medium text-indigo-800">
            Name
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="font-medium text-indigo-800">
            Phone
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label className="font-medium text-indigo-800">
            Location
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </div>

        {/* Photo */}
        <div className="flex flex-col">
          <label className="font-medium text-indigo-800">
            Profile Photo URL
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={form.photoURL}
            onChange={(e) => setForm({ ...form, photoURL: e.target.value })}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-3">
        {editing ? (
          <>
            <button
              className="btn bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={save}
            >
              Save
            </button>
            <button
              className="btn btn-ghost text-gray-700 dark:text-gray-200"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="btn bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
