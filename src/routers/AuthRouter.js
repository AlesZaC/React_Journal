import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { LoadingScreen } from '../components/auth/LoadingScreen'
import { LoginScreen } from '../components/auth/LoginScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'

export const AuthRouter = () => {
    return (


        <div className="auth__main">
            <div className="auth__box-container">
                <Switch>
                    <Route path="/auth/login" component={LoginScreen} />
                    <Route path="/auth/register" component={RegisterScreen} />
                    <Route path="/auth/loading" component={LoadingScreen} />
                    <Redirect to="/auth/login" />
                </Switch>

            </div>
        </div>


    )
}
