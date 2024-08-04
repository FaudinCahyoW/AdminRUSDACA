import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SideBar from './component/sidebar/sideBarComp';
import DashboardPage from './component/halaman/Dashboard';
import "./App.css"
import DataWarga from './component/halaman/DataWarga';
import EditData from './component/halaman/editData';
import DataPengguna from './component/halaman/dataPengguna';
import EditPengguna from './component/halaman/editPengguna';

const App = () => {
  return (
    <BrowserRouter>
    <SideBar>
      <Routes>
        <Route path='/' element={<DashboardPage/>}/>
        <Route path='/datawarga' element={<DataWarga/>}/>
        <Route path='/data/editData/:id' element={<EditData/>}/>
        <Route path='/data/editPengguna/:id' element={<EditPengguna/>}/>
        <Route path='/data/user' element={<DataPengguna/>}/>
      </Routes>
    </SideBar>
    </BrowserRouter>
  );
};

export default App;
