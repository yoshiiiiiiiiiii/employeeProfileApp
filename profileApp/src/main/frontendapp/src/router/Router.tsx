import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../components/pages/Login";
import { Home } from "../components/pages/Home";
import { EmployeeInfoList } from "../components/pages/EmployeeInfoList";
import { EmployeeResister } from "../components/pages/EmployeeResister";
import { Setting } from "../components/pages/Setting";
import { EditProfile } from "../components/pages/EditProfile";
import { EditPassword } from "../components/pages/EditPassword";
import { Page404 } from "../components/pages/Page404";
import { FC, memo } from "react";
import { useSelector } from "react-redux";

export const Router: FC = memo(() => {
  const isLoggedIn = useSelector((state:any) => state.auth.isLoggedIn);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />}></Route>
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Page404 />}
        ></Route>
        <Route
          path="/home/employeeInfoList"
          element={isLoggedIn ? <EmployeeInfoList /> : <Page404 />}
        ></Route>
        <Route
          path="/home/resister"
          element={isLoggedIn ? <EmployeeResister /> : <Page404 />}
        />
        <Route
          path="/home/setting"
          element={isLoggedIn ? <Setting /> : <Page404 />}
        ></Route>
        <Route
          path="/home/setting/editProfile"
          element={isLoggedIn ? <EditProfile /> : <Page404 />}
        />
        <Route
          path="/home/setting/editPassword"
          element={isLoggedIn ? <EditPassword /> : <Page404 />}
        ></Route>
        <Route path="*" element={<Page404 />}></Route>
      </Routes>
    </BrowserRouter>
  );
});
