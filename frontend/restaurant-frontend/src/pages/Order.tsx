import {Alert} from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import DataTable from "../components/DataTable.tsx";
import React, {useState} from "react";


function Order(){

    const [orders, setOrders] = useState([]);

    // this is changed when edit button pressed.
    const [isEditing, setIsEditing] = useState(false);

    // should pass the alert color to alert (can't pass the string type,becuase alert type expect a colour among 4 colours
    // like(success,info,warning,error).any string not valid in here.)
    // when import alert  as import ,sometime it doesn't work
    //  this tells initially type can be those 4 types and message contain string or sometimes can be set null(because use ir fate to mention them)
    // but now set null as  the initial value.
    const [alert, setAlert] = useState<{
        type: "success" | "error" | "warning" | "info";
        message: string
    } | null>(null);


    const [order, setOrder] = useState({
        id:null,
        totalamount: "",
        orderdate: "",
        paymentstatus: "",
        status: "",
        ordertype:"",
    })

    // this is used to refill the form

    const getOrders = () => {
        fetch("http://localhost:8080/api/order")
            .then((res) => res.json())
            .then((data) => {

                setOrders(data);

            })
    }




    return(
        <>



            <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                    <div className="accordion ms-2 me-2" id="accordionPanelsStayOpenExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                                        aria-controls="panelsStayOpen-collapseOne">
                                    Order Form
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse">
                                <div className="accordion-body">
                                    <form >


                                        <div className="row d-flex">


                                                {/* first column*/}
                                                <div className="col-12 col-md-6 col-lg-6 ">

                                                        {/*customer*/}
                                                        <div className="row">
                                                            <label className="form-label" htmlFor="selectCustomer">Customer</label>
                                                            <select className="form-select" id="selectCustomer">
                                                                <option>Option 1</option>
                                                                <option>Option 1</option>
                                                            </select>
                                                        </div>

                                                    {/*total amount*/}
                                                    <div className="row d-flex">
                                                        <div className="col-12 col-md-6 col-lg-6">
                                                            <label htmlFor="totalAmount" className="form-label">Total
                                                                Amount</label>
                                                            <div className="input-group">
                                                                <span className="input-group-text">LKR</span>
                                                                <input type="text" className="form-control"
                                                                       id="totalAmount"/>
                                                                <span className="input-group-text">.00</span>
                                                            </div>


                                                        </div>
                                                        {/*    order date*/}
                                                        <div className="col-12 col-md-6 col-lg-6">
                                                            <label className="pt-2">Order Date</label>
                                                            <input type="date" className="form-control"
                                                                   id="selectDate"/>
                                                        </div>




                                                        <div className="row d-flex">

                                                            {/*    order type*/}
                                                            <div className="col-6">
                                                                <label className="form-label">Order Type</label>
                                                                <select className="form-select" id="selectOrderType">
                                                                    <option>Dine In</option>
                                                                    <option>Take Away</option>
                                                                </select>
                                                            </div>

                                                            <div className="col-6">

                                                                {/*    order status*/}
                                                                <label className="form-label" htmlFor="selectOrderSts">Order
                                                                    status</label>
                                                                <input className="form-control" id="selectOrderSts"/>
                                                            </div>

                                                        </div>


                                                    </div>

                                                </div>

                                                {/*second column*/}

                                                <div className="col-12 col-md-6 col-lg-6 bg-success">
                                                    <h2>column</h2>
                                                </div>

                                        </div>


                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false"
                                        aria-controls="panelsStayOpen-collapseTwo">
                                    Order List
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse show">
                                <div className="accordion-body">
                                    <h1>asd</h1>

                                    {/*use key when need to update a component when change the count*/}
                                    {/* in here when change the customer count automatically unmount the datatable component
                                        and remount.this is an easier way to update component when list an list updates*/}
                                    {/*<DataTable key={orders.length} columns={columns} data={orders}*/}
                                    {/*           onEdit={(row) => handleEdit(row)} onDelete={(id)=>deleteCustomer(id)}/>*/}


                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>



        </>
    )
}

export default Order;