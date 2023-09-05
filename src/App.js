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
import TargetTuck from "./components/Games/TargetTuck";
import DigitDashy from "./components/Games/DigitDashy";
import MatchMasters from "./components/Games/MatchMasters";
import PlayGame from "./components/Kids/PlayGame";
import TaskSelect from "./components/Kids/TaskSelect";
import UploadMedia from "./components/AdminMode/UploadMedia";
import LearnObjects from "./components/Kids/LearnObjects";

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* <Route exact path="/" Component={Home} /> */}
        <Route exact path="/" Component={LearnObjects} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/user" Component={UserPanel} />
        <Route path="/user/dashboard" Component={TeacherDashboard} />
        <Route path="/user/gameselect" element={<GameSelect />} />
        <Route path="/user/gameselect/category" element={<Category />} />
        <Route path="/taskselect/learn" element={<Category />} />
        <Route path="/taskselect/playgame" element={<PlayGame />} />
        <Route path="/adminmode/uploadmedia" element={<UploadMedia />} />
        <Route path="/kids/learnobjects" element={<LearnObjects />} />
      </Routes>

      {/* teacher(admin) page*/}
      <Body />
    </>
  );
}

export default App;
