import React, { useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import Contacts from "./Contacts/Contacts";
import Features from "./Features/Features";
import Footer from "./Footer/Footer";
import Nevbar from "./Nevbar/Nevbar";
import { API_REQ_GET } from "../../config/API";
import configData from "../../config/config.json";
import { ToastContainer, toast } from "react-toastify";
import solution from "../../assets/Feature/icon.png";
import monitor from "../../assets/Feature/icon (3).png";
import mobilecommand from "../../assets/services/icon (6).png";
import equipment from "../../assets/services/icon (7).png";
import lifecycle from "../../assets/services/icon (8).png";
import troubleshooting from "../../assets/services/icon.svg";
import energyoptomizer from "../../assets/services/icon (10).png";
import smartdiagnostics from "../../assets/services/icon (11).png";
import vitalequipment from "../../assets/services/icon (12).png";
import smartalerts from "../../assets/services/icon (13).png";
import preventative from "../../assets/services/icon (14).png";
import ellipcomment1 from "../../assets/services/Ellipse 31.png";

const Dashbord = () => {
  const [res, setRes] = useState({
    success: true,
    message: "sucess",
    foundData: {
      home: {
        sliderImagepath: ["f440f87191992a56795e641ab91e5237.JPG"],
        title: (
          <h1>
            {" "}
            Hope a seemless <br />
            <span style={{ color: "#ED6823" }}> Search </span> of yours new
            <br />
            <span style={{ color: "#ED6823" }}>stay</span>
          </h1>
        ),
        description:
          "With HomeScouts search the best property near you with a support of all yours housholds and homeservices, available on your fingretips",
        quote: (
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        ),
        seccondaryImagePath: "f440f87191992a56795e641ab91e5237.JPG",
      },
      feature: {
        featureImagePath: "6c93628339127828a863616b2c3ae42c.JPG",
        featureHeadDescription: (
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        ),
        featureDetails: [
          {
            _id: "63b315953f7cb8311c5c32cb",
            img: solution,
            featureDescription: (
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            ),
          },
          {
            _id: "63b315953f7cb8311c5c32cb",
            img: solution,
            featureDescription: (
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            ),
          },
          {
            _id: "63b315953f7cb8311c5c32cb",
            img: solution,
            featureDescription: (
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            ),
          },
          {
            _id: "63b315953f7cb8311c5c32cb",
            img: solution,
            featureDescription: (
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            ),
          },
        ],
      },
      update: {
        updateImagePath: ["1037c300bf75509e7da750cf4296df12.JPG"],
        updateDetails: [
          {
            _id: "63b316f3e6fb58476ca770ff",
            ImgSrc: monitor,
            heading: <h4>Monitor</h4>,
            updateDescription: (
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Possimus, itaque earum aut accusamus aspernatursed rerum
                cupiditate ipsum atque hic excepturi expedita, ad dolores eaque
                esse commodi repellatLorem Ipsum is simply dummy text of the
                printing anLorem{" "}
              </p>
            ),
          },
          {
            _id: "63b316f3e6fb58476ca770ff",
            ImgSrc: monitor,
            heading: <h4>Monitor</h4>,
            updateDescription: (
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Possimus, itaque earum aut accusamus aspernatursed rerum
                cupiditate ipsum atque hic excepturi expedita, ad dolores eaque
                esse commodi repellatLorem Ipsum is simply dummy text of the
                printing anLorem{" "}
              </p>
            ),
          },
          {
            _id: "63b316f3e6fb58476ca770ff",
            ImgSrc: monitor,
            heading: <h4>Monitor</h4>,
            updateDescription: (
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Possimus, itaque earum aut accusamus aspernatursed rerum
                cupiditate ipsum atque hic excepturi expedita, ad dolores eaque
                esse commodi repellatLorem Ipsum is simply dummy text of the
                printing anLorem{" "}
              </p>
            ),
          },
          {
            _id: "63b316f3e6fb58476ca770ff",
            ImgSrc: monitor,
            heading: <h4>Monitor</h4>,
            updateDescription: (
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Possimus, itaque earum aut accusamus aspernatursed rerum
                cupiditate ipsum atque hic excepturi expedita, ad dolores eaque
                esse commodi repellatLorem Ipsum is simply dummy text of the
                printing anLorem{" "}
              </p>
            ),
          },
        ],
      },
      services: {
        serviceImagePath: "2bff4e2fca131fe33ba47161cf8b19c5.JPG",
        servicesDescription: [
          {
            _id: "63b31683e6fb58476ca770fd",
            ImgSrc: mobilecommand,
            serviceTitle: <h5>Mobile Command Management</h5>,
          },
          {
            _id: "63b31683e6fb58476ca770fd",
            ImgSrc: equipment,
            serviceTitle: <h5>Equipment Optimizer</h5>,
          },
          {
            _id: "63b31683e6fb58476ca770fd",
            ImgSrc: lifecycle,
            serviceTitle: <h5>Lifecycle prediction</h5>,
          },
          {
            _id: "63b31683e6fb58476ca770fd",
            ImgSrc: troubleshooting,
            serviceTitle: <h5>Troubleshooting Guide</h5>,
          },
          {
            _id: "63b31683e6fb58476ca770fd",
            ImgSrc: energyoptomizer,
            serviceTitle: <h5>Energy Optimizer</h5>,
          },
          {
            _id: "63b31683e6fb58476ca770fd",
            ImgSrc: smartdiagnostics,
            serviceTitle: <h5>Smart Diagnostics</h5>,
          },
          {
            _id: "63b31683e6fb58476ca770fd",
            ImgSrc: vitalequipment,
            serviceTitle: <h5>Vital Equipment Scan</h5>,
          },
          {
            _id: "63b31683e6fb58476ca770fd",
            ImgSrc: smartalerts,
            serviceTitle: <h5>Smart Alerts</h5>,
          },
          {
            _id: "63b31683e6fb58476ca770fd",
            ImgSrc: preventative,
            serviceTitle: <h5>Preventative maintenance</h5>,
          },
        ],
      },
      faqs: [
        {
          _id: "63aeea0de522bb13ccd196b1",
          Qus: (
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          ),
          Ans: (
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              Ipsum is simply dummy text of the printing and typesetting
              industryLorem Ipsum is simply dummy text of the printing and
              typesetting industry
            </p>
          ),
        },
        {
          _id: "63aeea0de522bb13ccd196b1",
          Qus: (
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          ),
          Ans: (
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              Ipsum is simply dummy text of the printing and typesetting
              industryLorem Ipsum is simply dummy text of the printing and
              typesetting industry
            </p>
          ),
        },
        {
          _id: "63aeea0de522bb13ccd196b1",
          Qus: (
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          ),
          Ans: (
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              Ipsum is simply dummy text of the printing and typesetting
              industryLorem Ipsum is simply dummy text of the printing and
              typesetting industry
            </p>
          ),
        },
        {
          _id: "63aeea0de522bb13ccd196b1",
          Qus: (
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          ),
          Ans: (
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              Ipsum is simply dummy text of the printing and typesetting
              industryLorem Ipsum is simply dummy text of the printing and
              typesetting industry
            </p>
          ),
        },
      ],
      testimony: [
        {
          ImgSrc: ellipcomment1,
          userName: "Amit",
          designation: "Designation",
          testimonyDescription: (
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley .
            </p>
          ),
          _id: "63b3188623c66044089020af",
        },
        {
          ImgSrc: ellipcomment1,
          userName: "Amit",
          designation: "Designation",
          testimonyDescription: (
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley .
            </p>
          ),
          _id: "63b3188623c66044089020af",
        },
        {
          ImgSrc: ellipcomment1,
          userName: "Amit",
          designation: "Designation",
          testimonyDescription: (
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley .
            </p>
          ),
          _id: "63b3188623c66044089020af",
        },
      ],
      createdAt: "2022-12-30T13:18:12.587Z",
      updatedAt: "2023-01-02T17:46:46.610Z",
      __v: 0,
    },
  });

  const getCases=async()=>{
    let ApiRes = await API_REQ_GET(configData.DYNAMIC_AND_LANDING_PAGE_GET_URL);
    console.log(ApiRes);
    if (ApiRes) {
      if (ApiRes.success===true) {
        // toast.success(ApiRes.message);
        if(ApiRes.message === "no data found!! " ){
          console.log('data not found!');
          }else{
        setRes(ApiRes);
          }
      } else {
        toast.warning(ApiRes.message);
      }
      // console.log("ApiRes........ ", ApiRes);
    } else {
      toast.error('Please Check Your Internet connection !');
    }
  }

  useEffect( () => {
    getCases()
  }, []);
  return (
    <div id="home">
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
      <Nevbar />
      <Banner res={res && res.foundData.home} />
      <Features res={res && res.foundData} />
      <Contacts res={res && res.foundData.faqs} />
      <Footer />
    </div>
  );
};

export default Dashbord;
