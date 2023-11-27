export default function Footer() {
  return (
    <footer className="py-5 mt-10 ">
      <div className="grid lg:grid-cols-4 grid-cols-1">
        <div className="flex flex-col px-[50px] col-span-1">
          <div className="flex">
            <a href="/">
              <img src="/logo.png" alt="" width="40" height="40" />
            </a>
          </div>
          <p className="text-xs text-black/50 mt-2">
            Eco Change Indonesia adalah ONE-STOP-SOLUTION platform untuk gaya
            hidup zero waste. Saatnya untuk memulai sekarang!
          </p>
          <div className="mt-5 flex space-x-2">
            <a href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#252222"
                viewBox="0 0 256 256"
              >
                <path d="M245.66,77.66l-29.9,29.9C209.72,177.58,150.67,232,80,232c-14.52,0-26.49-2.3-35.58-6.84-7.33-3.67-10.33-7.6-11.08-8.72a8,8,0,0,1,3.85-11.93c.26-.1,24.24-9.31,39.47-26.84a110.93,110.93,0,0,1-21.88-24.2c-12.4-18.41-26.28-50.39-22-98.18a8,8,0,0,1,13.65-4.92c.35.35,33.28,33.1,73.54,43.72V88a47.87,47.87,0,0,1,14.36-34.3A46.87,46.87,0,0,1,168.1,40a48.66,48.66,0,0,1,41.47,24H240a8,8,0,0,1,5.66,13.66Z"></path>
              </svg>
            </a>
            <a href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#252222"
                viewBox="0 0 256 256"
              >
                <path d="M232,128a104.16,104.16,0,0,1-91.55,103.26,4,4,0,0,1-4.45-4V152h24a8,8,0,0,0,8-8.53,8.17,8.17,0,0,0-8.25-7.47H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,8-8.53A8.17,8.17,0,0,0,167.73,80H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0-8,8.53A8.17,8.17,0,0,0,96.27,152H120v75.28a4,4,0,0,1-4.44,4A104.15,104.15,0,0,1,24.07,124.09c2-54,45.74-97.9,99.78-100A104.12,104.12,0,0,1,232,128Z"></path>
              </svg>
            </a>
            <a href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#252222"
                viewBox="0 0 256 256"
              >
                <path d="M176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24ZM128,176a48,48,0,1,1,48-48A48.05,48.05,0,0,1,128,176Zm60-96a12,12,0,1,1,12-12A12,12,0,0,1,188,80Zm-28,48a32,32,0,1,1-32-32A32,32,0,0,1,160,128Z"></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="flex flex-col ">
          <h1 className="font-semibold lg:p-0 p-3 lg:text-left text-center">
            Eco Change
          </h1>
          <ul className="p-3 lg:p-0 flex flex-col lg:items-start items-center">
            <li className="">
              <a href="/about" className="text-sm">
                Tentang Kami
              </a>
            </li>
            <li>
              <a href="/" className="text-sm">
                Artikel
              </a>
            </li>
            <li>
              <a href="/" className="text-sm">
                Tim Kami
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col ">
          <h1 className="font-semibold lg:p-0 p-3 lg:text-left text-center">
            Layanan
          </h1>
          <ul className="p-3 lg:p-0 flex flex-col lg:items-start items-center">
            <li>
              <a href="/" className="text-sm">
                Serial Edukasi
              </a>
            </li>
            <li>
              <a href="/" className="text-sm">
                Workshop
              </a>
            </li>
            <li>
              <a href="/" className="text-sm">
                Peta Minim Sampah
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col ">
          <h1 className="font-semibold lg:p-0 p-3 lg:text-left text-center">
            Kontak
          </h1>
          <ul className="p-3 lg:p-0 flex flex-col lg:items-start items-center">
            <li>
              <a href="/" className="text-sm">
                ecochange@gmail.com
              </a>
            </li>
            <li>
              <a href="/" className="text-sm">
                0821-2287-6216
              </a>
            </li>
            <li>
              <a href="/" className="text-sm">
                Surabaya, Indonesia
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex mt-5 border-t border-black/10 lg:justify-end justify-center px-[50px]">
        <h1 className="text-sm">©2023 - eco change | All right reserved</h1>
      </div>
    </footer>
  );
}
