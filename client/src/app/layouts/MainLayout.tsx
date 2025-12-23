import { Outlet } from "react-router-dom";
import { Sidebar, Header } from "@/widgets/index"; 

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      {/* ВАЖНО: pl-64 (отступ для sidebar) и pt-16 (отступ для header) */}
      <main className="pl-64 pt-16 min-h-screen">
        <div className="p-8 max-w-7xl mx-auto">
          {/* Outlet - это место, куда вставляется Dashboard */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};
