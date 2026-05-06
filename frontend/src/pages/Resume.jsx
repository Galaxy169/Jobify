import { useState, useEffect } from "react";
import api from "../services/api";
import ResumePreview from "../components/ResumePreview";
import toast from "react-hot-toast";
import html2pdf from "html2pdf.js";

export default function Resume() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    linkedin: "",
    skills: "",
    education: [],
    projects: [],
    experience: [],
  });

  // Load saved resume on mount
  useEffect(() => {
    api.get("/resume").then((res) => {
      if (res.data.data) setForm(res.data.data);
    });
  }, []);

  // Save resume to backend
  const handleSave = async () => {
    const loadingToast = toast.loading("Saving resume...");
    try {
      await api.post("/resume", form);
      toast.dismiss(loadingToast);
      toast.success("Resume saved!");
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Error saving resume");
    }
  };

  // Download the preview div as a PDF
  const handleDownload = () => {
    const element = document.getElementById("resume-preview");

    html2pdf()
      .set({
        margin: 0.5,
        filename: `${form.full_name || "resume"}.pdf`,
        html2canvas: {
          scale: 2,
          useCORS: true,
          // This tells html2canvas to ignore oklch and other modern CSS colors
          ignoreElements: (el) => el.classList.contains("no-pdf"),
          onclone: (clonedDoc) => {
            // Strip all stylesheets from the cloned document
            // so Tailwind's oklch colors never reach html2canvas
            const styles = clonedDoc.querySelectorAll(
              "link[rel='stylesheet'], style",
            );
            styles.forEach((s) => s.remove());
          },
        },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  // Add a blank entry to a dynamic list
  const addItem = (field, template) => {
    setForm({ ...form, [field]: [...form[field], template] });
  };

  // Update one field inside a dynamic list entry
  const updateItem = (field, index, key, value) => {
    const updated = form[field].map((item, i) =>
      i === index ? { ...item, [key]: value } : item,
    );
    setForm({ ...form, [field]: updated });
  };

  // Remove an entry from a dynamic list
  const removeItem = (field, index) => {
    setForm({ ...form, [field]: form[field].filter((_, i) => i !== index) });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 max-w-7xl mx-auto items-start">
      {/* ── LEFT: Form ── */}
      <div className="flex flex-col gap-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Resume Builder</h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in your details — the preview updates live on the right.
          </p>
        </div>

        {/* Personal Info */}
        <FormSection title="Personal Info">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Full Name">
              <input
                type="text"
                placeholder="e.g. Riya Sharma"
                value={form.full_name}
                onChange={(e) =>
                  setForm({ ...form, full_name: e.target.value })
                }
                className="input-field"
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                placeholder="riya@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field"
              />
            </Field>
            <Field label="Phone">
              <input
                type="text"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="input-field"
              />
            </Field>
            <Field label="LinkedIn URL">
              <input
                type="text"
                placeholder="linkedin.com/in/riya"
                value={form.linkedin}
                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                className="input-field"
              />
            </Field>
          </div>
          <Field
            label={
              <>
                Skills{" "}
                <span className="text-gray-400 font-normal">
                  (comma separated)
                </span>
              </>
            }
          >
            <textarea
              rows={3}
              placeholder="React, Node.js, MySQL, Git..."
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
              className="input-field resize-none"
            />
          </Field>
        </FormSection>

        {/* Education */}
        <FormSection
          title="Education"
          onAdd={() =>
            addItem("education", { degree: "", institution: "", year: "" })
          }
        >
          {form.education.length === 0 && (
            <p className="text-sm text-gray-400 italic">
              No education added yet.
            </p>
          )}
          {form.education.map((edu, i) => (
            <DynamicCard key={i} onRemove={() => removeItem("education", i)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Degree / Course">
                  <input
                    placeholder="B.Tech Computer Science"
                    value={edu.degree}
                    onChange={(e) =>
                      updateItem("education", i, "degree", e.target.value)
                    }
                    className="input-field"
                  />
                </Field>
                <Field label="Institution">
                  <input
                    placeholder="Delhi University"
                    value={edu.institution}
                    onChange={(e) =>
                      updateItem("education", i, "institution", e.target.value)
                    }
                    className="input-field"
                  />
                </Field>
              </div>
              <div className="sm:w-1/2">
                <Field label="Year">
                  <input
                    placeholder="2021 – 2025"
                    value={edu.year}
                    onChange={(e) =>
                      updateItem("education", i, "year", e.target.value)
                    }
                    className="input-field"
                  />
                </Field>
              </div>
            </DynamicCard>
          ))}
        </FormSection>

        {/* Work Experience */}
        <FormSection
          title="Work Experience"
          onAdd={() =>
            addItem("experience", {
              company: "",
              role: "",
              duration: "",
              description: "",
            })
          }
        >
          {form.experience.length === 0 && (
            <p className="text-sm text-gray-400 italic">
              No experience added yet.
            </p>
          )}
          {form.experience.map((exp, i) => (
            <DynamicCard key={i} onRemove={() => removeItem("experience", i)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Company">
                  <input
                    placeholder="Google"
                    value={exp.company}
                    onChange={(e) =>
                      updateItem("experience", i, "company", e.target.value)
                    }
                    className="input-field"
                  />
                </Field>
                <Field label="Role">
                  <input
                    placeholder="Software Engineer Intern"
                    value={exp.role}
                    onChange={(e) =>
                      updateItem("experience", i, "role", e.target.value)
                    }
                    className="input-field"
                  />
                </Field>
              </div>
              <div className="sm:w-1/2">
                <Field label="Duration">
                  <input
                    placeholder="Jun 2024 – Aug 2024"
                    value={exp.duration}
                    onChange={(e) =>
                      updateItem("experience", i, "duration", e.target.value)
                    }
                    className="input-field"
                  />
                </Field>
              </div>
              <Field label="Description">
                <textarea
                  rows={2}
                  placeholder="What did you build or achieve?"
                  value={exp.description}
                  onChange={(e) =>
                    updateItem("experience", i, "description", e.target.value)
                  }
                  className="input-field resize-none"
                />
              </Field>
            </DynamicCard>
          ))}
        </FormSection>

        {/* Projects */}
        <FormSection
          title="Projects"
          onAdd={() =>
            addItem("projects", { title: "", description: "", link: "" })
          }
        >
          {form.projects.length === 0 && (
            <p className="text-sm text-gray-400 italic">
              No projects added yet.
            </p>
          )}
          {form.projects.map((proj, i) => (
            <DynamicCard key={i} onRemove={() => removeItem("projects", i)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Project Title">
                  <input
                    placeholder="Jobify"
                    value={proj.title}
                    onChange={(e) =>
                      updateItem("projects", i, "title", e.target.value)
                    }
                    className="input-field"
                  />
                </Field>
                <Field
                  label={
                    <>
                      Link{" "}
                      <span className="text-gray-400 font-normal">
                        (optional)
                      </span>
                    </>
                  }
                >
                  <input
                    placeholder="github.com/you/jobify"
                    value={proj.link}
                    onChange={(e) =>
                      updateItem("projects", i, "link", e.target.value)
                    }
                    className="input-field"
                  />
                </Field>
              </div>
              <Field label="Description">
                <textarea
                  rows={2}
                  placeholder="What does it do? What tech did you use?"
                  value={proj.description}
                  onChange={(e) =>
                    updateItem("projects", i, "description", e.target.value)
                  }
                  className="input-field resize-none"
                />
              </Field>
            </DynamicCard>
          ))}
        </FormSection>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors duration-200 cursor-pointer"
          >
            Save Resume
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 py-2.5 border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-semibold rounded-lg transition-colors duration-200 cursor-pointer"
          >
            ↓ Download PDF
          </button>
        </div>
      </div>

      {/* ── RIGHT: Live Preview ── */}
      <div className="lg:sticky lg:top-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
          Live Preview
        </p>
        <ResumePreview data={form} />
      </div>
    </div>
  );
}

// ── Reusable sub-components ───────────────────────────────

// Section card with title and optional "+ Add" button
function FormSection({ title, children, onAdd }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-600">
          {title}
        </h3>
        {onAdd && (
          <button
            onClick={onAdd}
            className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-md hover:bg-indigo-100 transition-colors"
          >
            + Add
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

// Card for each dynamic entry with a remove button
function DynamicCard({ children, onRemove }) {
  return (
    <div className="relative bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 text-xs text-gray-400 hover:text-red-500 hover:bg-red-50 px-1.5 py-0.5 rounded transition-colors"
      >
        ✕
      </button>
      {children}
    </div>
  );
}

// Label + input wrapper
function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-700">{label}</label>
      {children}
    </div>
  );
}
