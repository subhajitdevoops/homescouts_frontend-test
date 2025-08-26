import React, { useState } from "react";
import cotactimg1 from "../../../assets/Contacts/Group 67.png";
import cotactimg2 from "../../../assets/Contacts/illustration.svg";
import faqimg from "../../../assets/Contacts/faq illustration.png";
import faqHeader from "../../../assets/Contacts/faqHeader.png";
import Axios from "axios";
import FAQelement from "./FAQelement";
import { ToastContainer, toast } from "react-toastify";
import { API_REQ_POST_WITH_TOKEN } from "../../../config/API";
import configData from '../../../config/config.json'

const Contacts = ({res}) => {
  // const url =
    // "https://homescouts.herokuapp.com/api/website/create-contact-form/";
  const [inde, setInde] = useState(0);
  // const [subdata, setSubdata] = useState([]);console.log('subdata',subdata);
  const [user, setUser] = useState({
    name: "",
    email: "",
    subject: "",
    // select: "",
    company: "",
    comment: "",
  });
  let name, value;
    // =============================== user Access Token======================
    const UserTokenAvilable = JSON.parse(localStorage.getItem("accessToken"));
    const userToken =UserTokenAvilable &&
    UserTokenAvilable.response &&
    UserTokenAvilable.response.token;;
    // console.log("userToken------------------------------------>", userToken);
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmitContactData = async(e) => {
    e.preventDefault();
    // setSubdata([...subdata, user]);
    const contactData ={
      name: user.name,
      email: user.email,
      subject: user.subject,
      company: user.company,
      message: user.comment,

    }

    let resContactForm = await API_REQ_POST_WITH_TOKEN(
      configData.USER_COMMON_SERVICE_CONTACT_POST_URL,
      contactData,
    );
    console.log(resContactForm);
    if (resContactForm) {
      if (resContactForm.success === true) {
        toast.success(resContactForm.message);

        setUser({
          name: "",
          email: "",
          subject: "",
          select: "",
          company: "",
          comment: "",
        });
    
      } else {
        toast.warning(resContactForm.message);
      }
    } else {
      toast.error("Please Cheak Your Internet !");
    }
   
  };

  return (
    <div id="contact" className="contacts_main_container_div">
      <div className="contacts_main_container">
        <div className="contacts_main">
          <div className="contact_headings">
            <div className="contact_tag_image">
              <img src={cotactimg1} alt="contact image..." />
            </div>
            <h2>
              We Love to connect,
              <br />
              Help,Receive feedback
              <br />
              just tell us...
            </h2>
            <div className="contact_image">
              <img src={cotactimg2} alt="image..." />
            </div>
          </div>
          {/* ------------------------------ */}
          <div className="contact_information">
            <div>
              <label>
                {" "}
                Your Name<sup>*</sup>
              </label>
              <input
                type="text"
                required
                placeholder="Enter Name"
                name="name"
                value={user.name}
                onChange={handleInput}
                id="contact_information_input"
              />
            </div>
            <div>
              <label>
                Email<sup>*</sup>
              </label>
              <input
                type="text"
                required
                placeholder="Enter Email"
                name="email"
                value={user.email}
                onChange={handleInput}
                id="contact_information_input"
              />
            </div>
            <div>
              <label> Subject </label>

              <input
                type="text"
                placeholder="Enter Subject"
                name="subject"
                value={user.subject}
                onChange={handleInput}
                id="contact_information_input"
              />
            </div>
            {/* <div>
              <label> Select Service </label>

              <select name="select" value={user.select} onChange={handleInput}>
                <option value="option 1">option 1</option>
                <option value="option 2">option 2</option>
                <option value="option 3">option 3</option>
              </select>
            </div> */}
            <div>
              <label> Company Name</label>
              <input
                type="text"
                placeholder="Enter Company Name"
                name="company"
                value={user.company}
                onChange={handleInput}
                id="contact_information_input"
              />
            </div>
            <div>
              <label> Message</label>

              <textarea
                rows="4"
                cols="100%"
                name="comment"
                value={user.comment}
                onChange={handleInput}
                form="usrform"
                placeholder="Enter message..."
              />
            </div>
            <div>
              <div className="submit_button">
                <button onClick={handleSubmitContactData}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ------------------------ FAQ Section---------------------- */}
      <div className="faq-main_container" id="faq">
        {/* ------------------------ */}
        <div className="faq_header">
          <img src={faqHeader} alt=" FAQ " />
        </div>
        <div className="faq_faqimg">
          <img src={faqimg} alt="faq image..." />
        </div>
        {/* -------------------- */}
        <div className="faq_container_all_feature">
          {res && res.map((ele,index)=>(
            <div key={index} className="w-100">

              <FAQelement
                question={ele.Qus}
                answer={ele.Ans}
                id={'faqs'+index}
                // setInde={setInde}
                // inde={inde}
              />
            </div>
          ))}
          {/* <FAQelement
            question="Lorem Ipsum is simply dummy text of the
            printing and typesetting industry."
            answer="Lorem Ipsum is simply dummy text of the
            printing and typesetting Ipsum is simply dummy text of the
            printing and typesetting industryLorem Ipsum is simply dummy text of the
            printing and typesetting industry"
            id={2}
            setInde={setInde}
            inde={inde}
          />
          <FAQelement
            question="Lorem Ipsum is Ipsum is simply dummy text of the
            printing and typesetting simply dummy text of the
            printing and typesetting industry."
            answer="Lorem Ipsum is simply dummy text of the
            printing and typesetting Ipsum is simply dummy text of the
            printing and typesetting Ipsum is simply dummy text of the
            printing and typesetting industryLorem Ipsum is simply dummy text of the
            printing and typesetting industry"
            id={3}
            setInde={setInde}
            inde={inde}
          />
          <FAQelement
            question="Lorem Ipsum is simply dummy text of the
            printing and typesetting industry."
            answer="Lorem Ipsum is simply dummy text of the
            printing and typesetting  Ipsum is simply dummy text of the
            printing and typesettingindustryLorem Ipsum is simply dummy text of the
            printing and typesetting industry"
            id={4}
            setInde={setInde}
            inde={inde}
          /> */}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseonhover={false}
      />
    </div>
  );
};

export default Contacts;
