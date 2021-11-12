import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Title from '../../components/common/Title';

const VerMascota = () => {

    let { id } = useParams();
    
    const { nombre, especie, raza, descripcion } = useSelector(
        (state) => state.mascota.listaMascotas.filter(t => t._id === id)[0]
    );

    return (
        <div>
            <Title>Ver Mascota</Title>

            Nombre:
            <p>{nombre}</p>

            Especie:
            <p>{especie}</p>

            Raza:
            <p>{raza}</p>

            Descripcion:
            <p>{descripcion}</p>
            
            <Link to="/mascotas">Volver</Link>
        </div>
    )
}

export default VerMascota
