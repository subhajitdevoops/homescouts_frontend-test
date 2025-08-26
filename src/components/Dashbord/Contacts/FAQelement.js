import React, { useState } from "react";
import plus from "../../../assets/Contacts/Group 39.png";
import minus from "../../../assets/Contacts/minus.png";
import { createMarkup } from "../../../config/Helper";

function FAQelement({ question, answer, id }) {
  const [inde, setInde] = useState(0);

  return (
    <div
      className={`w-100 faq_open_bdStyle `}
      onClick={() => (inde === id ? setInde(0) : setInde(id))}
    >
      <a
        className="collapsed faq_container "
        data-toggle="collapse"
        href={"#" + id}
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        <div className="faq_comment">
          <div dangerouslySetInnerHTML={createMarkup(question)} />
        </div>
        <div className="faq_image">
          <img
            src={inde === id ? minus : plus}
            onClick={() => (inde === id ? setInde(0) : setInde(id))}
            alt="plus image..."
          />
        </div>
      </a>
      <div className="collapse collapseFaq_answer" id={id}>
        <div 
        className="collapseFaq_answeContent"
          dangerouslySetInnerHTML={createMarkup(answer)}
          style={{ display: "flex", justifyContent: "start" ,fontSize:'10px'}}
        />
        {/* {createMarkup(answer)} */}
        {/* <div>
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
          terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
          labore wes anderson cred nesciunt sapiente ea proident.
        </div> */}
      </div>
    </div>
    // -------------------------------------------------------------------------------------
    // <div className="">
    //   <p >
    //     <a
    //       className="btn btn-primary"
    //       data-toggle="collapse"
    //       href="#collapseExample"
    //       role="button"
    //       aria-expanded="false"
    //       aria-controls="collapseExample"
    //     >
    //       Link with href
    //     </a>
    //   </p>
    //   <div className="collapse" id="collapseExample">
    //     <div className="card card-body">
    //       Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
    //       terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
    //       labore wes anderson cred nesciunt sapiente ea proident.
    //     </div>
    //   </div>
    // </div>
  );
}

export default FAQelement;
