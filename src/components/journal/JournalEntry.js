import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { ActiveNote } from '../../actions/notes';

export const JournalEntry = ({ id, title, url, body, date }) => {


    const dispatch = useDispatch();

    const noteDate = moment(date);

    const handleEntryClick = () => {
        dispatch(ActiveNote(
            id, {
            date, title, body, url
        }
        ))
    }




    return (
        <div className="journal__entry" onClick={handleEntryClick}>

            {
                url &&
                <div className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url( ${url}   )`

                    }}
                ></div>



            }



            <div className="journal__entry_body">
                <p className="journal__entry_title " >
                    {title}
                </p>
                <p className="journal__entry_content">
                    {body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('Do')}</h4>

            </div>

        </div>
    )
}
