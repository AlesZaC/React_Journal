import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux'
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { removeError, setError } from '../../actions/ui';
import { startWithNameEmailPassword } from '../../actions/auth';


export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui)
    // console.log(msgError);




    const [formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const { name, email, password, password2 } = formValues;


    const handleRegister = (e) => {

        //e.preventDefault();
        if (isFormValid()) {

            dispatch(startWithNameEmailPassword(email, password, name));
        }



    }


    const isFormValid = () => {

        if (name.trim().length === 0) {
            dispatch(setError('name is required'));
            //console.log("name is required")
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError('email incorrecto'));
            //console.log("email incorrecto")
            return false;
        } else if (password !== password2 || password.trim().length < 5) {
            dispatch(setError('contra incorrecta'));
            //console.log("error password")
            return false;
        }


        dispatch(removeError());

        return true;

    }


    return (<>
        <h3 className="auth__title" > Register </h3> <form onSubmit={handleRegister} >

            {
                msgError &&

                < div className="auth__alert-error" > {msgError} </div>

            }

            < input type="text"
                placeholder="Name"
                name="name"
                value={name}
                className="auth__input"
                onChange={handleInputChange}
                autoComplete="off" />

            < input type="text"
                placeholder="Email"
                name="email"
                value={email}
                className="auth__input"
                onChange={handleInputChange}
                autoComplete="off" />

            < input type="password"
                placeholder="Password"
                name="password"
                value={password}
                className="auth__input"
                onChange={handleInputChange}
                autoComplete="off" />


            <input type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                className="auth__input"
                onChange={handleInputChange}
                autoComplete="off" />

            <button className="btn btn-primary btn-block mb-1"
                type="submit" >Register </button>


            <div className="auth__Opcionts" >
                <p className="mr-5 grey" > Already registered ? </p>
                <Link className="link" to="/auth/login" > sign in </Link> </div>




        </form>

    </>
    )
}