import React from 'react';
import { Package, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useState } from "react";

export function LoginCard ({ username, setUsername, password, setPassword, handleLogin,loading,error }){
    const [showPassword, setShowPassword] = useState(false);

    return(
    <>
    <div
      className="min-h-screen bg-background flex flex-col"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      {/* top bar */}
      <div className="border-b border-border px-6 py-3 flex items-center gap-3">
        <div className="w-2 h-2 bg-primary rounded-full" />
        <span
          className="text-xs text-muted-foreground tracking-[0.2em] uppercase"
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
        >
          ALMACÉN — SISTEMA DE ACCESO
        </span>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span
            className="text-xs text-muted-foreground"
            style={{ fontFamily: "'Share Tech Mono', monospace" }}
          >
            EN LÍNEA
          </span>
        </div>
      </div>

      {/* main content */}
      <div className="flex-1 flex">
        {/* left panel — decorative */}
        <div className="hidden lg:flex flex-col justify-between w-[42%] bg-muted border-r border-border p-12 relative overflow-hidden">
          {/* grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#f0a500 1px, transparent 1px), linear-gradient(90deg, #f0a500 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative">
            <Package className="w-12 h-12 text-primary mb-6" strokeWidth={1.5} />
            <div className="text-5xl font-black text-foreground leading-none tracking-tight mb-4">
              TIENDA<br />
              <span className="text-primary">CENTRAL</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Gestión de inventario, ventas, órdenes de salida y control de accesos para operaciones de almacén.
            </p>
          </div>

          <div
            className="relative border-t border-border pt-6 text-xs text-muted-foreground space-y-1"
            style={{ fontFamily: "'Share Tech Mono', monospace" }}
          >
            <div>TURNO: <span className="text-foreground">DIURNO 06:00–18:00</span></div>
            <div>ZONA: <span className="text-foreground">SECTOR A </span></div>
            <div>ACCESO RESTRINGIDO</div>
          </div>
        </div>

        {/* right panel — login form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-sm">
            {/* mobile logo */}
            <div className="flex items-center gap-3 mb-10 lg:hidden">
              <Package className="w-8 h-8 text-primary" strokeWidth={1.5} />
              <span className="text-xl font-black tracking-tight">
                TIENDA <span className="text-primary">CENTRAL</span>
              </span>
            </div>

            <div className="mb-8">
              <h1 className="text-2xl font-black tracking-tight text-foreground mb-1">
                ACCESO AL SISTEMA
              </h1>
              <p
                className="text-xs text-muted-foreground tracking-widest uppercase"
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
              >
                Ingrese sus credenciales
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5" noValidate>
              {/* username */}
              <div className="space-y-1.5">
                <label
                  htmlFor="username"
                  className="block text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground"
                  style={{ fontFamily: "'Share Tech Mono', monospace" }}
                >
                  Usuario
                </label>
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="usuario"
                  className="w-full bg-card border border-border text-foreground placeholder:text-muted-foreground px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  style={{ fontFamily: "'Share Tech Mono', monospace" }}
                />
              </div>

              {/* password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground"
                  style={{ fontFamily: "'Share Tech Mono', monospace" }}
                >
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-card border border-border text-foreground placeholder:text-muted-foreground px-4 py-3 pr-12 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    style={{ fontFamily: "'Share Tech Mono', monospace" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* error */}
              {error && (
                <div className="flex items-center gap-2 bg-red-950/40 border border-red-800/50 px-3 py-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span
                    className="text-xs text-red-400"
                    style={{ fontFamily: "'Share Tech Mono', monospace" }}
                  >
                    {error}
                  </span>
                </div>
              )}

              {/* submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground font-black text-sm tracking-[0.2em] uppercase py-3.5 hover:bg-amber-400 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span
                    className="inline-flex items-center gap-2"
                    style={{ fontFamily: "'Share Tech Mono', monospace" }}
                  >
                    <span className="inline-block w-3 h-3 border border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                    VERIFICANDO...
                  </span>
                ) : (
                  "INGRESAR"
                )}
              </button>
            </form>

            {/* footer */}
            <div
              className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground"
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
            >
              Acceso solo para personal autorizado.
              <br />
              Contacte a su supervisor para recuperar credenciales.
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}