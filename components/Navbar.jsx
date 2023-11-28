import { useState } from "react";

export default function Navbar() {
  const [menuaOpen, setMenuOpen] = useState(false);

  return (
    <nav className="h-[78px] sticky top-0 bg-white z-10">
      <div className="flex items-center justify-between relative w-full px-[50px] h-full">
        <div className="flex ">
          <a href="/">
            <img src="/logo.png" alt="" width="40" height="40" />
          </a>
        </div>
        <div
          className={`flex absolute lg:-translate-x-1/2 lg:flex-row flex-col lg:w-auto w-full lg:left-1/2 lg:space-x-5 lg:visible top-[100%] lg:top-1/2 lg:-translate-y-1/2 transition-all mt-1 lg:mt-0 ${menuaOpen ? "visible bg-white  rounded-xl " : " invisible"
            }`}
        >
          <a
            href="/"
            className="text-black/50 font-semibold hover:text-black lg:p-0 p-3 "
          >
            Beranda
          </a>
          <a
            href="/articles"
            className="text-black/50 font-semibold hover:text-black lg:p-0 p-3 "
          >
            Articles
          </a>
          <a
            href="/educations"
            className="text-black/50 font-semibold hover:text-black lg:p-0 p-3 "
          >
            Belajar
          </a>
          <a
            href="/workshop"
            className="text-black/50 font-semibold hover:text-black lg:p-0 p-3 "
          >
            Workshop
          </a>
          <a
            href="/mapMini"
            className="text-black/50 font-semibold hover:text-black lg:p-0 p-3 "
          >
            Peta Minim Sampah
          </a>
        </div>
        <div className="flex space-x-2">

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
