import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import {
  CrearTarea,
  GetTareaById,
  ActualizarTarea,
} from '../../actions/tareasActions';
import Title from '../../components/common/Title';
import { TextField, Switch, FormControlLabel, Button, Grid, Alert } from '@mui/material';
import { useHistory, useParams } from 'react-router';

const FormTarea = () => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  let { id } = useParams();
  const { nombre, descripcion, estaFinalizada } = useSelector((state) => {
    const tarea = state.tarea.listaTareas.filter((t) => t._id === id)[0];
    return tarea || {};
  });
  let history = useHistory();

  useEffect(() => {
    if (id) {
      dispatch(GetTareaById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    reset({
      nombre,
      descripcion,
      estaFinalizada,
    });
  }, [reset, nombre, descripcion, estaFinalizada]);

  const onSubmit = (datos) => {
    try {
      if (id) {
        dispatch(ActualizarTarea({ id, datos }));
      } else {
        dispatch(CrearTarea(datos));
      }

      history.push('/tareas');
    } catch (error) {
      // manejo de error
    }
  };

  return (
    <>
      
      <Title>{id ? 'Editando' : 'Nueva'} Tareas</Title>

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
          {errors.nombre && <Alert severity="error">Este campo es requerido!</Alert>}
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

          <Controller
            name='estaFinalizada'
            defaultValue={false}
            render={({ field: {onChange, value} }) => (
              <FormControlLabel
                control={<Switch checked={value} onChange={onChange} />}
                label="Está finalizada?"
              />
            )}
            control={control}
          /> 
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' type='submit'>Guardar</Button>
            &nbsp;
            <Button variant='outlined' component={RouterLink} to='/tareas'>Cancelar</Button>
          </Grid>

        </Grid>  
      </form>
    </>
  );
};

export default FormTarea;
