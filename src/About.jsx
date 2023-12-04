import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Navbar />
      <main className="py-[20px] px-[20px] lg:px-[50px]">
        <div className="flex lg:flex-row flex-col  py-5 justify-center lg:space-x-[100px] space-x-0 items-center">
          <div className="flex flex-col lg:w-[500px] w-full">
            <span className="text-black/50 font-semibold">
              Awali Tahun 2023 dengan
            </span>
            <h1 className="text-[52px] font-semibold leading-[58px]">
              Linkungan <span className="text-[#004225]">nyaman</span>
              <span className="text-[#004225]"> hidup</span> pun nyaman.
            </h1>
            <p className="mt-5 text-black/60">
              Kurangi sampah yang menumpuk di sekitar linkungan anda, mulai
              peduli
            </p>
            <div className="flex mt-5">
              <a
                href="/"
                className="h-[38px]  text-sm flex items-center hover:bg-[#186F65] transition-all delay-75 border border-[#186F65] text-[#186F65] hover:text-white px-[20px] font-bold rounded-full"
              >
                Learn more
              </a>
            </div>
          </div>
          <img
            src="/home-1.png"
            alt=""
            className="lg:w-[600px] w-full rounded-2xl object-cover h-[400px] lg:mt-0 mt-[30px]"
          />
        </div>
      </main>
      <main className="py-[20px] px-[20px] lg:px-[50px]">
        <div className="flex lg:flex-row flex-col  py-5 justify-center lg:space-x-[200px] space-x-0 items-center">
          <img src="/home-2.png" alt="" />

          <div className="flex flex-col lg:w-[600px] w-full">
            <div className="flex-flex col">
              <h1 className="text-[32px] font-semibold">Tentang kami</h1>
              <p className="text-[18px] font-medium">
                Eco Change adalah Yayasan dan Wirausaha Sosial dengan komunitas
                berbasis online di Indonesia yang didirikan pada tahun 2023 oleh Tim
                FS-19 dengan tujuan mengajak masyarakat Indonesia untuk menjalani
                gaya hidup bebas sampah (Zero Waste Lifestyle). Zero Waste Lifestyle
                adalah sebuah gaya hidup untuk meminimalisasi produksi sampah yang
                dihasilkan dari masing-masing individu yang akan berakhir di tempat
                pembuangan akhir (TPA) dalam upaya menjaga kelestarian lingkungan.
              </p>
              <div className="flex mt-5">
                <a
                  href="/"
                  className="h-[38px]  text-sm flex items-center hover:bg-[#186F65] transition-all delay-75 border border-[#186F65] text-[#186F65] hover:text-white px-[20px] font-bold rounded-full"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>

        </div>
      </main>

      <main className="py-[40px] px-[20px] lg:px-[50px] flex flex-col items-center ">
        <h1 className="text-[32px] text-center font-semibold">
          Platform Eco Change Memiliki 3 Tujuan sebagai sarana
        </h1>
        <div className="flex lg:w-[700px] z-0 w-full justify-between relative mt-[80px]">
          <div className="bg-black h-[1px] w-full absolute top-1/2"></div>
          <div className="w-[50px] h-[50px] bg-[#424B5A] text-white text-[22px] rounded-full flex justify-center items-center  z-10">
            1
          </div>
          <div className="w-[50px] h-[50px] absolute left-1/2 -translate-x-1/2 bg-[#424B5A] text-white text-[22px] rounded-full flex justify-center items-center  z-10">
            2
          </div>
          <div className="w-[50px] h-[50px] bg-[#424B5A] text-white text-[22px] rounded-full flex justify-center items-center  z-10">
            3
          </div>
        </div>
        <div className="flex lg:flex-row flex-col justify-between  mt-[60px] space-x-5 text-[20px]">
          <div className="flex flex-col lg:w-[600px] w-full font-semibold text-black/60 ">
            <p>
              Dengan Eco Change Indonesia, kami percaya bahwa ada 5 elemen yang
              ingin kami sentuh dan itulah dasar keberhasilan untuk perubahan.
            </p>
            <ol className="list-decimal list-inside">
              <li>Komunitas</li>
              <li>Media</li>
              <li>Pemerintah</li>
              <li>Pelaku Industri</li>
              <li>Akademisi</li>
            </ol>
            <p>
              Eco Change Indonesia sangat terbuka untuk kesempatan bekerja sama
              dengan berbagai pihak yang juga sejalan dengan visi dan misi dalam
              menjaga keberlangsungan alam dan lingkungan hidup bumi Indonesia.
            </p>
          </div>
          <img src="/home-3.png" className="lg:mt-0 mt-8" alt="" />
        </div>
      </main>
      <main className="lg:px-[150px] px-[20px] py-[70px] flex flex-col items-center">
        <h1 className="lg:text-[32px] text-[28px] font-semibold ">
          Orang Lain Tentang Kami
        </h1>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-[20px] mt-[50px]">
          {[1, 2, 3].map((items, index) => {
            return (
              <div
                key={index}
                className="flex flex-col border-4 transition-all py-[20px] p-5 border-black/10 rounded-xl hover:border-[#186F65]"
              >
                <p className="text-center font-semibold">
                  Saya sangat senang menemukan platform ini! Ini memberi saya
                  kesempatan untuk berhubungan dengan orang lain yang memiliki
                  minat yang sama. Saya telah bertemu teman-teman hebat dan
                  merasa lebih terhubung
                </p>
                <div className="flex flex-col items-center mt-[30px] justify-center">
                  <img
                    src="/avatar-1.png"
                    alt=""
                    height="52"
                    width="52"
                    className="object-cover rounded-full"
                  />
                  <div className="flex flex-col justify-center items-center mt-3">
                    <h1 className="font-semibold">Muhammad Afif</h1>
                    <span className="text-sm text-black/50">Mahasiswa</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </>
  );
}
