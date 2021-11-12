import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import CantidadDeProductos from '../components/CantidadDeProductos';

const PaginaProductos = () => {

  const [cargando, setCargando] = useState(false);
  const [productos, setProductos] = useState([]);

  const obtenerProductos = async () => {
    setCargando(true);
    const res = await axios.get('http://localhost:4000/productos');
    setProductos(res.data);
    setCargando(false);
  }

  useEffect(()=> {
    console.info("MOUNT: Iniciando pagina de productos...");

    obtenerProductos();
    
}, []);

const renderProductos = () => {
  return productos.map(prod => {
    return (
      <tr key={prod.id}>
          <td>{prod.id}</td>
          <td>{prod.nombre}</td>
          <td>{prod.talle}</td>
          <td>$ {prod.precio}</td>
          <td><Link to={`/productos/${prod.id}`}>Editar</Link></td>
      </tr>
    )
  })
}

  return (
    <>
      <h2>Listando productos</h2>

      <CantidadDeProductos />

      {cargando && <b>Cargando...</b>}
      {!cargando && <table>
          <thead>
              <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Talle</th>
                  <th>Precio</th>
                  <th>Acciones</th>
              </tr>
          </thead>
          <tbody>
              {renderProductos()}
          </tbody>
      </table>}
    </>
  );
};

export default PaginaProductos;
