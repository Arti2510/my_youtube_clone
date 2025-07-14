import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function MainPage({ SideNavbar }) {
  const options = [
    "All",
    "Music",
    "Tech",
    "Gaming",
    "Design",
    "Javascript",
    "Comedy",
    "Democracy",
  ];
  const [data, setData] = useState([]);
  const { searchTitle, setSearchTitle } = useContext(AuthContext);
  const [selectedType, setSelectedType] = useState("All");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // ✅ Fetch logic
  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
        try {
          let url = "http://localhost:5100/api/getallvideo";
          const params = [];
          if (selectedType !== "All") params.push(`type=${selectedType}`);
          if (searchTitle && searchTitle.trim() !== "")
            params.push(`title=${encodeURIComponent(searchTitle)}`);
          if (params.length) url += "?" + params.join("&");

          const res = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setData(res.data);
        } catch (err) {
          console.error("Error fetching videos:", err.response?.data || err.message);
        }
      } else {
        setIsLoggedIn(false);
        setData([]);
      }
    };

    checkAuthAndFetch();
    window.addEventListener("authChanged", checkAuthAndFetch);
    return () => window.removeEventListener("authChanged", checkAuthAndFetch);
  }, [selectedType, searchTitle]);

  // ✅ Listen to search event
  useEffect(() => {
    const handleSearch = (e) => setSearchTitle(e.detail);
    window.addEventListener("searchVideo", handleSearch);
    return () => window.removeEventListener("searchVideo", handleSearch);
  }, []);

  return (
    <div
      className={`flex flex-col flex-1 overflow-x-hidden min-h-screen bg-black mt-14 ${
        SideNavbar ? "ml-[274px]" : ""
      }`}
    >
      {isLoggedIn ? (
        <>
          {/* ✅ Category Filter */}
          <div className="flex fixed top-[56px] w-full z-10 bg-black px-4 py-2 overflow-x-auto whitespace-nowrap gap-2">
            {options.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedType(category)}
                className={`text-sm sm:text-base px-4 py-1 rounded-md whitespace-nowrap font-semibold transition-all ${
                  selectedType === category
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* ✅ Video Grid */}
          <div
            className={`grid gap-4 pt-[100px] pb-10 px-2 sm:px-4 ${
              SideNavbar ? "pr-[16px]" : ""
            } 
            grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`}
          >
            {data.map((item) => (
              <Link
                to={`/watch/${item._id}`}
                key={item._id}
                className="text-white no-underline flex flex-col cursor-pointer bg-[#121212] rounded-lg overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="w-full h-[200px] sm:h-[180px] relative">
                  <img
                    src={item?.thumbnailUrl || "fallback-thumbnail.jpg"}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                    {item.duration || "28:05"}
                  </div>
                </div>

                {/* Video Info */}
                <div className="flex p-3 gap-3">
                  <div className="flex-shrink-0 w-10 h-10">
                    <img
                      src={item?.uploader?.avatar || "fallback-avatar.jpg"}
                      alt="profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col text-sm overflow-hidden">
                    <div className="font-semibold truncate">{item?.title}</div>
                    <div className="text-gray-400 truncate">
                      {item?.uploader?.username}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {(item?.likes || []).length} Likes
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        // ✅ Not Logged In
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black to-gray-900 text-white px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Welcome to <span className="text-red-500">My YouTube Clone</span> 🎬
          </h1>
          <p className="text-base sm:text-lg text-gray-300 mb-6">
            Please log in to explore videos, channels, and more.
          </p>
        </div>
      )}
    </div>
  );
}

export default MainPage;
