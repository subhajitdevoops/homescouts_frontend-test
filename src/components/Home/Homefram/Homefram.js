import React from "react";
import img1 from "../../../assets/admin/Home/img1.png";
import img2 from "../../../assets/admin/Home/img2.png";
import "./Homefram.css";

const Homefram = () => {
  return (
    <>
      <div className="homefram_main_container_div">
        <div className="homefram_container_div">
          <div className="homefram_heading_container_div">
            <h1><span className="homefram_span_home">Home</span><span className="homefram_span_Scouts">Scouts</span> <br />
            <span className="homefram_span_india">India’s first </span><br /> <span className="homefram_span_360h">360° home </span>
            <span className="homefram_span_india">solution</span> </h1>
            {/* <img src={img1} alt='homescouts...' /> */}
          </div>
          <div className="homefram_image_container_div">
            <img src={img2} alt="homescouts..." width={300}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homefram;
