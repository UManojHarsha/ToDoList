import React, { useState } from "react";
import ReactDom from "react-dom";
import axios from "axios";

function RegistrationPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning , setWarning] = useState(null) ;

  const HandleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const HandlePasswordChange = (e) => {
    console.log(password) ;
    setPassword(e.target.value);
  };

  async function HandleClick(e) {
    e.preventDefault();
    console.log(username) ;
    console.log(password) ;
    try{
      const result = await axios.post("http://localhost:5000/addUser", {
        username,
        password,
      });
      setWarning(<p>User with id={result.data.id} registered</p>) ;
      props.ToWeekPage({id: result.data.id}) ;
    }
    catch(error){
      if (error.response && error.response.status === 409) {
        setWarning(<p>User already exists</p>);
      } else {
        setWarning(<p>Error registering user {error.response.status}</p>);
      }
      console.error("Error registering user", error);
    }
  }

  return (
    <div>
      <h1>Welcome! Create a account and maintain your own to-do list</h1>
      {warning}
      <form>
        <input
          name="username"
          type="text"
          placeholder="username"
          value={username}
          onChange={HandleUsernameChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={HandlePasswordChange}
        />
        <button type="button" onClick = {HandleClick}>
          Register
        </button>
      </form>
      <div>
        <p onClick={props.ToLoginPage}>Already a user?Click here to sign in</p>
      </div>
    </div>
  );
}

export default RegistrationPage;
