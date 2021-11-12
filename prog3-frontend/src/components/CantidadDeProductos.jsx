import React from 'react'
import { useSelector } from 'react-redux'

const CantidadDeProductos = () => {

    const cantindad = useSelector((state) => state.producto.cantidadProductos)

    return (
        <p>
            Cantidad: {cantindad}
        </p>
    )
}

export default CantidadDeProductos
