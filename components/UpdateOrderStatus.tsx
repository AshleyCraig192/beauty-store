"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UpdateOrderStatus({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-gray-200 rounded-md px-2 py-1 text-xs"
      >
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
      <button
        onClick={handleUpdate}
        disabled={loading}
        className="text-xs bg-black text-white px-2 py-1 rounded-md hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "..." : "Update"}
      </button>
    </div>
  );
}