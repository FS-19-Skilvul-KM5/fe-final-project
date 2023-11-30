import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { formatDistanceToNow, parseISO } from "date-fns";

function Card({ type, price, imageUrl, title, content, date, link, IdVideo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [relativeTime, setRelativeTime] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    try {
      const parsedDate = parseISO(date);

      const relativeTimeString = formatDistanceToNow(parsedDate, {
        addSuffix: true,
      });

      setRelativeTime(relativeTimeString);
    } catch (error) {
      console.error("Error parsing date:", error.message);
    }
  }, [date]);

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
  function HandleType() {
    if (type === "education") {
      return (
        <>
          <div className="group cursor-pointer" onClick={handleOpenModal}>
            <img
              src={content}
              alt=""
              className="rounded-xl object-cover w-full h-[180px]"
            />
            <div className="flex flex-col mt-3">
              <h1 className="font-semibold group-hover:underline text-lg mt-2 line-clamp-2 capitalize">
                {title}
              </h1>
              <span className="text-black/60 font-medium text-sm">
                {relativeTime}
              </span>
            </div>
          </div>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            contentLabel="Education Modal"
            style={customModalStyles}
            className="w-full lg:w-[50%] overflow-y-auto h-auto max-h-full focus:outline-none "
          >
            <button onClick={handleCloseModal} className="mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
              </svg>
            </button>
            <div className="flex flex-col">
              <iframe
                src={`https://www.youtube.com/embed/${IdVideo}`}
                allow="autoplay; encrypted-media"
                frameBorder="0"
                allowfullscreen
                title="video"
                className="w-full lg:h-[400px] h-[250px]"
              />
              <h1 className="font-semibold group-hover:underline text-lg mt-2 line-clamp-2 capitalize">
                {title}
              </h1>
            </div>
          </Modal>
        </>
      );
    }
    if (type === "workshop") {
      return (
        <a href={link} className="group">
          <img
            src={imageUrl}
            alt=""
            className="rounded-xl object-cover w-full h-[180px]"
          />
          <div className="flex flex-col mt-3">
            <h1 className="font-semibold group-hover:underline text-lg mt-2 line-clamp-2">
              {title}
            </h1>
            <span className="mt-2 text-sm font-semibold">
              {price == "0" ? "free" : `$ ${price}`}
            </span>
            <p className="text-black/80 text-sm mt-1">{content}</p>
            <span className="text-black/60 font-medium text-sm">
              {relativeTime}
            </span>
          </div>
        </a>
      );
    } else {
      return (
        <a href={link} className="group">
          <img
            src={imageUrl}
            alt=""
            className="rounded-xl object-cover w-full h-[180px]"
          />
          <div className="flex flex-col mt-3">
            <h1 className="font-semibold group-hover:underline text-lg mt-2 line-clamp-2">
              {title}
            </h1>
            <p className="text-black/80 text-sm mt-1">{content}</p>
            <span className="text-black/60 font-medium text-sm">
              {relativeTime}
            </span>
          </div>
        </a>
      );
    }
  }

  return <>{HandleType()}</>;
}

Card.propTypes = {
  type: PropTypes.string.isRequired,
  articleId: PropTypes.number,
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.string,
  link: PropTypes.string,
  price: PropTypes.string,
  IdVideo: PropTypes.string,
};

export default Card;
