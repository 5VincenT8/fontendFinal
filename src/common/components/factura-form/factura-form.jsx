import { useState, useEffect } from "react";

export function FacturaForm({ data, onEnviar, isSubmitting }) {
    const inputCls = "w-full bg-card border border-border text-foreground placeholder:text-muted-foreground px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";
    const labelCls = "block text-xs font-semibold mb-1.5 text-gray-400";
    const sectionTitleCls = "col-span-full font-bold text-yellow-500 text-sm tracking-wide uppercase border-b border-gray-800 pb-2 mt-4 mb-2";
    const readOnlyCls = "w-full bg-[#1a1a1a] border border-gray-800 text-gray-500 px-4 py-2.5 text-sm cursor-not-allowed rounded-md";
    
   
    const [formState, setFormState] = useState({
        operacion: "generar_comprobante",
        tipo_de_comprobante: 1,
        serie: "",
        numero: 1,
        sunat_transaction: 1,
        cliente_tipo_de_documento: 6,
        cliente_numero_de_documento: "",
        cliente_denominacion: "",
        cliente_direccion: "",
        cliente_email: "",

        cliente_email_1: "",

        fecha_de_emision: "",
        moneda: 1,

        tipo_de_cambio: "",

        porcentaje_de_igv: 18.00,

        descuento_global: "",
        total_descuento: "",

        total_anticipo: "",

        total_gravada: 0,

        total_inafecta: "",
        
        total_igv: 0,
        total: 0,
       
        detraccion: false,

        observaciones: "", // Campo que el usuario podrá editar
       
        tipo_de_nota_de_credito: "",
        tipo_de_nota_de_debito: "",


        enviar_automaticamente_a_la_sunat: true,
        enviar_automaticamente_al_cliente: false,

        codigo_unico:"",
        condiciones_de_pago: "",
        medio_de_pago: "",
        
        formato_de_pdf: "",
       
        items: [],
        guias: [],
        venta_al_credito: []
    });

    
    useEffect(() => {
        if (data) {
            setFormState(prev => ({
                ...prev,
                operacion: data.operacion || prev.operacion,
                tipo_de_comprobante: data.tipo_de_comprobante || prev.tipo_de_comprobante,
                serie: data.serie || prev.serie,
                numero: data.numero || prev.numero,
                sunat_transaction: data.sunat_transaction,
                cliente_tipo_de_documento: data.cliente_tipo_de_documento,
                cliente_numero_de_documento: data.cliente_numero_de_documento,
                cliente_denominacion: data.cliente_denominacion,
                cliente_direccion: data.cliente_direccion,
                cliente_email: data.cliente_email,
                cliente_email_1: prev.cliente_email_1,
                fecha_de_emision: data.fecha_de_emision,
                moneda: data.moneda,
                porcentaje_de_igv: data.porcentaje_de_igv,
                total_gravada: data.total_gravada,
                total_igv: data.total_igv,
                total: data.total,
                detraccion: data.detraccion,
                enviar_automaticamente_a_la_sunat: data.enviar_automaticamente_a_la_sunat,
                enviar_automaticamente_al_cliente: prev.enviar_automaticamente_al_cliente,
                // Adaptamos los items al formato complejo que exige el POST
                items: (data.items || []).map(item => ({
                    unidad_de_medida: item.unidad_de_medida,
                    codigo: item.codigo,
                    descripcion: item.descripcion,
                    cantidad: item.cantidad,
                    valor_unitario: item.valor_unitario,
                    precio_unitario: item.precio_unitario,
                    subtotal: item.subtotal,
                    tipo_de_igv: item.tipo_de_igv,
                    igv: item.igv,
                    total: item.total,
                    anticipo_regularizacion: item.anticipo_regularizacion || false,
                })),
                guias: prev.guias || [], 
                venta_al_credito: prev.venta_al_credito || []
            
            }));
        }
    }, [data]);

    
    const agregarVentaCredito = () => {
        setFormState(prev => ({
            ...prev,
            
            venta_al_credito: [
                ...prev.venta_al_credito, 
                { cuota: prev.venta_al_credito.length + 1, fecha_de_pago: "", monto: 0 }
            ]
        }));
    };

    const actualizarVentaCredito = (index, field, value) => {
        const nuevasCuotas = [...formState.venta_al_credito];
        nuevasCuotas[index][field] = value;
        setFormState({...formState, venta_al_credito: nuevasCuotas});
    };

   
    const agregarGuia = () => {
        setFormState(prev => ({
            ...prev,
            guias: [...prev.guias, { external_id: "", date_of_issue: "", number: "" }]
        }));
    };

    const handleSubmit = (e) => {
    e.preventDefault();
        
        console.log(formState)

        const isConfirmed = window.confirm("¿Estás seguro de emitir este comprobante a SUNAT?");
        if (!isConfirmed) {
        return;
        }
       
        const payload = {
            ...formState,
            venta_al_credito: formState.venta_al_credito.map(c => ({
            ...c,
            fecha_de_pago: c.fecha_de_pago ? formatDate(c.fecha_de_pago) : c.fecha_de_pago
        }))
        };
        console.log(payload)
        onEnviar(payload);
    };
    const formatDate = (dateStr) => {
        const [y, m, d] = dateStr.split('-');
        return `${d}-${m}-${y}`;
    };
    
    const [isCredito,setIsCredito]=useState("1");
    
    return (
        <form onSubmit={handleSubmit} className="bg-[#121212] p-6 rounded-lg shadow-xl border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-2">Detalles del Comprobante</h3>
            
           
            <h4 className={sectionTitleCls}>1. Datos del Cliente y Comprobante (Fijos)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelCls}>Cliente</label>
                    <input type="text" className={readOnlyCls} value={formState.cliente_denominacion || ""} readOnly />
                </div>
                <div>
                    <label className={labelCls}>N° Documento</label>
                    <input type="text" className={readOnlyCls} value={formState.cliente_numero_de_documento || ""} readOnly />
                </div>
                <div>
                    <label className={labelCls}>TIPO DE COMPROBANTE</label>
                    <input type="text" className={readOnlyCls} value={formState.tipo_de_comprobante || ""} readOnly />
                </div>
                <div>
                    <label className={labelCls}>EMAIL</label>
                    <input type="text" className={readOnlyCls} value={formState.cliente_email|| ""} readOnly />
                </div>
                <div>
                    <label className={labelCls}>MONTO TOTAL</label>
                    <input type="text" className={readOnlyCls} value={formState.total || ""} readOnly />
                </div>                                                
            </div>

           
            <h4 className={sectionTitleCls}>2. Información Adicional y Pagos</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelCls}>Correo Adicional</label>
                    <input 
                        type="text" 
                        className={inputCls} 
                        value={formState.cliente_email_1} 
                        onChange={(e) => setFormState({...formState, cliente_email_1: e.target.value})} 
                    />
                </div>

                <div>
                    <label className={labelCls}>Enviar al Cliente la factura Automaticamente</label>
                    <input 
                        type="checkbox" 
                        className="ml-2"
                        checked={formState.enviar_automaticamente_al_cliente} 
                        onChange={(e) => setFormState({...formState, enviar_automaticamente_al_cliente: e.target.checked})} 
                    />
                </div>

                <div>
                    <label className={labelCls}>Total de Pago Anticipado</label>
                    <input 
                        type="number" 
                        className={inputCls} 
                        value={formState.total_anticipo} 
                        onChange={(e) => setFormState({...formState, total_anticipo: e.target.value})} 
                    />
                </div>

                <div>
                    <label className={labelCls}>Condiciones de Pago</label>
                    <input 
                        type="text" 
                        className={inputCls} 
                        placeholder="Ej: 30 días, o 6 cuotas mensuales" 
                        value={formState.condiciones_de_pago} 
                        onChange={(e) => setFormState({...formState, condiciones_de_pago: e.target.value})}
                    />
                </div>
                <select className={inputCls} 
                    value={isCredito} 
                    onChange={(e) => setIsCredito(e.target.value)}>
                    <option value="1">Al Contado</option>
                    <option value="2">Al Crédito</option>
                </select>
                <input type="text" className={inputCls} placeholder="Observaciones" value={formState.observaciones} onChange={(e) => setFormState({...formState, observaciones: e.target.value})} />
            </div>

            
            {isCredito === "2" && (
                <>
                    <h4 className={sectionTitleCls}>3. Ventas al Crédito (Cuotas)</h4>
                    {formState.venta_al_credito.map((cuota, i) => (
                        <div key={i} className="flex gap-2 mb-2">
                            <input type="date" className={inputCls} onChange={(e) => actualizarVentaCredito(i, 'fecha_de_pago', e.target.value)} />
                            <input type="number" className={inputCls} placeholder="Monto" onChange={(e) => actualizarVentaCredito(i, 'monto', e.target.value)} />
                        </div>
                    ))}
                    <button type="button" onClick={agregarVentaCredito} className="text-yellow-500 text-xs">+ Agregar cuota</button>
                </>
            )}

            <button type="submit" className="w-full mt-8 bg-yellow-500 py-3 font-bold rounded">Emitir a SUNAT</button>
        </form>
    );
}