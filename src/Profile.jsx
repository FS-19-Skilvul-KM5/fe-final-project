import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Tabs from "../components/Tab";
import ModalUpadateArticle from "../components/ModalUpadateArticle";

export default function Profile() {
  const [users, setUsers] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = Cookies.get("token");

        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const token = Cookies.get("token");

        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCurrentUser(data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();

    fetchUsers();
  }, []);

  const handleRemoveArticle = async (articleId) => {
    const token = Cookies.get("token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/articles/${articleId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (response.ok) {
        setMessage(`Education with ID ${articleId} deleted successfully.`);

        setTimeout(() => {
          setMessage("");
          // eslint-disable-next-line no-undef
          window?.location.reload();
        }, 2000);
      }
    } catch (error) {
      setMessage(`Error deleting education: ${error}`);

      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  const handleRemoveWorkshop = async (workshopId) => {
    const token = Cookies.get("token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/workshop/${workshopId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (response.ok) {
        setMessage(`Education with ID ${workshopId} deleted successfully.`);

        setTimeout(() => {
          setMessage("");
          // eslint-disable-next-line no-undef
          window?.location.reload();
        }, 2000);
      }
    } catch (error) {
      setMessage(`Error deleting education: ${error}`);

      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };


  const tabs = [
    {
      label: "User",
      content: (
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-2 px-4 border-r text-left">ID</th>
              <th className="py-2 px-4 border-r text-left">Username</th>
              <th className="py-2 px-4 border-r text-left">Role</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) &&
              users.map((user, index) => {
                return (
                  <tr className="border-b" key={index}>
                    <td className="py-2 px-4  border-r w-5 overflow-hidden cursor-pointer">
                      <div className="text-ellipsis overflow-hidden w-[50px]">
                        {user._id}
                      </div>
                    </td>
                    <td className="py-2 px-4  border-r">{user?.username}</td>
                    <td className="py-2 px-4  border-r">{user?.role}</td>
                    <td className="py-2 px-4  flex space-x-2 items-center">
                      {currentUser?.role === "admin" ||
                        currentUser?.role === "root" ? (
                        <>
                          <button >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="#110e0e"
                              viewBox="0 0 256 256"
                            >
                              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
                            </svg>
                          </button>

                          {user?.role === "admin" ? (
                            <>
                              <button >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="#201818"
                                  viewBox="0 0 256 256"
                                >
                                  <path d="M235.5,216.81c-22.56-11-35.5-34.58-35.5-64.8V134.73a15.94,15.94,0,0,0-10.09-14.87L165,110a8,8,0,0,1-4.48-10.34l21.32-53a28,28,0,0,0-16.1-37,28.14,28.14,0,0,0-35.82,16,.61.61,0,0,0,0,.12L108.9,79a8,8,0,0,1-10.37,4.49L73.11,73.14A15.89,15.89,0,0,0,55.74,76.8C34.68,98.45,24,123.75,24,152a111.45,111.45,0,0,0,31.18,77.53A8,8,0,0,0,61,232H232a8,8,0,0,0,3.5-15.19ZM67.14,88l25.41,10.3a24,24,0,0,0,31.23-13.45l21-53c2.56-6.11,9.47-9.27,15.43-7a12,12,0,0,1,6.88,15.92L145.69,93.76a24,24,0,0,0,13.43,31.14L184,134.73V152c0,.33,0,.66,0,1L55.77,101.71A108.84,108.84,0,0,1,67.14,88Zm48,128a87.53,87.53,0,0,1-24.34-42,8,8,0,0,0-15.49,4,105.16,105.16,0,0,0,18.36,38H64.44A95.54,95.54,0,0,1,40,152a85.9,85.9,0,0,1,7.73-36.29l137.8,55.12c3,18,10.56,33.48,21.89,45.16Z"></path>
                                </svg>
                              </button>
                            </>
                          ) : (
                            <button >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="#201818"
                                viewBox="0 0 256 256"
                              >
                                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path>
                              </svg>
                            </button>
                          )}
                        </>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ),
    },
    {
      label: "Workshop",
      content: (
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-2 px-4 border-r text-left">ID</th>
              <th className="py-2 px-4 border-r text-left">Title</th>
              <th className="py-2 px-4 border-r text-left">Tujuan</th>

              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(currentUser?.workshop) &&
              currentUser?.workshop.map((workshop, index) => {
                return (
                  <tr className="border-b" key={index}>
                    <td className="py-2 px-4 border-b border-r w-5 overflow-hidden cursor-pointer">
                      <div className="text-ellipsis overflow-hidden w-[50px]">
                        {workshop._id}
                      </div>
                    </td>

                    <td className="py-2 px-4 border-r  overflow-hidden  lg:w-auto w-[200px]">
                      <div className="line-clamp-2 ">{workshop.title}</div>
                    </td>

                    <td className="py-2 px-4 border-r  overflow-hidden  w-[200px] lg:w-auto">
                      <div className="line-clamp-2 ">{workshop.tujuan}</div>
                    </td>

                    <td className="py-2 px-4  flex space-x-2 items-center">
                      <button
                        onClick={() => handleRemoveWorkshop(workshop._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="#110e0e"
                          viewBox="0 0 256 256"
                        >
                          <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ),
    },
    {
      label: "Education",
      content: (
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-2 px-4 border-r text-left">ID</th>
              <th className="py-2 px-4 border-r text-left">Title</th>
              <th className="py-2 px-4 border-r text-left">Url</th>

              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
        </table>
      ),
    },
    {
      label: "Article",
      content: (
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-2 px-4 border-r text-left">ID</th>
              <th className="py-2 px-4 border-r text-left">Image</th>
              <th className="py-2 px-4 border-r text-left">Title</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(currentUser?.articles) &&
              currentUser?.articles.map((article, index) => {
                return (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-r w-5 overflow-hidden cursor-pointer">
                      <div className="text-ellipsis overflow-hidden w-[50px]">
                        {article._id}
                      </div>
                    </td>
                    <td className="py-2 px-4 ">
                      <img
                        src={article.image.url}
                        alt=""
                        className="h-[48px] w-[48px] rounded-lg object-cover"
                      />
                    </td>
                    <td className="py-2 px-4 border-b border-r  overflow-hidden lg:w-auto w-[200px]">
                      <div className="line-clamp-2">{article.title}</div>
                    </td>

                    <td className="py-3 px-4 flex space-x-2 items-center">
                      <button onClick={() => handleRemoveArticle(article._id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="#110e0e"
                          viewBox="0 0 256 256"
                        >
                          <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
                        </svg>
                      </button>
                      <ModalUpadateArticle articleId={article._id} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      {message && (
        <div className="bg-white border border-black/50 fixed top-[82px] right-5 text-black p-4 mb-4">
          {message}
        </div>
      )}
      <div className="container mx-auto mt-8 px-[20px]">
        <div className="flex flex-col lg:flex-row lg:justify-between mb-3">
          <h2 className="text-3xl font-semibold mb-4">User Dashboard</h2>
          <div className="flex space-x-2 flex-wrap gap-2">
            {currentUser?.role === "admin" || currentUser?.role === "root" ? (
              <>
                <a
                  href="/create/article"
                  className="h-[38px] group text-sm flex items-center hover:bg-[#186F65] transition-all delay-75 border border-[#186F65] text-[#186F65] hover:text-white px-[20px] font-bold rounded-full"
                >
                  Create
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#186f65"
                    className="ml-1 group-hover:fill-white"
                    viewBox="0 0 256 256"
                  >
                    <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM184,96a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,96Zm0,32a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,128Zm0,32a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,160Z"></path>
                  </svg>
                </a>
                <a
                  href="/create/workshop"
                  className="h-[38px] group text-sm flex items-center hover:bg-[#186F65] transition-all delay-75 border border-[#186F65] text-[#186F65] hover:text-white px-[20px] font-bold rounded-full"
                >
                  Create
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#186f65"
                    className="ml-1 group-hover:fill-white"
                    viewBox="0 0 256 256"
                  >
                    <path d="M248,120h-8V88a16,16,0,0,0-16-16H208V64a16,16,0,0,0-16-16H168a16,16,0,0,0-16,16v56H104V64A16,16,0,0,0,88,48H64A16,16,0,0,0,48,64v8H32A16,16,0,0,0,16,88v32H8a8,8,0,0,0,0,16h8v32a16,16,0,0,0,16,16H48v8a16,16,0,0,0,16,16H88a16,16,0,0,0,16-16V136h48v56a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16v-8h16a16,16,0,0,0,16-16V136h8a8,8,0,0,0,0-16ZM32,168V88H48v80Zm56,24H64V64H88V192Zm104,0H168V64h24V175.82c0,.06,0,.12,0,.18s0,.12,0,.18V192Zm32-24H208V88h16Z"></path>
                  </svg>
                </a>
              </>
            ) : null}
          </div>
        </div>

        <Tabs role={currentUser?.role} tabs={tabs} />
      </div >
      <Footer />
    </>
  );
}
