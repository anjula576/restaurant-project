

import Customer from "./pages/Customer.tsx";
import Sidebar from "./components/Sidebar.tsx";
import Navbar from "./components/Navbar.tsx";
import Content from "./components/Content.tsx";
import Menu from "./pages/Menu.tsx";
import React from "react";
// import {Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Order from "./pages/Order.tsx";
import Reservation from "./pages/Reservation.tsx";
import Item from "./pages/Item.tsx";
import Supplier from "./pages/Supplier.tsx";


function App() {

    return (

        <Router>
            <div className="d-flex">
                <Sidebar/>
                <div className="flex-grow-1">
                    <Navbar/>
                    <Content>
                        <Routes>
                            <Route path={"/"} element={<Dashboard/>}></Route>
                            <Route path={"/customer"} element={<Customer/>}></Route>
                            <Route path={"/order"} element={<Order/>}></Route>
                            <Route path={"/menu"} element={<Menu/>}></Route>
                            <Route path={"/reservation"} element={<Reservation/>}></Route>
                            <Route path={"/item"} element={<Item/>}></Route>
                            <Route path={"/supplier"} element={<Supplier/>}></Route>
                        </Routes>
                    </Content>
                </div>
            </div>


        </Router>


    );
}


export default App;
