import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";

export default function CreateEducation() {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRemoveImage = () => {
    setImage(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");

    try {
      setLoading(true);

      const newformData = new FormData();
      newformData.append("title", title);
      newformData.append("url", url);
      newformData.append("files", image);

      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/educations`,
        {
          method: "POST",
          body: newformData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        setMessage("Error: " + responseData.error);
        setTimeout(() => {
          setMessage("");
        }, 2000);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      if (response.ok) {
        setMessage("Data berhasil di upload");

        setTimeout(() => {
          setMessage("");
        }, 2000);
        setLoading(false);

      }

      setMessage("Data telah dikirim");

      setTimeout(() => {
        setMessage("");
      }, 2000);

      if (response.ok) {
        setImage(null);
        setTitle("");
        setUrl("");
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

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex">
            <label
              htmlFor="image"
              className="h-[38px] w-full lg:w-auto justify-center text-sm flex items-center hover:bg-[#186F65] transition-all delay-75 border border-[#186F65] text-[#186F65] hover:text-white px-[20px] font-bold rounded-full "
            >
              Choose Image
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
          <div className="flex flex-col">
            <label className="font-semibold text-sm" htmlFor="title">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          {loading ? (
            <div className="flex">
              <div className="h-[38px] lg:w-auto w-full justify-center text-sm flex items-center hover:bg-[#186F65] transition-all delay-75 border border-[#186F65] text-[#186F65] hover:text-white px-[20px] font-bold rounded-full ">
                Uploading...
              </div>
            </div>
          ) : (
            <button
              type="submit"
              className="h-[38px] lg:w-auto w-full justify-center text-sm flex items-center hover:bg-[#186F65] transition-all delay-75 border border-[#186F65] text-[#186F65] hover:text-white px-[20px] font-bold rounded-full "
            >
              Upload
            </button>
          )}
        </form>
      </main>
      <Footer />
    </>
  );
}
