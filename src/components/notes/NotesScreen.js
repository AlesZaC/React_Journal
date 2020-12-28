import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActiveNote, StartDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppbar } from './NotesAppBar'

export const NotesScreen = () => {
    const dispatch = useDispatch();

    const { active: note } = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(note)
    const { body, title, id } = formValues;
    //console.log('note', note);
    //console.log('form', formValues);

    const activeId = useRef(note.id);
    // console.log(activeId);


    useEffect(() => {
        if (note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id



        }
    }, [note, reset])

    useEffect(() => {

        dispatch(ActiveNote(formValues.id, { ...formValues }))

    }, [formValues, dispatch])



    const handleDelete = () => {


        dispatch(StartDeleting(id))

    }


    return (
        <div className="notes__main-content">
            <NotesAppbar />

            {
                (note.url)
                && (

                    <div className="notes__image">
                        <img

                            src={note.url}
                            alt="imagen"
                        />
                    </div>

                )

            }



            <div className="notes__content">

                <input
                    maxlength="50"
                    name="title"
                    value={title}
                    type="text"
                    placeholder="Write an awesome Title"
                    className="notes__title-input"
                    autoComplete="off"
                    onChange={handleInputChange}

                />

                <textarea
                    name="body"
                    value={body}
                    placeholder="What happend today?"
                    className="notes__textarea"
                    onChange={handleInputChange}
                />



            </div>



            <button onClick={handleDelete} className="btn btn-danger">
                Delete
           </button>




        </div>
    )
}
