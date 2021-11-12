import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import {
  RegistrarMascota,
  ActualizarMascota,
  GetMascotas,
  GetMascotaById,
} from '../../actions/mascotasActions';
import Title from '../../components/common/Title';
import { TextField, Switch, FormControlLabel, Button, Grid, Alert } from '@mui/material';
import { useHistory, useParams } from 'react-router';

const FormMascota = () => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  let { id } = useParams();
  const { nombre, especie, raza, descripcion } = useSelector((state) => {
    const mascota = state.mascota.listaMascotas.filter((t) => t._id === id)[0];
    return mascota || {};
  });
  let history = useHistory();

  useEffect(() => {
    if (id) {
      dispatch(GetMascotaById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    reset({
      nombre,
      especie,
      raza,
      descripcion,
    });
  }, [reset,  nombre, especie, raza, descripcion]);
  
  const onSubmit = (datos) => {
    try {
      if (id) {
        dispatch(ActualizarMascota({ id, datos }));
      } else {
        dispatch(RegistrarMascota(datos));
      }

      history.push('/mascotas');
    } catch (error) {
      // manejo de error
    }
  };

  return (
    <>
      
      <Title>{id ? 'Editando' : 'Nueva'} Mascotas</Title>

      <form onSubmit={handleSubmit(onSubmit)}>

      <Grid container spacing={2}>

        <Grid item xs={12}>
          <Controller
            render={({ field }) => <TextField label="Nombre" {...field} />}
            name="nombre"
            control={control}
            defaultValue=""
            className="materialUIInput"
            rules={{ required: true }}
          />
          {errors.nombre && <Alert severity="error">¡Este campo es requerido!</Alert>}
        </Grid>

        <Grid item xs={12}>
          <Controller
            render={({ field }) => <TextField label="Especie" {...field} />}
            name="especie"
            control={control}
            defaultValue=""
            className="materialUIInput"
          />
          {errors.especie && <Alert severity="error">¡Este campo es requerido!</Alert>}
        </Grid>

        <Grid item xs={12}>
          <Controller
            render={({ field }) => <TextField label="Raza" {...field} />}
            name="raza"
            control={control}
            defaultValue=""
            className="materialUIInput"
          />
        </Grid>

        <Grid item xs={12}>

          <Controller
            render={({ field }) => <TextField multiline rows={4} label="Descripcion" {...field} />}
            name="descripcion"
            control={control}
            defaultValue=""
            className="materialUIInput"
          />
        </Grid>

          <Grid item xs={12}>
            <Button variant='contained' type='submit'>Guardar</Button>
            &nbsp;
            <Button variant='outlined' component={RouterLink} to='/mascotas'>Cancelar</Button>
          </Grid>

        </Grid>  
      </form>
    </>
  );
};

export default FormMascota;
