
// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div
        className={`min-h-screen transition-all duration-300 ${
          isSidebarOpen ? '' : ''
        } md:ml-64`}
      >
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="p-4">
          <Outlet>
            {children}
          </Outlet>
        </main>
      </div>
    </div>
  );
}
