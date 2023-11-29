import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";

export default function CreateEducation() {
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    url: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/educations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setMessage("Data telah dikirim");
      setTimeout(() => {
        setMessage("");
      }, 2000);

      if (response.ok) {
        setFormData({
          title: "",
          url: "",
        });
      }
    } catch (error) {
      setMessage(`Terjadi kesalahan: ${error}`);

      setTimeout(() => {
        setMessage("");
      }, 2000);
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
      <main className="py-[20px] lg:px-[50px] px-[20px] space-y-3 lg:w-[50%] w-[100%]">
        <div className="mb-5">
          <h1 className=" text-[42px] font-semibold leading-[48px]">
            Create new education
          </h1>
          <p className="text-sm text-black/60">
            Selamat datang di halaman pembuatan data pendidikan! Di sini, Anda
            dapat dengan mudah menambahkan informasi tentang latar belakang
            pendidikan Anda atau pengguna lainnya.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex flex-col">
            <label className="font-semibold text-sm" htmlFor="title">
              Title
            </label>
            <input
              value={formData.title}
              onChange={handleChange}
              className="focus:outline-none h-[38px] p-2 border border-black/20 rounded-lg mt-1"
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
              value={formData.url}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="h-[38px] lg:w-auto w-full justify-center text-sm flex items-center hover:bg-[#186F65] transition-all delay-75 border border-[#186F65] text-[#186F65] hover:text-white px-[20px] font-bold rounded-full "
          >
            Upload
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
