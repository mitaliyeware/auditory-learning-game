import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import GameSelect from "./components/GameSelect";

import { Route, Routes } from "react-router-dom";
import UserPanel from "./components/AdminMode/UserPanel";
import TeacherDashboard from "./components/AdminMode/TeacherDashboard";
import Category from "./components/Category";
import PeculiarPick from "./components/Games/PeculiarPick";

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* <Route exact path="/" Component={Home} /> */}

        <Route exact path="/login" Component={Login} />
        <Route exact path="/register" Component={Register} />
        <Route exact path="/user" Component={UserPanel} />
        <Route exact path="/user/dashboard" Component={TeacherDashboard} />
        <Route path="/user/gameselect" element={<GameSelect />} />
        <Route path="/user/gameselect/category" element={<Category />} />
      </Routes>

      {/* teacher(admin) page*/}
      <Body />
    </>
  );
}

export default App;
