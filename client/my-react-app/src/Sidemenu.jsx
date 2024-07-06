import React, { useState } from "react";
import ReactDom from "react-dom";

function SideMenu(props) {
  var weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div>
      <p style={{ fontSize: 30 }}>Check your status</p>
      {weekDays.map((day) => {
        return (
          <div
            className="sideMenu-day"
            name={day}
            onClick={() => props.ChangeDay(day)}
          >
            <p>{day}</p>
          </div>
        );
      })}
    </div>
  );
}

export default SideMenu;
