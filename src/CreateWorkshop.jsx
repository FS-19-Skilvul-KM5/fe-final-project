import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import Cookies from "js-cookie";

export default function CreateWorkshop() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("13:00");
  const [timezone, setTimezone] = useState("WIB");
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [materiList, setMateriList] = useState([]);
  const [tujuan, setTujuan] = useState("");
  const [price, setPrice] = useState("");
  const [narasumberList, setNarasumberList] = useState([]);
  const [newMateri, setNewMateri] = useState("");

  const [moderatorList, setModeratorList] = useState([]);
  const [newModerator, setNewModerator] = useState("");
  const [message, setMessage] = useState("");
  const [fasilitasList, setFasilitasList] = useState([]);
  const [fasilitasInput, setFasilitasInput] = useState("");
  const [location, setLocation] = useState("");
  const [newNarasumber, setNewNarasumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleNarasumberAdd = () => {
    if (newNarasumber.trim() === "") {
      setMessage("Username cannot be empty");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }

    if (narasumberList.includes(newNarasumber)) {
      setMessage("Username is already in the list");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }

    setNarasumberList((prevList) => [...prevList, newNarasumber]);
    setNewNarasumber("");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const handleMateriAdd = () => {
    if (newMateri.trim() !== "") {
      setMateriList((prevList) => [...prevList, newMateri]);

      setNewMateri("");
    }
  };

  const handleModeratorAdd = () => {
    if (newModerator.trim() === "") {
      setMessage("Username cannot be empty");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }

    if (moderatorList.includes(newModerator)) {
      setMessage("Username is already in the list");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }

    setModeratorList((prevList) => [...prevList, newModerator]);
    setNewModerator("");

    // Reset pesan setelah 20 detik
    setTimeout(() => {
      setMessage("");
    }, 2000);
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

  const handleModeratorRemove = (index) => {
    const updatedModeratorList = moderatorList.filter((_, i) => i !== index);
    setModeratorList(updatedModeratorList);
  };

  const handleNarasumberRemove = (index) => {
    setNarasumberList((prevList) => {
      const newList = [...prevList];
      newList.splice(index, 1);
      return newList;
    });
  };

  const handleUploadWorkshop = async () => {
    try {
      setIsLoading(true); // Set state isLoading menjadi true

      const apiUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/workshop`;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("files", image);
      formData.append("tujuan", tujuan);
      narasumberList.forEach((narasumber, index) => {
        formData.append(`narasumber[${index}]`, narasumber);
      });
      fasilitasList.forEach((fasilitas, index) => {
        formData.append(`fasilitas[${index}]`, fasilitas);
      });
      materiList.forEach((materi, index) => {
        formData.append(`materi[${index}]`, materi);
      });
      moderatorList.forEach((moderator, index) => {
        formData.append(`moderator[${index}]`, moderator);
      });
      formData.append("price", price);
      formData.append("location", location);
      formData.append("date", selectedDate.toISOString());
      formData.append("startTime", startTime);
      formData.append("endTime", endTime);
      formData.append("timeZone", timezone);

      const token = Cookies.get("token");

      const response = await fetch(apiUrl, {
        method: "POST",
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
          setNarasumberList([]);
          setModeratorList([]);
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

  const handlePriceChange = (e) => {
    const inputPrice = e.target.value;

    if (parseFloat(inputPrice) >= 0 || inputPrice === '') {
      setPrice(inputPrice);
    }
  };
  return (
    <>
      <Navbar />
      {message && (
        <div className="bg-white border border-black/50 fixed top-[82px] right-5 text-black p-4 mb-4">
          {message}
        </div>
      )}
      <div className="py-[20px] lg:px-[50px] px-[20px] space-y-3 lg:w-[50%] w-[100%]">
        <div className="mb-5">
          <h1 className=" text-[42px] font-semibold leading-[48px]">
            Create new workshop
          </h1>
          <p className="text-sm text-black/60">
            Selamat datang di halaman pembuatan data workshop! Di sini, Anda
            dapat dengan mudah menambahkan informasi tentang workshop yang
            pernah Anda ikuti atau mengadakan.
          </p>
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
          <label className="font-semibold text-sm" htmlFor="narasumber">
            Narasumber
          </label>
          <div className="flex items-center w-full space-x-2">
            <input
              className="focus:outline-none h-[38px] p-2 border border-black/20 rounded-lg mt-1 flex-auto"
              type="text"
              id="narasumber"
              value={newNarasumber}
              onChange={(e) => setNewNarasumber(e.target.value)}
              placeholder="Enter username"
            />
            <button
              onClick={handleNarasumberAdd}
              className="h-[38px] lg:w-auto justify-center text-sm flex items-center hover:bg-[#186F65] transition-all delay-75 border border-[#186F65] text-[#186F65] hover:text-white px-[20px] font-bold rounded-full "
            >
              Add
            </button>
          </div>
          <div className="flex space-y-2 max-h-[300px] overflow-y-auto mt-3 flex-col box-border">
            {narasumberList.map((narasumber, index) => {
              return (
                <div
                  key={index}
                  className="flex space-x-2 p-2  border border-black/20 hover:border-black/50 w-full  justify-between items-center"
                >
                  <div className="flex space-x-2 items-center">
                    <img
                      src="/avatar-3.png"
                      className="object-cover rounded-full h-[42px] w-[42px]"
                      alt=""
                    />
                    <h1 className="font-semibold">{narasumber}</h1>
                  </div>
                  <button onClick={() => handleNarasumberRemove(index)}>
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
          <label className="font-semibold text-sm" htmlFor="moderator">
            Moderator
          </label>
          <div className="flex items-center w-full space-x-2">
            <input
              className="focus:outline-none h-[38px] p-2 border border-black/20 rounded-lg mt-1 flex-auto"
              type="text"
              id="moderator"
              placeholder="Add username"
              value={newModerator}
              onChange={(e) => setNewModerator(e.target.value)}
            />
            <button
              onClick={handleModeratorAdd}
              className="h-[38px] lg:w-auto justify-center text-sm flex items-center hover:bg-[#186F65] transition-all delay-75 border border-[#186F65] text-[#186F65] hover:text-white px-[20px] font-bold rounded-full "
            >
              Add
            </button>
          </div>
          <div className="flex space-y-2 max-h-[300px] overflow-y-auto mt-3 flex-col box-border">
            {moderatorList.map((moderator, index) => {
              return (
                <div
                  key={index}
                  className="flex space-x-2 p-2  border border-black/20 hover:border-black/50 w-full  justify-between items-center mt-2"
                >
                  <div className="flex space-x-2 items-center">
                    <img
                      src="/avatar-3.png"
                      className="object-cover rounded-full h-[42px] w-[42px]"
                      alt=""
                    />
                    <h1 className="font-semibold">{moderator}</h1>
                  </div>
                  <button onClick={() => handleModeratorRemove(index)}>
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
            onChange={handlePriceChange}
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
        <div className="w-full flex lg:flex-row flex-col lg:items-center lg:space-x-2 space-y-2" >
          <div className="flex lg:space-x-2 space-y-2 lg:space-y-0 lg:flex-row flex-col lg:items-center">
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
            <option value="WIT">WIT</option>
            <option value="WITA">WITA</option>
          </select>

          <p className="mt-1 text-sm">
            Waktu: {startTime} - {endTime} {timezone}
          </p>
        </div >
        <div className="flex">
          <label
            htmlFor="image"
            className="h-[38px] w-full lg:w-auto justify-center text-sm flex items-center hover:bg-[#186F65] transition-all delay-75 border border-[#186F65] text-[#186F65] hover:text-white px-[20px] font-bold rounded-full "
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
        {
          image && (
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
          )
        }
        {
          isLoading ? (
            <div className="flex">
              <div className="h-[38px] lg:w-auto w-full justify-center text-sm flex items-center hover:bg-[#186F65] transition-all delay-75 border border-[#186F65] text-[#186F65] hover:text-white px-[20px] font-bold rounded-full ">
                loading...
              </div>
            </div>
          ) : (
            <button
              onClick={handleUploadWorkshop}
              className="h-[38px] lg:w-auto w-full justify-center text-sm flex items-center hover:bg-[#186F65] transition-all delay-75 border border-[#186F65] text-[#186F65] hover:text-white px-[20px] font-bold rounded-full "
            >
              Upload
            </button>
          )
        }
      </div >
      <Footer />
    </>
  );
}
