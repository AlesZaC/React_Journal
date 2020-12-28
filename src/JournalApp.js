import React from 'react'
import { Provider } from 'react-redux'
import { AppRauter } from './routers/AppRauter'
import { store } from './store/store'


export const JournalApp = () => {
    return (
        <Provider store={store} >
            <AppRauter />
        </Provider>
    )
}
