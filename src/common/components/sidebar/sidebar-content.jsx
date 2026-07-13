import { useNavigate, NavLink } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/use-Auth-Store";
import { 
  Package, 
  X, 
  LayoutDashboard, 
  ChevronRight, 
  LogOut 
} from "lucide-react";
import { navGroups } from "./nav-config.js";
import { getLogout } from "../../../features/auth/services/get-logout.js";

export function SidebarContent({ onClose }) {
  const { username, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async() => {
    try{
      await getLogout();
    } catch(error){
      console.error("Error al cerrar sesión en el servidor:", error);
    } finally {
        logout();
        navigate("/login");
    }
    
  };

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Barlow', sans-serif" }}>
      {/* logo */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Package className="w-5 h-5 text-primary" strokeWidth={1.5} />
          <div>
            <div className="leading-none font-black text-sm tracking-tight text-foreground">DEPÓSITO</div>
            <div className="leading-none font-black text-sm tracking-tight text-primary">CENTRAL</div>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground lg:hidden">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* user */}
      <div className="px-5 py-3 border-b border-border">
        <div className="text-xs text-muted-foreground font-mono">USUARIO</div>
        <div className="text-sm font-semibold text-foreground mt-0.5">{username || "operador"}</div>
        <div className="text-xs text-primary font-mono" >OPERADOR</div>
      </div>

      {/* dashboard link */}
      <div className="px-3 pt-3">
        <NavLink
          to="/home"
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-2 text-sm transition-colors border-l-2 ${
              isActive
                ? "border-primary text-primary bg-primary/10"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`
          }
        >
          <LayoutDashboard className="w-4 h-4 shrink-0" />
          <span>Inicio</span>
        </NavLink>
      </div>

      {/* nav groups */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            <div
              className="px-3 py-1 text-xs text-muted-foreground tracking-widest mb-1 font-mono"
              
            >
              {group.label}
            </div>
            {group.items.map(({ path, icon: Icon, label }) => (
              <NavLink
                key={path}
                to={path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 text-sm transition-colors border-l-2 ${
                    isActive
                      ? "border-primary text-primary bg-primary/10"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{label}</span>
                <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-50" />
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* logout */}
      <div className="px-3 pb-4 border-t border-border pt-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors border-l-2 border-transparent hover:border-destructive"
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
}