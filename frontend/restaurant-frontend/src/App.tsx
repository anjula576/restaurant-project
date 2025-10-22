

import Customer from "./pages/Customer.tsx";
import Sidebar from "./components/Sidebar.tsx";
import Navbar from "./components/Navbar.tsx";
import Content from "./components/Content.tsx";
import React from "react";
// import {Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Order from "./pages/Order.tsx";


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
                    </Routes>
                </Content>
            </div>
        </div>


        </Router>



    );
}


export default App;
