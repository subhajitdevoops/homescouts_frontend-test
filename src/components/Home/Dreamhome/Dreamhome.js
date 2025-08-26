import React from 'react';
import img from '../../../assets/admin/Home/IMAGE (1).png';
import { MdNotificationsActive } from 'react-icons/md';
import './Dreamhome.css'

const Dreamhome = () => {
  return (
    <div className='Dreamhome_main_container_div' >
        <div className='Dreamhome_container_div'>
            <img src={img} alt='dream home...' />
            <div className='Dreamhome_notification'><MdNotificationsActive className='h3 Dreamhome_notification_logo ' /> </div>
        </div>
    </div>
  )
}

export default Dreamhome;