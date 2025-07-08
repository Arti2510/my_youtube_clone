

// src/components/Sidebar.jsx
import {
  Home,
  Users,
  Video,
  Clock,
  ListVideo,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Home", icon: <Home />, path: "/" },
  { name: "Subscriptions", icon: <Users />, path: "/subscriptions" },
  { name: "My Videos", icon: <ListVideo />, path: "/my-videos" },
  { name: "Watch Later", icon: <Clock />, path: "/watch-later" },
  { name: "Upload", icon: <Video />, path: "/upload" },
];

export default function Sidebar({ isOpen }) {
  return (
    <aside
      className={`bg-white h-screen p-4 shadow-md w-64 fixed top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <h2 className="text-xl font-bold text-red-600 mb-4">Menu</h2>
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className="flex items-center gap-3 text-gray-700 hover:text-red-600"
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
