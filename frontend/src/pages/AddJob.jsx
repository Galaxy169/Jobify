import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

export default function AddJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company: "",
    role: "",
    work_type: "remote",
    salary_range: "",
    status: "saved",
    location: "",
    job_posting_url: "",
    notes: "",
    interview_questions: "",
    experience: "",
    share_in_community: 0,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};

    if (!form.company) e.company = "Company required";
    if (!form.role) e.role = "Role required";

    if (form.salary_range && isNaN(Number(form.salary_range))) {
      e.salary_range = "Must be a number";
    }

    if (form.job_posting_url && !/^https?:\/\//.test(form.job_posting_url)) {
      e.job_posting_url = "Invalid URL";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Please fill the form fields correctly");
      return;
    }

    const t = toast.loading("Saving job...");

    try {
      await api.post("/jobs", form);

      toast.dismiss(t);
      toast.success("Job added 🎉");

      navigate("/jobs");
    } catch (err) {
      toast.dismiss(t);
      toast.error("Failed to add job");
    }
  };

  return (
    <div className="section">
      <div className="card max-w-xl mx-auto rounded-4xl shadow-2xl hover:shadow-gray-400 transition-all duration-300">
        <h2 className="text-3xl font-bold mb-8 text-center">Add New Job</h2>

        {/* Company */}
        <label htmlFor="company">
          <span className="text-mb text-gray-600">Company Name</span>
          <input
            className={`input ${errors.company && "input-error"} mt-2`}
            placeholder="Company Name"
            id="company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
          {errors.company && <p className="error-text">{errors.company}</p>}
        </label>

        {/* Role */}

        <label htmlFor="role">
          <span className="text-mb text-gray-600">Job Role</span>

          <input
            className={`input ${errors.role && "input-error"} mt-2`}
            placeholder="Enter Job Role"
            id="role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
          {errors.role && <p className="error-text">{errors.role}</p>}
        </label>

        {/* Work Type */}

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

        {/* Salary */}

        <label htmlFor="salary">
          <span className="text-mb text-gray-600">Salary Range</span>

          <input
            className={`input ${errors.salary_range && "input-error"} mt-2`}
            placeholder="Enter Salary"
            id="salary"
            value={form.salary_range}
            onChange={(e) => setForm({ ...form, salary_range: e.target.value })}
          />
          {errors.salary_range && (
            <p className="error-text">{errors.salary_range}</p>
          )}
        </label>

        {/* Status */}

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

        {/* Location */}

        <label htmlFor="location">
          <span className="text-mb text-gray-600">Enter Location</span>

          <input
            className="input mt-2"
            id="loction"
            placeholder="Enter Job Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </label>

        {/* URL */}

        <label htmlFor="url">
          <span className="text-mb text-gray-600">Enter Job Post URL</span>

          <input
            className={`input ${errors.job_posting_url && "input-error"} mt-2`}
            placeholder="Job URL"
            value={form.job_posting_url}
            onChange={(e) =>
              setForm({ ...form, job_posting_url: e.target.value })
            }
          />
          {errors.job_posting_url && (
            <p className="error-text">{errors.job_posting_url}</p>
          )}
        </label>

        {/* Notes */}

        <label htmlFor="notes">
          <span className="text-mb text-gray-600">Enter Notes</span>
          <textarea
            className="input mt-2"
            placeholder="Notes"
            id="notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </label>

        {/* Questions */}

        <label htmlFor="interview">
          <span className="text-mb text-gray-600">
            Enter Asked Interview Question
          </span>

          <textarea
            className="input mt-2"
            id="interview"
            placeholder="Interview Questions"
            value={form.interview_questions}
            onChange={(e) =>
              setForm({ ...form, interview_questions: e.target.value })
            }
          />
        </label>

        {/* Experience */}
        <label htmlFor="experience">
          <span className="text-mb text-gray-600">Enter your Experience</span>

          <textarea
            className="input mt-2"
            placeholder="Enter Your Experience"
            id="experience"
            value={form.experience}
            onChange={(e) => setForm({ ...form, experience: e.target.value })}
          />
        </label>

        {/* Share */}
        <label className="flex items-center space-x-2 my-3 mb-6">
          <input
            type="checkbox"
            checked={form.share_in_community === 1}
            onChange={(e) =>
              setForm({
                ...form,
                share_in_community: e.target.checked ? 1 : 0,
              })
            }
          />
          <span>Share with community</span>
        </label>

        <button onClick={handleSubmit} className="btn w-full cursor-pointer">
          Save Job
        </button>
      </div>
    </div>
  );
}
