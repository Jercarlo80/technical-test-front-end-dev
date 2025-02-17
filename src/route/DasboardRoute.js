import React from "react";
import Dashboard from "../page/Dashboard";
import Sidebar from "../component/Sidebar";

export default function DashboardRoute() {
  return (
    <div className="flex bg-[#000000] h-full ">
      <Sidebar />
      <div className="w-screen">
        <Dashboard />
      </div>
    </div>
  );
}
