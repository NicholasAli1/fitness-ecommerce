"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, signup } from './actions'; // Import server actions

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

const LoginPage = () => {
  const router = useRouter();

  const [mode, setMode] = useState(MODE.LOGIN);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const formTitle =
      mode === MODE.LOGIN
          ? "Log in"
          : mode === MODE.REGISTER
              ? "Register"
              : mode === MODE.RESET_PASSWORD
                  ? "Reset Your Password"
                  : "Verify Your Email";

  const buttonTitle =
      mode === MODE.LOGIN
          ? "Login"
          : mode === MODE.REGISTER
              ? "Register"
              : mode === MODE.RESET_PASSWORD
                  ? "Reset"
                  : "Verify";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      let result;
      if (mode === MODE.LOGIN) {
        result = await login({ email, password });
      } else if (mode === MODE.REGISTER) {
        result = await signup({ email, password });
      }

      if (result?.error) {
        setError(result.error);
      } else {
        setMessage("Operation successful!");
        if (mode === MODE.LOGIN) {
          router.push("/");
        } else if (mode === MODE.REGISTER) {
          setMode(MODE.EMAIL_VERIFICATION);
        }
      }
    } catch (err: any) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };



  return (
      <div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-semibold">{formTitle}</h1>

          {mode === MODE.REGISTER && (
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-700">Username</label>
                <input
                    type="text"
                    name="username"
                    placeholder="john"
                    className="ring-2 ring-gray-300 rounded-md p-4"
                    onChange={(e) => setUsername(e.target.value)}
                />
              </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">E-mail</label>
            <input
                type="email"
                name="email"
                placeholder="john@gmail.com"
                className="ring-2 ring-gray-300 rounded-md p-4"
                onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-700">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="ring-2 ring-gray-300 rounded-md p-4"
                    onChange={(e) => setPassword(e.target.value)}
                />
              </div>
          ) : null}

          {mode === MODE.LOGIN && (
              <div
                  className="text-sm underline cursor-pointer"
                  onClick={() => setMode(MODE.RESET_PASSWORD)}
              >
                Forgot Password?
              </div>
          )}

          <button
              className="bg-lama text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
              disabled={isLoading}
          >
            {isLoading ? "Loading..." : buttonTitle}
          </button>

          {error && <div className="text-red-600">{error}</div>}
          {message && <div className="text-green-600">{message}</div>}

          {mode === MODE.LOGIN && (
              <div
                  className="text-sm underline cursor-pointer"
                  onClick={() => setMode(MODE.REGISTER)}
              >
                {"Don't"} have an account?
              </div>
          )}
          {mode === MODE.REGISTER && (
              <div
                  className="text-sm underline cursor-pointer"
                  onClick={() => setMode(MODE.LOGIN)}
              >
                Have an account?
              </div>
          )}
          {mode === MODE.RESET_PASSWORD && (
              <div
                  className="text-sm underline cursor-pointer"
                  onClick={() => setMode(MODE.LOGIN)}
              >
                Go back to Login
              </div>
          )}
        </form>
      </div>
  );
};

export default LoginPage;
