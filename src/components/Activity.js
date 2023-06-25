import React from 'react';
import {ReactComponent as Search} from '../assets/magnifying-glass-solid.svg';
import {ReactComponent as Down} from '../assets/download-solid.svg';
import '../styles/Activity.css';

function Activity() {
  return (
    <div className='activity_box'>
        <div className='first'>
            <div className='input_box'>
                <Search id='search_btn'/>
                
                <input type='text' placeholder='Search by name or email'/>
            </div>
            <div id='download_btn'>
                <Down />
            </div>

        </div>
    </div>
  )
}

export default Activity