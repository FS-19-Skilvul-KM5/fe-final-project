import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import Card from "../components/Card";

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/articles/recommendations`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching latest articles:", error);
      }
    };

    fetchLatestArticles();
  }, []);
  return (
    <>
      <Navbar />
      <main className="py-[20px] lg:px-[50px] px-[20px]">
        <div className="flex lg:flex-row flex-col  py-5 justify-center lg:space-x-[100px] space-x-0 items-center">
          <div className="flex flex-col lg:w-[500px] w-full">
            <span className="text-black/50 font-semibold">
              Awali Tahun 2023 dengan{" "}
            </span>
            <h1 className="text-[62px] font-semibold  leading-[66px]">
              30 Days
              <span className="text-[#004225]"> Eco Change</span> Challenge
            </h1>
          </div>
          <img
            src="/home1.png"
            alt=""
            className="lg:w-[600px] w-full rounded-2xl object-cover h-[400px] lg:mt-0 mt-[30px]"
          />
        </div>
      </main>
      <main className="lg:px-[150px] px-[20px] py-[70px] flex flex-col items-center">
        <h1 className="lg:text-[32px] text-[28px] font-semibold ">
          Eco Change Indonesia
        </h1>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-[20px] mt-[50px]">
          <div className="flex flex-col border-4 transition-all py-[20px] px-[55px] border-black/10 rounded-xl hover:border-[#186F65]">
            <div className="flex flex-col items-center mt-[30px] justify-center">
              <img
                src="/ic-1.png"
                alt=""
                height="52"
                width="52"
                className="object-cover rounded-full"
              />
              <div className="flex flex-col justify-center items-center mt-[30px]">
                <h1 className="font-semibold">Eco Change Info</h1>
                <p className="text-sm text-center text-black/50 ">
                  Informasi dan tips untuk hidup lebih minim sampah dalam
                  kehidupan sehari-hari
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col border-4 transition-all py-[20px] px-[55px] border-black/10 rounded-xl hover:border-[#186F65]">
            <div className="flex flex-col items-center mt-[30px] justify-center">
              <img
                src="/ic-2.png"
                alt=""
                height="52"
                width="52"
                className="object-cover rounded-full"
              />
              <div className="flex flex-col justify-center items-center mt-[30px]">
                <h1 className="font-semibold">Peta Minim Sampah</h1>
                <p className="text-sm text-center text-black/50 ">
                  Informasi dan tips untuk hidup lebih minim sampah dalam
                  kehidupan sehari-hari
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col border-4 transition-all py-[20px] px-[55px] border-black/10 rounded-xl hover:border-[#186F65]">
            <div className="flex flex-col items-center mt-[30px] justify-center">
              <img
                src="/ic-3.png"
                alt=""
                height="52"
                width="52"
                className="object-cover rounded-full"
              />
              <div className="flex flex-col justify-center items-center mt-[30px]">
                <h1 className="font-semibold">Program Eco Change</h1>
                <p className="text-sm text-center text-black/50 ">
                  Informasi dan tips untuk hidup lebih minim sampah dalam
                  kehidupan sehari-hari
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <main className="lg:py-[120px] py-[80px] lg:px-[50px] px-[20px] ">
        <div className=" flex lg:flex-row flex-col  py-5 justify-center lg:space-x-[100px] space-x-0 items-center">
          <div className="flex flex-col lg:w-[500px] w-full">
            <h1 className="text-[52px] font-semibold leading-[58px]">
              Apa itu <span className="text-[#004225]">Eco Change</span>& kenapa
              ini penting?{" "}
            </h1>
            <p className="mt-5 text-black/60">
              Mengusung visi sebagai one-stop-solution platform dan payung
              informasi mengenai gaya hidup minim sampah di nusantara, Eco
              Change juga wadah berkumpulnya para individu, aktivis lingkungan,
              komunitas, dan semua pihak yang peduli akan kelestarian lingkungan
              hidup.{" "}
            </p>
            <span className="mt-3  font-semibold">
              Platform Eco Change memiliki 3 tujuan sebagai sarana
            </span>
            <div className="flex justify-between mt-5">
              <span className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="#252222"
                  className="mr-2"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-4,48a12,12,0,1,1-12,12A12,12,0,0,1,124,72Zm12,112a16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40a8,8,0,0,1,0,16Z"></path>
                </svg>
                Informasi
              </span>
              <span className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="#252222"
                  className="mr-2"
                  viewBox="0 0 256 256"
                >
                  <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM80,208H48V48H80Zm96-56H112a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H112a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z"></path>
                </svg>
                Edukasi
              </span>
              <span className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="#252222"
                  className="mr-2"
                  viewBox="0 0 256 256"
                >
                  <path d="M144,104V64a8,8,0,0,1,13.66-5.66L172,72.69l30.34-30.35a8,8,0,0,1,11.32,11.32L183.31,84l14.35,14.34A8,8,0,0,1,192,112H152A8,8,0,0,1,144,104Zm-40,40H64a8,8,0,0,0-5.66,13.66L72.69,172,42.34,202.34a8,8,0,0,0,11.32,11.32L84,183.31l14.34,14.35A8,8,0,0,0,112,192V152A8,8,0,0,0,104,144Zm3.06-87.39a8,8,0,0,0-8.72,1.73L84,72.69,53.66,42.34A8,8,0,0,0,42.34,53.66L72.69,84,58.34,98.34A8,8,0,0,0,64,112h40a8,8,0,0,0,8-8V64A8,8,0,0,0,107.06,56.61ZM183.31,172l14.35-14.34A8,8,0,0,0,192,144H152a8,8,0,0,0-8,8v40a8,8,0,0,0,13.66,5.66L172,183.31l30.34,30.35a8,8,0,0,0,11.32-11.32Z"></path>
                </svg>
                Kolaborasi
              </span>
            </div>
            <div className="flex mt-5">
              <a
                href="/About"
                className="h-[38px]  text-sm flex items-center hover:bg-[#186F65] transition-all delay-75 border border-[#186F65] text-[#186F65] hover:text-white px-[20px] font-bold rounded-full"
              >
                Selengkapnya
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
      <main className="lg:px-[50px] px-[20px] py-5">
        <div className="flex justify-between items-center">
          <h1 className="lg:text-[32px] text-[28px] font-semibold  w-[220px] lg:w-auto">
            Rekomendasi artikel untuk mu
          </h1>
          <a
            href="/articles"
            className="font-semibold border rounded-full h-[42px] px-3 text-sm flex  hover:underline items-center text-[#186F65] border-[#186F65]"
          >
            Lihat artikel lain
          </a>
        </div>
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 mt-5">
          {articles.map((item, index) => {
            return (
              <Card
                date={item.createdAt}
                type="article"
                title={item.title}
                imageUrl={item.image.url}
                link={`/articles/${item._id}`}
                key={index}
              />
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;