import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../store/slices/counterSlice';
import Boton from '../components/Boton';

const PaginaSumadorRedux = () => {

    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch();

    return (
        <>
            <h2>Sumador Redux</h2>
            <div>Suma: {count}</div>
            <Boton 
                titulo="+" 
                manejador={()=> dispatch(increment())} 
                tipo="principal"
            />
            <Boton 
                titulo="-" 
                manejador={()=> dispatch(decrement())}
            />
            <Boton 
                titulo="+5" 
                manejador={()=> dispatch(incrementByAmount(5))} 
                tipo="principal"
            />
        </>
    )
}

export default PaginaSumadorRedux
