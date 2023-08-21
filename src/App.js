import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

import { Route, Routes } from "react-router-dom";
import UserPanel from "./components/UserPanel";
import TeacherDashboard from "./components/TeacherDashboard";

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* <Route exact path="/" Component={Home} /> */}
        <Route exact path="/login" Component={Login} />
        <Route exact path="/register" Component={Register} />
        <Route exact path="/user" Component={UserPanel} />
        <Route exact path="/dashboard" Component={TeacherDashboard} />
      </Routes>

      {/* teacher(admin) page*/}
      <Body />
    </>
  );
}

export default App;
