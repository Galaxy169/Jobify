import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);
  console.log(user);

  if (!user) {
    return <p className="text-center mt-10">Not logged in</p>;
  }

  return (
    <div className="section">
      <div className="card max-w-md mx-auto text-center">
        {/* Avatar */}
        <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>

        {/* Badge */}
        <div className="mt-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              user.subscription_type === "premium"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {user.subscription_type === "premium"
              ? "Premium User"
              : "Free User"}
          </span>
        </div>
      </div>
    </div>
  );
}
