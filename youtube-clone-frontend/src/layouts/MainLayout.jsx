
// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 mt-14">
      <Sidebar isOpen={isSidebarOpen} />

      <div className="flex flex-col flex-1 ml-0">
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="bg-gray-50 dark:bg-gray-900 flex-grow pt-16 p-4 overflow-auto mt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
