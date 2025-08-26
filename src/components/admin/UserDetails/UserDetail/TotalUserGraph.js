import React from "react";
import img10 from "../img10.svg";
import img11 from "../img11.svg";
import Chart from "react-apexcharts";
import { useState } from "react";

const Charts = ({
  expands,
  setExpends,
  Title,
  Users,
  Pragraph,
  selectYearByType,
  selectYear,
  handleSelectDates,
  calenders,
  series,
}) => {
  // Chart Data
  const [charts, setCharts] = useState({
    // series: [
    //   {
    //     name: "Total User",
    //     data: [162, 162, 432, 321, 162, 207, 194, 175, 167, 223, 104, 265],
    //   },
    //   {
    //     name: "Presonal",
    //     data: [32, 21, 232, 121, 32, 167, 34, 55, 67, 13, 64, 235],
    //   },
    //   {
    //     name: "Bussines",
    //     data: [132, 41, 232, 221, 32, 107, 34, 25, 67, 123, 44, 135],
    //   },
    // ],

    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      // colors: ["#165BAA"],
      //   stroke: { width: 0, curve: "smooth" },
      //   fill: { opacity: 1, type: "solid" },
      xaxis: {
        title: {
          // text: "years",
          style: { fontSize: 20, color: "#165baa" },
        },
        categories: [
          "jan",
          "feb",
          "mar",
          "Apr",
          "may",
          "jun",
          "jul",
          "Aug",
          "oct",
          "Sep",
          "Nov",
          "Dec",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });
  const [calender, setCalender] = useState(false); //Show calender
  const Years = [2013, 2014, 2016, 2017, 2018, 2019, 2020, 2021, 2022]; //calende date

  // select Calender Date
  const handleSelectDate = (list) => {
    // setSelectYear(list);
    setCalender(false);
  };

  return (
    <div className="Charts_ContainDiv">
      <div className="Charts_HeadingCalender">
        <h6>{Title}</h6>
        <div className="Charts_Heading">
          <div className="Charts_Paragraph">
            <h3>{Users} </h3>
            <p>{Pragraph} </p>
          </div>
          <div
            className="Charts_Calender"
            onClick={() => setCalender(!calender)}
          >
            <p>{selectYear}</p>
            {calender === true && (
              <div className="Charts_CalenderAlldate">
                {calenders &&
                  calenders.map((list, index) => (
                    <>
                      <p
                        className="Charts_Calenderdate"
                        onClick={() => {
                          handleSelectDate(list);
                          handleSelectDates(selectYearByType, list);
                        }}
                      >
                        {list}
                      </p>
                    </>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="Charts_Hr"></div>
      <div className="Charts_ChartContainer">
        <div className="Charts_ExpendContainer">
          <p>{expands === true ? "Minimise" : "Expand"}</p>
          <img
            src={expands === true ? img11 : img10}
            onClick={() => setExpends(!expands)}
          />
        </div>
        <div className="Charts_Chart">
          {expands === true && (
            <Chart
              type="area"
              height={200}
              options={charts.options}
              series={series}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const TotalUserGraph = ({ totalData, graphYear, setGraphYear }) => {
  // console.log("totalData-----xxxxxxxxxxxxxx-----", totalData);
  const [userChart, setUserChart] = useState(false);
  const [userAds, setUserAds] = useState(false);
  const [userService, setUserSerice] = useState(false);
  const handleSelectDates = (name, selectYear) => {
    if (name == "selectYearTot") {
      setGraphYear((oldData) => {
        return {
          ...oldData,
          selectYearTot: selectYear,
        };
      });
    } else if (name == "selectYearAds") {
      setGraphYear((oldData) => {
        return {
          ...oldData,
          selectYearAds: selectYear,
        };
      });
    } else if (name == "selectYearSer") {
      setGraphYear((oldData) => {
        return {
          ...oldData,
          selectYearSer: selectYear,
        };
      });
    }
  };

  return (
    <div className="TotalUserGraph_mainContainerDiv">
      <Charts
        expands={userChart}
        setExpends={setUserChart}
        Title="Total User"
        Users={totalData && totalData.totalUsers && totalData.totalUsers}
        Pragraph="Registered for all time"
        selectYearByType="selectYearTot"
        selectYear={graphYear.selectYearTot}
        handleSelectDates={handleSelectDates}
        calenders={
          totalData && totalData.calender&&totalData.calender[0].userSchemaYears
            ? totalData.calender[0].userSchemaYears
            : []
        }
        series={[
          {
            name: "Total User",
            data:
              totalData && totalData.usertotalcount && totalData.usertotalcount,
          },
          {
            name: "Presonal",
            data:
              totalData &&
              totalData.user_individual_array &&
              totalData.user_individual_array,
          },
          {
            name: "Bussines",
            data:
              totalData &&
              totalData.user_business_array &&
              totalData.user_business_array,
          },
        ]}
      />
      <Charts
        expands={userAds}
        setExpends={setUserAds}
        Title="Total Ads"
        Users={
          totalData && totalData.totalProperties && totalData.totalProperties
        }
        Pragraph="Ad posted for all time"
        selectYearByType="selectYearAds"
        selectYear={graphYear && graphYear.selectYearAds}
        handleSelectDates={handleSelectDates}
        calenders={
          totalData && totalData.calender&&totalData.calender[0].propertyPostSchemaYears
            ? totalData.calender[0].propertyPostSchemaYears
            : []
        }
        series={[
          {
            name: "Total Ads",
            data:
              totalData &&
              totalData.propertytotalcount &&
              totalData.propertytotalcount,
          },
          {
            name: "Presonal",
            data:
              totalData &&
              totalData.property_individual_array &&
              totalData.property_individual_array,
          },
          {
            name: "Bussines",
            data:
              totalData &&
              totalData.property_business_array &&
              totalData.property_business_array,
          },
        ]}
      />
      <Charts
        expands={userService}
        setExpends={setUserSerice}
        Title="Service Providers"
        Users={totalData && totalData.totalServices && totalData.totalServices}
        Pragraph="Ad posted for all time"
        selectYearByType="selectYearSer"
        selectYear={graphYear.selectYearSer}
        handleSelectDates={handleSelectDates}
        calenders={
          totalData && totalData.calender&&totalData.calender[0].applyForServicesYears
            ? totalData.calender[0].applyForServicesYears
            : []
        }
        series={[
          {
            name: "Total Service",
            data:
              totalData && totalData.servicetotalcount && totalData.servicetotalcount,
          },
          {
            name: "Presonal",
            data:
              totalData &&
              totalData.service_individual_array &&
              totalData.service_individual_array,
          },
          {
            name: "Bussines",
            data:
              totalData &&
              totalData.service_business_array &&
              totalData.service_business_array,
          },
        ]}
      />
    </div>
  );
};

export default TotalUserGraph;
