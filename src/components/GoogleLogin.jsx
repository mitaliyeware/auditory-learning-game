import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const GoogleLogin = () => {
  const [user, setUser] = useState({});
  //const clientId = process.env.OAUTH_CLIENT_ID;
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "266047439759-fvarqjjbnb1963fjb46chpo9sr8aunni.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  });

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token:" + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }
  return (
    <>
      <div id="signInDiv"></div>
      {Object.keys(user).length != 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}
      {user && (
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      )}
    </>
  );
};

export default GoogleLogin;
