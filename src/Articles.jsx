import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

export default function Articles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [articlesSearch, setArticlesSearch] = useState([]);
  const [articles, setArticles] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL
        }/articles/search?q=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setArticlesSearch(data);
      if (response.ok) {
        setSearchTerm("");
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/articles/recommendation`
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
      <main className="py-[80px] px-[50px] flex lg:flex-row flex-col  lg:space-x-5 justify-center items-center ">
        <div className="flex flex-col lg:w-[500px] w-full">
          <h1 className="text-[55px] font-semibold leading-[59px]">
            Artikel Overview Challenge
          </h1>
          <p className="text-black/50 font-semibold mt-2">
            Ketahui lebih banyak tentang Eco Change melalui artikel-artikel di
            bawah ini. It’s progress over perfection! Eco Change tidak harus
            sempurna namun harus dimulai. Yuk kita mulai bersama!
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-auto lg:mt-0 mt-5">
          <h1 className="lg:text-[32px] text-[38px] font-semibold ">
            Search Artikel
          </h1>
          <div className="flex space-x-2 justify-center items-center  mt-5">
            <input
              className="focus:outline-none h-[38px] p-2 border border-black/20 rounded-lg w-full lg:w-[500px] "
              type="text"
              placeholder="cari artikel yuk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="flex justify-center items-center bg-[#004225] h-[38px] px-4 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#ededed"
                viewBox="0 0 256 256"
              >
                <path d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </main>
      {articlesSearch.length > 0 ? (
        <main className="lg:px-[50px] px-[20px] py-5">
          <div className="flex justify-between items-center">
            <h1 className="lg:text-[32px] text-[28px] font-semibold  w-[220px] lg:w-auto">
              Hasil search
            </h1>
          </div>
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 mt-5">
            {articlesSearch.map((item, index) => {
              return (
                <Card
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
      ) : null}
      <main className="lg:px-[50px] px-[20px] py-5">
        <div className="flex justify-between items-center">
          <h1 className="lg:text-[32px] text-[28px] font-semibold  w-[220px] lg:w-auto">
            Rekomendasi artikel untuk mu
          </h1>
        </div>
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 mt-5">
          {articles.map((item, index) => {
            return (
              <Card
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
