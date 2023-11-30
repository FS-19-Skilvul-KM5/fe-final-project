import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Cookies from "js-cookie";

export default function Workshop() {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState(null);
  const [freeWorkshops, setFreeWorkshops] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dateObject = workshop?.date ? new Date(workshop.date) : null;
  const formattedDate = dateObject
    ? dateObject.toISOString().split("T")[0]
    : "";

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/workshop/${id}`
        );
        const data = await response.json();
        setWorkshop(data);
      } catch (error) {
        console.error("Error fetching workshop:", error);
      }
    };

    const fetchRecommendedWorkshops = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/workshop/recommendation`
        );
        const data = await response.json();

        const latestFreeWorkshops = data.freeWorkshops.slice(0, 4);

        setFreeWorkshops(latestFreeWorkshops);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecommendedWorkshops();
    fetchWorkshop();
  }, [id]);

  const uploadArticle = async () => {
    try {
      setLoading(true);
      const apiUrl = `${
        import.meta.env.VITE_REACT_APP_API_URL
      }/workshop/${id}/peserta`;

      const token = Cookies.get("token");

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const message = await response.json();

      if (response.ok) {
        setMessage("Success register workshop");

        setTimeout(() => {
          setMessage("");
        }, 2000);
        // eslint-disable-next-line no-undef
        window?.location.reload();
      } else {
        setMessage(message.error);

        setTimeout(() => {
          setMessage("");
        }, 2000);
      }
    } catch (error) {
      setMessage(error);

      setTimeout(() => {
        setMessage("");
      }, 2000);
    } finally {
      setLoading(false);
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
      <main className="py-[20px] lg:px-[50px] px-[20px] flex flex-col lg:w-[70%] w-full  space-y-5 mb-5">
        <h1 className=" text-[50px] leading-[58px] font-semibold text-[#186F65] ">
          {workshop?.title}
        </h1>
        <div className="flex space-x-2 items-center">
          <span className="text-[22px] text-sm text-black/50">
            {workshop?.selectedDate}
          </span>
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className=" font-semibold text-[24px]">Materi Workshop</h1>
          <ul>
            {workshop?.materi.map((item, index) => {
              return (
                <li className=" list-inside list-disc" key={index}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col space-y-2 ">
          <h1 className=" font-semibold text-[24px]">Tujuan Workshop</h1>
          <p className="text-sm">{workshop?.tujuan}</p>
        </div>
        <div className="flex flex-col space-y-2 ">
          <h1 className=" font-semibold text-[24px]">Narasumber</h1>
          <div className="grid grid-cols-2 gap-2">
            {workshop?.narasumber.map((narasumber, index) => {
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
                    <h1 className="font-semibold">{narasumber}</h1>
                  </div>
                </div>
              );
            })}
          </div>{" "}
        </div>
        <div className="flex flex-col space-y-2 ">
          <h1 className=" font-semibold text-[24px]">Moderator</h1>
          <div className="grid grid-cols-2 gap-2">
            {workshop?.moderator.map((moderator, index) => {
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
                </div>
              );
            })}
          </div>{" "}
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className=" font-semibold text-[24px]">Fasilitas</h1>
          <ul>
            {workshop?.fasilitas.map((item, index) => {
              return (
                <li className=" list-inside list-disc" key={index}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col space-y-2 ">
          <h1 className=" font-semibold text-[24px]">
            Waktu dan Tempat Pelaksanaan
          </h1>
          <div className="flex flex-col space-y-2 ">
            <span className="flex items-center text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                className="mr-2"
                fill="#110e0e"
                viewBox="0 0 256 256"
              >
                <path d="M128,40a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,40Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,216ZM173.66,90.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32l40-40A8,8,0,0,1,173.66,90.34ZM96,16a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,16Z"></path>
              </svg>
              {formattedDate} / {workshop?.startTime} - {workshop?.endTime}{" "}
              {workshop?.timezone}
            </span>
            <span className="flex items-center text-sm font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#110e0e"
                className="mr-2"
                viewBox="0 0 256 256"
              >
                <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></path>
              </svg>
              {workshop?.location}
            </span>
          </div>
        </div>
        <div className="w-full flex flex-col items-center space-y-3">
          <div className="flex w-full justify-center bg-white">
            <img
              className="lg:w-[600px] w-full max-h-[700px] h-auto object-cover"
              src={workshop?.poster.url}
              alt=""
            />
          </div>
          {loading ? (
            <div className="flex">
              <div className="h-[38px]  text-sm  bg-[#186F65] text-white px-[20px] font-bold rounded-full mt-[20px]">
                Is loading..
              </div>
            </div>
          ) : (
            <div className="flex">
              <button
                onClick={() => uploadArticle()}
                className="h-[38px]  text-sm  bg-[#186F65] text-white px-[20px] font-bold rounded-full mt-[20px]"
              >
                Daftar
              </button>
            </div>
          )}
        </div>
      </main>
      <main className="lg:px-[50px] px-[20px] py-5">
        <div className="flex justify-between items-center">
          <h1 className="lg:text-[32px] text-[28px] font-semibold  w-[220px] lg:w-auto">
            Rekomendasi workshop Gratis
          </h1>
        </div>
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 mt-5">
          {freeWorkshops?.map((item, index) => {
            return (
              <Card
                date={item.workshop.createdAt}
                price={item.workshop.price}
                imageUrl={item.workshop.poster.url}
                title={item.workshop.title}
                type="workshop"
                link={`/workshop/${item.workshop._id}`}
                key={index}
              />
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
