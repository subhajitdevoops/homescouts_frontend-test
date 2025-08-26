import React from "react";
import Steps from "./Steps";
import "../css/RhombusBar.css";

export default function StepNavigation(props) {
  return (
    <div className="stepWrapper">
      {props.labelArray.map((items, index) => (
        <Steps
          label={items}
          key={index}
          index={index}
          updateStep={props.updateStep}
          selected={props.currentStep === index + 1}
          complete={props.currentStep > index + 1}
        />
      ))}
    </div>
  );
}
