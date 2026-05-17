import {
  useEffect,
  useState,
} from "react";

import {
  auth,
  logout,
} from "../firebase/auth";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import BottomNav from "../components/BottomNav";

function Profile() {

  const user = auth.currentUser;

  const [totalSpent, setTotalSpent] = useState(0);

  const [totalTransactions, setTotalTransactions] =
    useState(0);

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      const querySnapshot =
        await getDocs(
          collection(db, "transactions")
        );

      let total = 0;

      let count = 0;

      querySnapshot.forEach((doc) => {

        const item = doc.data();

        total += item.amount;

        count++;

      });

      setTotalSpent(total);

      setTotalTransactions(count);

    }

    catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="p-5 pb-24">

      {/* PROFILE HEADER */}

      <div className="flex flex-col items-center">

        <img
          src={user?.photoURL}
          alt="profile"
          className="w-28 h-28 rounded-full border-4 border-blue-500"
        />

        <h1 className="text-3xl font-bold mt-5">
          {user?.displayName}
        </h1>

        <p className="text-gray-400 mt-2">
          {user?.email}
        </p>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-2 gap-4 mt-10">

        <div className="bg-slate-800 p-5 rounded-3xl">

          <p className="text-gray-400 text-sm">
            Total Spent
          </p>

          <h2 className="text-3xl font-bold mt-2">
            ₹{totalSpent}
          </h2>

        </div>

        <div className="bg-slate-800 p-5 rounded-3xl">

          <p className="text-gray-400 text-sm">
            Transactions
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {totalTransactions}
          </h2>

        </div>

      </div>

      {/* SETTINGS */}

      <div className="mt-10 space-y-4">

        <div className="bg-slate-800 p-5 rounded-3xl flex justify-between">

          <p>
            Notifications
          </p>

          <p>
            🔔
          </p>

        </div>

        <div className="bg-slate-800 p-5 rounded-3xl flex justify-between">

          <p>
            Security
          </p>

          <p>
            🔒
          </p>

        </div>

        <div className="bg-slate-800 p-5 rounded-3xl flex justify-between">

          <p>
            Theme
          </p>

          <p>
            🌙
          </p>

        </div>

      </div>

      {/* LOGOUT */}

      <button
        onClick={logout}
        className="w-full bg-red-500 py-4 rounded-2xl mt-10 text-lg font-bold"
      >
        Logout
      </button>

      <BottomNav />

    </div>
  );
}

export default Profile;