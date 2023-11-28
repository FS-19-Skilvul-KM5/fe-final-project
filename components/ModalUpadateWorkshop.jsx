import Cookies from "js-cookie";
import { useState } from "react";
import Modal from "react-modal";
import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";

function ModalUpadateWorkshop({ workshopId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("13:00");
  const [timezone, setTimezone] = useState("WIB");
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [materiList, setMateriList] = useState([]);
  const [tujuan, setTujuan] = useState("");
  const [price, setPrice] = useState("");
  const [newMateri, setNewMateri] = useState("");
  const [fasilitasList, setFasilitasList] = useState([]);
  const [fasilitasInput, setFasilitasInput] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState("");

  const handleDateChange = (event) => {
    const selectedDateString = event.target.value;
    const parsedDate = parseISO(selectedDateString);
    setSelectedDate(parsedDate);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage && selectedImage.type.startsWith("image/")) {
      setImage(selectedImage);
    } else {
      setMessage("Pilih file gambar yang valid.");

      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  const handleMateriAdd = () => {
    if (newMateri.trim() !== "") {
      setMateriList((prevList) => [...prevList, newMateri]);

      setNewMateri("");
    }
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleTimezoneChange = (e) => {
    setTimezone(e.target.value);
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFasilitasAdd = () => {
    if (fasilitasInput.trim() !== "") {
      setFasilitasList((prevList) => [...prevList, fasilitasInput]);

      setFasilitasInput("");
    }
  };

  const handleFasilitasRemove = (index) => {
    const updatedFasilitasList = fasilitasList.filter((_, i) => i !== index);
    setFasilitasList(updatedFasilitasList);
  };

  const handleMateriRemove = (index) => {
    const updatedMateriList = materiList.filter((_, i) => i !== index);
    setMateriList(updatedMateriList);
  };

  const handleUpdateWorkshop = async () => {
    try {
      setIsLoading(true);

      const apiUrl = `${
        import.meta.env.VITE_REACT_APP_API_URL
      }/workshop/${workshopId}`;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("files", image);
      formData.append("tujuan", tujuan);

      fasilitasList.forEach((fasilitas, index) => {
        formData.append(`fasilitas[${index}]`, fasilitas);
      });
      materiList.forEach((materi, index) => {
        formData.append(`materi[${index}]`, materi);
      });

      formData.append("price", price);
      formData.append("location", location);
      formData.append("date", selectedDate.toISOString());
      formData.append("startTime", startTime);
      formData.append("endTime", endTime);
      formData.append("timeZone", timezone);

      const token = Cookies.get("token");

      const response = await fetch(apiUrl, {
        method: "PUT",
        body: formData,

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();
      if (response.ok) {
        const resetForm = () => {
          setImage(null);
          setTitle("");
          setMateriList([]);
          setTujuan("");
          setFasilitasList([]);
          setPrice("");
          setLocation("");
          setStartTime("08:00");
          setEndTime("13:00");
          setTimezone("WIB");
          setSelectedDate(new Date());
        };
        setMessage(responseData.message || "Workshop uploaded successfully");

        setTimeout(() => {
          setMessage("");
          resetForm();
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
      setMessage("Error uploading workshop. Please try again.");

      setTimeout(() => {
        setMessage("");
      }, 2000);
    } finally {
      setIsLoading(false);
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

        <div className="py-[20px] px-[50px] space-y-3 w-full">
          <div className="mb-5">
            <h1 className=" text-[42px] font-semibold leading-[48px]">
              Update Workshop
            </h1>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-sm" htmlFor="title">
              Title
            </label>
            <input
              className="focus:outline-none h-[38px] p-2 border border-black/20 rounded-lg mt-1"
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your Title"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-sm" htmlFor="materi">
              Materi
            </label>
            <div className="flex items-center w-full space-x-2">
              <input
                className="focus:outline-none h-[38px] p-2 border border-black/20 rounded-lg mt-1 flex-auto"
                type="text"
                id="materi"
                value={newMateri}
                onChange={(e) => setNewMateri(e.target.value)}
                placeholder="Enter materi"
              />
              <button
                onClick={handleMateriAdd}
                className="h-[38px] lg:w-auto justify-center text-sm flex items-center hover:bg-[#186F65] transition-all delay-75 border border-[#186F65] text-[#186F65] hover:text-white px-[20px] font-bold rounded-full "
              >
                Add
              </button>
            </div>
            <div className="flex space-y-2 max-h-[300px] overflow-y-auto mt-3 flex-col box-border">
              {materiList.map((materi, index) => {
                return (
                  <div
                    key={index}
                    className="flex space-x-2 p-2  border border-black/20 hover:border-black/50 w-full  justify-between items-center"
                  >
                    <div className="flex space-x-2 items-center">
                      <h1 className="font-semibold">{materi}</h1>
                    </div>
                    <button onClick={() => handleMateriRemove(index)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="#110e0e"
                        viewBox="0 0 256 256"
                      >
                        <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-sm" htmlFor="tujuan">
              Tujuan
            </label>
            <textarea
              className="focus:outline-none  p-2 border border-black/20 rounded-lg mt-1 resize-none"
              id="tujuan"
              name="tujuan"
              value={tujuan}
              onChange={(e) => setTujuan(e.target.value)}
              placeholder="Enter your tujuan"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-sm" htmlFor="fasilitas">
              Fasilitas
            </label>
            <div className="flex items-center w-full space-x-2">
              <input
                className="focus:outline-none h-[38px] p-2 border border-black/20 rounded-lg mt-1 flex-auto"
                type="text"
                id="fasilitas"
                onChange={(e) => setFasilitasInput(e.target.value)}
                value={fasilitasInput}
                placeholder="Tambahkan fasilitas"
              />
              <button
                onClick={handleFasilitasAdd}
                className="h-[38px] lg:w-auto justify-center text-sm flex items-center hover:bg-[#186F65] transition-all delay-75 border border-[#186F65] text-[#186F65] hover:text-white px-[20px] font-bold rounded-full "
              >
                Add
              </button>
            </div>
            {fasilitasList.length > 0 ? (
              <div className="flex space-y-2 max-h-[250px] overflow-y-auto mt-3 flex-col box-border">
                {fasilitasList.map((fasilitas, index) => {
                  return (
                    <div
                      key={index}
                      className="flex space-x-2 p-2  border border-black/20 hover:border-black/50 w-full  justify-between items-center"
                    >
                      <h1 className=" tgext-sm">{fasilitas} </h1>

                      <button onClick={() => handleFasilitasRemove(index)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          fill="#110e0e"
                          viewBox="0 0 256 256"
                        >
                          <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-sm" htmlFor="location">
              Location
            </label>
            <input
              className="focus:outline-none h-[38px] p-2 border border-black/20 rounded-lg mt-1"
              type="text"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              id="location"
              placeholder="Enter your Location"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-sm" htmlFor="price">
              Price:
            </label>
            <input
              type="number"
              className="focus:outline-none h-[38px] p-2 border border-black/20 rounded-lg mt-1 w-full"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="datepicker" className="font-semibold text-sm">
              Pilih Tanggal:
            </label>
            <input
              type="date"
              className="focus:outline-none h-[38px] p-2 border border-black/20 rounded-lg mt-1"
              id="datepicker"
              value={format(selectedDate, "yyyy-MM-dd")}
              onChange={handleDateChange}
            />
            <p className="mt-1 text-sm">
              Format: {format(selectedDate, "EEEE, dd MMMM yyyy")}
            </p>
          </div>
          <div className="w-full flex items-center space-x-2">
            <div className="flex space-x-2 items-center">
              <label htmlFor="startTime">Mulai:</label>
              <input
                type="time"
                id="startTime"
                className="focus:outline-none h-[38px] p-2 border border-black/20 rounded-lg mt-1"
                value={startTime}
                onChange={handleStartTimeChange}
              />
            </div>

            <label htmlFor="endTime">Selesai:</label>
            <input
              type="time"
              id="endTime"
              className="focus:outline-none h-[38px] p-2 border border-black/20 rounded-lg mt-1"
              value={endTime}
              onChange={handleEndTimeChange}
            />

            <label htmlFor="timezone">Zona Waktu:</label>
            <select
              id="timezone"
              value={timezone}
              className="focus:outline-none h-[38px] p-2 border border-black/20 rounded-lg mt-1"
              onChange={handleTimezoneChange}
            >
              <option value="WIB">WIB</option>
              <option value="WIT">WIB</option>
              <option value="WITA">WIB</option>
            </select>

            <p className="mt-1 text-sm">
              Waktu: {startTime} - {endTime} {timezone}
            </p>
          </div>
          <div className="flex">
            <label
              htmlFor="image"
              className="h-[38px]  text-sm flex items-center hover:bg-[#186F65] transition-all delay-75 border border-[#186F65] text-[#186F65] hover:text-white px-[20px] font-bold rounded-full "
            >
              Choose Poster
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
                className="absolute w-[32px] h-[32px] rounded-full bg-white/50 top-2 left-2 flex justify-center items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="#110e0e"
                  viewBox="0 0 256 256"
                >
                  <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                </svg>
              </button>
            </div>
          )}
          {isLoading ? (
            <div className="flex">
              <div className="h-[38px] lg:w-auto w-full justify-center text-sm flex items-center hover:bg-[#186F65] transition-all delay-75 border border-[#186F65] text-[#186F65] hover:text-white px-[20px] font-bold rounded-full ">
                loading...
              </div>
            </div>
          ) : (
            <button
              onClick={handleUpdateWorkshop}
              className="h-[38px] lg:w-auto w-full justify-center text-sm flex items-center hover:bg-[#186F65] transition-all delay-75 border border-[#186F65] text-[#186F65] hover:text-white px-[20px] font-bold rounded-full "
            >
              Upload
            </button>
          )}
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

ModalUpadateWorkshop.propTypes = {
  workshopId: PropTypes.string.isRequired,
};

export default ModalUpadateWorkshop;
