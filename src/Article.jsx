import { useEffect, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useParams } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";

export default function Article() {
  document?.documentElement.setAttribute("data-color-mode", "light");
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [markdown, setMarkdown] = useState("### Loading...");
  const [articles, setArticles] = useState([]);
  const [relativeTime, setRelativeTime] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/articles/${id}`
        );
        const data = await response.json();
        if (data && data.content) {
          const resMarkdown = await fetch(data.content.url);
          const markdownContent = await resMarkdown.text();
          setArticle(data);
          setMarkdown(markdownContent);
        } else {
          console.error("Invalid data or content not available.");
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };
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
    fetchArticle();
  }, [id]);

  useEffect(() => {
    try {
      const parsedDate = parseISO(article?.publication_date);

      const relativeTimeString = formatDistanceToNow(parsedDate, {
        addSuffix: true,
      });

      setRelativeTime(relativeTimeString);
    } catch (error) {
      console.error("Error parsing date:", error.message);
    }
  }, [article?.publication_date]);

  return (
    <>
      <Navbar />
      <main className="py-[20px] lg:px-[50px] px-[20px] rounded-lg flex flex-col lg:w-[70%] space-y-5 mb-5">
        <img
          src={article?.image.url}
          alt=""
          className="w-full object-cover h-[300px] rounded-[10px]"
        />

        <h1 className=" text-[48px] leading-[52px] font-semibold text-[#186F65]">
          {article?.title}
        </h1>
        <div className="flex space-x-2 items-center">
          <span className="text-[22px] text-sm text-black/50">
            {relativeTime}
          </span>
        </div>
        <MarkdownPreview source={markdown} />
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
                type="article"
                title={item.title}
                imageUrl={item.image.url}
                link={`/articles/${item._id}`}
                key={index}
                date={item.createdAt}
              />
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
