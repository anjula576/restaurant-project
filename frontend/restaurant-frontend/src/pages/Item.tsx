import {Alert} from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import DataTable from "../components/DataTable.tsx";
import React from "react";


function Item(){

    return (
        <>



            <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                    <div className="accordion ms-2 me-2" id="accordionPanelsStayOpenExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                                        aria-controls="panelsStayOpen-collapseOne">
                                    Item Form
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse">
                                <div className="accordion-body">
                                    <form >
                                        <div className="row">
                                            {/*item name*/}
                                            <div className="col-lg-4 col-12">
                                                <label htmlFor="txtItemName" className="form-label">
                                                    Item Name</label>
                                                <input type="text" className="form-control"

                                                       name="itemname"

                                                    //  (`)-It’s called a backtick.On most keyboards it’s just under the Esc key (top left).
                                                    // Backticks are used for template literals.
                                                    //to use template literals in JavaScript for embedding variables, expressions, or writing multi-line strings.
                                                    // and in here uses the nested if

                                                       id="txtItemName"
                                                />
                                            </div>

                                            {/*total qty*/}
                                            <div className="col-lg-4 col-12">
                                                <label htmlFor="txTotalQty" className="form-label">Total Quantity</label>
                                                <input type="text" className="form-control"

                                                    /* in here use onblur*/
                                                    /*When you type the 10th digit, your state may still not have
                                                    updated in time (React state updates are async), so the regex test happens with 9 digits.
                                                     Then when you type the 11th, it finally has the full 10 digits.*/
                                                    /*Validate on blur (when user leaves the field)*/


                                                       name="totalquantity"
                                                       id="txTotalQty"
                                                />
                                            </div>

                                            {/*available qty*/}
                                            <div className="col-lg-4 col-12">
                                                <label htmlFor="txtAvailableQty" className="form-label">Available Quantity</label>
                                                <input type="text" className="form-control"
                                                       name="itemqty"
                                                      id="txtAvailableQty"
                                                />
                                            </div>




                                        </div>

                                        <br/>
                                        <div className="row">
                                            <div className="col-lg-4 col-12">

                                                {/*unit*/}

                                                <label htmlFor="selectUnit" className="form-label">Unit</label>
                                                <select className="form-select">
                                                    <option>g</option>
                                                    <option>Kg</option>
                                                    <option>Items</option>
                                                    <option>Packets</option>

                                                </select>


                                            </div>
                                            {/*Purchase Price*/}

                                            <br/>

                                            <div className="col-lg-4 col-12">
                                                <label htmlFor="txtPurchasePrice" className="form-label">Purchase
                                                    Price</label>
                                                <input type="text" className="form-control"
                                                       name="purchaseprice"
                                                       id="txtPurchasePrice"
                                                />
                                            </div>


                                            <div className="col-2 mt-4">

                                                <div className="col-lg-4 col-12">
                                                    <label htmlFor="txtRop" className="form-label">ROP</label>
                                                    <input type="text" className="form-control"
                                                           name="rop"
                                                           id="txtRop"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-2 mt-4">

                                                {/*roq*/}
                                                <div className="col-lg-4 col-12">
                                                    <label htmlFor="txtROQ" className="form-label">ROQ</label>
                                                    <input type="text" className="form-control"
                                                           name="roq"
                                                           id="txtRoq"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <br/>
                                        <div className="row">

                                            {/* check isEditing is true. if true show the update button ,if false show the submit button*/}
                                            {/*{isEditing ? (<button type="button" onClick={() => {*/}
                                            {/*    onUpdate();*/}
                                            {/*}} className="btn btn-primary">Update</button>) : (*/}
                                            {/*    <button type="submit" className="btn btn-primary">Add New*/}
                                            {/*        Customer</button>)}*/}

                                            {/*this is conditional reading.div show only if alert is not null*/}
                                            {/*{alert && (*/}
                                            {/*    //  this div style is used to change the position of the alert*/}
                                            {/*    <div className="col-4" style={{*/}
                                            {/*        position: "fixed",*/}
                                            {/*        top: "20px",*/}
                                            {/*        right: "20px",*/}
                                            {/*        zIndex: 9999,*/}
                                            {/*        minWidth: "300px"*/}
                                            {/*    }}>*/}
                                            {/*        <Alert variant="filled">*/}
                                            {/*            <AlertTitle>Success</AlertTitle>*/}

                                            {/*        </Alert>*/}
                                            {/*    </div>*/}
                                            {/*)}*/}
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
                                    Items List
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse show">
                                <div className="accordion-body">

                                    {/*use key when need to update a component when change the count*/}
                                    {/* in here when change the customer count automatically unmount the datatable component
                                        and remount.this is an easier way to update component when list an list updates*/}
                                    {/*<DataTable key={customers.length} columns={columns} data={customers}*/}
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

export default Item;