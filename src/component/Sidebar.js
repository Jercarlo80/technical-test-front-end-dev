import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const menuItems = [
    { to: "/Dashboard", text: "Dashboard", icon: <RxDashboard className="min-w-[1.5rem]" /> },
    { to: "/Text-1", text: "Analytics", icon: <RxDashboard className="min-w-[1.5rem]" /> },
    { to: "/Text-2", text: "Settings", icon: <RxDashboard className="min-w-[1.5rem]" /> },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigation = (path) => navigate(path);

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 inset-x-0 h-[4rem] bg-gray-900 backdrop-blur-sm border-t flex items-center justify-around shadow-lg z-50">
        {menuItems.map((item, i) => (
          <button
            key={i}
            onClick={() => handleNavigation(item.to)}
            className={`flex flex-col items-center p-[0.5rem] transition-all ${
              location.pathname === item.to 
                ? "text-[#3D8D7A] translate-y-[-0.125rem]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {React.cloneElement(item.icon, { className: "w-[1.5rem] h-[1.5rem]" })}
            <span className="text-[0.75rem] mt-[0.25rem] font-medium">{item.text}</span>
          </button>
        ))}
      </nav>
    );
  }

  return (
    <aside
      className={`h-screen bg-gray-900 transition-all duration-300 ${
        expanded ? "w-[16rem]" : "w-[5rem]"
      } flex flex-col border-r border-gray-800`}
    >
      <div className="relative flex items-center justify-between p-[1.5rem] pb-[2rem]">
        {expanded && (
          <h1 className="text-[1.25rem] font-bold text-white tracking-tight">Brofesional</h1>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          className={`absolute -right-[0.75rem] top-[2rem] p-[0.375rem] bg-gray-800 rounded-full border-[0.125rem] border-gray-900 hover:bg-gray-700 transition-colors ${
            expanded ? "rotate-0" : "rotate-180"
          }`}
        >
          <FaChevronLeft className="text-white w-[1rem] h-[1rem]" />
        </button>
      </div>

      <nav className="flex-1 px-[0.75rem] flex flex-col gap-[0.25rem]">
        {menuItems.map((item, i) => (
          <button
            key={i}
            onClick={() => handleNavigation(item.to)}
            className={`flex items-center gap-[0.75rem] p-[0.75rem] rounded-[0.5rem] transition-all ${
              location.pathname === item.to
                ? "bg-[#3D8D7A] text-white shadow-lg"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {React.cloneElement(item.icon, {
              className: `w-[1.5rem] h-[1.5rem] flex-shrink-0 ${expanded ? "ml-[0.25rem]" : "mx-auto"}`
            })}
            {expanded && (
              <span className="text-[0.875rem] font-medium truncate">{item.text}</span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
}