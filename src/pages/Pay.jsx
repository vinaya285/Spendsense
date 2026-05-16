import { useState } from "react";
import { db } from "../firebase/firebase";

import {
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";

function Pay() {

  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const handlePayment = async () => {

  if (!upiId || !amount || !reason) {
    alert("Please fill all fields");
    return;
  }

  try {

    await addDoc(
      collection(db, "transactions"),
      {
        upiId,
        amount: Number(amount),
        reason,
        createdAt: Timestamp.now(),
      }
    );

    alert("Payment Successful");

    setUpiId("");
    setAmount("");
    setReason("");

  }

  catch (error) {

    console.log(error);

    alert("Payment Failed");

  }

};

  return (

    <div className="p-5 pb-24">

      {/* TITLE */}

      <h1 className="text-3xl font-bold">
        Send Money
      </h1>

      <p className="text-gray-400 mt-2">
        Smart Intent-Based Payments
      </p>

      {/* PAYMENT CARD */}

      <div className="bg-slate-800 p-5 rounded-3xl mt-8">

        {/* UPI ID */}

        <div>

          <label className="text-sm text-gray-400">
            Receiver UPI ID
          </label>

          <input
            type="text"
            placeholder="example@upi"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="w-full mt-2 bg-slate-700 p-4 rounded-2xl outline-none"
          />

        </div>

        {/* AMOUNT */}

        <div className="mt-5">

          <label className="text-sm text-gray-400">
            Amount
          </label>

          <input
            type="number"
            placeholder="₹ Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mt-2 bg-slate-700 p-4 rounded-2xl outline-none"
          />

        </div>

        {/* REASON */}

        <div className="mt-5">

          <label className="text-sm text-gray-400">
            Why are you spending this money?
          </label>

          <textarea
            placeholder="Example: Weekend dinner with friends"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full mt-2 bg-slate-700 p-4 rounded-2xl outline-none h-28"
          />

        </div>

        {/* CATEGORY SUGGESTIONS */}

        <div className="flex gap-3 flex-wrap mt-5">

          <button
            onClick={() => setReason("Food & Dining")}
            className="bg-slate-700 px-4 py-2 rounded-full"
          >
            🍔 Food
          </button>

          <button
            onClick={() => setReason("Shopping")}
            className="bg-slate-700 px-4 py-2 rounded-full"
          >
            🛍 Shopping
          </button>

          <button
            onClick={() => setReason("Travel Expense")}
            className="bg-slate-700 px-4 py-2 rounded-full"
          >
            ✈ Travel
          </button>

          <button
            onClick={() => setReason("Bills Payment")}
            className="bg-slate-700 px-4 py-2 rounded-full"
          >
            💡 Bills
          </button>

        </div>

        {/* PAY BUTTON */}

        <button
          onClick={handlePayment}
          className="w-full bg-blue-500 py-4 rounded-2xl mt-8 text-lg font-bold"
        >
          Pay Now
        </button>

      </div>

    </div>
  );
}

export default Pay;