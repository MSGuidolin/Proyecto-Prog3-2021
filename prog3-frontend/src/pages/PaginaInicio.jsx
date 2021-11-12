import React, { useState, useEffect } from 'react'

const Materia = () => {

    useEffect(()=> {
        console.info("MOUNT: Mostrando materia...");

        return () => {
            console.info("UNMOUNT: Ocultando materia...");
        }
    }, []);

    return <h2>Programacion 2</h2>;
}

const PaginaInicio = () => {

    const [visible, setVisible] = useState(false);

    useEffect(()=> {
        console.info("MOUNT: Iniciando pagina de inicio...");

        return () => {
            console.info("UNMOUNT: Abandonando inicio...");
        }
    }, []);

    return (
        <div>
            <h1>Bienvenidos a CESIT</h1>
            <button onClick={()=> setVisible(!visible)}>Ver / Ocultar</button>
            {visible && <Materia />}
        </div>
    )
}

export default PaginaInicio
