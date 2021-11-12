import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Title from '../../components/common/Title';

const VerTarea = () => {

    let { id } = useParams();
    
    const { nombre, descripcion, estaFinalizada } = useSelector(
        (state) => state.tarea.listaTareas.filter(t => t._id === id)[0]
    );

    return (
        <div>
            <Title>Ver Tarea</Title>

            Nombre:
            <p>{nombre}</p>

            Descripcion:
            <p>{descripcion}</p>

            Finalizada?
            <p>{estaFinalizada ? "si" : "no"}</p>

            <Link to="/tareas">Volver</Link>
        </div>
    )
}

export default VerTarea
