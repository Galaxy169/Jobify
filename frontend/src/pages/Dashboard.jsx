import { useEffect, useState } from "react";
import api from "../services/api";
// import PageWrapper from "../components/PageWrapper";
// import Skeleton from "../components/Skeleton";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/jobs")
      .then((res) => {
        setJobs(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

//   if (loading) {
//     return (
//       <div className="section space-y-4">
//         <Skeleton />
//         <Skeleton />
//       </div>
//     );
//   }

  // 📊 Metrics
  const total = jobs.length;
  const applied = jobs.filter((j) => j.status === "applied").length;
  const interview = jobs.filter((j) => j.status === "interviewing").length;
  const offer = jobs.filter((j) => j.status === "offer").length;
  const rejected = jobs.filter((j) => j.status === "rejected").length;

  return (

      <div className="section">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* 🧮 Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Metric title="Total Jobs" value={total} />
          <Metric title="Applied" value={applied} color="blue" />
          <Metric title="Interview" value={interview} color="yellow" />
          <Metric title="Offers" value={offer} color="green" />
          <Metric title="Rejected" value={rejected} color="red" />
        </div>

        {/* 📋 Recent Jobs */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Recent Jobs</h2>

          {jobs.length === 0 && <p className="text-gray-500">No jobs yet</p>}

          <div className="space-y-3">
            {jobs.slice(0, 5).map((job) => (
              <div
                key={job.id}
                className="card flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{job.company}</p>
                  <p className="text-sm text-gray-500">{job.role}</p>
                </div>

                <StatusBadge status={job.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
  
  );
}

function Metric({ title, value, color = "gray" }) {
  const colors = {
    blue: "text-blue-600",
    yellow: "text-yellow-600",
    green: "text-green-600",
    red: "text-red-600",
    gray: "text-gray-800",
  };

  return (
    <div className="card text-center hover:shadow-md hover:scale-105 duration-200 cursor-pointer transition">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className={`text-2xl font-bold mt-1 ${colors[color]}`}>{value}</h2>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    applied: "bg-blue-100 text-blue-700",
    interviewing: "bg-yellow-100 text-yellow-700",
    offer: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    saved: "bg-gray-100 text-gray-700",
  };

  return (
    <span className={`px-2 py-1 text-xs rounded ${styles[status]}`}>
      {status}
    </span>
  );
}
