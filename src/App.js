import React from "react";
import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import CardCourse from "./Component/DataDisplay/CardCourse";
import CardVideo from "./Component/DataDisplay/CardVideo";
import Page404 from "./Component/Pages/Page404";
import Course from "./Component/Pages/Course";
import Home from "./Component/Pages/Home";
import LogIn from "./Auth/LogIn";
import Cookies from 'js-cookie'
import DataPengguna from "./Component/DataDisplay/DataPengguna";
import DataGuru from "./Component/DataDisplay/DataGuru";
import Dashboard from "./Component/Pages/Dashboard";
import Pengguna from "./Component/Pages/Pengguna";
import Guru from "./Component/Pages/Guru";

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
              <Route path="/" element={<LogIn />}  />
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element = {<Dashboard /> } />
              <Route path="/pengguna" element={<Pengguna /> } />
              <Route path="/guru" element={<Guru />} />
              <Route path="/kursus" element={<Course />} />
              <Route path="/kursus" >
                <Route path=":courseName" element={<CardCourse />} />
                <Route path=":courseName/:idKursus/:idVideo" element={<CardVideo />} />
              </Route>
              <Route path="/*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
