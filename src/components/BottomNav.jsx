import { Link } from "react-router-dom";

function BottomNav() {
  return (

    <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-slate-800 flex justify-around py-4 border-t border-slate-700">

      <Link to="/">
        <div className="text-center">
          <p>🏠</p>
          <p className="text-xs">
            Home
          </p>
        </div>
      </Link>

      <Link to="/pay">
        <div className="text-center">
          <p>💸</p>
          <p className="text-xs">
            Pay
          </p>
        </div>
      </Link>

      <Link to="/insights">
        <div className="text-center">
          <p>📊</p>
          <p className="text-xs">
            Insights
          </p>
        </div>
      </Link>

      <Link to="/history">
        <div className="text-center">
          <p>📜</p>
          <p className="text-xs">
            History
          </p>
        </div>
      </Link>

      <Link to="/profile">
        <div className="text-center">
          <p>👤</p>
          <p className="text-xs">
            Profile
          </p>
        </div>
      </Link>

    </div>
  );
}

export default BottomNav;