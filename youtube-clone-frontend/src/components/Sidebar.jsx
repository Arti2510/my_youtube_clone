

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
    <aside className={` bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 h-screen p-4 top-0 pt-16
        fixed md:sticky inset-x-0 left-0 z-40 w-40 shadow-md md:top-[56px]
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-y-0' : '-translate-y-full'} md:translate-x-0 md:top-[56px] md:translate-y-0 md:inset-y-0 md:inset-x-auto md:w-64 md:pt-0
      `}>
      <h2 className="text-xl font-bold text-red-600 mb-4 mt-16">Menu</h2>
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className="flex items-center gap-3text-gray-700 dark:text-gray-300
             hover:text-red-600 dark:hover:text-red-600"
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
        
      </nav>
    </aside>
  );
}
