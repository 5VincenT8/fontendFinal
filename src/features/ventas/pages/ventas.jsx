import { useState, useMemo } from "react";
import { SearchableClientSelect } from "../../../common/components/SearchableClientSelect/SearchableClientSelect";
import { CheckCircle } from "lucide-react";
import { useGetAllClients } from "../../clientes/hooks/use-get-all-client";
import { useGetReportProducts } from "../../inventario/hooks/use-get-reporte-products";
import { DocumentosSection } from "../../../common/components/documentos-section/documentos-section";
import { DetallesTablaSection } from "../../../common/components/detalles-tabla/detalles-tabla";
import { AgregarProductoSection } from "../../../common/components/agregar-producto/agregar-producto";
import { useGetAllProduts } from "../../productos/hooks/use-all-products";
import { usePostAddVenta } from "../hooks/use-post-create-venta";

const inputCls = "w-full bg-card border border-border text-foreground placeholder:text-muted-foreground px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";
const MONO = { fontFamily: "'Share Tech Mono', monospace" };

export function VentasPage() {
    const [saved, setSaved] = useState(false);
    
    // Hooks de consumo de datos
    const { clientes } = useGetAllClients();
    const { products, loading: loadingProds } = useGetReportProducts();
    const { products: productosPrecios } = useGetAllProduts();
    const { ejecutarPostVenta, loading: guardandoVenta } = usePostAddVenta();

    const [formVenta, setFormVenta] = useState({
        idCliente: "", tipoDocumento: "RUC", idBoleta: "1", idPago: "1", idUsuario: "1", detalles: []
    });
    const [tmpProducto, setTmpProducto] = useState({ idProducto: "", tipoUnidad: "UNIDAD", cantProducto: "" });
    const [resetProdTrigger, setResetProdTrigger] = useState(false);

    // Manejadores simplificados con funciones flecha de una línea
    const handleClienteSeleccionado = (c) => setFormVenta(p => ({ ...p, idCliente: c.idCliente }));
    const handleChange = (field) => (e) => setFormVenta(p => ({ ...p, [field]: e.target.value }));
    const eliminarDelDetalle = (id) => setFormVenta(p => ({ ...p, detalles: p.detalles.filter(i => i.idProducto !== id) }));

    const handleProductoSeleccionado = (p) => p && setTmpProducto({
        idProducto: p.idProducto || p.idProduct || p.id, tipoUnidad: "UNIDAD", cantProducto: 1
    });

    // ✨ Simplificado usando un objeto de mapeo dinámico
    const obtenerStockDisponible = () => {
        const prod = products?.find(p => String(p.idProduct) === String(tmpProducto.idProducto));
        if (!prod) return 0;
        const stocks = { CAJA: prod.totalCajas, CAJON: prod.totalCajones, UNIDAD: prod.stockTotal };
        return parseFloat(stocks[tmpProducto.tipoUnidad]) || 0;
    };

    const agregarAlDetalle = (e) => {
        e?.preventDefault();
        const stock = obtenerStockDisponible();
        const cantidad = parseInt(tmpProducto.cantProducto, 10);

        if (!tmpProducto.idProducto || !cantidad) return;
        if (cantidad > stock) return alert(`Insuficiente: Solo quedan ${stock} en ${tmpProducto.tipoUnidad}S.`);

        setFormVenta(p => ({ ...p, detalles: [...p.detalles, { ...tmpProducto, cantProducto: cantidad }] }));
        setTmpProducto({ idProducto: "", tipoUnidad: "UNIDAD", cantProducto: "" });
        setResetProdTrigger(prev => !prev);
    };

    const handleSubmitVenta = async (e) => {
        e.preventDefault();
        if (!formVenta.idCliente || !formVenta.detalles.length) return alert("Por favor rellene todos los campos.");

        const payloadFinal = {
            ...formVenta,
            idCliente: parseInt(formVenta.idCliente),
            idBoleta: parseInt(formVenta.idBoleta),
            idPago: parseInt(formVenta.idPago),
            idUsuario: parseInt(formVenta.idUsuario),
            detalles: formVenta.detalles.map(d => ({ ...d, idProducto: parseInt(d.idProducto), cantProducto: parseInt(d.cantProducto) }))
        };

        try {
            if (await ejecutarPostVenta(payloadFinal)) {
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
                // Resetea solo lo necesario manteniendo correlativos de boleta/pago anteriores
                setFormVenta(p => ({ ...p, idCliente: "", detalles: [] }));
            }
        } catch (err) {
            console.error("❌ Error al guardar:", err);
        }
    };

    // ✨ Simplificado reduciendo la lógica de ifs anidados
const totalesVisuales = useMemo(() => {
    if (!formVenta.detalles.length || !productosPrecios) {
        return { subtotal: 0, igv: 0, total: 0 };
    }

    let totalAcumulado = 0;

    formVenta.detalles.forEach(item => {
        const p = productosPrecios.find(prod => String(prod.id) === String(item.idProducto));
        if (!p) return;

        // 1. Obtenemos el precio completo de la presentación seleccionada
        let precioPresentacion = 0;
        if (item.tipoUnidad === "UNIDAD") precioPresentacion = p.precioUnidad || 0;
        if (item.tipoUnidad === "CAJA") precioPresentacion = p.precioCaja || 0;
        if (item.tipoUnidad === "CAJON") precioPresentacion = p.precioCajon || 0;

        // 2. ¡Multiplicación directa! Si son 12 Cajones, multiplicamos PrecioCajón * 12
        const subtotalDetalle = precioPresentacion * parseInt(item.cantProducto, 10);
        totalAcumulado += subtotalDetalle;
    });

    // 3. Cálculos finales de impuestos a 2 decimales
    const totalFinal = Math.round(totalAcumulado * 100) / 100; 
    const gravadoFinal = Math.round((totalFinal / 1.18) * 100) / 100; 
    const igvFinal = Math.round((totalFinal - gravadoFinal) * 100) / 100; 

    return {
        subtotal: gravadoFinal,
        igv: igvFinal,
        total: totalFinal
    };
}, [formVenta.detalles, productosPrecios]);

    return (
        <div className="p-6 max-w-3xl mx-auto text-foreground" style={{ fontFamily: "'Barlow', sans-serif" }}>
            <div className="mb-6">
                <h1 className="font-black text-2xl tracking-tight">AGREGAR UNA VENTA</h1>
                <p className="text-muted-foreground text-sm font-mono">NUEVO REGISTRO DE VENTA</p>
            </div>

            {saved && (
                <div className="flex items-center gap-2 bg-green-950/40 border border-green-800/50 px-4 py-3 mb-6">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400 font-mono">VENTA REGISTRADA CORRECTAMENTE</span>
                </div>
            )}

            <form onSubmit={handleSubmitVenta} className="space-y-5">
                <div className="bg-card/30 p-4 border border-border space-y-2">
                    <SearchableClientSelect clientes={clientes || []} onSelectClient={handleClienteSeleccionado}/>
                </div>

                <DocumentosSection formVenta={formVenta} handleChange={handleChange} inputCls={inputCls} MONO={MONO} />

                <AgregarProductoSection 
                    products={products} handleProductoSeleccionado={handleProductoSeleccionado} resetProdTrigger={resetProdTrigger}
                    tmpProducto={tmpProducto} setTmpProducto={setTmpProducto} loadingProds={loadingProds}
                    agregarAlDetalle={agregarAlDetalle} obtenerStockDisponible={obtenerStockDisponible} inputCls={inputCls} MONO={MONO}
                />

                <DetallesTablaSection formVenta={formVenta} products={products} productosPrecios={productosPrecios} eliminarDelDetalle={eliminarDelDetalle} MONO={MONO} />

                <div className="flex flex-col items-end gap-1 text-right font-mono text-sm text-muted-foreground my-4 p-4 bg-zinc-900/50 rounded-lg">
                    <div>SUBTOTAL: <span className="text-white font-bold">S/ {totalesVisuales.subtotal.toFixed(2)}</span></div>
                    <div>IGV (18%): <span className="text-white font-bold">S/ {totalesVisuales.igv.toFixed(2)}</span></div>
                    <div className="text-lg text-amber-400 font-bold border-t border-zinc-700 pt-1 mt-1">
                        TOTAL A PAGAR: S/ {totalesVisuales.total.toFixed(2)}
                    </div>
                </div>

                <button type="submit" disabled={guardandoVenta} className="w-full bg-primary text-primary-foreground font-black text-sm tracking-[0.15em] uppercase py-3.5 hover:bg-amber-400 transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed">
                    {guardandoVenta ? "REGISTRANDO VENTA..." : "REGISTRAR VENTA"}
                </button>
            </form>
        </div>
    );
}