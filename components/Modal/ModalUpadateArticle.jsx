import { useEffect, useState } from "react";
import Modal from "react-modal";
import MarkdownEditor from "../MarkdownEditor";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

function ModalUpadateArticle({ articleId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const updateStateFromChild = (newMarkdown) => {
    setMarkdown(newMarkdown);
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/articles/${articleId}`
        );
        const data = await response.json();
        setTitle(data?.title);
        if (data && data.content) {
          const resMarkdown = await fetch(data.content.url);
          const markdownContent = await resMarkdown.text();

          setMarkdown(markdownContent);
        } else {
          console.error("Invalid data or content not available.");
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [articleId]);

  const uploadArticle = async () => {
    try {
      setLoading(true);
      const apiUrl = `${import.meta.env.VITE_REACT_APP_API_URL}`;

      const formData = new FormData();
      formData.append("title", title);
      formData.append(
        "files",
        new Blob([markdown], { type: "text/markdown" }),
        "article.md"
      );
      const token = Cookies.get("token");
      const response = await fetch(`${apiUrl}/articles/${articleId}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update article");
      }

      setTitle("");
      setMarkdown("");
      const responseData = await response.json();

      if (response.ok) {
        setTimeout(() => {
          setMessage("");
          if (typeof window !== "undefined") {
            // eslint-disable-next-line no-undef
            window.location.reload();
          }
        }, 2000);
      } else {
        setMessage(responseData.error);
        setTimeout(() => {
          setMessage("");
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating article:");
    } finally {
      setLoading(false);
    }
  };

  const customModalStyles = {
    content: {
      margin: "auto",
      border: "1px solid #ccc",
      borderRadius: "15px",
      padding: "20px",
      backgroundColor: "white",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 20,
      padding: "20px",
    },
  };

  return (
    <>
      {message && (
        <div className="bg-white border border-black/50 fixed top-[82px] right-5 text-black p-4 mb-4 z-20">
          {message}
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Education Modal"
        style={customModalStyles}
        className="w-full lg:w-[40%] overflow-y-auto h-auto max-h-full focus:outline-none "
      >
        <button className="mb-3" onClick={handleCloseModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="#080808"
            viewBox="0 0 256 256"
          >
            <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
          </svg>
        </button>
        <div className="mb-5">
          <h1 className=" text-[42px] font-semibold leading-[48px]">
            Update Article
          </h1>
        </div>
        <form className="w-full">
          <div className="flex mb-5 flex-col space-y-5">
            <input
              className="focus:outline-none h-[38px] p-2 border border-black/20 rounded-lg"
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter your Title"
            />
          </div>
          <MarkdownEditor
            markdown={markdown}
            updateStateFromChild={updateStateFromChild}
          />
          {loading ? (
            <div className="flex">
              <div className="h-[38px] lg:w-auto w-full justify-center text-sm flex items-center hover:bg-[#186F65] transition-all delay-75 border border-[#186F65] text-[#186F65] hover:text-white px-[20px] font-bold rounded-full ">
                Uploading...
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={uploadArticle}
              className="h-[38px] lg:w-auto w-full justify-center text-sm flex items-center hover:bg-[#186F65] transition-all delay-75 border border-[#186F65] text-[#186F65] hover:text-white px-[20px] font-bold rounded-full "
            >
              Upload
            </button>
          )}
        </form>
      </Modal>
      <button onClick={() => handleOpenModal()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="#080808"
          viewBox="0 0 256 256"
        >
          <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160,136,75.31,152.69,92,68,176.68ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188,164,103.31,180.69,120Zm96-96L147.31,64l24-24L216,84.68Z"></path>
        </svg>
      </button>
    </>
  );
}

ModalUpadateArticle.propTypes = {
  articleId: PropTypes.string.isRequired,
};

export default ModalUpadateArticle;
