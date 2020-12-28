import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { startNewNotes } from '../../actions/notes';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {


    const { name } = useSelector(state => state.auth)
    //console.log(name);

    const dispatch = useDispatch();

    const handleLogout = () => {

        dispatch(startLogout());
    }

    const handleAddNew = () => {

        dispatch(startNewNotes());

    }




    return (
        <aside className="journal_sidebar">

            <div className="journal_sidebar-navbar">
                <h3 className="mt-2">
                    <i className="far fa-moon" />
                    <span className="ml-5">{name}</span>
                </h3>


                <button className="btn  btn-white"
                    onClick={handleLogout}
                >
                    <span>Sign out</span>
                    <i className="fas fa-sign-out-alt"></i>
                </button>

            </div>


            <div className="journal__new-entry " onClick={handleAddNew}>
                <i className="far fa-calendar fa-5x " />
                <p className="mt-5">
                    New entry
             </p>
            </div>

            <JournalEntries />


        </aside>






    )
}

