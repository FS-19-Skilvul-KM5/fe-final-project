import { useState } from "react";
import Modal from "react-modal";
import MarkdownEditor from "./MarkdownEditor";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

function ModalUpadateArticle({ articleId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(null);
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

  const handleRemoveImage = () => {
    setImage(null);
  };

  const uploadArticle = async () => {
    try {
      setLoading(true);
      const apiUrl = `${import.meta.env.VITE_REACT_APP_API_URL}`;

      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", title);
      formData.append("markdown", markdown);
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

      setImage(null);
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
      width: "60%",
      margin: "auto",
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "20px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 20,
    },
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
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
        style={customModalStyles} // Apply custom styles here
      >
        <form className="w-full">
          <div className="flex mb-5 flex-col space-y-5">
            <div className="flex">
              <label
                htmlFor="image"
                className="h-[38px]  text-sm flex items-center hover:bg-[#186F65] transition-all delay-75 border border-[#186F65] text-[#186F65] hover:text-white px-[20px] font-bold rounded-full "
              >
                Image Title
              </label>
              <input
                accept="image/*"
                type="file"
                name=""
                className="hidden"
                id="image"
                onChange={handleImageChange}
              />
            </div>
            {image && (
              <div className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  className="h-[200px] object-cover lg:w-[300px] w-full rounded-lg"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute w-[32px] h-[32px] rounded-full bg-white/50 top-2 left-2"
                >
                  X
                </button>
              </div>
            )}

            <input
              className="focus:outline-none h-[38px] p-2 border border-black/20 rounded-lg"
              type="text"
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
        <button onClick={handleCloseModal}>Close</button>
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
