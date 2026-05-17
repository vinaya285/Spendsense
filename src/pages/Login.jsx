import { signIn } from "../firebase/auth";

function Login() {

  const handleLogin = async () => {

    await signIn();

  };

  return (

    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-900 text-white p-5">

      <h1 className="text-5xl font-bold">
        SpendSense AI
      </h1>

      <p className="text-gray-400 mt-4 text-center">
        AI-powered intent-based expense tracking
      </p>

      <button
        onClick={handleLogin}
        className="mt-10 bg-blue-500 px-8 py-4 rounded-2xl text-lg font-bold"
      >
        Continue with Google
      </button>

    </div>
  );
}

export default Login;