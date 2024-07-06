import React , { useEffect } from "react" ;
import ReactDom from "react-dom" ;
import Sidemenu from "../Sidemenu.jsx";
import Sun from "./Sunday.jsx";
import Mon from "./Monday.jsx";
import Tue from "./Tuesday.jsx";
import Wed from "./Wednesday.jsx";
import Thu from "./Thursday.jsx";
import Fri from "./Friday.jsx";
import Sat from "./Saturday.jsx";

function WeekPage(props){
    var [day, setDay] = React.useState("");
    var [body, setBody] = React.useState(<p></p>);
    useEffect(() => {
      if (day == "Sunday") {
        setBody(<Sun id={props.id} />);
      }
      if (day == "Monday") {
        console.log("Monday clicked by user "+ props.id) ;
        setBody(<Mon id={props.id} />);
      }
      if (day == "Tuesday") {
        setBody(<Tue id={props.id} />);
      }
      if (day == "Wednesday") {
        setBody(<Wed id={props.id} />);
      }
      if (day == "Thursday") {
        setBody(<Thu id={props.id} />);
      }
      if (day == "Friday") {
        setBody(<Fri id={props.id} />);
      }
      if (day == "Saturday") {
        setBody(<Sat id={props.id} />);
      }
    }, [day]);
    const ChangeDay = (selectedDay) => {
      setDay(selectedDay);
    };

    return (
      <div className="container">
        <div className="sideMenu">
          <Sidemenu ChangeDay={ChangeDay} />
        </div>
        <div className="rf">
          <div className="NavBar">
            <span style={{ marginLeft: "auto" }}>Profile</span>
          </div>
          {body}
        </div>
      </div>
    );
}

export default WeekPage ;