import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import GameSelect from "./components/GameSelect";
import TeacherDashboard from "./components/AdminMode/TeacherDashboard";
import Category from "./components/Category";
import PeculiarPick from "./components/Games/PeculiarPick";
import TargetTuck from "./components/Games/TargetTuck";
import DigitDashy from "./components/Games/DigitDashy";
import MatchMasters from "./components/Games/MatchMasters";
import PlayGame from "./components/Kids/PlayGame";
import TaskSelect from "./components/Kids/TaskSelect";
import UploadMedia from "./components/UploadMedia";
import LearnObjects from "./components/Kids/LearnObjects";
import ParentDashboard from "./components/AdminMode/ParentDashboard";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";

import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function App() {
  const userType = useSelector((store) => store.login.userDetails[0]?.userType);
  const selectedKidMode = useSelector((store) => store.category.mode);

  return (
    <div>
      <Header />{" "}
      <Routes>
        {" "}
        {userType && (
          <Route
            path="/loginRedirect"
            element={<Navigate to={`/user/${userType}`} />}
          />
        )}
        <Route
          exact
          path="/"
          Component={Home}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />{" "}
        <Route
          path="/user"
          element={<Body />}>
          <Route
            path="teacher"
            element={<TeacherDashboard />}
          />
          <Route
            path="parent"
            element={<ParentDashboard />}
          />
          <Route
            path="kid"
            element={<TaskSelect />}
          />{" "}
          <Route
            path={`kid/${selectedKidMode}/category`}
            element={<Category />}
          />
          <Route
            path="play"
            element={<PlayGame />}
          />
          <Route
            path="game"
            element={<GameSelect />}
          />
          <Route
            path="profile"
            element={<Profile />}
          />{" "}
          {/* <Route
            path="kid/game/category"
            element={<Category />}
          /> */}
          <Route
            path="upload"
            element={<UploadMedia />}
          />
          <Route
            path="learnobjects"
            element={<LearnObjects />}
          />{" "}
          <Route
            path="game/matchmasters"
            element={<MatchMasters />}
          />
          <Route
            path="game/digitdashy"
            element={<DigitDashy />}
          />{" "}
          <Route
            path="game/peculiarpick"
            element={<PeculiarPick />}
          />
          <Route
            path="game/targettuck"
            element={<TargetTuck />}
          />{" "}
        </Route>
        <Route
          path="*"
          element={<NotFound />}
        />{" "}
      </Routes>{" "}
    </div>
  );
}

export default App;
