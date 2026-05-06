import toast from "react-hot-toast";
import api from "../services/api";

export default function Upgrade() {
  const handlePay = async () => {
    try {
      const res = await api.post("/payments/create-order");

      const order = res.data.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        order_id: order.id,

        handler: async function (response) {
          await api.post("/payments/verify", response);
          alert("Upgraded to Premium!");
          toast.success("Upgraded to permium");
          window.location.href = "/community";
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Payment Failed. Please try again.")
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white  p-6 w-96 text-center rounded-4xl shadow-md border-2 border-amber-300  hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105">
        <h2 className="text-xl font-bold mb-4">Upgrade to Premium</h2>

        <ul className="text-left mb-4 space-y-2">
          <li>✔ Unlimited community posts</li>
          <li>✔ Full job insights</li>
          <li>✔ Priority features</li>
        </ul>

        <button
          onClick={handlePay}
          className="w-full bg-amber-500 text-slate-100 py-2 cursor-pointer rounded-2xl hover:bg-amber-600 transition-all duration-300"
        >
          Upgrade to Premium ₹500
        </button>
      </div>
    </div>
  );
}
