import React from 'react'
import Gif from "./gif1 (2).gif";

const Speechtotaxt = ({transcript}) => {
  return (
    <div className="Buysearch_search_transcript_container_div">
      <div className=" Buysearch_search_transcript_div">
        <p>
          <i>Say Something ...</i>
        </p>
        <img src={Gif} alt="gif..." />
        <h3>
          <i>{transcript}</i> 
        </h3>
      </div>
    </div>
  )
}

export default Speechtotaxt