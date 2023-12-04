import { useEffect, useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

function ModalShoAllWorkshop({ workshopId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workshop, setWorkshop] = useState([]);

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL
          }/workshop/${workshopId}/peserta`
        );
        const data = await response.json();
        setWorkshop(data);
      } catch (error) {
        console.log(error);

        console.error("Error fetching workshop:", error);
      }
    };

    fetchWorkshop();
  }, [workshopId]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Education Modal"
        style={customModalStyles}
        className="w-full lg:w-[40%] overflow-y-auto h-auto max-h-full focus:outline-none "
      >
        <div className="flex w-full justify-end">
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
        </div>
        <div className="mb-5">
          <h1 className=" text-[32px] font-semibold leading-[48px]">
            Semua Peserta
          </h1>
        </div>
        <div className="grid lg:grid-cols-2 gap-2 grid-cols-1 ">
          {workshop.map((item, index) => {
            return (
              <div
                key={index}
                className="flex space-x-2 p-2 border border-black/20 hover:border-black/50 w-full justify-between items-center mt-2"
              >
                <div className="flex space-x-2 items-start">
                  <img
                    src="/avatar-3.png"
                    className="object-cover rounded-full h-[42px] w-[42px]"
                    alt=""
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold truncate whitespace-nowrap overflow-hidden  text-sm">
                      {item.idUser.email}
                    </h1>
                    <span className="truncate text-sm">{item.phoneNumber}</span>
                    <p className="overflow-hidden whitespace-nowrap text-ellipsis w-1/3 line-clamp-2">
                      {item.question}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
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
          <path d="M234.38,210a123.36,123.36,0,0,0-60.78-53.23,76,76,0,1,0-91.2,0A123.36,123.36,0,0,0,21.62,210a12,12,0,1,0,20.77,12c18.12-31.32,50.12-50,85.61-50s67.49,18.69,85.61,50a12,12,0,0,0,20.77-12ZM76,96a52,52,0,1,1,52,52A52.06,52.06,0,0,1,76,96Z"></path>
        </svg>
      </button>
    </>
  );
}

ModalShoAllWorkshop.propTypes = {
  workshopId: PropTypes.string.isRequired,
};

export default ModalShoAllWorkshop;
