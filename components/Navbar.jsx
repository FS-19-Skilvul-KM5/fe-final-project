import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [menuaOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    Cookies.remove("token");

    navigate("/signin");
  };

  const isNavLinkActive = (url) => {
    return location.pathname === url;
  };

  return (
    <nav className="h-[78px] sticky top-0 bg-white z-10">
      <div className="flex items-center justify-between relative w-full lg:px-[50px] px-[20px] h-full">
        <div className="flex ">
          <a href="/">
            <img src="/logo.png" alt="" width="40" height="40" />
          </a>
        </div>
        <div
          className={`flex absolute  lg:flex-row flex-col lg:w-auto left-0 right-0 mx-[10px]  z-50 lg:left-1/2 lg:space-x-5 lg:visible top-[100%] lg:-translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 transition-all mt-1 lg:mt-0 ${
            menuaOpen ? "visible bg-white  rounded-xl " : " invisible"
          }`}
        >
          <a
            href="/"
            className={` font-semibold hover:text-black lg:p-0 p-5 ${
              isNavLinkActive("/") ? "text-black opacity-100" : "text-black/50"
            }`}
          >
            Beranda
          </a>
          <a
            href="/articles"
            className={` font-semibold hover:text-black lg:p-0 p-5 ${
              isNavLinkActive("/articles")
                ? "text-black opacity-100"
                : "text-black/50"
            }`}
          >
            Articles
          </a>
          <a
            href="/educations"
            className={` font-semibold hover:text-black lg:p-0 p-5 ${
              isNavLinkActive("/educations")
                ? "text-black opacity-100"
                : "text-black/50"
            }`}
          >
            Belajar
          </a>
          <a
            href="/workshop"
            className={`font-semibold hover:text-black lg:p-0 p-5 ${
              isNavLinkActive("/workshop")
                ? "text-black opacity-100"
                : "text-black/50"
            }`}
          >
            Workshop
          </a>
          <a
            href="/mapMini"
            className={` font-semibold hover:text-black lg:p-0 p-5 ${
              isNavLinkActive("/mapMini") ? "text-black/100" : "text-black/50"
            }`}
          >
            Peta Minim Sampah
          </a>
        </div>
        <div className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <a
                href="/profile"
                className="h-[38px] text-sm flex items-center bg-[#186F65] text-white px-[20px] font-bold rounded-full"
              >
                Profile
              </a>
              <button
                href="/signin"
                className="h-[38px] text-sm text-[#186F65] flex items-center px-[20px] font-bold rounded-full"
                onClick={handleLogout}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <a
                href="/signin"
                className="h-[38px] text-sm text-[#186F65] flex items-center px-[20px] font-bold rounded-full"
              >
                Sign in
              </a>
              <a
                href="/signup"
                className="h-[38px] text-sm flex items-center bg-[#186F65] text-white px-[20px] font-bold rounded-full"
              >
                Sign up
              </a>
            </>
          )}

          <button
            onClick={() => setMenuOpen(!menuaOpen)}
            className="lg:invisible visible"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="#252222"
              viewBox="0 0 256 256"
            >
              <path d="M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128ZM40,76H216a12,12,0,0,0,0-24H40a12,12,0,0,0,0,24ZM216,180H40a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
