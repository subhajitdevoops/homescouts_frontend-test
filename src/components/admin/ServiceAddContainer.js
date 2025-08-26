import React from "react";
import { GiBowlOfRice } from "react-icons/gi";
import { RiDeleteBinFill } from "react-icons/ri";
import { AiFillPlusCircle } from "react-icons/ai";
import "../../assets/admin/css/Post.css";
import { BsFillQuestionCircleFill, BsPhoneVibrateFill } from "react-icons/bs";

const ServiceAddContainer = ({
  data,
  serviceData,
  setServiceData,
  i,
  eleindex,
}) => {
  const handleAddGuidline = () => {
    const AllVal = [...serviceData];
    AllVal.forEach((element, ind) => {
      if (ind == eleindex) {
        AllVal[eleindex].documents_details = [
          ...AllVal[eleindex].documents_details,
          {
            help_text: "",
            Guidline: "",
          },
        ];
      }
    });
    setServiceData(AllVal);
  };

  const handleDeleteGuidline = (subInd) => {
    const AllVal = [...serviceData];
    AllVal.forEach((element, ind) => {
      if (ind == eleindex) {
        let subval = AllVal[eleindex].documents_details.filter(
          (obj, i) => i != subInd
        );
        console.log(subval);
        AllVal[eleindex].documents_details = subval;
      }
    });
    setServiceData(AllVal);
  };

  const handleHelpText = (e) => {
    const val = e.target.value;
    const AllVal = [...serviceData];
    AllVal.forEach((element, ind) => {
      if (ind == eleindex) {
        AllVal[eleindex].documents_details[i].help_text = val;
      }
    });
    setServiceData(AllVal);
  };

  const handleGuidline = (e) => {
    const val = e.target.value;
    const AllVal = [...serviceData];
    AllVal.forEach((element, ind) => {
      if (ind == eleindex) {
        AllVal[eleindex].documents_details[i].Guidline = val;
      }
    });
    setServiceData(AllVal);
  };

  return (
    <div>
      <div className="servicemaster_main_container_div">
        <div className="d-flex servicemaster_certianddoc">
          <div className="servicemaster_CertificateDocumentService">
            <p>Certificate/ Document needed for this service?</p>
          </div>
          <div className="servicemaster_buttonAddDelete">
            <button onClick={handleAddGuidline}>
              <AiFillPlusCircle style={{ fontSize: "20px" }} />
            </button>
            <span>|</span>
            {serviceData[eleindex].documents_details.length > "1" ? (
              <button onClick={() => handleDeleteGuidline(i)}>
                <RiDeleteBinFill style={{ fontSize: "20px" }} />
              </button>
            ) : (
              <button>
                <RiDeleteBinFill style={{ fontSize: "20px" }} />
              </button>
            )}
          </div>
        </div>
        <div className="mt-3 servicemaster_helpguidline_div">
          <div className="d-flex servicemaster_hepltext_div">
            <span>
              <BsFillQuestionCircleFill className="ms-4 servicemaster_BsFillQuestionCircleFill" />
            </span>
            <h3 className="servicemaster_text12">Help Text</h3>
            <div>
              <input
                type="text"
                className=" ms-4 border border-4 rounded  servicemaster_hepl1text_div "
                placeholder=" Upload your fssai certificate in high quality, and visible format"
                value={data.help_text}
                onChange={(e) => handleHelpText(e)}
              />
            </div>
          </div>
          <div className="d-flex servicemaster_hepltext_div">
            <span>
              <BsPhoneVibrateFill className="ms-4 servicemaster_BsFillQuestionCircleFill" />
            </span>
            <h3 className="servicemaster_text12">
              Guidline<span style={{ color: "red" }}>*</span>
            </h3>
            <div>
              <input
                type="text"
                className=" ms-4 border border-4 rounded servicemaster_hepl1text_div "
                placeholder="Upload your fssai certificate in high quality, and visible format"
                value={data.Guidline}
                onChange={(e) => handleGuidline(e)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceAddContainer;
