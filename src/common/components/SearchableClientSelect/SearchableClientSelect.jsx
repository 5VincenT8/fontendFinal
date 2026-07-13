import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";

export function SearchableClientSelect({ clientes, onSelectClient }) {
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

    
    const filteredClientes = clientes ? clientes.filter((c) => {
        const busqueda = query.toLowerCase();
        return (
            c.nombreCliente?.toLowerCase().includes(busqueda) ||
            c.numeroDNI?.includes(busqueda) ||
            c.numeroRUC?.includes(busqueda)
        );
    }) : [];

    const handleSelect = (cliente) => {
        setSelectedName(cliente.nombreCliente);
        setQuery(""); 
        setIsOpen(false);
        if (onSelectClient) onSelectClient(cliente);
    };

    return (
        <div ref={containerRef} className="relative w-full text-sm">
            <span className="block text-xs font-mono text-muted-foreground uppercase mb-1.5 tracking-wider">
                Seleccionar Cliente
            </span>
            
           
            <div className="relative">
                <input
                    type="text"
                    className="w-full bg-card border border-border text-foreground placeholder:text-muted-foreground px-4 py-2.5 pr-10 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors cursor-pointer"
                    placeholder={selectedName || "Escribe para buscar cliente..."}
                    value={query}
                    onFocus={() => setIsOpen(true)}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-muted-foreground pointer-events-none">
                    {query ? <Search className="w-4 h-4 opacity-60" /> : <ChevronDown className="w-4 h-4" />}
                </div>
            </div>

            
            {isOpen && (
                <div className="absolute z-50 left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-card border border-border shadow-2xl custom-scrollbar">
                    {filteredClientes.length === 0 ? (
                        <div className="px-4 py-3 text-muted-foreground text-xs font-mono" style={MONO}>
                            NO SE ENCONTRARON RESULTADOS
                        </div>
                    ) : (
                        filteredClientes.map((cliente) => (
                            <div
                                key={cliente.idCliente}
                                onClick={() => handleSelect(cliente)}
                                className="px-4 py-2.5 cursor-pointer flex justify-between items-center border-b border-border/40 last:border-0 hover:bg-primary hover:text-primary-foreground transition-colors group"
                            >
                                <div className="flex flex-col">
                                    <span className="font-medium text-foreground group-hover:text-primary-foreground">
                                        {cliente.nombreCliente}
                                    </span>
                                    <span className="text-xs text-muted-foreground group-hover:text-primary-foreground/80 font-mono" style={MONO}>
                                        {cliente.numeroDNI ? `DNI: ${cliente.numeroDNI}` : `RUC: ${cliente.numeroRUC || 'S/N'}`}
                                    </span>
                                </div>
                                <span className="text-xs text-primary font-mono group-hover:text-primary-foreground/90" style={MONO}>
                                    ID: {cliente.idCliente}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}