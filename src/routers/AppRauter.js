import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
    BrowserRouter as Router,
    Redirect,
    Switch,

} from "react-router-dom";
import firebase from 'firebase/app'
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import { LoadingScreen } from '../components/auth/LoadingScreen';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';



export const AppRauter = () => {


    const [checking, setChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)


    const dispatch = useDispatch();

    useEffect(() => {

        firebase.auth().onAuthStateChanged(async (user) => {

            if (user?.uid) {
                dispatch(login(user.uid, user.displayName))
                setIsLoggedIn(true);

                /*  const notes = await LoadNotes(user.uid);
                 dispatch(setNotes(notes));*/

                dispatch(startLoadingNotes(user.uid));



            } else {
                setIsLoggedIn(false);

            }
            setChecking(false);

        })

    }, [dispatch, setChecking, setIsLoggedIn])




    if (checking) { return (<LoadingScreen />) }


    return (

        <Router>
            <div>
                <Switch>

                    <PublicRoute
                        isAuthenticated={isLoggedIn}
                        path="/auth"
                        component={AuthRouter}
                    />
                    <PrivateRoute
                        exact
                        isAuthenticated={isLoggedIn}
                        path="/"
                        component={JournalScreen}
                    />


                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}

