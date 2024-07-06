import React, { useEffect } from "react";
import ReactDom from "react-dom";
import Registration from "./Registration.jsx";
import Login from "./Login.jsx";
import WeekPage from "./WeekDays/WeekPage.jsx";

function Body() {
  var [page, setPage] = React.useState(
    <Registration ToLoginPage={ToLoginPage} ToWeekPage={ToWeekPage} />
  );

  function ToWeekPage(props) {
    console.log(props.id + "going to week page") ;
    setPage(<WeekPage id={props.id} />);
  }

  function ToLoginPage() {
    setPage(<Login ToWeekPage={ToWeekPage} />);
  }

  return <div className="App">{page}</div>;
}

export default Body;
