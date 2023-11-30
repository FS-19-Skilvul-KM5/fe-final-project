import { useState } from "react";
import PropTypes from "prop-types";

const Tabs = ({ tabs, role }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`border-b-2 ${
              index === activeTab
                ? "border-b-2 border-black font-semibold"
                : "text-gray-500 hover:text-gray-700 border-b-transparent "
            } flex items-center px-4 py-2 focus:outline-none `}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {role === "root" || role === "admin" ? (
        <div className="mt-2">{tabs[activeTab].content}</div>
      ) : null}
    </div>
  );
};
Tabs.propTypes = {
  role: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
};
export default Tabs;
