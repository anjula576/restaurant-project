
import Layout from '../components/Layout.tsx'
import {useEffect, useState} from "react";
import DataTable from "../components/DataTable";
import axios from "axios";

function Customer() {

    const [customers, setCustomers] = useState([]);

    // this is changed when edit button pressed.
    const [isEditing, setIsEditing] = useState(false);

    const [customer, setCustomer] = useState({
        id:null,
        firstname: "",
        lastname: "",
        email: "",
        mobileno: "",
        status: "",
    })



    // this is used to refill the form
    // const [selectCustomer, setSelectedCustomer] = useState(null);

    const getCustomers = () => {
        fetch("http://localhost:8080/api/customer")
            .then((res) => res.json())
            .then((data) => {

                setCustomers(data);

                console.log("Customers", data);
            })
    }
    const customerHandle = (e) => {


        // this is same to
        // let name = e.target.name;
        // let value = e.target.value;
        //below way is the shortest way to do that

        // eslint-disable-next-line prefer-const
        let { name, value } = e.target;

        // If value is the string "true" → it becomes true
        // If value is anything else ("false", "abc", empty, etc.) → it becomes false
       // So no need for a separate "false" condition — one line handles both.

        if (name === "status") {
            value = value === "true";   // Convert string to boolean
        }
        setCustomer({ ...customer, [name]: value });

       // setCustomer({...customer, [e.target.name]: e.target.value})
    }

    const emptyCustomer = {
        id:null,
        firstname: "",
        lastname: "",
        email: "",
        mobileno: "",
        status: "",
    };


    const onUpdate = async () => {

        try {

            const res = await axios.put(`http://localhost:8080/api/customer/${customer.id}`, customer);
            console.log("response", res.data);
            window.alert("Successfully updated the customer");

            //  set status false to isediting variable
            setIsEditing(false);

            //  clear the forms
            setCustomer(emptyCustomer);
            //  empty the select customer object array
            //setSelectedCustomer(null);

            // get updated customer list
            getCustomers();

        } catch (error) {
            console.error("Error", error)

        }
    }

        const onSubmit = async (e) => {

            // from here,disable the page refresh when submitting the form.
            e.preventDefault();

            try {
                const res = await axios.post("http://localhost:8080/api/customer", customer);
                console.log("response", res.data);
                window.alert("Successfully saved the customer");

                getCustomers();

                //  clear the forms
                setCustomer(emptyCustomer);

            } catch (error) {
                console.error("Error", error)

            }
        }

        //  this call when editing the form
        const handleEdit =(row)=>{

        //     change the isEditing status
            setIsEditing(true);
          //  setSelectedCustomer(row);
            setCustomer(row);
        }

        const deleteCustomer =async (id)=>{

        const confirmDlt =window.confirm("Are you sure to delete?")
            if (confirmDlt){
                try {
                 await axios.delete(`http://localhost:8080/api/customer/${id}`);

                 window.alert("customer deleted successfully")

                   // setCustomers(customers.filter((c)=>c.id !==id))
                    getCustomers();
                }catch (e) {
                    console.error("Delete error",e)
                }
            }

        }


        const columns = [
            {title: "ID", property: "id"},
            {title: "First Name", property: "firstname"},
            {title: "Last Name", property: "lastname"},
            {title: "Email", property: "email"},
            {title: "Mobile No", property: "mobileno"},
            {title: "Status", property: "status"}
        ];


        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            getCustomers();
        }, [])


        console.log("columns", columns);
        console.log("Customers1", customers);

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
                                            <form onSubmit={onSubmit}>
                                                <div className="row">
                                                    {/*first name*/}
                                                    <div className="col-lg-4 col-12">
                                                        <label htmlFor="txtFirstName" className="form-label">
                                                            First Name</label>
                                                        <input type="text"
                                                               value={customer.firstname}
                                                               name="firstname" onChange={customerHandle}
                                                               className="form-control" id="txtFirstName"
                                                               aria-describedby="emailHelp"/>
                                                    </div>

                                                    {/*last name*/}
                                                    <div className="col-lg-4 col-12">
                                                        <label htmlFor="txtLastName" className="form-label">Last
                                                            Name</label>
                                                        <input type="text"
                                                               value={customer.lastname}
                                                               name="lastname" onChange={customerHandle}
                                                               className="form-control" id="txtLastName"
                                                               aria-describedby="emailHelp"/>
                                                    </div>

                                                    {/*mobile no*/}
                                                    <div className="col-lg-4 col-12">
                                                        <label htmlFor="txtMobileNo" className="form-label">Mobile
                                                            No</label>
                                                        <input type="text"
                                                               value={customer.mobileno}
                                                               name="mobileno" onChange={customerHandle}
                                                               className="form-control" id="txtMobileNo"
                                                               aria-describedby="emailHelp"/>
                                                    </div>


                                                </div>

                                                <br/>
                                                <div className="row">
                                                    <div className="col-lg-4 col-12">

                                                        {/*email*/}

                                                        <label htmlFor="txtEmail" className="form-label">Email</label>
                                                        <input type="email"
                                                               value={customer.email}
                                                               name="email" onChange={customerHandle}
                                                               className="form-control" id="txtEmail"

                                                               aria-describedby="emailHelp"/>


                                                    </div>
                                                    {/*active status*/}

                                                    <br/>

                                                    <div className="col-1 mt-4">

                                                        <div className="form-check">
                                                            <input className="form-check-input" type="radio"
                                                                   name="status" onChange={customerHandle}
                                                                   id="activeSts"
                                                                   checked={customer?.status === true}
                                                                   value="true"/>
                                                            <label className="form-check-label" htmlFor="activeSts">
                                                                Active
                                                            </label>
                                                        </div>

                                                    </div>


                                                    <div className="col-2 mt-4">

                                                        {/*inactive status*/}
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="radio"
                                                                   name="status" onChange={customerHandle}
                                                                   checked={customer?.status === false}
                                                                   id="inactiveSts" value="false"/>
                                                            <label className="form-check-label" htmlFor="inactiveSts">
                                                                In-Active
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div className="col-4">
                                                        <label htmlFor="txtNotes" className="form-label">Notes</label>
                                                        <textarea className="form-control" id="txtNotes"
                                                                  rows="3"></textarea>
                                                    </div>
                                                </div>

                                                <br/>
                                                <div className="row">
                                                    {isEditing ? (<button type="button" onClick={() => {
                                                        onUpdate();
                                                    }} className="btn btn-primary">Update</button>) : (
                                                        <button type="submit" className="btn btn-primary">Add New
                                                            Customer</button>)}

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
                                            Customer List
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse show">
                                        <div className="accordion-body">

                                            {/*use key when need to update a component when change the count*/}
                                            {/* in here when change the customer count automatically unmount the datatable component
                                        and remount.this is an easier way to update component when list an list updates*/}
                                            <DataTable key={customers.length} columns={columns} data={customers}
                                                       onEdit={(row) => handleEdit(row)} onDelete={(id)=>deleteCustomer(id)}/>


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
