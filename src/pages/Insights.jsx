import axios from "axios";
import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import BottomNav from "../components/BottomNav";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Insights() {

  const [transactions, setTransactions] = useState([]);

  const [totalSpent, setTotalSpent] = useState(0);

  const [aiInsight, setAiInsight] = useState("");

  useEffect(() => {

    fetchTransactions();

  }, []);

  const generateAIInsights = async (data) => {

  try {

    const spendingText = data
      .map(
        (item) =>
          `Spent ₹${item.amount} for ${item.reason}`
      )
      .join(", ");

    const prompt = `
      Analyze this user's spending behavior:
      ${spendingText}

      Give:
      1. Spending pattern
      2. Financial advice
      3. Emotional spending observation

      Keep response under 80 words.
    `;

    if(data.length === 0){
  return;
}
    const response = await axios.post(

      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,

      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }

    );

    const text =
      response.data.candidates[0]
      .content.parts[0].text;

    setAiInsight(text);

  }

  catch (error) {

  console.log(error);

  setAiInsight(
    "AI insights temporarily unavailable due to API limits."
  );

}

};

  const fetchTransactions = async () => {

    try {

      const querySnapshot = await getDocs(
        collection(db, "transactions")
      );

      const data = [];

      let total = 0;

      querySnapshot.forEach((doc) => {

        const item = doc.data();

        data.push(item);

        total += item.amount;

      });

      setTransactions(data);

      if(data.length > 0){
  generateAIInsights(data);
}

      setTotalSpent(total);

    }

    catch (error) {

  console.log(error);

  let insight = "";

  if (totalSpent > 5000) {

    insight =
      "Your spending is relatively high this month. Consider reducing unnecessary lifestyle expenses.";

  }

  else if (totalSpent > 2000) {

    insight =
      "Your spending pattern is balanced, but food and entertainment expenses are increasing.";

  }

  else {

    insight =
      "Your spending habits appear controlled and financially healthy.";

  }

  setAiInsight(insight);

}
  };

  /* CATEGORY ANALYSIS */

  const categories = {
    Food: 0,
    Shopping: 0,
    Travel: 0,
    Bills: 0,
    Other: 0,
  };

  transactions.forEach((item) => {

    const reason = item.reason.toLowerCase();

    if (reason.includes("food")) {
      categories.Food += item.amount;
    }

    else if (reason.includes("shop")) {
      categories.Shopping += item.amount;
    }

    else if (reason.includes("travel")) {
      categories.Travel += item.amount;
    }

    else if (reason.includes("bill")) {
      categories.Bills += item.amount;
    }

    else {
      categories.Other += item.amount;
    }

  });

  const chartData = Object.keys(categories).map((key) => ({
    name: key,
    value: categories[key],
  }));

  const COLORS = [
    "#3B82F6",
    "#8B5CF6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
  ];

  return (

    <div className="p-5 pb-24">

      {/* TITLE */}

      <h1 className="text-3xl font-bold">
        Spending Insights
      </h1>

      <p className="text-gray-400 mt-2">
        Understand WHY you spend
      </p>

      {/* TOTAL SPENT */}

      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-3xl mt-8">

        <p className="text-gray-200">
          Total Spent
        </p>

        <h2 className="text-4xl font-bold mt-2">
          ₹{totalSpent}
        </h2>

        <p className="mt-4 text-sm text-gray-200">
          {transactions.length} Transactions
        </p>

      </div>

      {/* PIE CHART */}

      <div className="bg-slate-800 rounded-3xl p-5 mt-8">

        <h2 className="text-xl font-bold mb-5">
          Spending Categories
        </h2>

        <div className="h-[300px] w-full">

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={chartData}
                dataKey="value"
                outerRadius={100}
                label
              >

                {chartData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* INSIGHT CARDS */}

      <div className="space-y-4 mt-8">

        <div className="bg-slate-800 p-5 rounded-3xl">

          <h3 className="text-lg font-bold">
            Top Spending Area
          </h3>

          <p className="text-gray-400 mt-2">
            Most of your expenses are related to lifestyle spending.
          </p>

        </div>

        <div className="bg-slate-800 p-5 rounded-3xl">

          <h3 className="text-lg font-bold">
            Smart Suggestion
          </h3>

          <p className="text-gray-400 mt-2">
            Reduce emotional spending by setting weekly limits.
          </p>

        </div>

      </div>
    <div className="bg-slate-800 p-5 rounded-3xl mt-8">

   <h2 className="text-xl font-bold">
    AI Financial Insights
   </h2>

   <p className="text-gray-300 mt-4 whitespace-pre-line">
    {aiInsight || "Generating AI insights..."}
   </p>

  </div>
  
  

      <BottomNav />

    </div>
  );
}

export default Insights;