import React, { useEffect, useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import "./multiRangeSlider.css";
import { Range } from "react-range";

const Rangeslider = ({
  handleInput,
  minValue,
  maxValue,
  minPrice,
  maxPrice,
  set_minValue,
  set_maxValue,
  setData,
  setBudgetValue,
}) => {
  // Helper function to format the slider values with abbreviations
  // const [values, setValues] = useState([5000000]); // 50 lakh

  const [values, setValues] = useState([0, 60]);

  const formatValue = (value) => {
    if (value === 0) {
      return "0";
    } else if (value < 20) {
      return (value * 5).toFixed(2) + " L";
    } else if (value == 20) {
      return (1).toFixed(2) + " CR";
    } else {
      return ((value - 20) * 2.5).toFixed(2) + " CR";
    }
  };

  const handleRangeChange = (newValues) => {
    console.log("newValues", newValues);
    setValues(newValues);
    const minVAl = formatValue(newValues[0]);
    const maxVAl = formatValue(newValues[1]);
    const val = `${minVAl}-Upto ${maxVAl}`;
    setBudgetValue([val]);
  };
  const handleFinalChange = () => {
    const minVAl = formatValue(values[0]);
    const maxVAl = formatValue(values[1]);
    set_minValue(minVAl);
    set_maxValue(maxVAl);

    setData((oldData) => {
      return {
        ...oldData,
        expectedPrice: [minVAl, maxVAl],
      };
    });
  };

  return (
    <div className="App">
      {/* <MultiRangeSlider
        min={minPrice}
        max={maxPrice}
        step={1}
        ruler={false}
        label={false}
        preventWheel={true}
        minValue={minValue}
        maxValue={maxValue}
        onInput={(e) => {
          handleInput(e);
        }}
      /> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "30px",
        }}
      >
        <Range
          values={values}
          step={0.5} // Each step represents 1 Lakh
          min={0} // 1 Lakh
          max={60} // 100 Crore
          onChange={handleRangeChange}
          onFinalChange={handleFinalChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "4px",
                width: "100%",
                backgroundColor: "#ccc",
                borderRadius: "2px",
                cursor: "pointer",
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props, index }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "15px",
                width: "15px",
                backgroundColor: index === 0 ? "#007bff" : "#ff4500",
                borderRadius: "50%",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                outline: "none",
                cursor: "pointer",
              }}
            />
          )}
        />
      </div>
      <div className="rangeSlider">
        <p className="option_box bg_blue c_w"> {formatValue(values[0])}</p>
        <p className="option_box bg_blue c_w">{formatValue(values[1])} </p>
      </div>
    </div>
  );
};

export default Rangeslider;
