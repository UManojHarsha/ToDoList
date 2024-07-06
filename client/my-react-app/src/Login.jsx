import React , { useState } from "react";
import ReactDom from "react-dom";
import axios from "axios" ;

function LoginPage(props) {
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
      const result = await axios.post("http://localhost:5000/loginUser", {
        username,
        password,
      });
      props.ToWeekPage({id: result.data.id}) ;
      setWarning(<p>User with id={result.data.id} found</p>)
    }
    catch(error){
      if (error.response && error.response.status === 401) {
        setWarning(<p>Invalid username or password</p>);
      } else {
        setWarning(<p>Error logging in user, try again {error.response.status}</p>);
      }
      console.error("Error logging in user", error);
    }
  }

  return (
    <div>
      <h1>Welcome back! Login to your account to continue</h1>
      {warning}
      <form>
        <input name="username"
          type="text"
          placeholder="username"
          value={username}
          onChange={HandleUsernameChange}
        />
        <input name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={HandlePasswordChange} 
        />
        <button type="button" onClick={HandleClick}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
