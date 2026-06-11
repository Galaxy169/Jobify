import { useContext, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Upgrade() {
  const { user, updateUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    try {
      setLoading(true);

      const loadingToast = toast.loading("Preparing secure payment...");

      const res = await api.post("/payments/create-order");

      const order = res.data.data;

      toast.dismiss(loadingToast);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,

        amount: order.amount,

        currency: "INR",

        name: "Jobify",

        description: "Upgrade to Premium",

        order_id: order.id,

        theme: {
          color: "#f59e0b",
        },

        handler: async function (response) {
          try {
            const verifyToast = toast.loading("Verifying payment...");

            await api.post("/payments/verify", response);

            // After payment we update out user in front end
            const updatedUser = {
              ...user,
              subscription_type: "premium",
            };

            updateUser(updatedUser);

            toast.dismiss(verifyToast);

            toast.success("Premium activated successfully!");

            setTimeout(() => {
              window.location.href = "/payment-success";
            }, 1200);
          } catch (err) {
            console.error(err);

            toast.error("Payment verification failed");
          }
        },

        modal: {
          ondismiss: function () {
            toast.error("Payment cancelled");
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.open();
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message || "Payment failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 flex items-center justify-center px-6 py-10">
      <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div>
          <div className="inline-block bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-sm font-medium mb-5">
            Premium Membership
          </div>

          <h1 className="text-5xl font-black leading-tight text-gray-900 mb-6">
            Unlock the full power of{" "}
            <span className="text-amber-500">Jobify</span>
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Access premium community insights, unlimited interview experiences,
            advanced tracking features, and future pro tools.
          </p>

          <div className="space-y-4">
            <Feature text="Unlimited community posts access" />

            <Feature text="View all interview experiences" />

            <Feature text="Premium badge in profile" />

            <Feature text="Priority future features" />

            <Feature text="Enhanced productivity tools" />
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="relative">
          {/* GLOW */}
          <div className="absolute inset-0 bg-amber-300 blur-3xl opacity-20 rounded-[40px]"></div>

          <div className="relative bg-white border border-amber-200 shadow-2xl rounded-[40px] p-8 overflow-hidden">
            {/* TOP BADGE */}
            <div className="absolute top-0 right-0 bg-amber-500 text-white px-6 py-2 rounded-bl-3xl font-semibold text-sm shadow-md">
              MOST POPULAR
            </div>

            <h2 className="text-3xl font-black text-gray-900 mb-2">
              Premium Plan
            </h2>

            <p className="text-gray-500 mb-8">
              One-time upgrade for full access
            </p>

            {/* PRICE */}
            <div className="mb-8">
              <span className="text-6xl font-black text-gray-900">₹500</span>

              <span className="text-gray-500 ml-2">one-time</span>
            </div>

            {/* FEATURES */}
            <div className="space-y-4 mb-10">
              <PremiumItem text="Unlimited access to community posts" />

              <PremiumItem text="Advanced interview insights" />

              <PremiumItem text="Future premium tools included" />

              <PremiumItem text="Priority feature access" />
            </div>

            {/* BUTTON */}
            <button
              onClick={handlePay}
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:scale-[1.02] hover:shadow-amber-300 transition-all duration-300 disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Processing..." : "Upgrade Now"}
            </button>

            <p className="text-xs text-center text-gray-400 mt-4">
              Secure payment powered by Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold">
        ✓
      </div>

      <p className="text-gray-700">{text}</p>
    </div>
  );
}

function PremiumItem({ text }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-100">
      <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm">
        ✓
      </div>

      <p className="text-gray-700 text-sm font-medium">{text}</p>
    </div>
  );
}
