export function DocumentosSection({ formVenta, handleChange, inputCls, MONO }) {
    return (
        <div className="grid grid-cols-4 gap-3">
            <div>
                <label className="block text-xs font-mono text-muted-foreground uppercase mb-1.5 tracking-wider">
                    Documento
                </label>
                <select 
                    className={inputCls} 
                    value={formVenta.tipoDocumento} 
                    onChange={handleChange("tipoDocumento")}
                >
                    <option value="RUC">RUC</option>
                    <option value="DNI">DNI</option>
                </select>
            </div>

            <div>
                <label className="block text-xs font-mono text-muted-foreground uppercase mb-1.5 tracking-wider">
                    TIPO BOLETA
                </label>
                <select 
                    className={inputCls} 
                    value={formVenta.idBoleta} 
                    onChange={handleChange("idBoleta")}
                >
                    <option value="1">FACTURA</option>
                    <option value="2">BOLETA</option>

                </select>
            </div>

            <div>
                <label className="block text-xs font-mono text-muted-foreground uppercase mb-1.5 tracking-wider">
                    TIPO DE PAGO
                </label>
                <select 
                    className={inputCls} 
                    value={formVenta.idPago} 
                    onChange={handleChange("idPago")}
                >
                    <option value="1">EFECTIVO</option>
                    <option value="2">TARJETA CREDITO</option>
                    <option value="3">TARJETA DEBITO</option>
                    <option value="4">TRANSFERENCIA</option>
                    <option value="5">YAPE/PLIN</option>
                    <option value="6">CREDITO</option>

                </select>
            </div>

            <div>
                <label className="block text-xs font-mono text-muted-foreground uppercase mb-1.5 tracking-wider">
                    Vendedor
                </label>
                <input 
                    type="text" 
                    className={inputCls} 
                    style={MONO} 
                    value={formVenta.idUsuario} 
                    onChange={handleChange("idUsuario")} 
                />
            </div>
        </div>
    );
}