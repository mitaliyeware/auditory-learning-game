import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./AdminMode/Sidebar";

const Body = () => {
  const userDetails = useSelector((store) => store.login?.userDetails[0]);

  return (
    <div className="container-fluid">
      <div className="row">
        {userDetails?.userType !== "kid" && (
          <div className="col-md-auto">
            <Sidebar />
          </div>
        )}
        <div
          className={
            userDetails?.userType === "kid" ? "col-md-12" : "col-md-10"
          }>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Body;
