import { useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";



const propTypes = {
    location: PropTypes.shape({
      hash: PropTypes.string
    }).isRequired
  };
const ScrollHandler = ({ location }) => {
  useEffect(() => {
    const element = document.getElementById(propTypes.location.hash);

    setTimeout(() => {
      window.scrollTo({
        behavior: element ? "smooth" : "auto",
        top: element ? element.offsetTop : 0
      });
    }, 100);
  }, [propTypes.location]);

  return null;
};



export default ScrollHandler;