import BottomNav from "../components/BottomNav";

function Home() {
  return (

    <div className="pb-24">

      {/* HEADER */}

      <div className="p-5">

        <h1 className="text-3xl font-bold">
          SpendSense AI
        </h1>

        <p className="text-gray-400 mt-1">
          Smart UPI Payments
        </p>

      </div>

      {/* BALANCE CARD */}

      <div className="mx-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-6">

        <p className="text-sm text-gray-200">
          Available Balance
        </p>

        <h2 className="text-4xl font-bold mt-2">
          ₹25,450
        </h2>

        <div className="mt-6 flex justify-between">

          <div>
            <p className="text-gray-200 text-sm">
              Account
            </p>

            <p className="font-semibold">
              SBI Bank
            </p>
          </div>

          <div>
            <p className="text-gray-200 text-sm">
              UPI ID
            </p>

            <p className="font-semibold">
              vinaya@upi
            </p>
          </div>

        </div>

      </div>

      {/* QUICK ACTIONS */}

      <div className="grid grid-cols-4 gap-4 p-5">

        <div className="bg-slate-800 p-4 rounded-2xl text-center">
          <p className="text-2xl">📤</p>
          <p className="text-sm mt-2">
            Send
          </p>
        </div>

        <div className="bg-slate-800 p-4 rounded-2xl text-center">
          <p className="text-2xl">📥</p>
          <p className="text-sm mt-2">
            Receive
          </p>
        </div>

        <div className="bg-slate-800 p-4 rounded-2xl text-center">
          <p className="text-2xl">🏦</p>
          <p className="text-sm mt-2">
            Balance
          </p>
        </div>

        <div className="bg-slate-800 p-4 rounded-2xl text-center">
          <p className="text-2xl">📊</p>
          <p className="text-sm mt-2">
            Insights
          </p>
        </div>

      </div>

      {/* SCAN & PAY */}

      <div className="px-5">

        <button className="w-full bg-blue-500 py-5 rounded-3xl text-xl font-bold">
          Scan & Pay
        </button>

      </div>

      {/* RECENT TRANSACTIONS */}

      <div className="p-5">

        <div className="flex justify-between items-center">

          <h2 className="text-2xl font-bold">
            Recent Transactions
          </h2>

          <p className="text-blue-400">
            View All
          </p>

        </div>

        {/* TRANSACTION CARD */}

        <div className="bg-slate-800 p-4 rounded-2xl mt-5 flex justify-between items-center">

          <div>

            <h3 className="font-bold">
              Domino's Pizza
            </h3>

            <p className="text-sm text-gray-400">
              Weekend Treat
            </p>

          </div>

          <div className="text-right">

            <p className="font-bold">
              ₹499
            </p>

            <p className="text-green-400 text-sm">
              Success
            </p>

          </div>

        </div>

        <div className="bg-slate-800 p-4 rounded-2xl mt-4 flex justify-between items-center">

          <div>

            <h3 className="font-bold">
              Amazon
            </h3>

            <p className="text-sm text-gray-400">
              Electronics Purchase
            </p>

          </div>

          <div className="text-right">

            <p className="font-bold">
              ₹1,299
            </p>

            <p className="text-green-400 text-sm">
              Success
            </p>

          </div>

        </div>

      </div>

      <BottomNav />

    </div>
  );
}

export default Home;