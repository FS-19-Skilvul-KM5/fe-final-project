import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        setMessage(result.error);

        setTimeout(() => {
          setMessage("");
        }, 2000);
        return;
      }

      if (result.token) {
        Cookies.set("token", result.token);
        navigate("/profile");
      }
    } catch (error) {
      setMessage("Internal server error");

      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  return (
    <div>
      <Navbar />
      {message && (
        <div className="bg-white border border-black/50 fixed top-[80px] right-5 text-black p-4 mb-4">
          {message}
        </div>
      )}
      <main className="flex justify-center py-[40px] px-5">
        <div className="flex flex-col lg:w-[400px] w-full">
          <h1 className="font-semibold text-center text-[42px]">Sign in</h1>
          <form className=" flex flex-col mt-5">
            <div className="flex flex-col space-y-3">
              <label className="font-semibold text-sm" htmlFor="email">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
                className="focus:outline-none h-[38px] p-2 border border-black/20 rounded-lg"
                type="email"
                id="email"
                placeholder="Enter your email"
              />
              <label className="font-semibold text-sm" htmlFor="password">
                Password
              </label>
              <input
                className="focus:outline-none h-[38px] p-2 border border-black/20 rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="button"
              onClick={handleSignIn}
              className="h-[38px] text-sm  bg-[#186F65] text-white px-[20px] font-bold rounded-full mt-[20px]"
            >
              Log in
            </button>
          </form>
          <div className="flex items-center space-x-1 text-sm  justify-center mt-5">
            <span>Don&apos;t have account? </span>
            <a href="/signup" className="text-[#186F65] font-semibold">
              Signup
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
