import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export function SearchableProductSelect({ productos, onSelectProduct, resetTrigger }) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedName, setSelectedName] = useState("");
    const containerRef = useRef(null);

    const MONO = { fontFamily: "'Share Tech Mono', monospace" };

    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (resetTrigger) {
            setSelectedName("");
            setQuery("");
        }
    }, [resetTrigger]);

   
    const filteredProductos = productos ? productos.filter((p) => {
        return p.nombre?.toLowerCase().includes(query.toLowerCase());
    }) : [];

    const handleSelect = (producto) => {
        setSelectedName(producto.nombre);
        setQuery(""); 
        setIsOpen(false);
        if (onSelectProduct) onSelectProduct(producto);
    };

    return (
        <div ref={containerRef} className="relative w-full text-sm">
            <label className="block text-[10px] font-mono text-muted-foreground uppercase mb-1">
                Buscar Producto
            </label>
            <div className="relative">
                <input
                    type="text"
                    className="w-full bg-card border border-border text-foreground placeholder:text-muted-foreground px-4 py-2.5 pr-10 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors cursor-pointer"
                    placeholder={selectedName || "Escribe el nombre del producto..."}
                    value={query}
                    onFocus={() => setIsOpen(true)}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground pointer-events-none">
                    <ChevronDown className="w-4 h-4" />
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-50 left-0 right-0 mt-1 max-h-52 overflow-y-auto bg-card border border-border shadow-2xl">
                    {filteredProductos.length === 0 ? (
                        <div className="px-4 py-3 text-muted-foreground text-xs font-mono" style={MONO}>
                            NO SE ENCONTRARON PRODUCTOS
                        </div>
                    ) : (
                        filteredProductos.map((prod) => (
                            <div
                                key={prod.idProduct}
                                onClick={() => handleSelect(prod)}
                                className="px-4 py-2 cursor-pointer flex justify-between items-center border-b border-border/40 last:border-0 hover:bg-primary hover:text-primary-foreground transition-colors group"
                            >
                                <div className="flex flex-col">
                                    <span className="font-medium text-foreground group-hover:text-primary-foreground text-xs">
                                        {prod.nombre}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground group-hover:text-primary-foreground/80 font-mono" style={MONO}>
                                        STK: {prod.stockTotal} U.
                                    </span>
                                </div>
                                <span className="text-xs text-primary font-mono group-hover:text-primary-foreground/90" style={MONO}>
                                    ID: {prod.idProduct}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}