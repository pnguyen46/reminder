import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";

const LoginPage = () => {
  const [token, setToken] = useToken();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onLoginClicked = async () => {
    try {
      const response = await axios.post("https://reminder-api-syhx.onrender.com/api/login", {
        email,
        password,
      })
      console.log(response);
      const { token } = response.data;
      setToken(token);
      redirectTo("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("Username or Password is incorrect");
        setTimeout(() => setError(""), 3000);
      }
    }

  };
  const redirectTo = useNavigate();
  return (
    <div className="flex min-h-full min-w-full align-middle justify-center">
      <div className="bg-white absolute top-1/4 content-container">
        <h1 className="text-center text-4xl mb-5 font-bold">Log In</h1>
        {error && <div className="fail">{error}</div>}
        <input
          className="login border-2 border-black"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="someone@gmail.com"
        />
        <input
          className="login border-2 border-black"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <hr className="my-8" />
        <button className="login cursor-pointer border-2 border-black disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none" disabled={!email || !password} onClick={onLoginClicked}>
          Log In
        </button>
        <button className="login border-2 border-black bg-zinc-300" onClick={() => redirectTo("/forgot-password")}>
          Forgot your password?
        </button>
        <button className="login border-2 border-black bg-zinc-300" onClick={() => redirectTo("/signup")}>
          Don't have an account? Sign Up
        </button>
      </div>
    </div>

  );
};

export default LoginPage;
