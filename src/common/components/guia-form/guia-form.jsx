import { useEffect, useState } from "react";
import { FormInput } from "../form-input/form-input";

export function GuiaForm({data, onEnviar, isSubmitting}){
    
    const inputCls = "w-full bg-card border border-border text-foreground placeholder:text-muted-foreground px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";
    const labelCls = "block text-xs font-semibold mb-1.5 text-gray-400";
    const sectionTitleCls = "col-span-full font-bold text-yellow-500 text-sm tracking-wide uppercase border-b border-gray-800 pb-2 mt-4 mb-2";
    const readOnlyCls = "w-full bg-[#1a1a1a] border border-gray-800 text-gray-500 px-4 py-2.5 text-sm cursor-not-allowed rounded-md";
    
    const [formState, setFormState] = useState({
        operacion:"generar_guia",
        tipo_de_comprobante:"7",
        serie:"",
        numero:"",
        cliente_tipo_de_documento: "",
        cliente_numero_de_documento:"",
        cliente_denominacion:"",
        cliente_direccion:"",
        cliente_email:"",
        fecha_de_emision:"",

        //a llenar
        observaciones:"",
        motivo_de_traslado:"",
        peso_bruto_total:"",
        peso_bruto_unidad_de_medida:"",
        numero_de_bultos:"",
        tipo_de_transporte:"",
        fecha_de_inicio_de_traslado:"",
        fecha_de_entrega_al_transportista:"",
        transportista_documento_tipo:"",
        transportista_documento_numero:"",
        transportista_denominacion:"",
        transportista_placa_numero:"",
        conductor_documento_tipo:"",
        conductor_documento_numero:"",
        conductor_denominacion:"",
        conductor_nombre:"",
        conductor_apellidos:"",
        conductor_numero_licencia:"",
        punto_de_partida_ubigeo:"",
        punto_de_partida_direccion:"",

        punto_de_partida_codigo_establecimiento_sunat:"0000",
        
        //a llenar
        punto_de_llegada_ubigeo:"",
        punto_de_llegada_direccion:"",

        punto_de_llegada_codigo_establecimiento_sunat:"0000",

        enviar_automaticamente_al_cliente:"false",

        //a llenar o modificar
        formato_de_pdf:"A4",

        items:[],
        documento_relacionado:[],

    });

    useEffect(() => {
        if (data) {
            setFormState(prev => ({
                ...prev,

                operacion: data.operacion,
                tipo_de_comprobante: data.tipo_de_comprobante,
                serie: data.serie,
                numero: data. numero,
                cliente_tipo_de_documento: data.cliente_tipo_de_documento,
                cliente_numero_de_documento: data.cliente_numero_de_documento,
                cliente_denominacion: data. cliente_denominacion,
                cliente_direccion: data.cliente_direccion,
                cliente_email: data.cliente_email,
                fecha_de_emision: data.fecha_de_emision,

                //a llenar
                observaciones:prev.observaciones,
                motivo_de_traslado:prev.motivo_de_traslado,
                peso_bruto_total: prev.peso_bruto_total,
                peso_bruto_unidad_de_medida:prev.peso_bruto_unidad_de_medida,
                numero_de_bultos: prev.numero_de_bultos,
                tipo_de_transporte:prev.tipo_de_transporte,
                fecha_de_inicio_de_traslado: prev.fecha_de_inicio_de_traslado,

                //si tipo de trans es 1 (publico)
                fecha_de_entrega_al_transportista: prev.fecha_de_entrega_al_transportista,
                transportista_documento_tipo: prev.transportista_documento_tipo,
                transportista_documento_numero: prev.transportista_documento_numero,
                transportista_denominacion: prev.transportista_denominacion,

                
                transportista_placa_numero: prev.transportista_placa_numero,

                //obligatorio si es de tipo de transporte 2
                conductor_documento_tipo: prev.conductor_documento_tipo,
                conductor_documento_numero: prev.conductor_documento_numero,
                conductor_denominacion: prev.conductor_denominacion,
                conductor_nombre: prev.conductor_nombre,
                conductor_apellidos: prev.conductor_apellidos,
                conductor_numero_licencia: prev.conductor_numero_licencia,
                punto_de_partida_ubigeo: prev.punto_de_partida_ubigeo,
                punto_de_partida_direccion: prev.punto_de_partida_direccion,

                punto_de_partida_codigo_establecimiento_sunat: data.punto_de_partida_codigo_establecimiento_sunat,
                
                //a llenar
                punto_de_llegada_ubigeo: prev.punto_de_llegada_ubigeo,
                punto_de_llegada_direccion: prev.punto_de_llegada_direccion,

                punto_de_llegada_codigo_establecimiento_sunat: data.punto_de_llegada_codigo_establecimiento_sunat,

                enviar_automaticamente_al_cliente: data.enviar_automaticamente_al_cliente || prev.enviar_automaticamente_al_cliente ,

                //a llenar o modificar
                formato_de_pdf: prev.formato_de_pdf || "A4",

                items: data.items,
                documento_relacionado: data.documento_relacionado,
            
            }));
        }
    }, [data]);    


    const formatDate = (dateStr) => {
        const [y, m, d] = dateStr.split('-');
        return `${d}-${m}-${y}`;
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const payload = {
        ...formState,
        tipo_de_transporte: tipoTransporte, 
    }

        
        console.log(payload)

        const isConfirmed = window.confirm("¿Estás seguro de emitir la guia de remision?");
        
        if (!isConfirmed) {
        return;
        }
        
        onEnviar(payload);
    };

    const [tipoTransporte,setTipoTransporte]=useState("01");


    return (
        <form onSubmit={handleSubmit} className="bg-[#121212] p-6 rounded-lg shadow-xl border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-2">Detalles de la Guia de Remison</h3>
            
            {/* --- SECCIÓN SOLO LECTURA (PREVIEW) --- */}
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
                    <label className={labelCls}>Direccion del Cliente</label>
                    <input type="text" className={readOnlyCls} value={formState.cliente_direccion || ""} readOnly />
                </div>
                <div>
                    <label className={labelCls}>EMAIL</label>
                    <input type="text" className={readOnlyCls} value={formState.cliente_email|| ""} readOnly />
                </div>
                <div>
                    <label className={labelCls}>COMPROBANTE RELACIONADO</label>
                    <input 
                        type="text" 
                        className={readOnlyCls} 
                        value={(formState.documento_relacionado || [])
                            .map(doc => `${doc.serie} - ${doc.numero}`)
                            .join(', ') || "No hay documento relacionados"} 
                        readOnly 
                    />
                </div>

                <div>
                    <label className={labelCls}>DETALLE DE ITEMS</label>
                    <div className="bg-[#1a1a1a] border border-gray-800 rounded-md overflow-hidden">
                        {/* Encabezado de la "tabla" */}
                        <div className="grid grid-cols-3 gap-2 px-4 py-2 bg-[#252525] text-[10px] text-gray-400 font-bold uppercase">
                            <span>Cant.</span>
                            <span className="col-span-2">Descripción</span>
                        </div>
                        
                        {/* Filas de items */}
                        {formState.items && formState.items.map((item, index) => (
                            <div key={index} className="grid grid-cols-3 gap-2 px-4 py-2 border-t border-gray-800 text-xs text-gray-300">
                                <span>{item.cantidad}</span>
                                <span className="col-span-2 truncate">{item.descripcion}</span>
                            </div>
                        ))}
                        
                        {/* Si no hay items */}
                        {(!formState.items || formState.items.length === 0) && (
                            <p className="px-4 py-3 text-xs text-gray-600 italic">No hay items registrados.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* --- SECCIÓN EDITABLE (DATOS NUEVOS) --- */}
            <h4 className={sectionTitleCls}>2. Información Adicional Necesaria</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 
                <FormInput
                    label="Observaciones" 
                    value={formState.observaciones}
                    onChange={(e) => setFormState({...formState, observaciones: e.target.value})}
                    placeholder="Ej: ....." 
                    className={inputCls}
                />
                <div>
                    <label className={labelCls}>Enviar al Cliente la factura Automaticamente</label>
                    <input 
                        type="checkbox" 
                        className="ml-2"
                        checked={formState.enviar_automaticamente_al_cliente} 
                        onChange={(e) => setFormState({...formState, enviar_automaticamente_al_cliente: e.target.checked})} 
                    />
                </div>

                <FormInput
                    label="MOTIVO DEL TRASLADO" 
                    value={formState.motivo_de_traslado}
                    onChange={(e) => setFormState({...formState, motivo_de_traslado: e.target.value})}
                    placeholder="Escribir 01" 
                    className={inputCls}
                />

                <FormInput
                    label="Peso bruto total" 
                    value={formState.peso_bruto_total}
                    onChange={(e) => setFormState({...formState, peso_bruto_total: e.target.value})}
                    placeholder="Ej: 30 " 
                    className={inputCls}
                />
                <FormInput
                    label="Unidad de Medida del Peso Bruto" 
                    value={formState.peso_bruto_unidad_de_medida}
                    onChange={(e) => setFormState({...formState, peso_bruto_unidad_de_medida: e.target.value})}
                    placeholder="Ej: KGM " 
                    className={inputCls}
                />        
                <FormInput
                    label="Numero de bultos" 
                    value={formState.numero_de_bultos}
                    onChange={(e) => setFormState({...formState, numero_de_bultos: e.target.value})}
                    placeholder="Ej: 2 "  
                    className={inputCls}
                />
                <div>
                    <label className={labelCls}>Tipo de Tranporte</label>     
                    <select className={inputCls} 
                        value={tipoTransporte} 
                        onChange={(e) => setTipoTransporte(e.target.value)}>
                        <option value="01">PUBLICO</option>
                        <option value="02">PRIVADO</option>
                    </select>
                </div>
                <FormInput
                    label="Fecha de inicio del translado" 
                    value={formState.fecha_de_inicio_de_traslado}
                    onChange={(e) => setFormState({...formState, fecha_de_inicio_de_traslado: e.target.value})}
                    placeholder="dd-mm-aaaa 02-06-2025"
                    className={inputCls}
                />
                <FormInput
                        label="PLACA DEL VEHICULO" 
                        value={formState.transportista_placa_numero}
                        onChange={(e) => setFormState({...formState, transportista_placa_numero: e.target.value})}
                        placeholder="sin giones ejm: ABC444"
                        className={inputCls}
                />
            </div>

            {/* --- LISTAS DINÁMICAS --- */}
             {tipoTransporte === "01" && (
                <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
                    <FormInput 
                        label="Fecha de entrega al transportista" 
                        value={formState.fecha_de_entrega_al_transportista}
                        onChange={(e) => setFormState({...formState, fecha_de_entrega_al_transportista: e.target.value})}
                        placeholder="Ej dd-mm-aaaa 02-06-2026 " 
                        className={inputCls}
                    />
                    <FormInput 
                        label="Tipo de Documento de la Empresa de Transporte" 
                        value={formState.transportista_documento_tipo}
                        onChange={(e) => setFormState({...formState, transportista_documento_tipo: e.target.value})}
                        className={inputCls}
                    />

                    <FormInput
                        label="RUC de la Empresa de transporte" 
                        value={formState.transportista_documento_numero}
                        onChange={(e) => setFormState({...formState, transportista_documento_numero: e.target.value})}
                        className={inputCls}
                    />

                    <FormInput
                        label="Razon social de la empresa de transporte" 
                        value={formState.transportista_denominacion}
                        onChange={(e) => setFormState({...formState, transportista_denominacion: e.target.value})}
                        className={inputCls}
                    />
                </div>     
                </>
            )}
            {tipoTransporte === "02"&&(
                <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <FormInput
                        label="Tipo de documento del conductor" 
                        value={formState.conductor_documento_tipo}
                        onChange={(e) => setFormState({...formState, conductor_documento_tipo: e.target.value})}
                        placeholder=" 1: DNI  4:CARNET DE EXTRANJERIA"
                        className={inputCls}
                    />
                    <FormInput
                        label="Numero de documento del conductor" 
                        value={formState.conductor_documento_numero}
                        onChange={(e) => setFormState({...formState, conductor_documento_numero: e.target.value})}
                        placeholder="ej: 12345678"
                        className={inputCls}
                    />                
                    <FormInput
                        label="Nombres y Apellidos del conductor" 
                        value={formState.conductor_denominacion}
                        onChange={(e) => setFormState({...formState, conductor_denominacion: e.target.value})}
                        placeholder="ej: nombre completo o razon social del conductor"
                        className={inputCls}
                    />
                    <FormInput
                        label="Nombre del conductor" 
                        value={formState.conductor_nombre}
                        onChange={(e) => setFormState({...formState, conductor_nombre: e.target.value})}
                        className={inputCls}
                    />
                    <FormInput
                        label="Apellidos del conductor" 
                        value={formState.conductor_apellidos}
                        onChange={(e) => setFormState({...formState, conductor_apellidos: e.target.value})}
                        className={inputCls}
                    />
                    <FormInput
                        label="Numero de Licencia del Conductor" 
                        value={formState.conductor_numero_licencia}
                        onChange={(e) => setFormState({...formState, conductor_numero_licencia: e.target.value})}
                        className={inputCls}
                    />                                                                              
                </div>
                </>
            )}

            <FormInput
                label="Ubigeo de Punto de Partida" 
                value={formState.punto_de_partida_ubigeo}
                onChange={(e) => setFormState({...formState, punto_de_partida_ubigeo: e.target.value})}
                placeholder="ej: 211101"
                className={inputCls}
            />  
            <FormInput
                label="Direccion Punto de Partida" 
                value={formState.punto_de_partida_direccion}
                onChange={(e) => setFormState({...formState, punto_de_partida_direccion: e.target.value})}
                placeholder="ej: direccion Completa"
                className={inputCls}
            />               

            <FormInput
                label="Ubigeo de Punto de Llegada" 
                value={formState.punto_de_llegada_ubigeo}
                onChange={(e) => setFormState({...formState, punto_de_llegada_ubigeo: e.target.value})}
                placeholder="ej: 211101"
                className={inputCls}
            />   
            <FormInput
                label="Direccion Punto de Llega" 
                value={formState.punto_de_llegada_direccion}
                onChange={(e) => setFormState({...formState, punto_de_llegada_direccion: e.target.value})}
                placeholder="ej: direccion Completa"
                className={inputCls}
            />   
            <FormInput
                label="Formato del PDF" 
                value={formState.formato_de_pdf}
                onChange={(e) => setFormState({...formState,formato_de_pdf: e.target.value})}
                placeholder="Escribir (ej: A4 o A3)"
                className={inputCls}
            />                           
            <button type="submit" className="w-full mt-8 bg-yellow-500 py-3 font-bold rounded">Emitir Guia a Sunat</button>
        </form>
    );
}