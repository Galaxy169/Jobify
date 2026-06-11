import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-6">
      <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl border border-green-100 p-10 text-center relative overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 bg-green-300 opacity-10 blur-3xl"></div>

        {/* Success Icon */}
        <div className="relative mx-auto w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-5xl mb-6 shadow-inner">
          ✅
        </div>

        <h1 className="text-4xl font-black text-gray-900 mb-4 relative">
          Payment Successful
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed mb-8 relative">
          Your premium membership has been activated successfully. You now have
          unlimited access to premium community insights and upcoming pro
          features.
        </p>

        {/* Premium Badge */}
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-8 relative">
          ⭐ Premium Activated
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 relative">
          <Link
            to="/community"
            className="flex-1 bg-gradient-to-r from-amber-400 to-amber-500 text-white py-3 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg"
          >
            Explore Community
          </Link>

          <Link
            to="/dashboard"
            className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300"
          >
            Go to Dashboard
          </Link>
        </div>

        <p className="text-xs text-gray-400 mt-8 relative">
          Thank you for supporting Jobify
        </p>
      </div>
    </div>
  );
}
