import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      console.log("JOBS:", res.data);

      setJobs(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this job?")) return;

    try {
      await api.delete(`/jobs/${id}`);
      setJobs(jobs.filter((j) => j.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  if (!jobs.length) {
    return (
      <div className="text-center mt-20 flex flex-col justify-center items-center transition-all duration-300 animate-[pulse_1s_ease-in_1]">
        <h2 className="text-xl font-semibold">No jobs yet</h2>
        <p className="text-gray-500 m-6">Start by adding your first job</p>
        <div className="bg-gradient-to-r from-indigo-400 to-sky-600 text-white px-5 py-3 rounded-lg shadow-lg hover:scale-[1.02] hover:shadow-indigo-300 transition-all duration-300 cursor-pointer">
          <Link to="/add-job">+ Add Job</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">My Jobs</h1>

        <Link
          to="/add-job"
          className="bg-indigo-600 text-white pl-5 pr-5 pt-2 pb-2 rounded-2xl hover:bg-indigo-700 transition-all duration-200"
        >
          + Add Job
        </Link>
      </div>

      {jobs.length === 0 && <p>No jobs yet</p>}

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
          >
            {/* LEFT */}
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-gray-900">
                  {job.company}
                </h3>

                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    job.status === "applied"
                      ? "bg-blue-100 text-blue-700"
                      : job.status === "interviewing"
                        ? "bg-yellow-100 text-yellow-700"
                        : job.status === "offer"
                          ? "bg-green-100 text-green-700"
                          : job.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {job.status}
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-1">{job.role}</p>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-3">
              <Link
                to={`/edit-job/${job.id}`}
                className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-all duration-300"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(job.id)}
                className="px-5 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-all duration-300 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
