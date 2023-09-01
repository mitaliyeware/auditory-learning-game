import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector } from "react-redux";
import Home from "./Home";
import UserPanel from "./AdminMode/UserPanel";

const Body = () => {
  const userDetails = useSelector((store) => store.login.userDetails[0]);
  const isHomePageVisible = useSelector((store) => store.app.isHomePageVisible);

  return (
    <>
      {!userDetails && isHomePageVisible && <Home />}
      {userDetails && <UserPanel userDetails={userDetails} />}
    </>
  );
};

export default Body;
