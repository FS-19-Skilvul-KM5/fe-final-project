import { useState } from "react";
import PropTypes from "prop-types";

const FooterAccordionItem = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-t border-black/10 lg:hidden block">
      <div
        className="flex justify-between items-center cursor-pointer p-3"
        onClick={handleToggle}
      >
        <h1 className="font-semibold text-left">{title}</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="#080808"
          viewBox="0 0 256 256"
        >
          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
        </svg>
      </div>
      {isOpen && (
        <ul className="">
          {items.map((item, index) => (
            <li key={index} className="text-sm p-3">
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

FooterAccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FooterAccordionItem;
