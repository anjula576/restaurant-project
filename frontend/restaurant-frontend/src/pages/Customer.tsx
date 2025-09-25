
import Layout from '../components/Layout.tsx'
import {useEffect, useState} from "react";
import DataTable from "../components/DataTable";

function Customer() {

    const [customers,setCustomers]=useState([]);

    const columns =[
        {title:"ID",property:"id"},
        {title:"First Name",property:"firstname"},
        {title:"Last Name",property:"lastname"},
        {title:"Email",property:"email"},
        {title:"Mobile No",property:"mobileno"},
        {title:"Status",property:"status"}
    ];

    useEffect(()=>{
        fetch("http://localhost:8080/api/customer")
            .then((res)=>res.json())
            .then((data)=>{

                setCustomers(data);

                console.log("Customers",data);
            })
    },[])
    console.log("columns",columns);
    console.log("Customers1",customers);

    return (
        <>



            <Layout>
                <div className="row">
                    <div className="col-12 col-md-12 col-lg-12">
                        <div className="accordion ms-2 me-2" id="accordionPanelsStayOpenExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                                            aria-controls="panelsStayOpen-collapseOne">
                                        Customer Form
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                                    <div className="accordion-body">
                                        <strong>This is the first item’s accordion body.</strong> It is shown by
                                        default,
                                        until the
                                        collapse plugin adds the appropriate classes that we use to style each element.
                                        These
                                        classes control the overall appearance, as well as the showing and hiding via
                                        CSS
                                        transitions. You can modify any of this with custom CSS or overriding our
                                        default
                                        variables.
                                        It’s also worth noting that just about any HTML can go within
                                        the <code>.accordion-body</code>, though the transition does limit overflow.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false"
                                            aria-controls="panelsStayOpen-collapseTwo">
                                        Customer List
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse show">
                                    <div className="accordion-body">

                                        <DataTable columns={columns} data={customers}/>




                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </Layout>


        </>

    );
}

export default Customer;
