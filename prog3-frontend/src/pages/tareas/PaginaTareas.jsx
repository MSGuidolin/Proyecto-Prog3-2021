import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import {Table, TableRow, TableCell, TableHead, TableBody} from '@mui/material';
import {
  CambiarEstadoTarea,
  EliminarTarea,
  GetTareas,
} from '../../actions/tareasActions';
import Title from '../../components/common/Title';
import { Button, IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';

const PaginaTareas = () => {
  const dispatch = useDispatch();
  const { cargando, listaTareas } = useSelector((state) => state.tarea);

  useEffect(() => {
    dispatch(GetTareas());
  }, [dispatch]);

  const eliminarTarea = (id) => {
    if (window.confirm('Desea eliminar la tarea?')) {
      dispatch(EliminarTarea(id));
    }
  };

  return (
    <div>
      <Title>Tareas</Title>

      <Button variant='outlined' component={RouterLink} to='/tareas/nueva'>
        Nueva Tarea
      </Button>

      {cargando && <div>Cargando....</div>}


      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripcion</TableCell>
            <TableCell>Finalizada?</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listaTareas.map((tarea) => (
            <TableRow key={tarea._id}>
              <TableCell>{tarea.nombre}</TableCell>
              <TableCell>{tarea.descripcion}</TableCell>
              <TableCell>
                <IconButton
                    component={MuiLink}
                    onClick={() => dispatch(CambiarEstadoTarea(tarea._id))}
                    aria-label='fingerprint'
                    color='info'
                  >
                    {tarea.estaFinalizada ? <DoneOutlinedIcon /> : <VisibilityOutlinedIcon />}
                </IconButton>
              </TableCell>
              <TableCell>

              <IconButton
                  component={RouterLink}
                  to={`/tareas/${tarea._id}/ver`}
                  aria-label='fingerprint'
                  color='secondary'
                >
                  <VisibilityOutlinedIcon />
                </IconButton>
                <IconButton
                  component={RouterLink}
                  to={`/tareas/${tarea._id}/editar`}
                  aria-label='fingerprint'
                  color='success'
                >
                  <EditOutlinedIcon />
                </IconButton>
                <IconButton
                  component={MuiLink}
                  aria-label='fingerprint'
                  color='error'
                  onClick={() => eliminarTarea(tarea._id)}
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

export default PaginaTareas;
