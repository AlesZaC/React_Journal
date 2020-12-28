import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';
import moment from 'moment';

export const NotesAppbar = () => {
    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes)


    const handleSaveNotes = (e) => {
        //e.preventDefault();
        //console.log(active)
        dispatch(startSaveNote(active))

    }


    const handleUploadImg = () => {
        document.querySelector('#fileSelector').click();

    }

    const handleFileChange = (e) => {
        //e.preventDefault();
        // console.log(e.target.files)
        const file = e.target.files[0]
        if (file) {
            dispatch(startUploading(file))
        }
    }


    return (
        <div className="notes__appbar">
            <h1>{moment(active.date).format('dddd MMM Do')}</h1>


            <input id="fileSelector" type="file" name="file" style={{ display: 'none' }}
                onChange={handleFileChange}
            />


            <div>
                <button className="btn btn-black" onClick={handleUploadImg}>
                    <span>Upload</span>
                    <i className="fas fa-upload"></i>
                </button>



                <button className="btn btn-black" onClick={handleSaveNotes}>
                    <span>Save</span>
                    <i className="fas fa-check"></i>
                </button>
            </div>
        </div>
    )
}
