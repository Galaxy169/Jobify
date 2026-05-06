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
      <div className="text-center mt-20">
        <h2 className="text-xl font-semibold">No jobs yet 🚀</h2>
        <p className="text-gray-500">Start by adding your first job</p>
        <Link
          to="/add-job"
          className="bg-indigo-600 text-white px-4 py-2 m-10 rounded"
        >
          + Add Job
        </Link>
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

      <div className="space-y-4 rounded-3xl cursor-pointer hover:scale-101 transition-all duration-300">
        {jobs.map((job) => (
          <div key={job.id} className="card flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">{job.company}</h3>
              <p className="text-gray-600 text-sm">{job.role}</p>

              <div className="mt-2">
                <span
                  className={`px-2 py-1 text-xs rounded ${
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
            </div>

            <div className="space-x-3">
              <Link
                to={`/edit-job/${job.id}`}
                className="text-slate-50 text-mb bg-indigo-600 pl-5 pr-5 pt-2 pb-2 rounded-2xl hover:bg-indigo-700 transition-all duration-200"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(job.id)}
                className="text-slate-50 text-mb cursor-pointer bg-red-500 pl-5 pr-5 pt-2 pb-2 rounded-2xl hover:bg-red-700 transition-all duration-200"
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
