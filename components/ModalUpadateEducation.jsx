import { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

function ModalUpadateEducation({ educationId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_REACT_APP_API_URL
        }/educations/${educationId}`;

      const token = Cookies.get("token");

      const formDataObj = new FormData();
      formDataObj.append("title", title);
      formDataObj.append("url", url);

      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataObj,
      });

      const responseData = await response.json();

      if (response.ok) {
        setTitle("");
        setUrl("");
        setMessage("Education updated successfully.");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      } else {
        setMessage(responseData.error);
        setTimeout(() => {
          setMessage("");
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating data:", error);
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
      >
        <button onClick={handleCloseModal}>X</button>
        <div className="mb-5">
          <h1 className=" text-[32px] font-semibold leading-[48px]">
            Update Education
          </h1>
        </div>
        <div className="space-y-2">
          <div className="flex flex-col">
            <label className="font-semibold text-sm" htmlFor="title">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => handleTitleChange(e)}
              className="focus:outline-none h-[38px] p-2 border border-black/20 rounded-lg mt-1"
              name="title"
              type="text"
              id="title"
              placeholder="Enter your Title"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-sm" htmlFor="url">
              Url
            </label>
            <input
              className="focus:outline-none h-[38px] p-2 border border-black/20 rounded-lg mt-1"
              type="text"
              id="url"
              placeholder="Enter your URL"
              value={url}
              onChange={(e) => handleUrlChange(e)}
              name="url"
            />
          </div>
          <button
            onClick={() => handleSubmit()}
            className="h-[38px] lg:w-auto w-full justify-center text-sm flex items-center hover:bg-[#186F65] transition-all delay-75 border border-[#186F65] text-[#186F65] hover:text-white px-[20px] font-bold rounded-full "
          >
            Update
          </button>
        </div>
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

ModalUpadateEducation.propTypes = {
  educationId: PropTypes.string.isRequired,
};

export default ModalUpadateEducation;
