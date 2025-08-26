import React from "react";
import StepNavigation from "./StepNavigation";
import "../css/RhombusBar.css";

export default function Sidebar(props) {
  return (
    <div className="StepProgressBar-component">
      <StepNavigation
        currentStep={props.currentStep}
        labelArray={props.labelArray}
        updateStep={props.updateStep}
        complete={props.complete}
      />
    </div>
  );
}
