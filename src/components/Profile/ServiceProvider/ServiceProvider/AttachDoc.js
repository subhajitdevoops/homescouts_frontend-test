import React from "react";
import {MdOutlinePictureAsPdf} from 'react-icons/md'
import imgFile from '../../../../assets/services/file upload icon.svg'

const AttachDoc = ({ DocName, importent,handleAttachFile,doc,index,fileName }) => {
  return (
    <div className="AttachDoc_mainContainer_div">
      <div className="AttachDoc_name">
        <h6>
          {DocName}
          {importent === true && <span style={{ color: "#FF0000" }}>*</span>}
        </h6>
      </div>
      <label htmlFor="AttchDoc" className="AttachDoc_DocPdf">
            {/* <MdOutlinePictureAsPdf className="AttachDoc_PDFIcon" /> */}
            <img src={imgFile} alt="file..."  className="AttachDoc_PDFIcon" />

        <p>{doc}</p>
      </label>
      <input  type='file' id="AttchDoc" style={{display:'none'}}
      onChange={(e)=>handleAttachFile(e,index,fileName)} 
      accept=".jpeg,.jpg,.png,.pdf,.doc"
      />
      
    </div>
  );
};

export default AttachDoc;
