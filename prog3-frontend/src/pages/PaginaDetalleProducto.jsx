import React from 'react'
import Boton from '../components/Boton';

const PaginaDetalleProducto = (params) => {
    console.info("-----", params)
    const {match: { params: { idProducto }}} = params;

    const manejadorIrProd = () => {
        params.history.push("/productos");
    }

    return (
        <div>
            <h1>Detalle producto</h1>
            <h2>Producto seleccionado: {idProducto}</h2>
            <Boton
                titulo="Ir a Productos"
                manejador={manejadorIrProd}
            />
            <a href="/productos">Link Volver</a>
        </div>
    )
}

export default PaginaDetalleProducto
