import React, { useState, useEffect } from "react";
import "./TermAndCondition.css";
import { BsArrowLeft } from "react-icons/bs";

const PrivacyPolicy = () => {
  const handleGoBack=()=>{window.history.back()};
  return (
    <div className="TermAndCondition_main_container_div">
      <div className="sw TermAndCondition_container_div">
        <BsArrowLeft
          className="TermAndCondition_cancel_div "
          onClick={()=>handleGoBack()}
        />
        <div className="TermAndCondition_message_div">
          <h4 className=""> Privacy Policy for HomeScouts</h4>
          <br />
          <h5>Introduction</h5>
          <br />
          <p>
            At HomeScouts, we take your privacy seriously. This Privacy Policy
            outlines how we collect, use, store, and protect your personal
            information when you visit our website. Please read this document
            carefully to understand our practices regarding your data.
            <br />
          </p>
          <br />
          <h5>Information Collection and Use</h5>
          <br />
          <p>
            Personally Identifiable Information
            <br />
            &#x2022;Website Name: HomeScouts
            <br />
            &#x2022;Owner: Amit Kulkarni
            <br />
            &#x2022;Contact Email: homescoutshouse@gmail.com
            <br />
            &#x2022;Location: USA
            <br />
          </p>
          <br />
          <p>
            We may collect personally identifiable information, such as your
            name and email address, when you voluntarily provide it to us. This
            information will only be used for the purposes stated in this
            Privacy Policy.
            <br />
            <br />
            Non-Personally Identifiable Information
            <br />
            <br />
            When you visit our website, we may automatically collect certain
            non-personally identifiable information, such as your IP address,
            browser type, and operating system. This information is used for
            statistical purposes and to improve our website's performance.
            <br />
          </p>
          <br />
          <br />
          <h5 className=""> Data Sharing</h5>
          <br />
          <p>
            HomeScouts does not share or sell your personally identifiable
            information to third parties, except as described in this Privacy
            Policy.
            <br />
          </p>
          <br />
          <h5 className=""> Third-Party Vendors</h5>
          <br />
          <p>
            While we do not allow third-party access to our website for
            processing data, we may use third-party services for payment
            processing. These payment processors have their own privacy
            policies, and we recommend that you review them before making any
            transactions.
            <br />
          </p>
          <br />
          <h5 className="">Security</h5>
          <br />
          <p>
            We take reasonable measures to protect your information from
            unauthorized access, use, or disclosure. Our website has security
            measures in place to protect against the loss, misuse, and
            alteration of the information under our control.
            <br />
          </p>
          <br />
          <h5>Introduction</h5>
          <br />
          <p>
            At HomeScouts, we take your privacy seriously. This Privacy Policy
            outlines how we collect, use, store, and protect your personal
            information when you visit our website. Please read this document
            carefully to understand our practices regarding your data.
            <br />
          </p>
          <br />
          <h5>User Rights</h5>
          <br />
          <p>
            At HomeScouts, we respect your rights regarding your data. You have
            the right to:
            <br />
            &#x2022;Access your personal information
            <br />
            &#x2022;Rectify any inaccurate or incomplete personal information
            <br />
            &#x2022;Erase your personal information from our records
            <br />
            &#x2022;Object to the processing of your personal information
            <br />
            If you wish to exercise any of these rights, please contact us at
            the email address provided below.
            <br />
          </p>
          <br />
          <h5>Contact Us</h5>
          <br />
          <p>
            If you have any questions or concerns about this Privacy Policy or
            our data practices, you may contact us at:
            <br />
            <br />
            Email: homescoutshouse@gmail.com
            <br />
          </p>
          <br />
          <h5>Changes to this Privacy Policy</h5>
          <br />
          <p>
            We reserve the right to modify this Privacy Policy at any time. Any
            changes will be effective immediately upon posting the updated
            Privacy Policy on our website. Please check this page regularly for
            any updates.
            <br />
          </p>
          <br />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
