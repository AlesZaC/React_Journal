import Swal from 'sweetalert2';
import swal from 'sweetalert2'
import { fileUpload } from '../components/helpers/fileUpload';
import { LoadNotes } from "../components/helpers/loadNotes";
import { db } from "../firebase/firebase-config";
import { types } from "../types/types";

export const startNewNotes = () => {


    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        // console.log(state)

        const newNote = {

            title: '',
            body: '',
            url: 'https://res.cloudinary.com/dk82ead5h/image/upload/v1607741367/73176_eiul3y.jpg',
            date: new Date().getTime()


        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote)

        console.log(doc)

        dispatch(ActiveNote(doc.id, newNote));
        dispatch(addNewNote(doc.id, newNote));


    }
}



export const ActiveNote = (id, note) => ({

    type: types.notesActive,
    payload: {
        id,
        ...note

    }


});


export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})






export const setNotes = (notes) => ({

    type: types.notesLoad,
    payload: notes


});



export const startLoadingNotes = (uid) => {

    return async (dispatch) => {

        const notes = await LoadNotes(uid);
        dispatch(setNotes(notes));


    }


}



export const startSaveNote = (note) => {

    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        if (!note.url) {
            delete note.url
        }


        const noteFireStore = { ...note };
        delete noteFireStore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteFireStore);

        dispatch(refreshNote(note.id, noteFireStore));
        swal.fire('saved', note.title, 'success');

    }


}


export const refreshNote = (id, note) => ({
    type: types.notesUpdate,
    payload: {
        id,
        note: {
            id,
            ...note
        }


    }
})


export const startUploading = (file) => {
    return async (dispatch, getState) => {

        const { active: activeNote } = getState().notes;
        //console.log(file);
        //console.log(activeNote);

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading()
            }
        })

        activeNote.url = fileUpload;


        const fileUrl = await fileUpload(file)
        activeNote.url = fileUrl;
        //console.log(fileUrl);

        dispatch(startSaveNote(activeNote))

        Swal.close();

    }
}


export const StartDeleting = (id) => {

    return async (dispatch, getState) => {

        const uid = getState().auth.uid;
        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNote(id));

    }


}



export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
});


export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});