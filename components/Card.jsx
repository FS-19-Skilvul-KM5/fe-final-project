import PropTypes from "prop-types";
import { useState } from "react";

function Card({ imageUrl, title, content, date, link }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  function HandleType() {
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
          <span className="text-black/60 font-medium text-sm">{date}</span>
        </div>
      </a>
    );
  }

  return <>{HandleType()}</>;
}

Card.propTypes = {
  type: PropTypes.string.isRequired,
  articleId: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  link: PropTypes.string,
  price: PropTypes.string,
  IdVideo: PropTypes.string,
};

export default Card;
