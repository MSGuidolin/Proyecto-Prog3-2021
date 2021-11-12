import React, { useState } from 'react'
import Boton from '../components/Boton';

const PaginaSumador = () => {

    const [sum, setSum] = useState(44);

    const manejadorSuma = (num) => {
        setSum(sum + num);
    }

    return (
        <>
            <h2>Sumador</h2>
            <div>Suma: {sum}</div>
            <Boton 
                titulo="+" 
                manejador={()=>manejadorSuma(5)} 
                tipo="principal"
            />
            <Boton 
                titulo="-" 
                manejador={()=>manejadorSuma(-5)}
            />
        </>
    )
}

export default PaginaSumador
