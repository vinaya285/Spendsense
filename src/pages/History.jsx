import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import BottomNav from "../components/BottomNav";

function History() {

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {

    fetchTransactions();

  }, []);

  const fetchTransactions = async () => {

    try {

      const q = query(
        collection(db, "transactions"),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);

      const data = [];

      querySnapshot.forEach((doc) => {

        data.push({
          id: doc.id,
          ...doc.data(),
        });

      });

      setTransactions(data);

    }

    catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="p-5 pb-24">

      {/* TITLE */}

      <h1 className="text-3xl font-bold">
        Transaction History
      </h1>

      <p className="text-gray-400 mt-2">
        Track where and WHY your money goes
      </p>

      {/* TRANSACTIONS */}

      <div className="mt-8 space-y-4">

        {transactions.map((item) => (

          <div
            key={item.id}
            className="bg-slate-800 p-5 rounded-3xl"
          >

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-lg font-bold">
                  ₹{item.amount}
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  {item.upiId}
                </p>

              </div>

              <div className="text-right">

                <p className="text-green-400">
                  Success
                </p>

              </div>

            </div>

            {/* REASON */}

            <div className="mt-4 bg-slate-700 p-3 rounded-2xl">

              <p className="text-sm text-gray-300">
                WHY SPENT
              </p>

              <p className="mt-1">
                {item.reason}
              </p>

            </div>

          </div>

        ))}

      </div>

      {/* EMPTY STATE */}

      {transactions.length === 0 && (

        <div className="mt-20 text-center text-gray-400">

          No Transactions Yet

        </div>

      )}

      <BottomNav />

    </div>
  );
}

export default History;
