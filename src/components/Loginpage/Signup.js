import React from "react";
import "../../assets/signup/Signup.css";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import img1 from "../../assets/signup/Group 132.png";
import img2 from "../../assets/signup/Group 133.png";
import img3 from "../../assets/Logo.svg";
import img4 from "../../assets/signup/Group 134.png";
import img5 from "../../assets/signup/Group 124.png";
// import img6 from "../../assets/signup/Ellipse 44.png";
import img6 from "../../assets/signup/Ellipse 44.png"
import img7 from "../../assets/signup/Group 136.png";
import img8 from "../../assets/signup/Group.png";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";


const Signup = () => {
  return (
    <div>
        <img src={img7} alt="corner image..." id="image_corner_elips" />
      <div className="container">
        <div className="flex_c signup_main_container_div">
          <div className=" signup_container_div">
            <div className="bg_og signup_container1_div">
              <div>
                <div className="signup_container23_div ">
                <NavLink to={"/"} className='homescoutLogo'>
                    <img src={img3} alt="houselogo..." id="signup_image11" />
                  </NavLink>
                  <img src={img8} alt='dots...' id="signup_image11_dots" />
                  <img src={img4} alt="houselogo..." id="signup_image12" />
                  <img src={img8} alt='dots...'  id="signup_image12_dots" />
                  <p className="c_w">HomeScouts,100% Housing Solution for you</p>
                  <img src={img5} alt="houselogo..." id="signup_image13" />
                </div>
              </div>
            </div>
            <div className="signup_container2_div">
            <div className="signup_container2_color_div signup_Forcolor_color_div"></div>
            <div className="signup_container2_mobile_div">
                <img src={img5} alt="houselogo..." id="signup_image13" />
                <NavLink to={"/"} className=''>
                    <img src={img3} alt="houselogo..." id="signup_image11" />
                  </NavLink>
                </div>
              <div>
                <div className="flex_c mt-3 signup_Already_account_div">
                  <div className="signup_backbutton_div">
                    {/* <AiOutlineArrowLeft /> */}
                  </div>
                  <p className="h3p c_br signup_Already_account ">
                    Already have an account?&nbsp;
                    <Link to="/login">
                    <span className="c_blue signupind_Already_account_span"> Sign In</span></Link>
                  </p>
                </div>
              </div>
              <div className="flex_c">
                <div className=" signup_join_us_div">
                  <div className="signup_joinus_div">
                    <h3>Join Us!</h3>
                    <p className="h3p c_br">
                      To begin this journey,tell us what type of account you'd
                      be opening.
                    </p>
                  </div>
                  <Link to='/signup-individual'>
                  <div className="flex_c signup_Prosonal_account_div">
                    <img src={img1} alt="account icon..." />
                    <div className="">
                      <h5 className="">Property Buyer/Seller/Rent</h5>
                      <p className="c_br h3p">
                        Personal account to manager all you activies
                      </p>
                    </div>
                    <AiOutlineArrowRight className="c_blue signup_AiOutlineArrowRight" />
                  </div>
                  </Link>
                  <Link to='/signup-business'>
                  <div className="flex_c signup_prop_account_div">
                    <img src={img2} alt="business icon... " />
                    <div>
                      <h5>Business:(Porperty agent or Business)</h5>
                      <p className="h3p c_br">Own or belong to a company,this is for you</p>
                    </div>
                    <AiOutlineArrowRight className="c_blue signup_AiOutlineArrowRight" />
                  </div>
                  </Link>
                </div>
              </div>
              <div className="signup_elips_div">
                <img src={img6} alt="Elips..." />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
