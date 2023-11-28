import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/signup`,
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            username: username,
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error);

        setTimeout(() => {
          setMessage("");
        }, 20000);
        return;
      }

      if (response.ok) {
        navigate("/signin");
      }
    } catch (error) {
      setMessage(`Error during sign-up: ${error}`);
      setMessage("");

      setTimeout(() => {
        setMessage("");
      }, 20000);
    }
  };

  return (
    <div>
      <Navbar />
      {message && (
        <div className="bg-white border border-black/50 fixed top-[82px] right-5 text-black p-4 mb-4">
          {message}
        </div>
      )}
      <main className="flex justify-center py-[40px] px-5">
        <div className="flex flex-col lg:w-[400px] w-full">
          <h1 className="font-semibold text-center text-[42px]">Sign up</h1>
          <form className=" flex flex-col mt-5">
            <div className="flex flex-col space-y-3">
              <label className="font-semibold text-sm" htmlFor="email">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus:outline-none h-[38px] p-2 border border-black/20 rounded-lg"
                type="email"
                id="email"
                placeholder="Enter your email"
              />
              <label className="font-semibold text-sm" htmlFor="username">
                Username
              </label>
              <input
                className="focus:outline-none h-[38px] p-2 border border-black/20 rounded-lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="username"
                placeholder="Enter your username"
              />
              <label className="font-semibold text-sm" htmlFor="password">
                Password
              </label>
              <input
                className="focus:outline-none h-[38px] p-2 border border-black/20 rounded-lg"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="button"
              onClick={handleSignUp}
              className="h-[38px] text-sm  bg-[#186F65] text-white px-[20px] font-bold rounded-full mt-[20px]"
            >
              Register
            </button>
          </form>
          <div className="flex items-center space-x-1 text-sm  justify-center mt-5">
            <span>Allready have account? </span>
            <a href="/signin" className="text-[#186F65] font-semibold">
              Signin
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
