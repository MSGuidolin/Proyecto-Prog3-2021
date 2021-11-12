import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CantidadDeProductos from '../components/CantidadDeProductos';
import { useSelector, useDispatch } from 'react-redux';
import { GetProductos } from '../actions/productosActions';

const PaginaProductosRedux = () => {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.producto.listaProductos);
  const cargando = useSelector((state) => state.producto.cargando);

  useEffect(() => {
    console.info('MOUNT: Iniciando pagina de productos...');

    dispatch(GetProductos());
  }, [dispatch]);

  const renderProductos = () => {
    return productos.map((prod) => {
      return (
        <tr key={prod.id}>
          <td>{prod.id}</td>
          <td>{prod.nombre}</td>
          <td>{prod.talle}</td>
          <td>$ {prod.precio}</td>
          <td>
            <Link to={`/productos/${prod.id}`}>Editar</Link>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <h2>Listando productos Redux</h2>

      <CantidadDeProductos />

      <p>
        <small>Cantidad: {productos.length}</small>
      </p>

      {cargando && <b>Cargando...</b>}
      {!cargando && (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Talle</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>{renderProductos()}</tbody>
        </table>
      )}
    </>
  );
};

export default PaginaProductosRedux;
