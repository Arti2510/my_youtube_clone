import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import axios from "axios";

function MainPage({ SideNavbar }) {
  const options = [ "All", "Music", "Tech", "Gaming", "Design", "Javascript", "Comedy", "Democracy"];
  const [data, setData] = useState([]);
  const [selectedType, setSelectedType] = useState("All");
  const [searchTitle, setSearchTitle] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // Listen to search event from Header
  useEffect(() => {
    const handleSearch = (e) => {
      setSearchTitle(e.detail); // 'detail' contains the search term
    };

    window.addEventListener("searchVideo", handleSearch);
    return () => window.removeEventListener("searchVideo", handleSearch);
  }, []);

  // Fetch videos when selectedType or searchTitle changes
  useEffect(() => {
    const fetchVideos = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoggedIn(false);
        setData([]);
        return;
      }

      setIsLoggedIn(true);

      try {
        let url = `http://localhost:5100/api/getallvideo?`;
        if (selectedType !== "All") {
          url += `type=${selectedType}&`;
        }
        if (searchTitle.trim() !== "") {
          url += `title=${encodeURIComponent(searchTitle)}`;
        }

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(res.data);
      } catch (err) {
        console.error("Error fetching videos:", err.response?.data || err.message);
      }
    };

    fetchVideos();

    // Re-fetch on login/logout
    const refetchOnAuth = () => fetchVideos();
    window.addEventListener("authChanged", refetchOnAuth);

    return () => {
      window.removeEventListener("authChanged", refetchOnAuth);
    };
  }, [selectedType, searchTitle]);

  return (
    <div
      className={
        SideNavbar
          ? "flex flex-col overflow-x-hidden flex-1 ml-[274px] min-h-screen"
          : "flex flex-col overflow-x-hidden flex-1 min-h-screen bg-black"
      }
    >
      {isLoggedIn ? (
        <>
          {/* Category Filters */}
          <div className="flex fixed top-[56px] z-[1] w-full box-border gap-[10px] shrink-0 h-auto overflow-x-scroll bg-black px-4 py-2">
            {options.map((category, index) => (
              <div
                key={index}
                onClick={() => setSelectedType(category)}
                className={`text-white flex-none h-[30px] py-[1px] px-[10px] 
                  ${selectedType === category ? "bg-red-600" : "bg-[rgb(42,42,42)]"} 
                  font-semibold rounded-[5px] flex justify-center items-center cursor-pointer transition-all`}
              >
                {category}
              </div>
            ))}
          </div>

          {/* Video Grid */}
          <div
            className={
              SideNavbar
                ? "grid box-border gap-[10px] grid-cols-[384px_384px_384px] pt-[90px] pb-[20px] px-0 bg-black h-screen"
                : "grid box-border gap-[10px] grid-cols-[326px_326px_326px_326px] pt-[90px] pb-[20px] px-[10px] bg-black"
            }
          >
            {data.map((item) => (
              <Link
                to={`/watch/${item._id}`}
                key={item._id}
                className="text-white no-underline flex box-border flex-col cursor-pointer h-[316px]"
              >
                <div className="w-full relative box-border h-[216px]">
                  <img
                    src={item?.thumbnailUrl || "fallback-thumbnail.jpg"}
                    alt="thumbnail"
                    className="w-full h-full rounded-[10px]"
                  />
                  <div className="absolute bottom-0 right-0 w-auto py-[1px] px-[2px] bg-[rgb(42,42,42)] rounded-[5px]">
                    {item.duration || "28:05"}
                  </div>
                </div>
                <div className="flex pt-[10px]">
                  <div className="w-[50px] h-[50px] flex justify-center items-center">
                    <img
                      src={item?.uploader?.avatar || "fallback-avatar.jpg"}
                      alt="profile"
                      className="w-4/5 rounded-full"
                    />
                  </div>
                  <div className="w-full p-[5px] box-border flex flex-col">
                    <div className="font-semibold text-base">{item?.title}</div>
                    <div className="mt-[5px] text-lg text-[rgb(170,170,170)]">
                      {item?.uploader?.username}
                    </div>
                    <div className="text-sm text-[rgb(170,170,170)]">
                      {item?.likes} Likes
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black to-gray-900 text-white px-4">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to <span className="text-red-500">My YouTube Clone</span> 🎬
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Please log in to explore videos, channels, and more.
          </p>
        </div>
      )}
    </div>
  );
}

export default MainPage;
