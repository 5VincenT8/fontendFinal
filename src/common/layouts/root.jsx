import { useState } from "react";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";

import { useAuthStore } from "../../features/auth/store/use-Auth-Store";
import {
  Package, PackagePlus, Layers, FolderPlus,
  ShoppingCart, Ban, Truck, Receipt, FileText,
  LogOut, Menu, X, LayoutDashboard, ChevronRight,
} from "lucide-react";
import { SideBar } from "./sidebar";

export function Root() {
  const { isAuthenticated } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div
      className="flex h-screen bg-background overflow-hidden"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      {/* desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 bg-card border-r border-border">
        <SideBar/>
      </aside>

      {/* mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* mobile sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-56 bg-card border-r border-border flex flex-col transition-transform duration-200 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SideBar onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Package className="w-4 h-4 text-primary" strokeWidth={1.5} />
          <span className="font-black text-sm tracking-tight">
            DEPÓSITO <span className="text-primary">CENTRAL</span>
          </span>
        </div>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}