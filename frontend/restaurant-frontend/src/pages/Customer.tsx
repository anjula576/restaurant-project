
import Layout from '../components/Layout.tsx'
import React, {useEffect, useState} from "react";
import DataTable from "../components/DataTable";
import axios from "axios";
import {Alert} from "@mui/material";
import AlertTitle from '@mui/material/AlertTitle';




function Customer() {

    const [customers, setCustomers] = useState([]);

    // this is changed when edit button pressed.
    const [isEditing, setIsEditing] = useState(false);

    // should pass the alertcolor to alert (can't pass the string type,becuase alert type expect a colour among 4 colours
    // like(success,info,warning,error).any string not valid in here.)
    // when import alert  as import ,some times it doesn't work
    //  this tells initially type can be those 4 types and messege contain string or sometimes can be set null(because use ir fate to mention them)
    // but now set null as  the initial value.
    const [alert, setAlert] = useState<{
        type: "success" | "error" | "warning" | "info";
        message: string
    } | null>(null);


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

            })
    }


    //  form field validations -----------------------------------------

    const [firstNameValid, setFirstNameValid] = useState<boolean | null>(null);
    const [lastNameValid, setLastNameValid] = useState<boolean | null>(null);
    const [emailValid, setEmailValid] = useState<boolean | null>(null);
    const [mobileValid, setMobileValid] = useState<boolean | null>(null);


    // The first / means start of regex literal.
    // The last / means end of regex literal.
    //  + means “one or more times”. (This is a quantifier in regex.)

    const namePatrn = /^[A-Za-z\s]{3,15}$/;
    const mobilePatrn = /^[0-9]{10}$/;

    // w - means Shorthand for word characters → [A-Za-z0-9_] (letters, digits, underscore).

    const emailPatrn = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    //  end of form validation----------------------------------------------

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



        setMobileValid(customer.mobileno ==""? false:mobilePatrn.test(customer.mobileno))
        setEmailValid(customer.email ==""? false:emailPatrn.test(customer.email))

    }

    const firstNamehandle = (e)=>{

        // eslint-disable-next-line prefer-const
        let { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });

        setFirstNameValid(customer.firstname ==""? false:namePatrn.test(customer.firstname));

    }

    const lastNamehandle = (e)=>{

        // eslint-disable-next-line prefer-const
        let { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });

        setLastNameValid(customer.lastname ==""? false:namePatrn.test(customer.lastname))

    }

    const mobileNohandle = (e)=>{

        // eslint-disable-next-line prefer-const
        let { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });

        setMobileValid(customer.mobileno ==""? false:mobilePatrn.test(customer.mobileno))

    }

    const emailhandle = (e)=>{

        // eslint-disable-next-line prefer-const
        let { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });

        setEmailValid(customer.email ==""? false:emailPatrn.test(customer.email))

    }

    const checkFormErrors=()=>{

        let errors = "";
        if (customer.firstname==""){
            errors = errors + "Please Fill the First name <br/>";
        }
        if (customer.lastname==""){
            errors = errors + "Please Fill the Last name <br/>";
        }if (customer.mobileno==""){
            errors = errors + "Please Fill the Mobile No <br/>";
        }if (customer.email==""){
            errors = errors + "Please Fill the Email <br/>";
        }if (customer.status==""){
            errors = errors + "Please select a status <br/>";
        }

        return errors;
    }

    const emptyCustomer = {
        id:null,
        firstname: "",
        lastname: "",
        email: "",
        mobileno: "",
        status: "",
    };

    //  update function
    const onUpdate = async () => {

        const formErrors = checkFormErrors();

        if (formErrors ==""){

            try {



                const res = await axios.put(`http://localhost:8080/api/customer/${customer.id}`, customer);console.log("response", res.data);

                // window.alert("customer deleted successfully")
                setAlert({type: "success", message: "Customer updated successfully" });

                //  set status false to isediting variable
                setIsEditing(false);

                //  clear the forms
                setCustomer(emptyCustomer);
                //  empty the select customer object array
                //setSelectedCustomer(null);

                // get updated customer list
                getCustomers();

                // remove validations

                document.getElementById("txtFirstName").classList.remove("is-valid","is-invalid");
                document.getElementById("txtLastName").classList.remove("is-valid","is-invalid");
                document.getElementById("txtMobileNo").classList.remove("is-valid","is-invalid");
                document.getElementById("txtEmail").classList.remove("is-valid","is-invalid");
                document.getElementById("txtNotes").classList.remove("is-valid","is-invalid");

                //  this is the timeout function to use to set null to already opened alert
                //  after that automatically close the alert
                setTimeout(()=>{setAlert(null)},3000)

            } catch (error) {
                console.error("Error", error)

            }


        }else {
            window.alert(formErrors);

        }

    }

        //  submit function

        const onSubmit = async (e) => {

            // from here,disable the page refresh when submitting the form.
            e.preventDefault();

        const formErrors = checkFormErrors()

            if (formErrors==""){
                try {
                    await axios.post("http://localhost:8080/api/customer", customer);
// window.alert("customer deleted successfully")
                    setAlert({type: "success", message: "Customer added successfully" });


                    getCustomers();

                    //  clear the forms
                    setCustomer(emptyCustomer);

                    // remove validations

                    document.getElementById("txtFirstName").classList.remove("is-valid","is-invalid");
                    document.getElementById("txtLastName").classList.remove("is-valid","is-invalid");
                    document.getElementById("txtMobileNo").classList.remove("is-valid","is-invalid");
                    document.getElementById("txtEmail").classList.remove("is-valid","is-invalid");
                    document.getElementById("txtNotes").classList.remove("is-valid","is-invalid");


                    //  this is the timeout function to use to set null to already opened alert
                    //  after that automatically close the alert
                    setTimeout(()=>{setAlert(null)},3000)

                } catch (error) {
                    console.error("Error", error)

                }
            }else{
                window.alert("Please fill the required fields"+ formErrors)

            }



        }

        //  this call when editing the form
        const handleEdit =(row)=>{

        //     change the isEditing status
            setIsEditing(true);
          //  setSelectedCustomer(row);
            setCustomer(row);
        }




        //  delete function
        const deleteCustomer =async (id)=>{

        const confirmDlt =window.confirm("Are you sure to delete?")
            if (confirmDlt){
                try {
                 await axios.delete(`http://localhost:8080/api/customer/${id}`);

                // window.alert("customer deleted successfully")
                    setAlert({type: "success", message: "Customer deleted successfully" });

                    // setCustomers(customers.filter((c)=>c.id !==id))
                    getCustomers();

                    //  this is the timeout function to use to set null to already opened alert
                    //  after that automatically close the alert
                    setTimeout(()=>{setAlert(null)},3000)

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
                                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse">
                                        <div className="accordion-body">
                                            <form onSubmit={onSubmit}>
                                                <div className="row">
                                                    {/*first name*/}
                                                    <div className="col-lg-4 col-12">
                                                        <label htmlFor="txtFirstName" className="form-label">
                                                            First Name</label>
                                                        <input type="text"
                                                               value={customer.firstname}
                                                               name="firstname" onChange={firstNamehandle}

                                                               //  (`)-It’s called a backtick.On most keyboards it’s just under the Esc key (top left).
                                                               // Backticks are used for template literals.
                                                            //to use template literals in JavaScript for embedding variables, expressions, or writing multi-line strings.
                                                            // and in here uses the nested if

                                                               className={`form-control ${
                                                                   firstNameValid === null
                                                                       ? ""
                                                                       : firstNameValid
                                                                           ? "is-valid"
                                                                           : "is-invalid"
                                                               }`} id="txtFirstName"
                                                              />
                                                    </div>

                                                    {/*last name*/}
                                                    <div className="col-lg-4 col-12">
                                                        <label htmlFor="txtLastName" className="form-label">Last
                                                            Name</label>
                                                        <input type="text"
                                                               value={customer.lastname}
                                                               name="lastname" onChange={lastNamehandle}
                                                               className={`form-control ${
                                                                   lastNameValid === null
                                                                       ? ""
                                                                       : lastNameValid
                                                                           ? "is-valid"
                                                                           : "is-invalid"
                                                               }`} id="txtLastName"
                                                               />
                                                    </div>

                                                    {/*mobile no*/}
                                                    <div className="col-lg-4 col-12">
                                                        <label htmlFor="txtMobileNo" className="form-label">Mobile
                                                            No</label>
                                                        <input type="text"
                                                               value={customer.mobileno}

                                                               /* in here use onblur*/
                                                               /*When you type the 10th digit, your state may still not have
                                                               updated in time (React state updates are async), so the regex test happens with 9 digits.
                                                                Then when you type the 11th, it finally has the full 10 digits.*/
                                                                /*Validate on blur (when user leaves the field)*/


                                                               name="mobileno"
                                                               onChange={mobileNohandle}
                                                               onBlur={() => setMobileValid(/^[0-9]{10}$/.test(customer.mobileno))}
                                                               className={`form-control ${
                                                                   mobileValid === null
                                                                       ? ""
                                                                       : mobileValid
                                                                           ? "is-valid"
                                                                           : "is-invalid"
                                                               }`} id="txtMobileNo"
                                                              />
                                                    </div>


                                                </div>

                                                <br/>
                                                <div className="row">
                                                    <div className="col-lg-4 col-12">

                                                        {/*email*/}

                                                        <label htmlFor="txtEmail" className="form-label">Email</label>
                                                        <input type="email"
                                                               value={customer.email}
                                                               name="email" onChange={emailhandle}
                                                               className={`form-control ${
                                                                   emailValid === null
                                                                       ? ""
                                                                       : emailValid
                                                                           ? "is-valid"
                                                                           : "is-invalid"
                                                               }`} id="txtEmail"

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

                                                    {/* check isEditing is true. if true show the update button ,if false show the submit button*/}
                                                    {isEditing ? (<button type="button" onClick={() => {
                                                        onUpdate();
                                                    }} className="btn btn-primary">Update</button>) : (
                                                        <button type="submit" className="btn btn-primary">Add New
                                                            Customer</button>)}

                                                    {/*this is conditional reading.div show only if alert is not null*/}
                                                    {alert && (
                                                        //  this div style is used to change the position of the alert
                                                        <div className="col-4" style={{
                                                            position: "fixed",
                                                            top: "20px",
                                                            right: "20px",
                                                            zIndex: 9999,
                                                            minWidth: "300px"
                                                        }}>
                                                            <Alert variant="filled" severity={alert.type} onClose={() => setAlert(null)}>
                                                                <AlertTitle>Success</AlertTitle>
                                                                {alert.message}
                                                            </Alert>
                                                        </div>
                                                    )}
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



            </>

        );
    }

export default Customer;
