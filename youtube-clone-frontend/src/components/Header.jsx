// src/components/Header.jsx
import { useState } from "react";
import { Search, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header({ onToggleSidebar }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { token, avatar, logout } = useContext(AuthContext);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      console.log("Search:", searchTerm);
      // Optionally navigate to search results
      // navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 shadow bg-white sticky top-0 z-50">
      {/* Left: Logo & Menu */}
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="md:hidden">
          <Menu />
        </button>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1024px-YouTube_full-color_icon_%282017%29.svg.png" alt="" height={"20px"} width={"20px"}/>
        <h1 className="text-xl font-bold text-red-600">YouTube Clone</h1>
      </div>

      {/* Center: Search Bar */}
      <div className="flex items-center w-full max-w-md px-2">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full px-3 py-2 border border-gray-300 rounded-l-full focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-gray-200 rounded-r-full"
          aria-label="Search"
        >
          <Search />
        </button>
      </div>

      {/* Right: Upload + Avatar/Logout/Login */}
      <div className="flex items-center gap-4">
        {/* <button>
          <Upload />
        </button> */}
        {token ? (
          <>
            <img
              src={avatar || "/avatar-placeholder.png"}
              alt="User avatar"
              className="w-8 h-8 rounded-full"
            />
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="bg-red-600 text-white px-4 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-red-600 text-white px-4 py-1 rounded">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
