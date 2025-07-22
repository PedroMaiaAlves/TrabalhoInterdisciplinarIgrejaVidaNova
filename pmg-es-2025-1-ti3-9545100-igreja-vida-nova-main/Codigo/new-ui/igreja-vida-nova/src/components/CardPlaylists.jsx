import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { MainTextStyled, SecondTextStyled } from './styles/TextStyled';

const CardPlaylists = (props) => {

    console.log(props)
    return (
        <div
            style={{
                width: '575px',
                height: '360px',
                border: '2px solid #ccc',
                borderRadius: '8px',
                padding: '5px',
                backgroundColor: '#FFFFFF',
                margin: '10px'
            }}
        >
            <iframe width="560" height="315" padding="5px" src={`https://www.youtube.com/embed/${props.playlist.videoID}`}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen>
            </iframe>
            {props.isPastor && (
                <div style={{display: 'flex', justifyContent:'flex-end'}}>
                    <FontAwesomeIcon
                        icon={faTrash}
                        style={{
                            color: 'red',
                            fontSize: '25px',
                            paddingRight: '15px',
                        }}
                        onClick={props.handleDelete}
                    />
                </div>
            )}

        </div>
    );
};

export default CardPlaylists;
