import React, { useRef }from 'react'
import { useEffect } from 'react';

const CheckOutSideClick = (props) => {
    const ref =useRef(null)
    const {onClickOutSide, children}=props;

    const handleClickOutside =(event)=>{
        if(ref.current && !ref.current.contains(event.target)){
            onClickOutSide && onClickOutSide();
        }
    }
   useEffect(()=>{
    document.addEventListener("click",handleClickOutside,true);
    return ()=>{
        document.removeEventListener("click",handleClickOutside,true);
    }
   },[]) 

   if(!children){
    return null
   }
  return (
    <div ref={ref}>{children}</div>
  )
}

export default CheckOutSideClick