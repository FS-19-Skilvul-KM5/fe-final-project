import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

function ModalRegisterWorkshop(workshopId) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");

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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRegisterWorkshop = async () => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    try {
      setLoading(true);

      const apiUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/workshop/${workshopId.workshopId
        }/peserta`;
      const formData = new FormData();
      formData.append("phoneNumber", phoneNumber);
      formData.append("question", question);

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Success register workshop");
        setTimeout(() => {
          setMessage("");
          // eslint-disable-next-line no-undef
          window?.location.reload();
        }, 2000);
        window?.location.replace('https://chat.whatsapp.com/IoEUJRwhhyF68lBbfN9G96')
      } else {
        setMessage(data.error);
        setTimeout(() => {
          setMessage("");
        }, 2000);
      }
    } catch (error) {
      setMessage("Error registering workshop");
      console.error(error);
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } finally {
      setLoading(false);
    }
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
        <div className="w-full flex justify-end">
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
          <h1 className=" text-[24px] font-semibold leading-[48px]">
            Update Article
          </h1>

          <div className="flex flex-col space-y-3 mt-3">
            <div className="flex flex-col space-y-1">
              <label className="text-sm" htmlFor="phone">
                Phone Number
              </label>
              <div className="flex  flex-col w-full">
                <input
                  name="phone"
                  className={`focus:outline-none h-[38px] p-2 border border-black/20
                  rounded-lg flex-1 appearance-none`}
                  type="number"
                  id="phone"
                  placeholder="Enter your phone number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm" htmlFor="question">
                Pertanyaan anda *(Optional)
              </label>
              <textarea
                name="question"
                className="focus:outline-none  p-2 border border-black/20 rounded-lg h-[200px] resize-none"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                id="question"
                placeholder="Masukan pertanyaan anda"
              />
            </div>
            {phoneNumber.length > 0 ? (
              <>
                {loading ? (
                  <div className="h-[38px] opacity-50 flex items-center justify-center text-sm  bg-[#186F65] text-white px-[20px] font-bold rounded-full mt-[20px]">
                    Loading...
                  </div>
                ) : (
                  <button
                    onClick={() => handleRegisterWorkshop()}
                    className="h-[38px]  text-sm  bg-[#186F65] text-white px-[20px] font-bold rounded-full mt-[20px]"
                  >
                    Daftar
                  </button>
                )}
              </>
            ) : (
              <div className="h-[38px] opacity-50 flex items-center justify-center text-sm  bg-[#186F65] text-white px-[20px] font-bold rounded-full mt-[20px]">
                Daftar
              </div>
            )}
          </div>
        </div>
      </Modal>
      <button
        onClick={() => handleOpenModal()}
        className="h-[38px]  text-sm  bg-[#186F65] text-white px-[20px] font-bold rounded-full mt-[20px]"
      >
        Daftar
      </button>
    </>
  );
}

ModalRegisterWorkshop.propTypes = {
  workshopId: PropTypes.string.isRequired,
};

export default ModalRegisterWorkshop;
