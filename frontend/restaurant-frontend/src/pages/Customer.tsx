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

    // should pass the alert color to alert (can't pass the string type,becuase alert type expect a colour among 4 colours
    // like(success,info,warning,error).any string not valid in here.)
    // when import alert  as import ,some times it doesn't work
    //  this tells initially type can be those 4 types and messege contain string or sometimes can be set null(because use ir fate to mention them)
    // but now set null as  the initial value.
    const [alert, setAlert] = useState<{
        type: "success" | "error" | "warning" | "info";
        message: string
    } | null>(null);

    // this is usedstate function
    // this is used to store the form data when add new customer or edit the customer
    //  speciality in here is mentied the initial values of the form fields in the useState function
    const [customer, setCustomer] = useState<{
        id: number | null;
        firstname: string;
        lastname: string;
        email: string;
        mobileno: string;
        status: string | boolean;
    }>({
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

    interface FormEvent {
        target: HTMLInputElement | HTMLTextAreaElement;
    }

    const customerHandle = (e: FormEvent): void => {
        // this is same to
        // let name = e.target.name;
        // let value = e.target.value;
        //below way is the shortest way to do that

        // eslint-disable-next-line prefer-const
        let { name, value } = e.target;

        // If value is the string "true" → it becomes true
        // If value is anything else ("false", "abc", empty, etc.) → it becomes false
        // So no need for a separate "false" condition — one line handles both.

        //  in here we are checking the name of the field is status or not. if the name is status,
        //  then we need to convert the string value to boolean before setting it to the customer state.
        //  because in the form we are using radio buttons for status field and the value of radio button is string("true" or "false"). 
        // but in the backend we are expecting boolean value(true or false). so we need to convert the string value to boolean before setting it to the customer state.
        let finalValue: string | boolean = value;
        if (name === "status") {
            finalValue = value === "true";   // Convert string to boolean
        }
        setCustomer({ ...customer, [name]: finalValue });

        // setCustomer({...customer, [e.target.name]: e.target.value})

        setMobileValid(customer.mobileno === "" ? false : mobilePatrn.test(customer.mobileno));
        setEmailValid(customer.email === "" ? false : emailPatrn.test(customer.email));
    }

    //  first name handle and validation    ---------------------------------
    const firstNamehandle = (e: FormEvent): void => {

              // eslint-disable-next-line prefer-const
        let { name, value } = e.target;
        setCustomer({ ...customer, [name]: value })
        

        }


    const CheckFirstNameValid = (e:any) => {

    const value = e.target.value;

    if (value === "") {
        setFirstNameValid(false);
    } else {
        setFirstNameValid(namePatrn.test(value));
    }
};


// lastname handle and validation ---------------------------------

    const lastNamehandle = (e:any)=>{

        // eslint-disable-next-line prefer-const
        let { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });

    }


    
    const CheckLastNameValid = (e:any) => {

    const value = e.target.value;

    if (value === "") {
        setLastNameValid(false);
    } else {
        setLastNameValid(namePatrn.test(value));
    }
};


// mobile number handle and validation ---------------------------------

    const mobileNohandle = (e: React.ChangeEvent<HTMLInputElement>)=>{

        // eslint-disable-next-line prefer-const
        let { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });

    }


     
    const CheckMobileNoValid = (e:any) => {

    const value = e.target.value;

    if (value === "") {
        setMobileValid(false);
    } else {
        setMobileValid(mobilePatrn.test(value));
    }
};


// email handle and validation ---------------------------------

    const emailhandle = (e: React.ChangeEvent<HTMLInputElement>)=>{

        // eslint-disable-next-line prefer-const
        let { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });

        setEmailValid(customer.email ==""? false:emailPatrn.test(customer.email))

    }

    const CheckEmailValid = (e:any) => {

    const value = e.target.value;

    if (value === "") {
        setEmailValid(false);
    } else {
        setEmailValid(emailPatrn.test(value));
    }
};


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



                const res = await axios.put(`http://localhost:8080/api/customer/${customer.id}`, customer);
                console.log("response", res.data);

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

                const txtFirstName = document.getElementById("txtFirstName");
                if (txtFirstName) {
                    txtFirstName.classList.remove("is-valid", "is-invalid");
                }


                const txtLastName = document.getElementById("txtLastName");
                if (txtLastName) {
                    txtLastName.classList.remove("is-valid","is-invalid");
                }
                
                const txtMobileNo = document.getElementById("txtMobileNo");
                if (txtMobileNo) {
                    txtMobileNo.classList.remove("is-valid","is-invalid");
                }
                const txtEmail = document.getElementById("txtEmail");
                if (txtEmail) {
                    txtEmail.classList.remove("is-valid", "is-invalid");
                }
                const txtNotes = document.getElementById("txtNotes");
                if (txtNotes) {
                    txtNotes.classList.remove("is-valid","is-invalid");
                }

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

        const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

            // from here,disable the page refresh when submitting the form.
            e.preventDefault();

            if(!firstNameValid || !lastNameValid || !emailValid || !mobileValid){
                window.alert("Please fill the required fields");
                return;
            }

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

                    const txtFirstNameEl = document.getElementById("txtFirstName");
                    if (txtFirstNameEl) txtFirstNameEl.classList.remove("is-valid","is-invalid");
                    const txtLastNameEl = document.getElementById("txtLastName");
                    if (txtLastNameEl) txtLastNameEl.classList.remove("is-valid","is-invalid");
                    const txtMobileNoEl = document.getElementById("txtMobileNo");
                    if (txtMobileNoEl) txtMobileNoEl.classList.remove("is-valid","is-invalid");
                    const txtEmailEl = document.getElementById("txtEmail");
                    if (txtEmailEl) txtEmailEl.classList.remove("is-valid","is-invalid");
                    const txtNotesEl = document.getElementById("txtNotes");
                    if (txtNotesEl) txtNotesEl.classList.remove("is-valid","is-invalid");


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
        interface Customer {
            id: number | null;
            firstname: string;
            lastname: string;
            email: string;
            mobileno: string;
            status: string | boolean;
        }

        const handleEdit = (row: Customer): void => {
            setIsEditing(true);
            setCustomer(row);
        }




        //  delete function
        const deleteCustomer =async (id:number)=>{

        const confirmDlt =window.confirm("Are you sure to delete?")
            if (confirmDlt){
                try {
                const backendRes = await axios.delete(`http://localhost:8080/api/customer/${id}`);

                 window.alert(backendRes.data) // Show the response message from the backend
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


        // form error checking function
         type Column = { title: string; property: string };

const columns: Column[] = [
  { title: 'ID', property: 'id' },
  { title: 'First Name', property: 'firstname' },
  { title: 'Last Name', property: 'lastname' },
  { title: 'Email', property: 'email' },
  { title: 'Mobile No', property: 'mobileno' },
  { title: 'Status', property: 'status' }
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
                                                        <input type="text" onChange={firstNamehandle}
                                                               value={customer.firstname}
                                                               name="firstname" onBlur={CheckFirstNameValid}

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
                                                        <input type="text" onBlur={CheckLastNameValid}
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
                                                              // onBlur={() => setMobileValid(/^[0-9]{10}$/.test(customer.mobileno))}
                                                              onBlur={CheckMobileNoValid}
                                                               className="form-control"id="txtMobileNo"
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
                                                               onBlur={CheckEmailValid}
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
                                                                  rows={3}></textarea>
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
                                                       onEdit={(row: Customer) => handleEdit(row)} onDelete={(id)=>deleteCustomer(id)}/>


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
