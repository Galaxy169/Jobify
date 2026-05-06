import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/jobs")
      .then((res) => {
        const job = res.data.data.find((j) => j.id == id);
        setForm(job);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load job");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!form) return <p className="text-center mt-10">Job not found</p>;

  const handleSubmit = async () => {
    const loadingToast = toast.loading("Updating job...");
    try {
      await api.put(`/jobs/${id}`, form);
      toast.dismiss(loadingToast);
      toast.success("Job updated!");
      navigate("/jobs");
    } catch (err) {
      console.error(err);
      toast.dismiss(loadingToast);
      toast.error("Update failed");
    }
  };

  return (
    <div className="section">
      <div className="card max-w-xl mx-auto rounded-4xl shadow-2xl hover:shadow-gray-400 transition-all duration-300">
        <h2 className="text-xl font-bold mb-4">Edit Job</h2>

        <label htmlFor="company">
          <span className="text-mb text-gray-600">Company Name</span>
          <input
            className="input mt-2"
            id="company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Company"
          />
        </label>

        <label htmlFor="role">
          <span className="text-mb text-gray-600">Job Role</span>

          <input
            className="input mt-2"
            id="role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            placeholder="Role"
          />
        </label>

        <label htmlFor="type">
          <span className="text-mb text-gray-600">Work Type</span>
          <select
            className="input mt-2"
            id="type"
            value={form.work_type}
            onChange={(e) => setForm({ ...form, work_type: e.target.value })}
          >
            <option value="remote">Remote</option>
            <option value="onsite">Onsite</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </label>

        <label htmlFor="salary">
          <span className="text-mb text-gray-600">Salary Range</span>
          <input
            className="input mt-2"
            id="salary"
            value={form.salary_range || ""}
            onChange={(e) => setForm({ ...form, salary_range: e.target.value })}
            placeholder="Salary"
          />
        </label>

        <label htmlFor="status">
          <span className="text-mb text-gray-600">Current Status</span>
          <select
            className="input mt-2"
            id="status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="saved">Saved</option>
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </label>

        <label htmlFor="location">
          <span className="text-mb text-gray-600">Enter your Experience</span>
          <input
            className="input mt-2"
            id="location"
            value={form.location || ""}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="Location"
          />
        </label>

        <label htmlFor="notes">
          <span className="text-mb text-gray-600">Enter Notes</span>
          <textarea
            className="input mt-2"
            id="notes"
            value={form.notes || ""}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Notes"
          />
        </label>

        <label htmlFor="interview">
          <span className="text-mb text-gray-600">
            Enter Asked Interview Question
          </span>
          <textarea
            className="input mt-2"
            id="interview"
            value={form.interview_questions || ""}
            onChange={(e) =>
              setForm({ ...form, interview_questions: e.target.value })
            }
            placeholder="Interview Questions"
          />
        </label>

        <label htmlFor="experience">
          <span className="text-mb text-gray-600">Enter your Experience</span>
          <textarea
            className="input mt-2"
            id="experience"
            value={form.experience || ""}
            onChange={(e) => setForm({ ...form, experience: e.target.value })}
            placeholder="Experience"
          />
        </label>

        <label className="flex items-center space-x-2 my-3 mb-6">
          <input
            type="checkbox"
            className="accent-indigo-600"
            checked={form.share_in_community === 1}
            onChange={(e) =>
              setForm({
                ...form,
                share_in_community: e.target.checked ? 1 : 0,
              })
            }
          />
          <span className="text-sm text-gray-600">Share with community</span>
        </label>

        <button onClick={handleSubmit} className="btn w-full cursor-pointer">
          Update Job
        </button>
      </div>
    </div>
  );
}
