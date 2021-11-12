import React from 'react'

const estilos = {
    botonPrincipal: {
        backgroundColor: "green"
    },
    botonSecundario: {
        backgroundColor: "red"
    }
}

const Boton = ({titulo, manejador, tipo}) => {
    return (
        <>
            <button 
                style={
                    (tipo === "principal") ? 
                        estilos.botonPrincipal 
                        : estilos.botonSecundario}
                onClick={manejador}
            >{titulo}</button>
        </>
    )
}

export default Boton
