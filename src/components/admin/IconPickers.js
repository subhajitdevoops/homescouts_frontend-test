import React,{useState} from 'react';
import IconPicker from 'react-icon-picker';

const icons = [
  'fas fa-camera',
  'fas fa-fish',
  'fas fa-align-center',
  'fas fa-align-justify'
];

const IconPickers = () => {

  const [state, setState] = useState({icon: ''});

  return (<>
    <span className={state.icon}></span>
    <IconPicker 
      icons={icons} 
      defaultValue="fas fa-camera" 
      onChange={(icon) => {setState({...state,icon})}}
    />
  </>);
}
export default IconPickers;