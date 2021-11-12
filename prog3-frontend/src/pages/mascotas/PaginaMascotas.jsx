import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import {Table, TableRow, TableCell, TableHead, TableBody} from '@mui/material';
import {
  RegistrarMascota,
  ActualizarMascota,
  eliminarMascota,
  GetMascotas,
  GetMascotaById,
} from '../../actions/mascotasActions';
import Title from '../../components/common/Title';
import { Button, IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
//import ReactSelect from "react-select";


const PaginaMascotas = () => {
  const dispatch = useDispatch();
  const { cargando, listaMascotas } = useSelector((state) => state.mascota);

  useEffect(() => {
    dispatch(GetMascotas());
  }, [dispatch]);

  const EliminarMascota = (id) => {
    if (window.confirm('¿Desea eliminar la mascota?')) {
      dispatch(eliminarMascota(id));
    }
  };

  return (
    <div>
      <Title>Mascotas</Title>

      <Button variant='outlined' component={RouterLink} to='/mascotas/nueva'>
        Nueva Mascota
      </Button>

      {cargando && <div>Cargando....</div>}


      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Especie</TableCell>
            <TableCell>Raza</TableCell>
            <TableCell>Descripcion</TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
          {listaMascotas.map((mascota) => (
            <TableRow key={mascota._id}>
              <TableCell>{mascota.nombre}</TableCell>
              <TableCell>{mascota.especie}</TableCell>
              <TableCell>{mascota.raza}</TableCell>
              <TableCell>{mascota.descripcion}</TableCell>
              <TableCell>
                <IconButton
                    component={RouterLink}
                    to={`/mascotas/${mascota._id}/ver`}
                    aria-label='fingerprint'
                    color='secondary'
                  >
                    <VisibilityOutlinedIcon />
                  </IconButton>
                  <IconButton
                    component={RouterLink}
                    to={`/mascotas/${mascota._id}/editar`}
                    aria-label='fingerprint'
                    color='success'
                  >
                    <EditOutlinedIcon />
                  </IconButton>
                  <IconButton
                    component={MuiLink}
                    aria-label='fingerprint'
                    color='error'
                    onClick={() => EliminarMascota(mascota._id)}
                  >
                    <DeleteSweepOutlinedIcon />
                  </IconButton>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      
    </div>
  );
};

export default PaginaMascotas;
