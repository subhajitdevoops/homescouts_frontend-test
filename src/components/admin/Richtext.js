import React, { useState } from "react";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ContentState, EditorState, convertFromHTML, convertToRaw } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const Richtext = ({ setStateData, index, editor, stateData, current,htmlContent }) => {
  const [editorState, setEditorState] = useState(htmlContent && htmlContent);
  // console.log(EditorState.createEmpty());
  // const [text,setText] =useState();
  // console.log(text);
  const data=htmlContent
  // console.log(editorState.getCurrentContent());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    let stateVal = stateData;
    // let existed=0;
    if (!current) {
      console.log('active');
      const dra=draftToHtml(
        convertToRaw(editorState.getCurrentContent()))
      setStateData(dra)
    } else if (current == "feature1") {
      for (let cur_faq of stateVal) {
        if (cur_faq.index == index) {
          // existed=1
          cur_faq.featureDescription = draftToHtml(
            convertToRaw(editorState.getCurrentContent())
          );
        }
      }

    } else if (current == "update") {
      for (let cur_faq of stateVal) {
        if (cur_faq.index == index) {
          // existed=1
          cur_faq.updateDescription = draftToHtml(
            convertToRaw(editorState.getCurrentContent())
          );
        }
      }
    } else if (current == "service") {
      for (let cur_faq of stateVal) {
        if (cur_faq.index == index) {
          // existed=1
          cur_faq.serviceTitle = draftToHtml(
            convertToRaw(editorState.getCurrentContent())
          );
        }
      }
    } else if (current == "Testimony") {
      for (let cur_faq of stateVal) {
        if (cur_faq.index == index) {
          // existed=1
          cur_faq.testimonyDescription = draftToHtml(
            convertToRaw(editorState.getCurrentContent())
          );
        }
      }
    } else if (current == "faqs") {
      for (let cur_faq of stateVal) {
        if (cur_faq.index == index) {
          if (editor == "Question") {
            cur_faq.Qus = draftToHtml(
              convertToRaw(editorState.getCurrentContent())
            );
          } else if (editor == "Answer") {
            cur_faq.Ans = draftToHtml(
              convertToRaw(editorState.getCurrentContent())
            );
          }
        }
      }
    }
    if(index){
      setStateData(stateVal);
    }
  };
  // console.log(editorState);
//   const contentBlocks = htmlToDraft(stateData)
// const contentState = ContentState.createFromBlockArray(contentBlocks)
// const rawHtml = convertToRaw(contentState)
  return (
    <div>
      <div
        className="ck_editor"
        style={{ backgroundColore: "white", color: "#22223" }}
      >
        {/* <CKEditor
                editor={ClassicEditor}
                data={text}
                /> */}
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
          defaultEditorState={htmlContent}
          // contentState={rawHtml}
        />
        {/* <textarea
          style={{ display: "none" }}
          value={<p>hello</p>}
          // onChange={(e)=>setText(e.target.value)}
        /> */}
        {/* {draftToHtml(convertToRaw(editorState.getCurrentContent()))} */}
      </div>
    </div>
  );
};

export default Richtext;
