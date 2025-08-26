import React from "react";
import "../css/RhombusBar.css";
import { AiFillCheckCircle } from "react-icons/ai";
function Steps(props) {
  return (
    <div
      className={`stepBlock ${props.selected ? "selected" : ""} ${
        props.complete ? "complete" : ""
      }`}
    >
      <div
        className={"RhombusWrapper"}
        onClick={() => props.updateStep(props.index + 1)}
      >
        <div className="rhombus-border">
          <div className="rhombus">
            <div className="dot-rhombus">
              {(() => {
                if (props.complete) {
                  return (
                    <AiFillCheckCircle
                      style={{
                        fontSize: "25px",
                        border: "none !important",
                        display: "block",
                        color: "#0061f7",
                        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                      }}
                    />
                  );
                }
              })()}
            </div>
          </div>
        </div>
      </div>
      <p className="span">{props.label}</p>
    </div>
  );
}

export default Steps;
