import React from "react";

const TiffinService = ({ heading, dataOption, setSelectData, selectData }) => {
  const allData = dataOption;

  const handleSelectOption = (Eid) => {
    const objWithIdIndex = selectData.findIndex((obj) => obj.id === Eid);
    if (objWithIdIndex > -1) {
      const Fil = [...selectData].filter((ele, i) => ele.id !== Eid);
      setSelectData([...Fil]);
    } else {
      const Fil = [...allData].filter((ele, i) => ele.id == Eid);
      setSelectData([...selectData, ...Fil]);
    }
  };

  return (
    <div className="my-3 filter_proporty_main_container_div">
      <div>
        <h4 className="c_t filter_proporty_heading">{heading} </h4>
      </div>
      <div className="filter_proporty_container_div ">
        {dataOption.map((option, index) => (
          <div
            key={index}
            className={`sw b_r TiffinService_Element ${
                selectData.indexOf(option) !== -1 && 'selectTiffin'
            }`}
            onClick={() => handleSelectOption(option.id)}
          >
            <img src={option.img} alt="service Image.." />
            <p>{option.ServiceName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TiffinService;
