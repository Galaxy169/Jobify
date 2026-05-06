export default function ResumePreview({ data }) {
  if (!data) return null;

  const skillList = data.skills
    ? data.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const isEmpty =
    !data.full_name &&
    skillList.length === 0 &&
    !data.education?.length &&
    !data.experience?.length &&
    !data.projects?.length;

  // These inline styles are what html2pdf actually reads.
  // Tailwind classes handle the on-screen look.
  const pdf = {
    wrapper: {
      fontFamily: "Georgia, 'Times New Roman', serif",
      fontSize: "13px",
      color: "#111827",
      background: "#ffffff",
      padding: "32px",
      lineHeight: "1.6",
    },
    name: {
      fontSize: "22px",
      fontWeight: "700",
      textAlign: "center",
      marginBottom: "4px",
      color: "#111827",
    },
    contact: {
      textAlign: "center",
      fontSize: "11px",
      color: "#6b7280",
      fontFamily: "Arial, sans-serif",
      marginBottom: "12px",
      paddingBottom: "12px",
      borderBottom: "2px solid #111827",
    },
    sectionTitle: {
      fontSize: "10px",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      color: "#111827",
      borderBottom: "1px solid #d1d5db",
      paddingBottom: "2px",
      marginBottom: "8px",
      marginTop: "16px",
      fontFamily: "Arial, sans-serif",
    },
    itemTitle: {
      fontWeight: "700",
      fontSize: "13px",
      color: "#111827",
    },
    itemSub: {
      fontSize: "11px",
      color: "#6b7280",
      fontStyle: "italic",
      fontFamily: "Arial, sans-serif",
    },
    itemDate: {
      fontSize: "11px",
      color: "#6b7280",
      fontFamily: "Arial, sans-serif",
    },
    itemDesc: {
      fontSize: "11px",
      color: "#374151",
      marginTop: "3px",
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.5",
    },
    skillBadge: {
      display: "inline-block",
      fontSize: "11px",
      background: "#f3f4f6",
      color: "#374151",
      padding: "2px 8px",
      borderRadius: "4px",
      marginRight: "6px",
      marginBottom: "4px",
      fontFamily: "Arial, sans-serif",
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
    },
    link: {
      color: "#4f46e5",
      fontSize: "11px",
      fontFamily: "Arial, sans-serif",
      textDecoration: "none",
    },
  };

  return (
    <div
      id="resume-preview"
      style={pdf.wrapper}
      className="bg-white border border-gray-200 rounded-xl shadow-sm text-sm font-serif text-gray-900 min-h-64"
    >
      {isEmpty && (
        <div className="flex items-center justify-center h-48 text-gray-400 text-sm italic font-sans">
          Start filling in the form to see your resume here.
        </div>
      )}

      {!isEmpty && (
        <>
          {/* Header */}
          <div style={pdf.contact}>
            <div style={pdf.name}>{data.full_name || "Your Name"}</div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              {data.email && <span>{data.email}</span>}
              {data.phone && <span>{data.phone}</span>}
              {data.linkedin && (
                <span style={{ color: "#4f46e5" }}>
                  {data.linkedin.replace(/^https?:\/\//, "")}
                </span>
              )}
            </div>
          </div>

          {/* Skills */}
          {skillList.length > 0 && (
            <div>
              <div style={pdf.sectionTitle}>Skills</div>
              <div>
                {skillList.map((skill, i) => (
                  <span key={i} style={pdf.skillBadge}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education?.length > 0 && (
            <div>
              <div style={pdf.sectionTitle}>Education</div>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: "8px" }}>
                  <div style={pdf.row}>
                    <span style={pdf.itemTitle}>{edu.degree || "—"}</span>
                    <span style={pdf.itemDate}>{edu.year}</span>
                  </div>
                  <div style={pdf.itemSub}>{edu.institution}</div>
                </div>
              ))}
            </div>
          )}

          {/* Work Experience */}
          {data.experience?.length > 0 && (
            <div>
              <div style={pdf.sectionTitle}>Work Experience</div>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: "10px" }}>
                  <div style={pdf.row}>
                    <span style={pdf.itemTitle}>{exp.role || "—"}</span>
                    <span style={pdf.itemDate}>{exp.duration}</span>
                  </div>
                  <div style={pdf.itemSub}>{exp.company}</div>
                  {exp.description && (
                    <div style={pdf.itemDesc}>{exp.description}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects?.length > 0 && (
            <div>
              <div style={pdf.sectionTitle}>Projects</div>
              {data.projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: "10px" }}>
                  <div style={pdf.row}>
                    <span style={pdf.itemTitle}>{proj.title || "—"}</span>
                    {proj.link && <span style={pdf.link}>{proj.link}</span>}
                  </div>
                  {proj.description && (
                    <div style={pdf.itemDesc}>{proj.description}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
