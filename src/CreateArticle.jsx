import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MarkdownEditor from "../components/MarkdownEditor";
import { useState } from "react";
import Cookies from "js-cookie";

export default function CreateArticle() {
  const [markdown, setMarkdown] = useState("");
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

  const updateStateFromChild = (newValue) => {
    setMarkdown(newValue);
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const uploadArticle = async () => {
    try {
      setLoading(true);
      const apiUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/articles`;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("files", image);
      formData.append(
        "files",
        new Blob([markdown], { type: "text/markdown" }),
        "article.md"
      );

      const token = Cookies.get("token");

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMarkdown("");
        setImage(null);
        setTitle("");
        setMessage("Article uploaded successfully");

        setTimeout(() => {
          setMessage("");
        }, 2000);
        // eslint-disable-next-line no-undef
        window?.location.reload();
      } else {
        console.error(
          "Error uploading article:",
          response.status,
          response.statusText
        );
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
      <main className="py-[20px] lg:px-[50px] px-[20px]">
        <div className="mb-5">
          <h1 className=" text-[42px] font-semibold leading-[48px]">
            Create new article
          </h1>
          <p className="text-sm text-black/60">
            Selamat datang di halaman pembuatan data pendidikan! Di sini, Anda
            dapat dengan mudah menambahkan informasi tentang latar belakang
            pendidikan Anda atau pengguna lainnya.
          </p>
        </div>
        <form className="w-full">
          <div className="flex mb-5 flex-col space-y-5">
            <div className="flex">
              <label
                htmlFor="image"
                className="h-[38px] w-full lg:w-auto justify-center text-sm flex items-center hover:bg-[#186F65] transition-all delay-75 border border-[#186F65] text-[#186F65] hover:text-white px-[20px] font-bold rounded-full "
              >
                Image Title
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
                  className="absolute w-[32px] h-[32px] rounded-full bg-white/50 top-2 left-2"
                >
                  X
                </button>
              </div>
            )}

            <input
              className="focus:outline-none h-[38px] p-2 border border-black/20 rounded-lg"
              type="text"
              onChange={handleTitleChange}
              placeholder="Enter your Title"
            />
          </div>
          <MarkdownEditor
            markdown={markdown}
            updateStateFromChild={updateStateFromChild}
          />
          {loading ? (
            <div className="flex">
              <div className="h-[38px] lg:w-auto w-full justify-center text-sm flex items-center hover:bg-[#186F65] transition-all delay-75 border border-[#186F65] text-[#186F65] hover:text-white px-[20px] font-bold rounded-full ">
                Uploading...
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={uploadArticle}
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
